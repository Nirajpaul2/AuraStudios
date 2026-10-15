import Studio from './Studio';
import { catalog,identity,admin } from './lib/server';
export const dynamic='force-dynamic';
export default async function Home(){const [data,user,isAdmin]=await Promise.all([catalog(),identity(),admin()]);return <Studio catalog={data} user={user} isAdmin={isAdmin}/>;}
