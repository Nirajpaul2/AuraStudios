import Studio from '../../Studio';
import { catalog,identity,admin,getVideo,owns } from '../../lib/server';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const c=await catalog();const f=c.films.find(f=>f.id===id);return {title:f?.title||'Private film',description:f?.description,robots:f?undefined:{index:false,follow:false}};}
export default async function Page({params}:{params:Promise<{id:string}>}){const {id}=await params;const [data,user,isAdmin]=await Promise.all([catalog(),identity(),admin()]);if(!data.films.some(f=>f.id===id)&&user&&(isAdmin||await owns(user.userId,id))){const v=await getVideo(id);if(v&&(v.published||isAdmin)){const {originalKey,previewKey,...safe}=v;data.films.push({...safe,hasPreview:!!previewKey});}}return <Studio catalog={data} user={user} isAdmin={isAdmin} section="films" filmId={id}/>;}
