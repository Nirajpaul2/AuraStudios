import Studio from '../Studio';
import { catalog,identity,admin } from '../lib/server';
import { notFound } from 'next/navigation';
export const dynamic='force-dynamic';
const titles:Record<string,string>={photography:'Photography',films:'The film collection',ai:'AI cinematics',services:'Services',booking:'Book a session',store:'Premium film store',purchases:'My library','client-portal':'Client Album Proofing Portal',moodboard:'Wedding Moodboard Studio',admin:'Studio admin',credits:'Image credits',privacy:'Privacy'};
export async function generateMetadata({params}:{params:Promise<{section:string}>}){const {section}=await params;return {title:titles[section]||'Auré Studio',robots:['admin','purchases'].includes(section)?{index:false,follow:false}:undefined};}
export default async function Page({params}:{params:Promise<{section:string}>}){const {section}=await params;if(!titles[section])notFound();const [data,user,isAdmin]=await Promise.all([catalog(),identity(),admin()]);return <Studio catalog={data} user={user} isAdmin={isAdmin} section={section}/>;}
