'use client';
import { useEffect,useRef,useState, type FormEvent, type ReactNode } from 'react';
import { ArrowUpRight,ArrowRight,Play,Camera,Film,Sparkles,ShoppingBag,Menu,X,ChevronDown,ChevronLeft,ChevronRight,Check,Lock,Search,ArrowLeft,Plus,Upload,Settings,Inbox,Images,Users,RefreshCw,LoaderCircle,ArrowDown,Heart,Sliders,Calendar,ShieldCheck,Download,Palette,Eye,Copy,Share2 } from 'lucide-react';
import {defaults,type Item,testimonials,faqs,featuredStory,moodboardData,proofingGalleries,colorGradingScenes,type ColorGradingScene,type ProofingGallery,type ProofingPhoto} from './lib/catalog';
type Catalog={settings:typeof defaults;films:Item[];images:Item[];services:Item[];categories:Item[];sampleGallery:boolean};
type User={userId:string;email:string;displayName:string}|null;
const money=(n:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n/100);
async function api(path:string,body?:unknown){const r=await fetch('/api/'+path,body===undefined?{}:{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});const d:any=await r.json();if(!r.ok)throw new Error(d.error||'Something went wrong');return d;}
function Button({children,href,onClick,outline=false,...props}:{children:ReactNode;href?:string;onClick?:()=>void;outline?:boolean;[k:string]:unknown}){const cls='button '+(outline?'outline':'gold');return href?<a className={cls} href={href}>{children}</a>:<button className={cls} onClick={onClick} {...props}>{children}</button>;}
function Eyebrow({children}:{children:ReactNode}){return <div className="eyebrow"><span/>{children}</div>;}
function Dialog({children,onClose,label}:{children:ReactNode;onClose:()=>void;label:string}){const ref=useRef<HTMLDialogElement>(null);useEffect(()=>{ref.current?.showModal();const close=()=>onClose();const d=ref.current;d?.addEventListener('close',close);document.body.style.overflow='hidden';return()=>{d?.removeEventListener('close',close);document.body.style.overflow='';};},[]);return <dialog ref={ref} aria-label={label} className="modal" onClick={e=>{if(e.target===e.currentTarget)onClose();}}><button className="close" onClick={onClose} aria-label="Close"><X size={22}/></button>{children}</dialog>;}
export default function Studio({catalog,section='home',user,isAdmin=false,filmId}:{catalog:Catalog;section?:string;user:User;isAdmin?:boolean;filmId?:string}){const {settings:s,films,images,services}=catalog;const [menu,setMenu]=useState(false);const [lightbox,setLightbox]=useState<Item|null>(null);const [playing,setPlaying]=useState<Item|null>(null);const [filter,setFilter]=useState('All');const [search,setSearch]=useState('');const [depositOpen,setDepositOpen]=useState(false);const {isPlaying:playingAudio,toggle:toggleAudio}=useAmbientAudio();const active=films.find(f=>f.id===filmId);const nav=[['Home','/','home'],['Photography','/photography','photography'],['Films','/films','films'],...(s.showAI?[['AI Cinematics','/ai','ai']]:[]),['Services','/services','services'],['Moodboard','/moodboard','moodboard'],['Client Portal','/client-portal','client-portal']];
 const lightboxIndex=lightbox?images.findIndex(im=>im.id===lightbox.id):-1;
 const prevLightbox=()=>{if(lightboxIndex>0)setLightbox(images[lightboxIndex-1]);else if(lightboxIndex===0)setLightbox(images[images.length-1]);};
 const nextLightbox=()=>{if(lightboxIndex>=0&&lightboxIndex<images.length-1)setLightbox(images[lightboxIndex+1]);else if(lightboxIndex===images.length-1)setLightbox(images[0]);};
 useEffect(()=>{if(!lightbox)return;const handleKey=(e:KeyboardEvent)=>{if(e.key==='ArrowLeft'){e.preventDefault();prevLightbox();}else if(e.key==='ArrowRight'){e.preventDefault();nextLightbox();}};window.addEventListener('keydown',handleKey);return()=>window.removeEventListener('keydown',handleKey);},[lightbox,lightboxIndex,images]);
 useEffect(()=>{if(!menu)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setMenu(false);};window.addEventListener('keydown',close);return()=>window.removeEventListener('keydown',close);},[menu]);
 const filtered=(items:Item[])=>items.filter(i=>(filter==='All'||i.category===filter)&&`${i.title} ${i.description} ${i.category}`.toLowerCase().includes(search.toLowerCase()));
 return <><a className="skip" href="#main">Skip to content</a>{menu&&<div className="nav-backdrop" onClick={()=>setMenu(false)} aria-hidden="true"/>}<header className="header"><a href="/" className="brand"><span className="brand-symbol">{s.logoUrl?<img className="brand-logo" src={s.logoUrl} alt=""/>:<>✧</>}</span><span>{s.name.replace(/ Studio$/i,'')}<small>STUDIO</small></span></a><nav id="main-navigation" aria-label="Main navigation" className={menu?'nav open':'nav'}>{nav.map(([name,url,id])=><a key={id} className={section===id?'active':''} href={url} onClick={()=>setMenu(false)}>{name}</a>)}{s.showStore&&<a className="mobile-nav-link" href="/store">Film store</a>}<a className="mobile-nav-link" href="/purchases">My Library</a></nav><div className="nav-actions"><AmbientAudioToggle isPlaying={playingAudio} toggle={toggleAudio}/><a href="/purchases" className="library" aria-label="My Purchases"><ShoppingBag size={18}/><span>My Library</span></a><a className="nav-book" href="/booking">Let’s create <ArrowUpRight size={17}/></a><button type="button" className="menu-button" aria-controls="main-navigation" aria-expanded={menu} aria-label="Toggle navigation" onClick={()=>setMenu(open=>!open)}>{menu?<X/>:<Menu/>}</button></div></header>
 <main id="main">
 {section==='home'&&<><section className="hero"><img className="hero-image" src={s.heroImage} alt="Wedding couple in white embracing by the ocean shore at dusk" fetchPriority="high"/><div className="hero-shade"/><div className="hero-content"><Eyebrow>FOR THE MOMENTS THAT MATTER</Eyebrow><h1>Your moments.<br/>Our lens.<br/><em>Forever, felt.</em></h1><p>Honest photographs. Cinematic films.<br/>Extraordinary stories, beautifully told.</p><div className="hero-buttons"><Button href="/films">Explore our films <Play size={14} fill="currentColor"/></Button><Button href="/booking" outline>Book a session <ArrowUpRight size={17}/></Button></div></div><div className="hero-bottom"><span>PHOTOGRAPHY &nbsp; / &nbsp; FILM &nbsp; / &nbsp; AI CINEMATICS</span><a href="#selected">SCROLL TO EXPLORE <span>↓</span></a><span className="hero-counter">AURÉ <span>/ EDITION 01</span></span></div><div className="hero-side">EVERY FRAME, A FEELING.</div></section>
 <div className="discipline"><span>Weddings & love stories</span><i>✦</i><span>Life’s little celebrations</span><i>✦</i><span>Portraits with soul</span><i>✦</i><span>A new cinematic perspective</span></div>
 <section id="selected" className="section"><div className="section-head"><div><Eyebrow>THE MOTION COLLECTION</Eyebrow><h2>Some stories deserve<br/>to be <em>felt again.</em></h2></div><div className="section-aside"><p>Love, atmosphere, and the art of storytelling.<br/>A collection to get lost in.</p><a className="text-link" href="/films">Explore the film collection <ArrowUpRight size={16}/></a></div></div><div className="film-grid">{films.slice(0,6).map((f,i)=><FilmCard key={f.id} film={f} index={i} onPlay={()=>setPlaying(f)}/>)}</div>{films.some(f=>f.reference)&&<p className="caption">Creative references by Heartwave · Official YouTube embeds · Not studio client work</p>}</section>
 <FeaturedStorySection/>
 <BeforeAfterSlider/>
 <section className="section gallery-section"><div className="section-head"><div><Eyebrow>STILL FRAMES. ENDLESS FEELING.</Eyebrow><h2>Life, in its <em>beautiful detail.</em></h2></div><a className="text-link" href="/photography">View photography <ArrowUpRight size={17}/></a></div><div className="editorial-gallery">{images.slice(0,4).map((im,i)=><button className={'gallery-tile tile-'+i} key={im.id} onClick={()=>setLightbox(im)}><img src={im.image} alt={im.title} loading="lazy"/><div><span>{im.category}</span><ArrowUpRight size={22}/></div></button>)}</div>{images.length>4&&<div className="collection-strip">{images.slice(4,12).map(im=><button key={im.id} onClick={()=>setLightbox(im)} aria-label={"View "+im.title}><img src={im.image} alt={im.title} loading="lazy" decoding="async"/><span>{im.category}</span></button>)}</div>}<a className="text-link collection-more" href="/photography">Explore all {images.length} photographs <ArrowUpRight size={17}/></a>{catalog.sampleGallery&&<p className="caption">Featuring authentic client stories alongside curated creative references by Auré Studio.</p>}</section>
 {s.showAI&&<section className="ai-feature"><div className="ai-photo"><img src="/images/landscape.jpg" loading="lazy" alt="Mountain lake in cinematic evening light"/><span><Sparkles size={14}/> A NEW CREATIVE PERSPECTIVE</span></div><div className="ai-copy"><Eyebrow>HUMAN VISION. NEW POSSIBILITIES.</Eyebrow><h2>Beyond the ordinary.<br/><em>Into the cinematic.</em></h2><p>Have a film that could become something more? Explore a creative conversation around restoration, cinematic color, and AI-assisted storytelling.</p><div className="ai-tags"><span>Color & atmosphere</span><span>Restoration</span><span>Creative effects</span></div><a className="text-link" href="/ai">Discover AI cinematics <ArrowUpRight size={18}/></a></div></section>}
 <section className="section"><div className="section-head"><div><Eyebrow>MADE AROUND YOU</Eyebrow><h2>Your story. <em>Our craft.</em></h2></div><a href="/services" className="text-link">Explore our services <ArrowUpRight size={17}/></a></div><div className="service-grid">{services.slice(0,3).map((sv,i)=><a key={sv.id} href={'/booking?service='+encodeURIComponent(sv.title)} className="service-card"><span className="service-number">0{i+1}</span>{i===0?<Camera/>:i===1?<Film/>:<Sparkles/>}<h3>{sv.title}</h3><p>{sv.description}</p><span className="service-bottom">Let’s talk about your vision <ArrowUpRight size={18}/></span></a>)}</div></section>
 <TestimonialsSection/>
 <FaqSection title="Frequently Asked Questions" subtitle="Transparent details on destination travel, dates, turnaround timelines, and our bespoke craft."/>
 <BookingBanner/></>}
 {section==='photography'&&<section className="section inner-page"><Eyebrow>THE PHOTOGRAPHY COLLECTION</Eyebrow><h1>A fraction of a second.<br/><em>A lifetime of feeling.</em></h1><p className="intro">The glances, the joy, the unscripted moments in between.</p><p className="collection-count">{images.length} photographs · Select a category or open a frame to explore.</p><Filters items={images} filter={filter} setFilter={setFilter}/><div className="photo-grid">{filtered(images).map(im=><button className="photo-card" key={im.id} onClick={()=>setLightbox(im)}><img src={im.image} alt={im.title} loading="lazy"/><div><h3>{im.title}</h3><span>{im.category} <ArrowUpRight size={16}/></span></div></button>)}</div>{!filtered(images).length&&<Empty title="A new collection is on its way." text="Explore another category in the meantime."/>}{catalog.sampleGallery&&<p className="caption">Featuring authentic photography by Auré Studio alongside curated creative references. <a href="/credits">View photographers & credits</a>.</p>}</section>}
 {section==='films'&&!filmId&&<section className="section inner-page"><Eyebrow>THE FILM COLLECTION</Eyebrow><h1>More than moving pictures.<br/><em>Moving stories.</em></h1><div className="collection-toolbar"><p className="intro">Discover films, creative references, and premium releases.</p><label className="search"><Search size={18}/><input aria-label="Search films" placeholder="Find a film…" value={search} onChange={e=>setSearch(e.target.value)}/></label></div><Filters items={films} filter={filter} setFilter={setFilter}/><div className="film-grid">{filtered(films).map((f,i)=><FilmCard film={f} index={i} key={f.id} onPlay={()=>setPlaying(f)}/>)}</div>{!filtered(films).length&&<Empty title="No films match this search." text="Try another title or category."/>}<p className="caption">Reference films are credited to their original creator and are never offered for purchase.</p>{s.showStore&&<div className="store-callout"><Lock size={25}/><div><h3>A collection worth keeping.</h3><p>Explore premium releases and revisit your purchased films in your personal library.</p></div><Button href="/store" outline>Visit the film store <ArrowUpRight size={17}/></Button></div>}</section>}
 {filmId&&(active?<FilmDetail film={active} user={user} onPlay={()=>setPlaying(active)}/>:<section className="section inner-page"><Empty title="This film is not available." text="It may be private, unpublished, or no longer in the collection."/><Button href="/films">Back to films</Button></section>)}
 {section==='ai'&&<><section className="section inner-page ai-page"><Eyebrow>THE NEXT FRAME</Eyebrow><h1>Your imagination.<br/><em>A new dimension.</em></h1><p className="intro">Give existing footage a fresh perspective, or explore a cinematic idea from the beginning.</p><div className="ai-wide"><img src="/images/landscape.jpg" alt="Cinematic mountain landscape"/><span><Sparkles size={17}/> THE POSSIBILITIES START WITH YOUR IDEA</span></div><div className="section-head"><h2>Let’s explore what<br/>your film <em>could become.</em></h2><div className="section-aside"><p>Every project starts with a review of your footage, creative goals, and what is technically possible. Availability and scope are confirmed in your quote.</p><Button href="/booking?service=AI%20video%20editing">Request AI video editing <ArrowUpRight size={17}/></Button></div></div><div className="cinematic-moodboard">{images.filter(im=>im.category==='Cinematic landscapes').map(im=><button key={im.id} onClick={()=>setLightbox(im)} aria-label={"View "+im.title}><img src={im.image} alt={im.title} loading="lazy" decoding="async"/><span>{im.title}</span></button>)}</div><BeforeAfterSlider/><div className="service-grid">{[['01','Color & atmosphere','Explore cinematic grading, a consistent visual style, and a mood that brings your story together.'],['02','Restoration & clarity','Discuss sharpening, noise reduction, and restoration options for footage that deserves another look.'],['03','A different kind of story','Consider AI-assisted effects, transitions, generated scenes, and thoughtfully edited highlights.']].map(([n,t,d])=><article className="service-card" key={n}><span className="service-number">{n}</span><Sparkles/><h3>{t}</h3><p>{d}</p></article>)}</div></section><BookingBanner/></>}
 {section==='services'&&<><section className="section inner-page"><Eyebrow>CRAFTED FOR YOUR OCCASION</Eyebrow><h1>Good stories begin<br/>with <em>a conversation.</em></h1><p className="intro">Thoughtful photography and films, with a scope shaped around you.</p><div className="services-list">{services.map((sv,i)=><article key={sv.id}><img src={sv.image} alt={sv.title}/><div><span className="eyebrow">0{i+1} / {sv.category}</span><h2>{sv.title}</h2><p>{sv.description}</p><ul>{sv.inclusions?.split('\n').filter(Boolean).map(x=><li key={x}><Check size={15}/>{x}</li>)}</ul><div className="service-price"><span>{sv.price?`From ${money(sv.price)}`:'A personal quote, made for you'}</span><Button href={'/booking?service='+encodeURIComponent(sv.title)} outline>Request a quote <ArrowUpRight size={17}/></Button></div></div></article>)}</div><div className="services-deposit-box"><Eyebrow>CALENDAR EXCLUSIVITY GUARANTEE</Eyebrow><h2>Ready to hold your wedding date?<br/><em>Reserve with a ₹25,000 token deposit.</em></h2><p>We commit to only one wedding production per weekend worldwide. Lock your date early to secure our lead cinema and photography team.</p><button type="button" className="button gold" onClick={()=>setDepositOpen(true)}>Hold Wedding Date (₹25,000) <Calendar size={16}/></button></div></section><FaqSection title="Package & Booking Inquiries" subtitle="Everything you need to know about destination travel, turnaround times, and booking your celebration."/><BookingBanner/></>}
 {section==='booking'&&<Booking user={user} services={services} settings={s} onOpenDeposit={()=>setDepositOpen(true)}/>}
 {section==='moodboard'&&<MoodboardCreator user={user} settings={s}/>}
 {section==='client-portal'&&<ClientProofingPortal onOpenLightbox={setLightbox}/>}
 {section==='store'&&<section className="section inner-page"><Eyebrow>THE PRIVATE COLLECTION</Eyebrow><h1>A story to return to.<br/><em>Whenever you like.</em></h1><p className="intro">Watch a preview, find a film you love, and make it part of your library.</p><div className="film-grid">{films.filter(f=>f.access==='premium').map((f,i)=><FilmCard key={f.id} film={f} index={i} onPlay={()=>setPlaying(f)}/>)}</div>{!films.some(f=>f.access==='premium')&&<div className="premium-empty"><img src="/images/landscape.jpg" alt="Cinematic landscape"/><div><Lock/><Eyebrow>A LITTLE ANTICIPATION</Eyebrow><h2>Something special<br/>is <em>in the making.</em></h2><p>Premium films will appear here when the studio releases its first collection. Until then, explore the inspiration behind the work.</p><Button href="/films">Explore free films <ArrowRight size={17}/></Button></div></div>}</section>}
 {section==='purchases'&&<Account user={user} />}
 {section==='admin'&&<Admin user={user} allowed={isAdmin} settings={s}/>}
 {section==='credits'&&<Credits/>}
 {section==='privacy'&&<section className="section inner-page prose"><Eyebrow>YOUR INFORMATION</Eyebrow><h1>Privacy, <em>with care.</em></h1><h3>Inquiries and your account</h3><p>When you sign in, we receive your account identifier, name if available, and email. Booking details are stored so the studio can respond, manage your inquiry, and provide your purchase library. Only administrators can see all inquiries.</p><h3>Payments and media</h3><p>Payments are handled by Razorpay when configured. This site stores order references and payment status, never card details. Access to purchased media is checked on the server. Playback protection cannot prevent all screen recording.</p><h3>External content</h3><p>YouTube embeds load only when you choose to play a reference film. Payment checkout loads when you choose to purchase. These providers apply their own privacy policies. No advertising analytics are installed.</p><h3>Requests and retention</h3><p>Use the booking form to request correction or deletion of personal details. The studio should review and remove outdated inquiries and retain purchase records only as required for service and applicable obligations.</p></section>}
 </main><footer><div className="footer-top"><a href="/" className="brand"><span className="brand-symbol">{s.logoUrl?<img className="brand-logo" src={s.logoUrl} alt=""/>:<>✧</>}</span><span>{s.name.replace(/ Studio$/i,'')}<small>STUDIO</small></span></a><p>{s.tagline}</p><div><a href="/moodboard">Moodboard <Palette size={14}/></a><a href="/client-portal">Client Portal <Lock size={14}/></a>{s.email&&<a href={'mailto:'+s.email}>Email <ArrowUpRight size={14}/></a>}{s.instagram&&<a href={s.instagram} target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a>}{s.youtube&&<a href={s.youtube} target="_blank" rel="noreferrer">YouTube <ArrowUpRight size={14}/></a>}<a href="/booking">Start a conversation <ArrowUpRight size={14}/></a></div></div><ContactLinks settings={s}/><div className="footer-bottom"><span>© {new Date().getFullYear()} {s.name}. Every frame, a feeling.</span><div><a href="/moodboard">Moodboard Studio</a><a href="/client-portal">Client Portal</a><a href="/credits">Image credits</a><a href="/privacy">Privacy</a><a href="/admin">Studio admin</a></div><span>MADE FOR THE MOMENTS THAT STAY.</span></div></footer>
 {lightbox&&<Dialog label={lightbox.title} onClose={()=>setLightbox(null)}><div className="lightbox"><div className="lightbox-image-wrap">{images.length>1&&<button type="button" className="lightbox-nav prev" onClick={e=>{e.stopPropagation();prevLightbox();}} aria-label="Previous photograph"><ChevronLeft size={24}/></button>}<img src={lightbox.image} alt={lightbox.title}/>{images.length>1&&<button type="button" className="lightbox-nav next" onClick={e=>{e.stopPropagation();nextLightbox();}} aria-label="Next photograph"><ChevronRight size={24}/></button>}</div><div className="lightbox-meta"><div><span className="lightbox-category">{lightbox.category}</span><h3>{lightbox.title}</h3><p>{lightbox.description}</p></div>{lightboxIndex>=0&&<span className="lightbox-counter">{(lightboxIndex+1).toString().padStart(2,'0')} <i>/</i> {images.length.toString().padStart(2,'0')}</span>}</div></div></Dialog>}
 {playing&&<Dialog label={'Watch '+playing.title} onClose={()=>setPlaying(null)}><div className="player-modal"><Player film={playing}/><div className="player-caption"><h3>{playing.title}</h3><p>{playing.reference?'Creative reference by Heartwave • Official YouTube embed':playing.description}</p><a className="text-link" href={'/films/'+playing.id}>View film details <ArrowUpRight size={15}/></a></div></div></Dialog>}
 {depositOpen&&<DateDepositModal settings={s} onClose={()=>setDepositOpen(false)}/>}
 {s.phone&&<FloatingWhatsApp phone={s.phone}/>}
 </>;
}
function Filters({items,filter,setFilter}:{items:Item[];filter:string;setFilter:(f:string)=>void}){return <div className="filters" aria-label="Filter by category">{['All',...new Set(items.map(i=>i.category).filter(Boolean))].map(c=><button key={c} className={c===filter?'selected':''} onClick={()=>setFilter(c)}>{c==='All'?'All stories':c}{c==='All'&&<span>{items.length.toString().padStart(2,'0')}</span>}</button>)}</div>;}
function FilmCard({film:f,index,onPlay}:{film:Item;index:number;onPlay:()=>void}){return <article className="film-card"><button className="film-image" onClick={onPlay} aria-label={'Play '+f.title}><img src={f.image} alt={f.title} loading="lazy"/><span className="film-badge">{f.reference?'CREATIVE REFERENCE':f.access==='premium'?'PREMIUM FILM':'STUDIO FILM'}</span><span className="play-circle"><Play size={21} fill="currentColor"/></span>{f.duration&&<span className="duration">{f.duration}</span>}</button><div className="film-info"><div><span className="overline">{f.category}</span><a href={'/films/'+f.id}><h3>{f.title}</h3></a></div><a className="round-link" href={'/films/'+f.id} aria-label={'Details for '+f.title}><ArrowUpRight size={19}/></a></div>{f.price&&f.access==='premium'?<p className="film-price">{money(f.price)} <span>Full-quality access</span></p>:null}</article>;}
function Empty({title,text}:{title:string;text:string}){return <div className="empty"><Film size={30}/><h3>{title}</h3><p>{text}</p></div>;}
function WhatsAppIcon({size=20}:{size?:number}){return <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.456 5.711 1.457h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>;}
function FloatingWhatsApp({phone}:{phone:string}){const digits=phone.replace(/\D/g,'');const international=digits.length===10?'91'+digits:digits;const msg=encodeURIComponent('Hello Auré Studio, I would like to inquire about your photography & films.');return <a href={'https://wa.me/'+international+'?text='+msg} target="_blank" rel="noopener noreferrer" className="floating-whatsapp" aria-label="Inquire with Auré Studio on WhatsApp"><span className="wa-icon-wrap"><WhatsAppIcon size={20}/><span className="wa-online-dot"/></span><span className="wa-label"><small>Inquire with us</small><strong>WhatsApp</strong></span></a>;}
function ContactLinks({settings}:{settings:typeof defaults}){const phones=[settings.phone,settings.phoneSecondary].filter(Boolean);if(!phones.length)return null;return <section className="studio-contact" aria-label="Call or WhatsApp the studio"><p>Call or WhatsApp us</p><div className="contact-options">{phones.map(phone=>{const digits=phone.replace(/\D/g,'');const international=digits.length===10?'91'+digits:digits;return <div className="contact-option" key={phone}><span>{phone}</span><div><a href={'tel:+'+international} aria-label={'Call '+phone}>Call <ArrowUpRight size={14}/></a><a href={'https://wa.me/'+international} target="_blank" rel="noopener noreferrer" aria-label={'WhatsApp '+phone}>WhatsApp <ArrowUpRight size={14}/></a></div></div>;})}</div></section>;}
function BookingBanner(){return <section className="booking-banner"><Eyebrow>YOUR NEXT CHAPTER</Eyebrow><h2>Let’s make something<br/><em>worth remembering.</em></h2><Button href="/booking">Tell us your story <ArrowUpRight size={18}/></Button><p>Big celebrations. Quiet moments. Endless possibilities.</p></section>;}
function Player({film}:{film:Item}){const [error,setError]=useState(false);return film.youtube?<><iframe className="video-player" src={'https://www.youtube-nocookie.com/embed/'+film.youtube+'?autoplay=1&rel=0'} title={film.title} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen/><p className="video-help">If playback is unavailable, <a href={'https://www.youtube.com/watch?v='+film.youtube} target="_blank" rel="noreferrer">watch on YouTube ↗</a>.</p></>:error?<Empty title="This preview isn’t available yet." text="Please try again later or contact the studio."/>:<video className="video-player" controls autoPlay preload="none" poster={film.image} onError={()=>setError(true)} src={(film.access==='public'?'/api/public/':'/api/preview/')+film.id}/>;}
function FilmDetail({film:f,user,onPlay}:{film:Item;user:User;onPlay:()=>void}){const [status,setStatus]=useState('');const [busy,setBusy]=useState(false);const [url,setUrl]=useState('');async function playOwned(){setBusy(true);try{const d=await api('playback',{videoId:f.id});setUrl(d.url);setStatus('');}catch(e){setStatus((e as Error).message);}finally{setBusy(false);}}
 async function buy(){setBusy(true);setStatus('');try{const order=await api('payments/order',{videoId:f.id});if(!(window as any).Razorpay)await new Promise<void>((resolve,reject)=>{const script=document.createElement('script');script.src='https://checkout.razorpay.com/v1/checkout.js';script.onload=()=>resolve();script.onerror=()=>reject(new Error('Could not load secure checkout'));document.head.appendChild(script);});const checkout=new (window as any).Razorpay({key:order.key,order_id:order.orderId,amount:order.amount,currency:order.currency,name:'Film purchase',description:(order.test?'TEST PAYMENT · ':'')+f.title,handler:async(response:unknown)=>{try{setStatus('Verifying your payment…');const d=await api('payments/verify',response);setStatus(d.paid?'Payment verified. Your film is in My Library.':'This payment was refunded.');}catch(e){setStatus((e as Error).message+' If you were charged, the studio can reconcile your payment.');}},modal:{ondismiss:()=>setStatus('Checkout closed. Access is granted only after verified payment.')}});checkout.on('payment.failed',()=>setStatus('Payment failed. Please try again or choose another payment method.'));checkout.open();}catch(e){setStatus((e as Error).message);}finally{setBusy(false);}}
 return <section className="section inner-page"><a className="back-link" href="/films"><ArrowLeft size={16}/> The film collection</a><div className="detail-layout"><div>{url?<video controls autoPlay className="video-player" src={url} onError={()=>setStatus('Your playback link may have expired. Select Watch full film to renew it.')}/>:<button className="film-image detail-poster" onClick={onPlay}><img src={f.image} alt={f.title}/><span className="play-circle"><Play fill="currentColor"/></span><span className="duration">{f.reference?'Watch reference':'Watch preview'}</span></button>}</div><div><Eyebrow>{f.reference?'CREATIVE REFERENCE':f.access==='premium'?'PREMIUM COLLECTION':f.category}</Eyebrow><h1>{f.title}</h1><p>{f.description}</p>{f.reference?<p className="notice">Created by Heartwave. This reference is shared through its official YouTube embed and is not sold by the studio.</p>:<><h3>{f.price?money(f.price):'Studio collection'}</h3>{f.access==='public'?<Button onClick={onPlay}>Watch film <Play size={15}/></Button>:!user?<a className="button gold" target="_top" href={'/signin-with-chatgpt?return_to='+encodeURIComponent('/films/'+f.id)}>Sign in to continue <ArrowUpRight size={17}/></a>:<><Button onClick={playOwned} disabled={busy}>Watch full film <Play size={15}/></Button>{f.access==='premium'&&<Button onClick={buy} disabled={busy} outline>Purchase access <ShoppingBag size={15}/></Button>}</>}<p className="caption">Full-quality playback in your personal library. Preview quality may differ from the finished film.</p></>}{status&&<p role="status" className="notice">{status}</p>}</div></div></section>;}

