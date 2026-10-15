import { env } from 'cloudflare:workers';
import { getChatGPTUser } from '../chatgpt-auth';
import { defaults, references, sampleImages, serviceIdeas, type Item } from './catalog';
export function db(){if(!env.DB)throw new Error('Database unavailable');return env.DB;}
export function bucket(){if(!env.BUCKET)throw new Error('Media storage unavailable');return env.BUCKET;}
export function config(name:string){return (env as unknown as Record<string,string|undefined>)[name]||'';}
export async function identity(){return getChatGPTUser();}
export async function admin(){const user=await identity();return !!user&&config('ADMIN_USER_IDS').split(',').map(s=>s.trim()).filter(Boolean).includes(user.userId);}
export async function catalog(){let rows:{id:string;data:string;kind:string}[]=[];let settings=defaults;try{rows=(await db().prepare('SELECT id,kind,data FROM content WHERE published=1').all<{id:string;kind:string;data:string}>()).results;const s=await db().prepare("SELECT data FROM settings WHERE id='site'").first<{data:string}>();if(s)settings={...defaults,...JSON.parse(s.data)};}catch(e){console.error('catalog_read_failed',e);}
 const all=rows.map(r=>({...JSON.parse(r.data),id:r.id,kind:r.kind}) as Item);const safe=all.filter(i=>i.access!=='private').map(({originalKey,previewKey,...i})=>({...i,hasPreview:!!previewKey}));return {settings,films:[...safe.filter(i=>i.kind==='video'),...(settings.showReferences?references:[])],images:safe.some(i=>i.kind==='image')?safe.filter(i=>i.kind==='image'):sampleImages,services:safe.some(i=>i.kind==='service')?safe.filter(i=>i.kind==='service'&&i.enabled!==false):serviceIdeas,categories:safe.filter(i=>i.kind==='category'),sampleGallery:!safe.some(i=>i.kind==='image')};}
export async function getVideo(id:string){const row=await db().prepare("SELECT data,published FROM content WHERE id=? AND kind='video'").bind(id).first<{data:string;published:number}>();return row?{...JSON.parse(row.data),id,published:!!row.published} as Item:null;}
export async function owns(userId:string,videoId:string){return !!await db().prepare('SELECT id FROM video_entitlements WHERE user_id=? AND video_id=? AND revoked=0').bind(userId,videoId).first();}
export function result(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});}
