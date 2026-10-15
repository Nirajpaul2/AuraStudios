import {catalog} from './lib/server';
export default async function sitemap(){const {films}=await catalog();return [...['','/photography','/films','/ai','/services','/booking','/store'],...films.map(f=>'/films/'+f.id)].map(p=>({url:'https://aure-cinematic-studio.nirajpaul2.chatgpt.site'+p}));}