function useAmbientAudio(){
  const [isPlaying,setIsPlaying]=useState(false);
  const audioContextRef=useRef<AudioContext|null>(null);
  const masterGainRef=useRef<GainNode|null>(null);
  const activeNodesRef=useRef<any[]>([]);

  const toggle=()=>{
    if(isPlaying){
      if(masterGainRef.current&&audioContextRef.current){
        const ctx=audioContextRef.current;
        const now=ctx.currentTime;
        masterGainRef.current.gain.setValueAtTime(masterGainRef.current.gain.value,now);
        masterGainRef.current.gain.linearRampToValueAtTime(0.0001,now+0.5);
        setTimeout(()=>{
          activeNodesRef.current.forEach(n=>{
            try{if(n.stop)n.stop();n.disconnect();}catch(_){}
          });
          activeNodesRef.current=[];
          setIsPlaying(false);
        },550);
      }else{
        setIsPlaying(false);
      }
    }else{
      try{
        const AudioCtx=window.AudioContext||(window as any).webkitAudioContext;
        if(!AudioCtx)return;
        const ctx=audioContextRef.current||new AudioCtx();
        audioContextRef.current=ctx;
        if(ctx.state==='suspended')ctx.resume();

        const now=ctx.currentTime;
        const master=ctx.createGain();
        master.gain.setValueAtTime(0.0001,now);
        master.gain.exponentialRampToValueAtTime(0.065,now+1.6);
        master.connect(ctx.destination);
        masterGainRef.current=master;

        const filter=ctx.createBiquadFilter();
        filter.type='lowpass';
        filter.frequency.setValueAtTime(420,now);
        filter.Q.setValueAtTime(1.4,now);
        filter.connect(master);

        const freqs=[92.5,138.59,174.61,207.65,233.08,277.18];
        const nodes:any[]=[filter,master];

        freqs.forEach((freq,i)=>{
          const osc=ctx.createOscillator();
          const oscGain=ctx.createGain();
          osc.type=i%2===0?'sine':'triangle';
          osc.frequency.setValueAtTime(freq,now);
          osc.detune.setValueAtTime((i-2.5)*3.5,now);

          const lfo=ctx.createOscillator();
          const lfoGain=ctx.createGain();
          lfo.frequency.setValueAtTime(0.12+(i*0.03),now);
          lfoGain.gain.setValueAtTime(freq*0.008,now);
          lfo.connect(lfoGain);
          lfoGain.connect(osc.frequency);
          lfo.start(now);

          oscGain.gain.setValueAtTime(0.07/(i+1),now);
          osc.connect(oscGain);
          oscGain.connect(filter);
          osc.start(now);

          nodes.push(osc,oscGain,lfo,lfoGain);
        });

        activeNodesRef.current=nodes;
        setIsPlaying(true);
      }catch(err){
        console.error('Ambient audio error:',err);
      }
    }
  };

  useEffect(()=>{
    return ()=>{
      try{
        activeNodesRef.current.forEach(n=>{
          try{if(n.stop)n.stop();n.disconnect();}catch(_){}
        });
        if(audioContextRef.current&&audioContextRef.current.state!=='closed'){
          audioContextRef.current.close();
        }
      }catch(_){}
    };
  },[]);

  return {isPlaying,toggle};
}

