/** Run on a trusted machine with Node 22+ and FFmpeg. See README. */
import {mkdtemp,rm,stat} from 'node:fs/promises';
import {createReadStream,createWriteStream} from 'node:fs';
import {Readable} from 'node:stream';
import {pipeline} from 'node:stream/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {spawn} from 'node:child_process';
const origin=process.env.STUDIO_URL, secret=process.env.PROCESSOR_SECRET;
if(!origin||!secret)throw new Error('Set STUDIO_URL and PROCESSOR_SECRET in the process environment.');
const endpoint=new URL(origin);if(endpoint.protocol!=='https:'&&!['127.0.0.1','localhost'].includes(endpoint.hostname))throw new Error('HTTPS is required.');
const headers={Authorization:'Bearer '+secret,...(process.env.SITES_SERVICE_TOKEN?{'OAI-Sites-Authorization':'Bearer '+process.env.SITES_SERVICE_TOKEN}:{})};
async function call(path,options={}){const r=await fetch(new URL('/api/processor/'+path,origin),{...options,headers:{...headers,...options.headers}});if(!r.ok)throw new Error('Processor request failed: HTTP '+r.status);return r;}
async function processOne(){const {job}=await (await call('claim',{method:'POST'})).json();if(!job)return false;const dir=await mkdtemp(join(tmpdir(),'aure-preview-'));const query='?job='+encodeURIComponent(job.id)+'&lease='+encodeURIComponent(job.lease);try{const input=join(dir,'original.mp4'),output=join(dir,'preview.mp4');const source=await call('source'+query);await pipeline(Readable.fromWeb(source.body),createWriteStream(input));const vf=job.type==='blurred'?'scale=640:-2,gblur=sigma=18':job.type==='low-resolution'?'scale=320:-2':'scale=960:-2';await new Promise((resolve,reject)=>{const proc=spawn(process.env.FFMPEG_BIN||'ffmpeg',['-hide_banner','-loglevel','error','-nostdin','-y','-protocol_whitelist','file,pipe','-i',input,'-t',String(Math.min(60,Math.max(5,job.seconds))),'-map','0:v:0','-map','0:a?','-vf',vf,'-c:v','libx264','-preset','fast','-crf','28','-c:a','aac','-b:a','96k','-movflags','+faststart',output],{stdio:['ignore','ignore','pipe']});let err='';proc.stderr.on('data',b=>{err=(err+b.toString()).slice(-2000);});const timer=setTimeout(()=>proc.kill('SIGKILL'),10*60*1000);proc.on('error',reject);proc.on('close',code=>{clearTimeout(timer);code===0?resolve():reject(new Error('FFmpeg failed: '+err));});});const size=(await stat(output)).size;await call('complete'+query,{method:'POST',headers:{'Content-Type':'video/mp4','Content-Length':String(size)},body:createReadStream(output),duplex:'half'});console.log('Preview ready for job '+job.id);return true;}catch(e){await call('fail'+query,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({error:String(e.message).slice(0,500)})});console.error('Preview generation failed for job '+job.id);return true;}finally{await rm(dir,{recursive:true,force:true});}}
do{await processOne();if(process.argv.includes('--once'))break;await new Promise(r=>setTimeout(r,15000));}while(true);