function AmbientAudioToggle({isPlaying,toggle}:{isPlaying:boolean;toggle:()=>void}){
  return (
    <button
      type="button"
      className={`audio-toggle ${isPlaying?'playing':''}`}
      onClick={toggle}
      aria-label={isPlaying?'Mute film score':'Play cinematic ambient film score'}
      title={isPlaying?'Mute ambient film score':'Experience site with ambient film score'}
    >
      <span className="audio-wave" aria-hidden="true">
        <span className="wave-bar bar-1"/>
        <span className="wave-bar bar-2"/>
        <span className="wave-bar bar-3"/>
        <span className="wave-bar bar-4"/>
      </span>
      <span className="audio-label">{isPlaying?'Score playing':'Ambient score'}</span>
    </button>
  );
}

function FeaturedStorySection(){
  const story=featuredStory;
  return (
    <section className="section featured-story-section">
      <div className="section-head">
        <div>
          <Eyebrow>FEATURED LOVE STORY · CASE STUDY</Eyebrow>
          <h2>{story.title.split(':')[0]}:<br/><em>{story.title.split(':')[1]||story.subtitle}</em></h2>
        </div>
        <div className="section-aside">
          <p>{story.subtitle} · {story.location}</p>
          <a className="text-link" href="/booking?service=Wedding%20stories">Inquire for your celebration <ArrowUpRight size={16}/></a>
        </div>
      </div>

      <div className="story-layout">
        <div className="story-hero-media">
          <img src="/images/hero-beach.webp" alt={story.title} loading="lazy"/>
          <div className="story-hero-overlay">
            <span className="story-pill">{story.location} · {story.year}</span>
            <p className="story-pull-quote">{story.quote}</p>
          </div>
        </div>

        <div className="story-sidebar">
          <div className="story-intro-block">
            <span className="overline">EDITORIAL CASE STUDY</span>
            <p>{story.intro}</p>
            <div className="story-palette">
              <span>Color Science & Grade:</span>
              <div className="swatches">
                {story.palette.map((c,idx)=><span key={idx} className="swatch" style={{backgroundColor:c}} title={c}/>)}
              </div>
            </div>
          </div>

          <div className="story-chapters-list">
            {story.chapters.map(chap=>(
              <article key={chap.num} className="chapter-item">
                <div className="chapter-thumb">
                  <img src={chap.image} alt={chap.title} loading="lazy"/>
                  <span className="chapter-time">{chap.time}</span>
                </div>
                <div className="chapter-info">
                  <span className="chapter-number">Chapter {chap.num}</span>
                  <h4>{chap.title}</h4>
                  <p>{chap.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection(){
  const [active,setActive]=useState(0);
  const t=testimonials[active];

  return (
    <section className="section testimonials-section">
      <div className="section-head">
        <div>
          <Eyebrow>WORDS FROM OUR COUPLES</Eyebrow>
          <h2>Love, remembered<br/><em>in their own words.</em></h2>
        </div>
        <div className="section-aside">
          <p>Unfiltered reflections from couples who trusted us with the defining days of their lives.</p>
          <div className="testimonial-controls">
            <button
              type="button"
              className="round-link"
              onClick={()=>setActive((active-1+testimonials.length)%testimonials.length)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18}/>
            </button>
            <span className="testimonial-counter">0{active+1} <i>/</i> 0{testimonials.length}</span>
            <button
              type="button"
              className="round-link"
              onClick={()=>setActive((active+1)%testimonials.length)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={18}/>
            </button>
          </div>
        </div>
      </div>

      <div className="testimonial-card">
        <div className="testimonial-stars" aria-hidden="true">★★★★★</div>
        <blockquote className="testimonial-quote">{t.quote}</blockquote>
        <p className="testimonial-highlight">{t.highlight}</p>
        <div className="testimonial-meta">
          <img src={t.badgeImage} alt={t.couple} className="couple-avatar" loading="lazy"/>
          <div>
            <h3>{t.couple}</h3>
            <span>{t.location} · {t.eventType}</span>
          </div>
          <span className="couple-year">{t.year}</span>
        </div>
      </div>

      <div className="testimonial-thumbs">
        {testimonials.map((item,i)=>(
          <button
            key={item.id}
            type="button"
            className={`testimonial-thumb ${i===active?'active':''}`}
            onClick={()=>setActive(i)}
          >
            <img src={item.badgeImage} alt="" loading="lazy"/>
            <div>
              <strong>{item.couple}</strong>
              <small>{item.location.split(',')[0]}</small>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

function FaqSection({title="Frequently Asked Questions",subtitle="Everything you need to know about destination travel, booking timelines, turnaround times, and packages."}:{title?:string;subtitle?:string}){
  const [openIdx,setOpenIdx]=useState<number|null>(0);

  return (
    <section className="section faq-section">
      <div className="section-head">
        <div>
          <Eyebrow>CLARITY & DETAILS</Eyebrow>
          <h2>{title}</h2>
        </div>
        <div className="section-aside">
          <p>{subtitle}</p>
          <a className="text-link" href="/booking">Have a unique question? Ask us <ArrowUpRight size={16}/></a>
        </div>
      </div>

      <div className="faq-accordion">
        {faqs.map((faq,i)=>{
          const isOpen=openIdx===i;
          return (
            <div key={i} className={`faq-row ${isOpen?'open':''}`}>
              <button
                type="button"
                className="faq-trigger"
                onClick={()=>setOpenIdx(isOpen?null:i)}
                aria-expanded={isOpen}
              >
                <span className="faq-tag">{faq.category}</span>
                <span className="faq-query">{faq.question}</span>
                <span className="faq-icon" aria-hidden="true">{isOpen?'−':'+'}</span>
              </button>
              {isOpen&&(
                <div className="faq-body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function PackageEstimator({onApply}:{onApply:(plan:{services:string[];budget:string;note:string})=>void}){
  const [days,setDays]=useState<'1'|'2'|'3'>('2');
  const [coverage,setCoverage]=useState<'both'|'film'|'photo'>('both');
  const [addons,setAddons]=useState<string[]>(['Aerial Drone Cinematography']);

  const toggleAddon=(id:string)=>{
    setAddons(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  };

  let minK=days==='1'?85:days==='2'?145:215;
  let maxK=days==='1'?120:days==='2'?195:285;

  if(coverage==='film'){
    minK=Math.round(minK*0.7);
    maxK=Math.round(maxK*0.7);
  }else if(coverage==='photo'){
    minK=Math.round(minK*0.6);
    maxK=Math.round(maxK*0.6);
  }

  let addK=0;
  if(addons.includes('Aerial Drone Cinematography'))addK+=15;
  if(addons.includes('Pre-wedding Sunset Session'))addK+=25;
  if(addons.includes('Same-day Teaser Highlight'))addK+=18;
  if(addons.includes('Fine-Art Italian Leather Album'))addK+=22;

  const totalMin=(minK+addK)*1000;
  const totalMax=(maxK+addK)*1000;

  const fmt=(n:number)=>'₹'+new Intl.NumberFormat('en-IN').format(n);
  const estRange=`${fmt(totalMin)} – ${fmt(totalMax)}`;

  const daysLabel=days==='1'?'1 Day Celebration':days==='2'?'2 Days (Pre-wedding + Wedding)':'3+ Days Grand Destination';
  const coverageLabel=coverage==='both'?'Photo & Film Duo':coverage==='film'?'Cinematic Film Only':'Fine-Art Photography Only';

  const apply=()=>{
    const s:string[]=[];
    if(coverage==='both'||coverage==='photo')s.push('Wedding stories');
    if(coverage==='both'||coverage==='film')s.push('Life, celebrated');
    if(addons.includes('Pre-wedding Sunset Session'))s.push('Portraits with presence');
    if(!s.length)s.push('Wedding stories');

    const note=`Custom Package Scope:\n• Duration: ${daysLabel}\n• Creative Team: ${coverageLabel}\n• Add-ons: ${addons.length?addons.join(', '):'None'}\n• Estimated Investment Range: ${estRange}`;

    onApply({
      services:s,
      budget:estRange,
      note
    });
  };

  return (
    <div className="package-estimator">
      <div className="estimator-head">
        <div>
          <span className="estimator-eyebrow">✦ INTERACTIVE PACKAGE ESTIMATOR</span>
          <h3>Design your celebration <em>scope</em></h3>
        </div>
        <div className="estimator-price-tag">
          <small>Estimated investment</small>
          <strong>{estRange}</strong>
        </div>
      </div>

      <div className="estimator-step">
        <label className="estimator-label">1. Select celebration duration</label>
        <div className="estimator-options">
          <button type="button" className={`est-opt ${days==='1'?'selected':''}`} onClick={()=>setDays('1')}>
            <strong>1 Day</strong>
            <small>Single-day ceremony</small>
          </button>
          <button type="button" className={`est-opt ${days==='2'?'selected':''}`} onClick={()=>setDays('2')}>
            <strong>2 Days</strong>
            <small>Weekend / Sangeet + Vows</small>
          </button>
          <button type="button" className={`est-opt ${days==='3'?'selected':''}`} onClick={()=>setDays('3')}>
            <strong>3+ Days</strong>
            <small>Grand destination</small>
          </button>
        </div>
      </div>

      <div className="estimator-step">
        <label className="estimator-label">2. Select creative coverage</label>
        <div className="estimator-options">
          <button type="button" className={`est-opt ${coverage==='both'?'selected':''}`} onClick={()=>setCoverage('both')}>
            <strong>Photo & Film Duo</strong>
            <small>Lead camera & film crew</small>
          </button>
          <button type="button" className={`est-opt ${coverage==='film'?'selected':''}`} onClick={()=>setCoverage('film')}>
            <strong>Cinematic Film Master</strong>
            <small>4K films & sound design</small>
          </button>
          <button type="button" className={`est-opt ${coverage==='photo'?'selected':''}`} onClick={()=>setCoverage('photo')}>
            <strong>Editorial Photography</strong>
            <small>Stills, portraits & details</small>
          </button>
        </div>
      </div>

      <div className="estimator-step">
        <label className="estimator-label">3. Signature bespoke add-ons</label>
        <div className="estimator-addons">
          {[
            {id:'Aerial Drone Cinematography',label:'Aerial Drone Cinematography',price:'+₹15,000'},
            {id:'Pre-wedding Sunset Session',label:'Pre-wedding Sunset Session',price:'+₹25,000'},
            {id:'Same-day Teaser Highlight',label:'Same-day Teaser Highlight',price:'+₹18,000'},
            {id:'Fine-Art Italian Leather Album',label:'Fine-Art Italian Leather Album',price:'+₹22,000'}
          ].map(item=>(
            <button
              type="button"
              key={item.id}
              className={`addon-btn ${addons.includes(item.id)?'selected':''}`}
              onClick={()=>toggleAddon(item.id)}
            >
              <span className="addon-check">{addons.includes(item.id)?'✓':'+'}</span>
              <span className="addon-title">{item.label}</span>
              <span className="addon-cost">{item.price}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="estimator-action-bar">
        <div>
          <span className="summary-label">Configured Scope:</span>
          <p className="summary-text">{daysLabel} · {coverageLabel} {addons.length>0?`· +${addons.length} Add-on${addons.length>1?'s':''}`:''}</p>
        </div>
        <button type="button" className="button gold" onClick={apply}>
          Apply scope to inquiry form <ArrowDown size={16}/>
        </button>
      </div>
    </div>
  );
}

function Booking({user,services,settings,onOpenDeposit}:{user:User;services:Item[];settings:typeof defaults;onOpenDeposit?:()=>void}){
  const [selected,setSelected]=useState<string[]>([]);
  const [budgetVal,setBudgetVal]=useState('');
  const [messageVal,setMessageVal]=useState('');
  const [status,setStatus]=useState('');
  const [busy,setBusy]=useState(false);
  const [receipt,setReceipt]=useState('');
  const [lastInquiry,setLastInquiry]=useState<any>(null);

  useEffect(()=>{
    const s=new URLSearchParams(location.search).get('service');
    if(s)setSelected([s]);
    else if(services.length)setSelected([services[0].title]);
    const mb=new URLSearchParams(location.search).get('moodboard');
    if(mb){
      try{
        const decoded=decodeURIComponent(mb);
        setMessageVal(prev=>prev?prev+'\n\n'+decoded:decoded);
      }catch(_){}
    }
  },[services]);

  const handleApplyEstimate=(plan:{services:string[];budget:string;note:string})=>{
    setSelected(plan.services);
    setBudgetVal(plan.budget);
    setMessageVal(prev=>prev?prev+'\n\n'+plan.note:plan.note);
    const formEl=document.getElementById('booking-inquiry-form');
    if(formEl)formEl.scrollIntoView({behavior:'smooth'});
  };

  async function submit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const data=new FormData(e.currentTarget);
    const payload={
      name:String(data.get('name')||''),
      contact:String(data.get('contact')||''),
      eventType:String(data.get('eventType')||''),
      date:String(data.get('date')||''),
      location:String(data.get('location')||''),
      services:selected,
      budget:String(data.get('budget')||''),
      message:String(data.get('message')||''),
      reference:String(data.get('reference')||''),
      consent:data.get('consent')==='on'
    };
    setBusy(true);
    setStatus('');
    try{
      const d=await api('bookings',payload);
      setReceipt(d.id);
      setLastInquiry(payload);
    }catch(e){
      setStatus((e as Error).message);
    }finally{
      setBusy(false);
    }
  }

  return (
    <section className="section inner-page booking-page">
      <div>
        <Eyebrow>LET’S CREATE SOMETHING MEANINGFUL</Eyebrow>
        <h1>Every great story<br/>starts with <em>hello.</em></h1>
        <p className="intro">Tell us a little about your occasion or creative idea. We’ll work out the possibilities together.</p>
        {onOpenDeposit&&(
          <div className="deposit-priority-card">
            <div className="deposit-priority-head">
              <span className="badge-exclusive">✦ INSTANT DATE HOLD</span>
              <h3>Lock your wedding date</h3>
            </div>
            <p>Ready to guarantee studio availability before quote review? Freeze your date on our master production calendar with a ₹25,000 token deposit (100% credited to package).</p>
            <button type="button" className="button gold" onClick={onOpenDeposit}>
              Hold Wedding Date (₹25,000) <Calendar size={15}/>
            </button>
          </div>
        )}
        <a href="/moodboard" className="moodboard-helper-card">
          <Palette size={18}/>
          <div>
            <strong>Curate Your Wedding Moodboard</strong>
            <small>Select lighting, color swatches & narrative tempo →</small>
          </div>
        </a>
        <PackageEstimator onApply={handleApplyEstimate}/>
        <ContactLinks settings={settings}/>
        <img className="booking-photo" src="/images/wedding-1.jpg" alt="Details from a wedding celebration"/>
        <p className="caption">Your inquiry starts a conversation. Dates and pricing are confirmed personally.</p>
      </div>
      <div>
        {receipt?<div className="success"><div className="success-icon"><Check size={32}/></div><h2>Your story<br/>starts <em>here.</em></h2><p>Your inquiry has been saved for the studio and forwarded to nirajpaul1991@gmail.com.</p><div className="receipt-badge"><span>Reference code</span><code>{receipt.slice(0,8).toUpperCase()}</code></div>{onOpenDeposit&&<div className="receipt-deposit-cta"><p>Want to freeze your wedding date on our master calendar right now?</p><button type="button" className="button gold" onClick={onOpenDeposit}>Lock Date Now with ₹25,000 Deposit <ArrowUpRight size={16}/></button></div>}<div className="receipt-actions">{user&&<Button href="/purchases">View your library <ArrowRight size={16}/></Button>}{settings.phone&&<a className="button outline" href={`https://wa.me/${settings.phone.replace(/\D/g,'')}?text=${encodeURIComponent('Hello Auré Studio, I just submitted booking inquiry #'+receipt.slice(0,8).toUpperCase())}`} target="_blank" rel="noopener noreferrer">Message on WhatsApp <ArrowUpRight size={16}/></a>}<a className="button outline" href={`mailto:${settings.email||'nirajpaul1991@gmail.com'}?subject=${encodeURIComponent('New Booking Inquiry #'+receipt.slice(0,8).toUpperCase()+' - '+(lastInquiry?.name||'Client'))}&body=${encodeURIComponent('Hello Auré Studio,\n\nI have submitted a new booking inquiry.\n\nReference: #'+receipt.slice(0,8).toUpperCase()+'\nClient Name: '+(lastInquiry?.name||'')+'\nContact: '+(lastInquiry?.contact||'')+'\nOccasion: '+(lastInquiry?.eventType||'')+'\nTarget Date: '+(lastInquiry?.date||'')+'\nLocation: '+(lastInquiry?.location||'')+'\nServices: '+((lastInquiry?.services||[]).join(', '))+'\nBudget: '+(lastInquiry?.budget||'Not specified')+'\n\nClient Vision / Message:\n'+(lastInquiry?.message||'None')+'\n\nThank you!')}`} target="_blank" rel="noopener noreferrer">Email nirajpaul1991@gmail.com <ArrowUpRight size={16}/></a></div></div>:
        <form id="booking-inquiry-form" className="booking-form" onSubmit={submit}>
          <h3>A little about your vision</h3>
          <div className="form-row">
            <label>Your name<input name="name" placeholder="How should we call you?" minLength={2} maxLength={100} required defaultValue={user?.displayName.includes('@')?'':user?.displayName||''}/></label>
            <label>Email or phone<input name="contact" placeholder="So we can reach you" required maxLength={200} defaultValue={user?.email||''}/></label>
          </div>
          <div className="form-row">
            <label>The occasion<select name="eventType" required defaultValue=""><option value="" disabled>Select your occasion</option>{['Wedding','Pre-wedding','Engagement','Birthday','Family event','Portrait session','AI editing project','Other'].map(t=><option key={t}>{t}</option>)}</select></label>
            <label>Event date / target date<input type="date" name="date" required min={new Date().toISOString().slice(0,10)}/></label>
          </div>
          <label>Location<input name="location" placeholder="City, venue, or remote project" required minLength={2} maxLength={200}/></label>
          <fieldset>
            <legend>What can we create together?</legend>
            <div className="service-options">
              {[...new Set([...services.map(s=>s.title),'AI video editing',...selected])].map(s=><label key={s}><input type="checkbox" checked={selected.includes(s)} onChange={e=>setSelected(e.target.checked?[...selected,s]:selected.filter(x=>x!==s))}/><span>{s}</span></label>)}
            </div>
          </fieldset>
          <label>Budget <span className="optional">optional</span>
            <input name="budget" placeholder="Your approximate budget in INR" maxLength={80} value={budgetVal} onChange={e=>setBudgetVal(e.target.value)}/>
          </label>
          <label>Tell us your story
            <textarea name="message" placeholder="The mood, the moments, the idea you have in mind…" rows={5} maxLength={4000} value={messageVal} onChange={e=>setMessageVal(e.target.value)}/>
          </label>
          <label>Reference link <span className="optional">optional</span><input name="reference" type="url" placeholder="https://" maxLength={2000}/></label>
          <label className="consent"><input type="checkbox" name="consent" required/><span>I agree to share these details with the studio for this inquiry. <a href="/privacy">Privacy notice</a></span></label>
          {status&&<p className="notice" role="alert">{status}</p>}
          <button className="button gold wide" disabled={busy||!selected.length}>{busy?<LoaderCircle className="spin" size={17}/>:<>Send your inquiry <ArrowUpRight size={18}/></>}</button>
          {user?<p className="caption">Signed in as {user.displayName}. Your inquiry will sync with your library.</p>:<p className="caption">No sign-in required. Have an account? <a href="/signin-with-chatgpt?return_to=/booking">Sign in to sync with your library</a>.</p>}
        </form>}
      </div>
    </section>
  );
}
function Account({user}:{user:User}){const [data,setData]=useState<any>(null),[error,setError]=useState('');useEffect(()=>{if(user)api('account').then(setData).catch(e=>setError(e.message));},[]);return <section className="section inner-page"><Eyebrow>YOUR PERSONAL COLLECTION</Eyebrow><h1>Good stories.<br/><em>Always with you.</em></h1>{!user?<div className="empty"><ShoppingBag size={30}/><h3>Your films have a home here.</h3><p>Sign in to view your purchases and booking inquiries.</p><a target="_top" className="button gold" href="/signin-with-chatgpt?return_to=/purchases">Sign in to your library <ArrowRight size={17}/></a></div>:<><p className="intro">Welcome, {user.displayName}. <a className="subtle-link" target="_top" href="/signout-with-chatgpt?return_to=/">Sign out</a></p>{error&&<p className="notice">{error}</p>}{!data&&!error&&<p>Loading your library…</p>}{data&&<><h3 className="account-heading">My purchases <span>{data.purchases.length}</span></h3>{data.purchases.length?<div className="film-grid">{data.purchases.map((p:any)=><a className="purchase-card" href={'/films/'+p.video_id} key={p.video_id}>{p.image&&<img src={p.image} alt={p.title}/>}<h3>{p.title}</h3><p>{p.status==='refunded'?'Refunded · Access withdrawn':p.available?'Watch your film →':'Film currently unavailable'}</p><small>{money(p.amount)} · {new Date(p.created_at).toLocaleDateString()}</small></a>)}</div>:<Empty title="Your collection is waiting for its first story." text="Purchased films will appear here once payment has been verified."/>}<h3 className="account-heading">Your inquiries</h3>{data.inquiries.length?<div className="data-table">{data.inquiries.map((i:any)=><div key={i.id}><span>Inquiry #{i.id.slice(0,8)}</span><time>{new Date(i.created_at).toLocaleDateString()}</time><span className="status-chip">{i.status}</span></div>)}</div>:<p className="muted">No inquiries yet. Let’s create something together.</p>}</>}</>}</section>;}
function Credits(){const [credits,setCredits]=useState<any>(null);useEffect(()=>{Promise.all(['/images/credits.json','/images/collection-credits.json'].map(url=>fetch(url).then(r=>r.json()))).then(groups=>setCredits(groups.flat()));},[]);return <section className="section inner-page prose"><Eyebrow>WITH CREDIT TO THE CREATORS</Eyebrow><h1>A shared <em>inspiration.</em></h1><p>This showcase features authentic photography and cinematic storytelling by Auré Studio alongside curated creative references licensed under the Unsplash License. Films are official embeds of the supplied Heartwave references.</p><div className="credit-list">{Array.isArray(credits)?credits.map((c:any)=><article key={c.file}><img src={'/images/'+c.file} alt={c.description} loading="lazy"/><div><h3>{c.photographer}</h3><p>{c.description}</p><a className="text-link" href={c.source} target="_blank" rel="noreferrer">Original photograph <ArrowUpRight size={14}/></a></div></article>):'Loading image credits…'}</div><a className="text-link" href="https://unsplash.com/license" target="_blank" rel="noreferrer">Unsplash License <ArrowUpRight size={16}/></a></section>;}
const blankItem={kind:'video',title:'',category:'Wedding Films',description:'',image:'',access:'public',price:0,youtube:'',originalKey:'',previewKey:'',previewType:'blurred',previewSeconds:20,duration:'',rightsConfirmed:false,inclusions:'',enabled:true,published:false};
function Admin({user,allowed,settings}:{user:User;allowed:boolean;settings:typeof defaults}){const [tab,setTab]=useState('Content'),[data,setData]=useState<any>(null),[error,setError]=useState(''),[editing,setEditing]=useState<any>(null),[busy,setBusy]=useState(false),[site,setSite]=useState(settings);async function reload(){try{setData(await api('admin'));}catch(e){setError((e as Error).message);}}useEffect(()=>{if(allowed)reload();},[]);async function action(path:string,body:unknown){setBusy(true);setError('');try{await api('admin/'+path,body);await reload();return true;}catch(e){setError((e as Error).message);return false;}finally{setBusy(false);}}async function uploadFile(file:File,kind:string){setBusy(true);setError('');try{const max=kind==='image'?10:90;if(file.size>max*1024*1024)throw new Error(`Maximum file size is ${max} MB`);const r=await fetch('/api/admin/upload?kind='+kind,{method:'POST',headers:{'Content-Type':file.type},body:file});const d:any=await r.json();if(!r.ok)throw new Error(d.error);setEditing((e:any)=>({...e,[kind==='image'?'image':kind==='original'?'originalKey':'previewKey']:kind==='image'?d.url:d.key}));}catch(e){setError((e as Error).message);}finally{setBusy(false);}}
 if(!allowed)return <section className="section inner-page"><Eyebrow>THE STUDIO DESK</Eyebrow><h1>A space for<br/><em>the makers.</em></h1>{!user?<a className="button gold" target="_top" href="/signin-with-chatgpt?return_to=/admin">Sign in to continue <ArrowRight size={17}/></a>:<div className="notice"><h3>Administrator setup required</h3><p>This account has no administrator access. The site owner must add the following account ID to the server’s ADMIN_USER_IDS setting.</p><code>{user.userId}</code><p>All admin APIs remain protected until an administrator is configured.</p></div>}</section>;
 return <section className="section inner-page admin-page"><div className="section-head"><div><Eyebrow>THE STUDIO DESK</Eyebrow><h1>Your creative <em>space.</em></h1></div><button className="button outline" onClick={reload}><RefreshCw size={15}/>Refresh</button></div><div className="admin-tabs">{['Content','Inquiries','Purchases','Customers','Processing','Settings'].map(t=><button className={tab===t?'selected':''} onClick={()=>setTab(t)} key={t}>{t}</button>)}</div>{error&&<p className="notice" role="alert">{error}</p>}{data&&<><div className="admin-readiness"><span className={data.configured.payments?'ready':''}>Payments: {data.configured.payments?data.configured.mode:'not configured'}</span><span className={data.configured.playback?'ready':''}>Protected playback: {data.configured.playback?'configured':'not configured'}</span><span className={data.configured.processor?'ready':''}>Preview processor: {data.configured.processor?'configured':'not configured'}</span></div>
 {tab==='Content'&&<><div className="admin-content-head"><p>Publish your own authorized work. Reference content is replaced as you add images and services.</p><Button onClick={()=>{setEditing({...blankItem});setError('');}}><Plus size={17}/>Add content</Button></div><div className="admin-grid">{data.content.map((i:any)=><article className="admin-content-card" key={i.id}>{i.image&&<img src={i.image} alt={i.title}/>}<span className="overline">{i.kind} · {i.published?'Published':'Draft / archived'}</span><h3>{i.title}</h3><p>{i.category}</p><div><button onClick={()=>setEditing(i)}>Edit <ArrowUpRight size={14}/></button>{i.published&&<button disabled={busy} onClick={()=>action('archive',{id:i.id})}>Unpublish</button>}{i.originalKey&&<button disabled={busy} onClick={()=>action('process',{id:i.id})}>Generate preview</button>}</div></article>)}</div>{!data.content.length&&<Empty title="Make the collection your own." text="Add photographs, films, categories, and service packages. New content starts as a draft."/>}</>}
 {tab==='Inquiries'&&<div className="inquiries">{!data.inquiries.length&&<Empty title="A new story is on its way." text="Booking inquiries will appear here."/>}{data.inquiries.map((i:any)=><article key={i.id}><div className="inquiry-heading"><h3>{i.data.name}</h3><select aria-label={'Status for '+i.data.name} value={i.status} onChange={e=>action('inquiry',{id:i.id,status:e.target.value})}>{['new','contacted','booked','closed'].map(s=><option key={s}>{s}</option>)}</select></div><p>{i.data.contact}</p><p>{i.data.eventType} · {i.data.date} · {i.data.location}</p><p>{i.data.services.join(' · ')}</p><p>{i.data.message}</p>{i.data.budget&&<p>Budget: {i.data.budget}</p>}{i.data.reference&&<a className="text-link" href={i.data.reference} rel="noreferrer" target="_blank">View reference <ArrowUpRight size={15}/></a>}<small>Received {new Date(i.created_at).toLocaleString()}</small></article>)}</div>}
 {tab==='Purchases'&&<><div className="data-table">{data.orders.map((o:any)=><div key={o.id}><code>{o.id}</code><span>{money(o.amount)}</span><span>{o.status}</span></div>)}</div>{!data.orders.length&&<Empty title="Your first purchase starts here." text="Only verified captured payments grant playback access."/>}<form className="reconcile" onSubmit={async e=>{e.preventDefault();const f=new FormData(e.currentTarget);await action('reconcile',{paymentId:f.get('paymentId')});}}><label>Reconcile a Razorpay payment<input name="paymentId" placeholder="pay_…" required/></label><button className="button outline" disabled={busy}>Check provider status</button></form></>}
 {tab==='Customers'&&<div className="data-table">{data.customers.map((c:any)=><div key={c.id}><span>{c.email}</span><code>{c.id}</code><span>{new Date(c.created_at).toLocaleDateString()}</span></div>)}{!data.customers.length&&<Empty title="Your customer list is empty." text="Customers appear after an inquiry or purchase action."/>}</div>}
 {tab==='Processing'&&<><p className="muted">Preview generation runs in the external FFmpeg processor. Upload an original, save the film, then select Generate preview. Failed jobs and jobs stalled for over an hour can be retried.</p><div className="data-table">{data.jobs.map((j:any)=><div key={j.id}><code>{j.video_id}</code><span>{j.status}{j.error&&<small>{j.error}</small>}</span><button disabled={busy} onClick={()=>action('retry',{id:j.id})}>Retry</button></div>)}</div>{!data.jobs.length&&<Empty title="No processing jobs yet." text="Ready previews can also be uploaded directly as separate MP4 files."/>}</>}
 {tab==='Settings'&&<form className="settings-form" onSubmit={async e=>{e.preventDefault();if(await action('settings',site))setError('Settings saved. Reload the site to see your changes.');}}><h3>Studio identity & contact</h3>{(['name','logoUrl','tagline','email','phone','phoneSecondary','instagram','youtube','heroImage'] as const).map(k=><label key={k}>{({name:'Studio name',logoUrl:'Logo URL (optional)',tagline:'Studio tagline',email:'Contact email',phone:'Phone & WhatsApp 1',phoneSecondary:'Phone & WhatsApp 2',instagram:'Instagram URL',youtube:'YouTube URL',heroImage:'Hero image URL'} as const)[k]}<input value={site[k]} onChange={e=>setSite({...site,[k]:e.target.value})} required={['name','heroImage'].includes(k)}/></label>)}<h3>Homepage sections</h3>{(['showAI','showStore','showReferences'] as const).map(k=><label className="consent" key={k}><input type="checkbox" checked={site[k]} onChange={e=>setSite({...site,[k]:e.target.checked})}/>{({showAI:'Show AI cinematics',showStore:'Show premium store',showReferences:'Show credited reference films'} as const)[k]}</label>)}<Button disabled={busy}>Save studio settings <Check size={17}/></Button></form>}
 </>}
 {editing&&<Dialog label="Edit studio content" onClose={()=>setEditing(null)}><form className="content-form" onSubmit={async e=>{e.preventDefault();if(await action('content',editing))setEditing(null);}}><Eyebrow>YOUR COLLECTION</Eyebrow><h2>{editing.id?'Edit':'Add'} <em>content.</em></h2>{error&&<p className="notice" role="alert">{error}</p>}<div className="form-row"><label>Content type<select value={editing.kind} onChange={e=>setEditing({...editing,kind:e.target.value})}>{['video','image','service','category'].map(t=><option key={t}>{t}</option>)}</select></label><label>Category<input value={editing.category} list="categories" onChange={e=>setEditing({...editing,category:e.target.value})}/><datalist id="categories">{data?.content.filter((x:any)=>x.kind==='category').map((x:any)=><option key={x.id} value={x.title}/>)}</datalist></label></div><label>Title<input required maxLength={150} value={editing.title} onChange={e=>setEditing({...editing,title:e.target.value})}/></label><label>Description<textarea rows={3} maxLength={2000} value={editing.description} onChange={e=>setEditing({...editing,description:e.target.value})}/></label><label>Cover / photograph URL<input placeholder="https://… or upload below" value={editing.image} onChange={e=>setEditing({...editing,image:e.target.value})}/></label><label className="upload"><Upload size={17}/> Upload image (JPEG, PNG, WebP · 10 MB)<input type="file" accept="image/jpeg,image/png,image/webp" disabled={busy} onChange={e=>{if(e.target.files?.[0])uploadFile(e.target.files[0],'image');}}/></label>
 {editing.kind==='video'&&<><div className="form-row"><label>Access<select value={editing.access} onChange={e=>setEditing({...editing,access:e.target.value})}>{['public','preview','premium','private'].map(t=><option key={t}>{t}</option>)}</select></label><label>Duration label<input placeholder="03:24" value={editing.duration} onChange={e=>setEditing({...editing,duration:e.target.value})}/></label></div><label>Official YouTube video ID (public only)<input placeholder="11-character video ID" value={editing.youtube} onChange={e=>setEditing({...editing,youtube:e.target.value})}/></label><label className="upload"><Lock size={17}/> Original MP4 · private storage · 90 MB<input type="file" accept="video/mp4" disabled={busy} onChange={e=>{if(e.target.files?.[0])uploadFile(e.target.files[0],'original');}}/>{editing.originalKey&&<small>Original uploaded ✓</small>}</label><label className="upload"><Film size={17}/> Separate preview MP4 · 90 MB<input type="file" accept="video/mp4" disabled={busy} onChange={e=>{if(e.target.files?.[0])uploadFile(e.target.files[0],'preview');}}/>{editing.previewKey&&<small>Preview uploaded ✓</small>}</label><p className="caption">Upload a genuinely blurred or reduced-resolution preview file. Or save the draft, then run Generate preview with the FFmpeg processor.</p><div className="form-row"><label>Preview treatment<select value={editing.previewType} onChange={e=>setEditing({...editing,previewType:e.target.value})}>{['blurred','low-resolution','clear'].map(t=><option key={t}>{t}</option>)}</select></label><label>Preview length (seconds)<input type="number" min={5} max={60} value={editing.previewSeconds} onChange={e=>setEditing({...editing,previewSeconds:Number(e.target.value)})}/></label></div></>}
 {['video','service'].includes(editing.kind)&&<label>Price in INR {editing.kind==='service'?'(0 = custom quote)':''}<input type="number" min={0} step="0.01" value={editing.price/100} onChange={e=>setEditing({...editing,price:Math.round(Number(e.target.value)*100)})}/></label>}{editing.kind==='service'&&<><label>Package inclusions (one per line)<textarea rows={4} value={editing.inclusions} onChange={e=>setEditing({...editing,inclusions:e.target.value})}/></label><label className="consent"><input type="checkbox" checked={editing.enabled} onChange={e=>setEditing({...editing,enabled:e.target.checked})}/>Service currently available</label></>}
 <label className="consent"><input type="checkbox" checked={editing.rightsConfirmed} onChange={e=>setEditing({...editing,rightsConfirmed:e.target.checked})}/>I own or have permission to publish this content.</label><label className="consent"><input type="checkbox" checked={editing.published} onChange={e=>setEditing({...editing,published:e.target.checked})}/>Publish this content</label><Button disabled={busy}>{busy?'Saving / uploading…':'Save content'} <Check size={17}/></Button></form></Dialog>}
 </section>;
}

function BeforeAfterSlider(){
  const [activeIdx,setActiveIdx]=useState(0);
  const [sliderPos,setSliderPos]=useState(50);
  const containerRef=useRef<HTMLDivElement>(null);
  const isDraggingRef=useRef(false);
  const scene=colorGradingScenes[activeIdx]||colorGradingScenes[0];

  const updatePosition=(clientX:number)=>{
    if(!containerRef.current)return;
    const rect=containerRef.current.getBoundingClientRect();
    const x=Math.max(0,Math.min(clientX-rect.left,rect.width));
    const percent=Math.round((x/rect.width)*100);
    setSliderPos(percent);
  };

  const handlePointerDown=(e:React.PointerEvent)=>{
    isDraggingRef.current=true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    updatePosition(e.clientX);
  };

  const handlePointerMove=(e:React.PointerEvent)=>{
    if(isDraggingRef.current){
      updatePosition(e.clientX);
    }
  };

  const handlePointerUp=(e:React.PointerEvent)=>{
    isDraggingRef.current=false;
    try{(e.target as HTMLElement).releasePointerCapture?.(e.pointerId);}catch(_){}
  };

  return (
    <section className="section color-grading-section">
      <div className="section-head">
        <div>
          <Eyebrow>AURÉ COLOR SCIENCE · 4K CINEMA MASTER</Eyebrow>
          <h2>Before & After:<br/><em>From Camera RAW to Cinema.</em></h2>
        </div>
        <div className="section-aside">
          <p>Drag the split-screen slider to reveal our signature color science—transforming flat 10-bit sensor log footage into our proprietary Kodak-inspired film master.</p>
        </div>
      </div>

      <div className="grading-scene-tabs" role="tablist" aria-label="Color grading scene selector">
        {colorGradingScenes.map((s,idx)=>(
          <button
            key={s.id}
            type="button"
            role="tab"
            aria-selected={idx===activeIdx}
            className={`grading-scene-btn ${idx===activeIdx?'active':''}`}
            onClick={()=>setActiveIdx(idx)}
          >
            <strong>{s.title}</strong>
            <small>{s.location}</small>
          </button>
        ))}
      </div>

      <div
        className="grading-slider-container"
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Right / Base: Graded Cinema Master */}
        <img
          src={scene.image}
          alt={scene.title+' - Graded Cinema Master'}
          className="grading-img grading-after"
          draggable={false}
          loading="lazy"
        />
        <div className="grading-badge right">
          <span className="badge-dot gold"/>
          {scene.gradeLabel}
        </div>

        {/* Left / Clipped: Flat 10-Bit Sensor RAW */}
        <div
          className="grading-before-wrap"
          style={{clipPath:`polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`}}
        >
          <img
            src={scene.image}
            alt={scene.title+' - Flat Sensor Log RAW'}
            className="grading-img grading-before"
            draggable={false}
            loading="lazy"
          />
          <div className="grading-badge left">
            <span className="badge-dot gray"/>
            {scene.logLabel}
          </div>
        </div>

        {/* Divider bar & Handle */}
        <div className="grading-divider" style={{left:`${sliderPos}%`}}>
          <div className="grading-handle" aria-hidden="true">
            <span className="handle-chevron">◀</span>
            <span className="handle-divider-line"/>
            <span className="handle-chevron">▶</span>
          </div>
        </div>

        {/* Accessibility range slider */}
        <input
          type="range"
          min="0"
          max="100"
          value={sliderPos}
          onChange={e=>setSliderPos(Number(e.target.value))}
          aria-label="Color grade comparison slider"
          className="grading-range-input"
        />
      </div>

      <div className="grading-scene-info">
        <div>
          <span className="overline">{scene.location} · 4K DCI</span>
          <h3>{scene.title}</h3>
          <p>{scene.description}</p>
        </div>
        <div className="grading-highlights-block">
          <span className="grading-notes-label">Color Science Highlights:</span>
          <div className="grading-tags">
            {scene.highlights.map(h=>(
              <span key={h} className="grading-tag">✦ {h}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MoodboardCreator({user,settings}:{user:User;settings:typeof defaults}){
  const [lighting,setLighting]=useState(moodboardData.lighting[0].id);
  const [pacing,setPacing]=useState(moodboardData.pacing[0].id);
  const [texture,setTexture]=useState(moodboardData.texture[0].id);
  const [focus,setFocus]=useState(moodboardData.focus[0].id);
  const [copied,setCopied]=useState(false);

  const curLighting=moodboardData.lighting.find(x=>x.id===lighting)||moodboardData.lighting[0];
  const curPacing=moodboardData.pacing.find(x=>x.id===pacing)||moodboardData.pacing[0];
  const curTexture=moodboardData.texture.find(x=>x.id===texture)||moodboardData.texture[0];
  const curFocus=moodboardData.focus.find(x=>x.id===focus)||moodboardData.focus[0];

  const paletteMap:Record<string,{hex:string;name:string}[]>={
    'l-golden':[
      {hex:'#e8c88c',name:'Amber Gold'},
      {hex:'#a5763f',name:'Burnt Ochre'},
      {hex:'#3d2b1f',name:'Warm Umber'},
      {hex:'#f4ebd0',name:'Champagne Sand'}
    ],
    'l-twilight':[
      {hex:'#cfb58a',name:'Tungsten Glow'},
      {hex:'#1e2838',name:'Indigo Twilight'},
      {hex:'#0c131d',name:'Midnight Slate'},
      {hex:'#e0dfdb',name:'Pale Silver'}
    ],
    'l-flora':[
      {hex:'#bfa054',name:'Antique Brass'},
      {hex:'#2d4739',name:'Palace Emerald'},
      {hex:'#8a2b2b',name:'Heritage Crimson'},
      {hex:'#f5f0e6',name:'Ivory Silk'}
    ],
    'l-monsoon':[
      {hex:'#9ea7a4',name:'Mist Gray'},
      {hex:'#343f3d',name:'Wet Moss'},
      {hex:'#1a2221',name:'Deep Basalt'},
      {hex:'#e2e7e5',name:'Raindrop Pearl'}
    ]
  };

  const imageMap:Record<string,string>={
    'l-golden':'/images/new-01.webp',
    'l-twilight':'/images/new-10.webp',
    'l-flora':'/images/new-08.webp',
    'l-monsoon':'/images/new-06.webp'
  };

  const currentPalette=paletteMap[lighting]||paletteMap['l-golden'];
  const currentImage=imageMap[lighting]||'/images/new-01.webp';

  const dossierText=`✦ AURÉ STUDIO WEDDING MOODBOARD DOSSIER
Aesthetic Archetype: ${curLighting.title} · ${curPacing.title}
• Atmosphere & Light: ${curLighting.title} (${curLighting.desc})
• Narrative Pacing: ${curPacing.title} (${curPacing.desc})
• Visual Texture: ${curTexture.title} (${curTexture.desc})
• Emotional Focus: ${curFocus.title} (${curFocus.desc})
• Color Palette: ${currentPalette.map(p=>`${p.name} (${p.hex})`).join(', ')}`;

  const copyDossier=async()=>{
    try{
      await navigator.clipboard.writeText(dossierText);
      setCopied(true);
      setTimeout(()=>setCopied(false),3000);
    }catch(_){}
  };

  const bookingUrl=`/booking?service=Wedding%20stories&moodboard=${encodeURIComponent(dossierText)}`;

  return (
    <section className="section inner-page moodboard-page">
      <div className="section-head">
        <div>
          <Eyebrow>INTERACTIVE CREATIVE STUDIO</Eyebrow>
          <h1>Wedding Moodboard<br/><em>Studio & Dossier.</em></h1>
        </div>
        <div className="section-aside">
          <p>Curate your celebration’s visual language. Select lighting, rhythm, film texture, and focal feeling to build an aesthetic dossier for our creative directors.</p>
        </div>
      </div>

      <div className="moodboard-grid">
        {/* Controls Column */}
        <div className="moodboard-controls">
          {/* 1. Lighting & Atmosphere */}
          <div className="mb-control-group">
            <div className="mb-group-head">
              <span className="mb-step-num">01</span>
              <div>
                <h3>Lighting & Atmosphere</h3>
                <p>The luminous environment of your celebration</p>
              </div>
            </div>
            <div className="mb-options-grid">
              {moodboardData.lighting.map(item=>(
                <button
                  type="button"
                  key={item.id}
                  className={`mb-card ${lighting===item.id?'selected':''}`}
                  onClick={()=>setLighting(item.id)}
                >
                  <div className="mb-card-header">
                    <span className="mb-card-title">{item.title}</span>
                    <span className="mb-card-tag">{item.tag}</span>
                  </div>
                  <p className="mb-card-desc">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Narrative Pacing */}
          <div className="mb-control-group">
            <div className="mb-group-head">
              <span className="mb-step-num">02</span>
              <div>
                <h3>Narrative Pacing</h3>
                <p>The musical heartbeat and tempo of your film</p>
              </div>
            </div>
            <div className="mb-options-grid">
              {moodboardData.pacing.map(item=>(
                <button
                  type="button"
                  key={item.id}
                  className={`mb-card ${pacing===item.id?'selected':''}`}
                  onClick={()=>setPacing(item.id)}
                >
                  <div className="mb-card-header">
                    <span className="mb-card-title">{item.title}</span>
                    <span className="mb-card-tag">{item.tag}</span>
                  </div>
                  <p className="mb-card-desc">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Visual Texture */}
          <div className="mb-control-group">
            <div className="mb-group-head">
              <span className="mb-step-num">03</span>
              <div>
                <h3>Visual Texture</h3>
                <p>The tactile finish, grain, and sensor medium</p>
              </div>
            </div>
            <div className="mb-options-grid">
              {moodboardData.texture.map(item=>(
                <button
                  type="button"
                  key={item.id}
                  className={`mb-card ${texture===item.id?'selected':''}`}
                  onClick={()=>setTexture(item.id)}
                >
                  <div className="mb-card-header">
                    <span className="mb-card-title">{item.title}</span>
                    <span className="mb-card-tag">{item.tag}</span>
                  </div>
                  <p className="mb-card-desc">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {/* 4. Emotional Focus */}
          <div className="mb-control-group">
            <div className="mb-group-head">
              <span className="mb-step-num">04</span>
              <div>
                <h3>Emotional Focus</h3>
                <p>The quiet moments our cameras will prioritize</p>
              </div>
            </div>
            <div className="mb-options-grid">
              {moodboardData.focus.map(item=>(
                <button
                  type="button"
                  key={item.id}
                  className={`mb-card ${focus===item.id?'selected':''}`}
                  onClick={()=>setFocus(item.id)}
                >
                  <div className="mb-card-header">
                    <span className="mb-card-title">{item.title}</span>
                    <span className="mb-card-tag">{item.tag}</span>
                  </div>
                  <p className="mb-card-desc">{item.desc}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Canvas & Dossier */}
        <div className="moodboard-preview-column">
          <div className="moodboard-canvas">
            <div className="canvas-header">
              <span className="overline">BESPOKE AESTHETIC DOSSIER</span>
              <h2>{curLighting.title.split(' ')[0]} <em>& {curPacing.title.split(' ')[0]}</em></h2>
              <p className="canvas-subtitle">{curTexture.tag} · {curFocus.tag}</p>
            </div>

            <div className="canvas-media">
              <img src={currentImage} alt="Moodboard aesthetic reference" loading="lazy"/>
              <div className="canvas-media-overlay">
                <span className="canvas-badge">AURÉ CURATED MOOD</span>
                <span className="canvas-tagline">{curLighting.tag}</span>
              </div>
            </div>

            <div className="canvas-palette">
              <span className="palette-label">Film Color Science & Harmonized Swatches:</span>
              <div className="swatches-row">
                {currentPalette.map(p=>(
                  <div key={p.hex} className="swatch-item">
                    <span className="swatch-box" style={{backgroundColor:p.hex}}/>
                    <small>{p.name}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="canvas-treatment">
              <span className="treatment-label">Creative Director’s Treatment Note:</span>
              <p>
                A visual tapestry steeped in {curLighting.desc.toLowerCase()}. Paced with {curPacing.desc.toLowerCase()}, textured through {curTexture.desc.toLowerCase()}, and centered upon {curFocus.desc.toLowerCase()}.
              </p>
            </div>

            <div className="canvas-actions">
              <a href={bookingUrl} className="button gold wide">
                Apply moodboard to booking inquiry <ArrowRight size={16}/>
              </a>
              <button type="button" className="button outline wide" onClick={copyDossier}>
                {copied?<><Check size={16}/> Copied dossier to clipboard!</>:<><Copy size={16}/> Copy aesthetic dossier text</>}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientProofingPortal({onOpenLightbox}:{onOpenLightbox:(item:Item)=>void}){
  const [passcode,setPasscode]=useState('');
  const [gallery,setGallery]=useState<ProofingGallery|null>(null);
  const [error,setError]=useState('');
  const [selectedIds,setSelectedIds]=useState<string[]>([]);
  const [category,setCategory]=useState<string>('All');
  const [isSubmitOpen,setIsSubmitOpen]=useState(false);
  const [submitBusy,setSubmitBusy]=useState(false);
  const [confirmation,setConfirmation]=useState<{code:string;count:number}|null>(null);

  // Form states
  const [clientName,setClientName]=useState('');
  const [clientContact,setClientContact]=useState('');
  const [shippingAddress,setShippingAddress]=useState('');
  const [notes,setNotes]=useState('');

  const unlockGallery=(code:string)=>{
    const clean=code.trim().toUpperCase();
    const g=proofingGalleries[clean];
    if(g){
      setGallery(g);
      setPasscode(clean);
      setError('');
      setSelectedIds(g.photos.slice(0,3).map(p=>p.id));
    }else{
      setError('Invalid client passcode. Please check your gallery invitation or try a demo gallery below.');
    }
  };

  const toggleSelect=(id:string)=>{
    if(!gallery)return;
    if(selectedIds.includes(id)){
      setSelectedIds(selectedIds.filter(x=>x!==id));
    }else{
      if(selectedIds.length>=gallery.maxAlbumSelections){
        alert(`You have reached the maximum album limit of ${gallery.maxAlbumSelections} photographs.`);
        return;
      }
      setSelectedIds([...selectedIds,id]);
    }
  };

  const handleDownloadList=()=>{
    if(!gallery)return;
    const text=`AURÉ STUDIO - ALBUM PROOFING SELECTION LIST\nCouple: ${gallery.couple}\nLocation: ${gallery.location}\nDate: ${gallery.eventDate}\nSelected Photos: ${selectedIds.length} / ${gallery.maxAlbumSelections}\n\nSelected Photo IDs:\n${selectedIds.join('\n')}\n\nGenerated on: ${new Date().toLocaleString()}`;
    const blob=new Blob([text],{type:'text/plain;charset=utf-8'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=`Aure-Album-Selections-${gallery.passcode}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const submitSelections=async(e:FormEvent)=>{
    e.preventDefault();
    if(!gallery||!selectedIds.length)return;
    setSubmitBusy(true);
    try{
      const d=await api('album-proofing',{
        passcode:gallery.passcode,
        couple:gallery.couple,
        selections:selectedIds,
        clientName,
        clientContact,
        shippingAddress,
        notes
      });
      setConfirmation({code:d.confirmationCode,count:d.selectionsCount});
    }catch(err){
      alert((err as Error).message);
    }finally{
      setSubmitBusy(false);
    }
  };

  if(!gallery){
    return (
      <section className="section inner-page proofing-page">
        <div className="proofing-gate-card">
          <div className="proofing-lock-icon">
            <Lock size={32}/>
          </div>
          <Eyebrow>AURÉ PRIVATE CLIENT SUITE</Eyebrow>
          <h1>Client Album<br/><em>Proofing Portal.</em></h1>
          <p className="intro">
            Welcome to your private album curation suite. Enter your gallery passcode from your delivery invitation to select your heirloom album photographs.
          </p>

          <form className="proofing-gate-form" onSubmit={e=>{e.preventDefault();unlockGallery(passcode);}}>
            <div className="gate-input-wrap">
              <input
                type="text"
                placeholder="ENTER GALLERY PASSCODE (e.g. RHEA2024)"
                value={passcode}
                onChange={e=>setPasscode(e.target.value)}
                required
                className="gate-input"
              />
              <button type="submit" className="button gold">
                Access Gallery <ArrowRight size={16}/>
              </button>
            </div>
            {error&&<p className="notice" role="alert">{error}</p>}
          </form>

          <div className="proofing-demo-shortcuts">
            <span>Instant Demo Passcodes:</span>
            <div className="demo-chips">
              <button type="button" onClick={()=>unlockGallery('RHEA2024')}>Rhea & Rohan (RHEA2024)</button>
              <button type="button" onClick={()=>unlockGallery('TANYA2024')}>Tanya & Kabir (TANYA2024)</button>
              <button type="button" onClick={()=>unlockGallery('DEMO2025')}>Demo Gallery (DEMO2025)</button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const allPhotos=gallery.photos;
  const categories=['All',...new Set(allPhotos.map(p=>p.category)),'Favorites'];
  const filteredPhotos=category==='All'
    ? allPhotos
    : category==='Favorites'
    ? allPhotos.filter(p=>selectedIds.includes(p.id))
    : allPhotos.filter(p=>p.category===category);

  return (
    <section className="section inner-page proofing-page">
      {/* Gallery Header */}
      <div className="proofing-hero">
        <img src={gallery.coverImage} alt={gallery.couple} className="proofing-hero-bg"/>
        <div className="proofing-hero-overlay">
          <div className="proofing-hero-content">
            <Eyebrow>PRIVATE HEIRLOOM ALBUM PROOFING</Eyebrow>
            <h1>{gallery.couple}</h1>
            <p>{gallery.location} · {gallery.eventDate}</p>
            <div className="proofing-hero-meta">
              <span>Passcode: <code>{gallery.passcode}</code></span>
              <span>Total Photographs: <strong>{gallery.photos.length} frames</strong></span>
              <button type="button" className="subtle-link" onClick={()=>setGallery(null)}>Change Gallery</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Selection & Filter Bar */}
      <div className="proofing-sticky-bar">
        <div className="proofing-progress-wrap">
          <div className="progress-labels">
            <span>Album Selection Progress:</span>
            <strong>{selectedIds.length} / {gallery.maxAlbumSelections} photos chosen</strong>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{width:`${Math.min(100,(selectedIds.length/gallery.maxAlbumSelections)*100)}%`}}
            />
          </div>
        </div>

        <div className="proofing-bar-actions">
          <div className="proofing-filters">
            {categories.map(c=>(
              <button
                key={c}
                type="button"
                className={`p-filter-btn ${category===c?'active':''}`}
                onClick={()=>setCategory(c)}
              >
                {c==='Favorites'?`♥ Favorites (${selectedIds.length})`:c}
              </button>
            ))}
          </div>

          <div className="proofing-submit-buttons">
            <button type="button" className="button outline" onClick={handleDownloadList} disabled={!selectedIds.length}>
              <Download size={14}/> Download ID List
            </button>
            <button type="button" className="button gold" onClick={()=>setIsSubmitOpen(true)} disabled={!selectedIds.length}>
              Submit Album Selections ({selectedIds.length}) <ArrowRight size={15}/>
            </button>
          </div>
        </div>
      </div>

      {/* Photo Proofing Grid */}
      <div className="proofing-grid">
        {filteredPhotos.map((photo)=>{
          const isSelected=selectedIds.includes(photo.id);
          const selIndex=selectedIds.indexOf(photo.id)+1;

          return (
            <article key={photo.id} className={`proofing-card ${isSelected?'selected':''}`}>
              <div className="proofing-img-wrap">
                <img src={photo.image} alt={photo.title} loading="lazy"/>
                <button
                  type="button"
                  className={`heart-btn ${isSelected?'active':''}`}
                  onClick={()=>toggleSelect(photo.id)}
                  aria-label={isSelected?`Remove ${photo.title} from album`:`Add ${photo.title} to album`}
                  title={isSelected?'Remove from album':'Select for album'}
                >
                  <Heart size={18} fill={isSelected?'currentColor':'none'}/>
                </button>

                {isSelected&&(
                  <span className="selection-badge">#{selIndex}</span>
                )}

                <button
                  type="button"
                  className="proofing-zoom-btn"
                  onClick={()=>onOpenLightbox({id:photo.id,title:photo.title,category:photo.category,image:photo.image,description:gallery.couple+' · '+photo.category,published:true,access:'public',kind:'image'})}
                  aria-label="Inspect full resolution"
                >
                  <Eye size={16}/> Inspect
                </button>
              </div>

              <div className="proofing-card-info">
                <div>
                  <span className="overline">{photo.category}</span>
                  <h4>{photo.title}</h4>
                </div>
                <code className="photo-id-code">{photo.id}</code>
              </div>
            </article>
          );
        })}
      </div>

      {!filteredPhotos.length&&(
        <div className="empty">
          <Heart size={28}/>
          <h3>No photographs found in this view.</h3>
          <p>Switch to "All" or heart photos to add them to your favorites.</p>
        </div>
      )}

      {/* Submit Album Dialog */}
      {isSubmitOpen&&(
        <Dialog label="Submit Heirloom Album Selections" onClose={()=>setIsSubmitOpen(false)}>
          <div className="proofing-modal-content">
            {confirmation?(
              <div className="proofing-confirmation-cert">
                <div className="cert-seal">
                  <ShieldCheck size={36}/>
                </div>
                <Eyebrow>OFFICIAL ALBUM PROOFING SUBMISSION</Eyebrow>
                <h2>Album Selections<br/><em>Confirmed & Recorded.</em></h2>
                <p>Your {confirmation.count} selected heirloom photographs have been locked and dispatched to Auré Studio’s master design team.</p>

                <div className="receipt-badge">
                  <span>Confirmation Code</span>
                  <code>{confirmation.code}</code>
                </div>

                <div className="cert-meta-grid">
                  <div><span>Couple:</span><strong>{gallery.couple}</strong></div>
                  <div><span>Passcode:</span><strong>{gallery.passcode}</strong></div>
                  <div><span>Selected Frames:</span><strong>{confirmation.count} photographs</strong></div>
                  <div><span>Shipping Address:</span><strong>{shippingAddress||'To be confirmed'}</strong></div>
                </div>

                <div className="cert-actions">
                  <a
                    className="button gold"
                    href={`https://wa.me/919876543210?text=${encodeURIComponent(`Hello Auré Studio! I have submitted our wedding album selections under Confirmation #${confirmation.code} (${gallery.couple}).`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Confirm via WhatsApp <ArrowUpRight size={16}/>
                  </a>
                  <Button outline onClick={()=>{setIsSubmitOpen(false);setConfirmation(null);}}>
                    Return to Gallery
                  </Button>
                </div>
              </div>
            ):(
              <form className="proofing-submit-form" onSubmit={submitSelections}>
                <Eyebrow>FINAL ALBUM SUBMISSION</Eyebrow>
                <h2>Order Heirloom<br/><em>Italian Leather Album.</em></h2>
                <p>You have curated <strong>{selectedIds.length} of {gallery.maxAlbumSelections}</strong> photographs for your physical album. Provide your delivery and embossing details below.</p>

                <div className="form-row">
                  <label>Your Name<input required value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="Full Name"/></label>
                  <label>Contact Phone or Email<input required value={clientContact} onChange={e=>setClientContact(e.target.value)} placeholder="Phone number or email"/></label>
                </div>

                <label>Physical Shipping Address (for Album Courier)<textarea rows={2} required value={shippingAddress} onChange={e=>setShippingAddress(e.target.value)} placeholder="Street address, apartment, city, state, pin code"/></label>

                <label>Embossing Title & Cover Notes <span className="optional">optional</span>
                  <textarea rows={2} value={notes} onChange={e=>setNotes(e.target.value)} placeholder="E.g. Gold foil cover text: 'Rhea & Rohan · Nov 2024'. Please make rhea-01 the full opening spread."/>
                </label>

                <div className="selected-summary-box">
                  <span>Selected Photos ({selectedIds.length}):</span>
                  <code>{selectedIds.join(', ')}</code>
                </div>

                <button type="submit" className="button gold wide" disabled={submitBusy}>
                  {submitBusy?<LoaderCircle className="spin" size={17}/>:<>Lock & Submit Album Selections <Check size={16}/></>}
                </button>
              </form>
            )}
          </div>
        </Dialog>
      )}
    </section>
  );
}

function DateDepositModal({settings,onClose}:{settings:typeof defaults;onClose:()=>void}){
  const [busy,setBusy]=useState(false);
  const [error,setError]=useState('');
  const [confirmed,setConfirmed]=useState<{receiptCode:string;amount:number}|null>(null);

  const [clientName,setClientName]=useState('');
  const [clientContact,setClientContact]=useState('');
  const [targetDate,setTargetDate]=useState('');
  const [location,setLocation]=useState('');

  const amount=2500000; // ₹25,000

  const handleDeposit=async(e:FormEvent)=>{
    e.preventDefault();
    setBusy(true);
    setError('');

    try{
      const order=await api('deposit/order',{amount,clientName,clientContact,targetDate,location});

      if(!order.demo&&order.key&&(window as any).Razorpay){
        // Load razorpay checkout
        const rzp=new (window as any).Razorpay({
          key:order.key,
          order_id:order.orderId,
          amount:order.amount,
          currency:order.currency,
          name:'Auré Studio Date Hold',
          description:`Wedding Date Hold Token (${targetDate})`,
          handler:async(response:any)=>{
            try{
              const res=await api('deposit/verify',{
                ...response,
                clientName,
                clientContact,
                targetDate,
                location,
                amount
              });
              setConfirmed({receiptCode:res.receiptCode,amount});
            }catch(err){
              setError((err as Error).message);
            }
          },
          prefill:{
            name:clientName,
            email:clientContact.includes('@')?clientContact:'',
            contact:!clientContact.includes('@')?clientContact:''
          }
        });
        rzp.open();
      }else{
        // Demo token simulation or direct fallback
        const res=await api('deposit/verify',{
          razorpay_order_id:order.orderId,
          razorpay_payment_id:'pay_token_'+crypto.randomUUID().slice(0,8),
          clientName,
          clientContact,
          targetDate,
          location,
          amount,
          demo:true
        });
        setConfirmed({receiptCode:res.receiptCode,amount});
      }
    }catch(err){
      setError((err as Error).message);
    }finally{
      setBusy(false);
    }
  };

  return (
    <Dialog label="Reserve Wedding Date Hold Deposit" onClose={onClose}>
      <div className="deposit-modal-wrap">
        {confirmed?(
          <div className="deposit-certificate">
            <div className="cert-stamp">CALENDAR HOLD CONFIRMED</div>
            <Eyebrow>OFFICIAL CALENDAR RESERVATION CERTIFICATE</Eyebrow>
            <h2>Wedding Date<br/><em>Officially Reserved.</em></h2>
            <p>Your calendar exclusivity token of <strong>₹25,000</strong> has been verified. The date is now held exclusively for you on Auré Studio’s master production schedule.</p>

            <div className="receipt-badge">
              <span>Deposit Reference Code</span>
              <code>{confirmed.receiptCode}</code>
            </div>

            <div className="cert-meta-grid">
              <div><span>Client:</span><strong>{clientName}</strong></div>
              <div><span>Locked Event Date:</span><strong>{targetDate}</strong></div>
              <div><span>Location:</span><strong>{location}</strong></div>
              <div><span>Deposit Credited:</span><strong>₹25,000 (100% applied to package)</strong></div>
            </div>

            <div className="cert-actions">
              <a
                className="button gold"
                href={`https://wa.me/${(settings.phone||'919876543210').replace(/\D/g,'')}?text=${encodeURIComponent(`Hello Auré Studio! I have confirmed our wedding date hold deposit #${confirmed.receiptCode} for ${targetDate} (${clientName}).`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on WhatsApp <ArrowUpRight size={16}/>
              </a>
              <Button outline onClick={onClose}>
                Close Certificate
              </Button>
            </div>
          </div>
        ):(
          <form className="deposit-form" onSubmit={handleDeposit}>
            <div className="deposit-form-head">
              <Eyebrow>PRIORITY CALENDAR EXCLUSIVITY</Eyebrow>
              <h2>Reserve Your Date<br/><em>Hold Deposit.</em></h2>
              <p>Lock your wedding dates across India & worldwide with a ₹25,000 token deposit. 100% credited toward your final collection balance.</p>
            </div>

            <div className="deposit-perks">
              <div className="perk-item">
                <Check size={16}/>
                <div>
                  <strong>Calendar Exclusivity</strong>
                  <small>Only one wedding team dispatched per weekend.</small>
                </div>
              </div>
              <div className="perk-item">
                <Check size={16}/>
                <div>
                  <strong>100% Package Credit</strong>
                  <small>₹25,000 is directly credited toward your final package choice.</small>
                </div>
              </div>
              <div className="perk-item">
                <Check size={16}/>
                <div>
                  <strong>Creative Director Itinerary Session</strong>
                  <small>Personal 1-on-1 moodboard and schedule alignment call.</small>
                </div>
              </div>
            </div>

            <div className="form-row">
              <label>Couple / Client Name<input required value={clientName} onChange={e=>setClientName(e.target.value)} placeholder="E.g. Rhea & Rohan"/></label>
              <label>Email or WhatsApp Phone<input required value={clientContact} onChange={e=>setClientContact(e.target.value)} placeholder="contact@example.com"/></label>
            </div>

            <div className="form-row">
              <label>Wedding Date<input type="date" required min={new Date().toISOString().slice(0,10)} value={targetDate} onChange={e=>setTargetDate(e.target.value)}/></label>
              <label>Destination / Venue<input required value={location} onChange={e=>setLocation(e.target.value)} placeholder="City, Hotel, or Resort"/></label>
            </div>

            {error&&<p className="notice" role="alert">{error}</p>}

            <div className="deposit-checkout-footer">
              <div className="deposit-amount-display">
                <small>Hold Deposit Token</small>
                <strong>₹25,000 <span>INR</span></strong>
              </div>
              <button type="submit" className="button gold" disabled={busy}>
                {busy?<LoaderCircle className="spin" size={17}/>:<>Proceed to Lock Date <ArrowRight size={16}/></>}
              </button>
            </div>
          </form>
        )}
      </div>
    </Dialog>
  );
}
