import collectionImages from './collection-images.json';
export type Item={id:string;kind:string;title:string;category:string;description:string;image:string;published?:boolean;access?:string;price?:number;youtube?:string;originalKey?:string;previewKey?:string;previewType?:string;previewSeconds?:number;duration?:string;rightsConfirmed?:boolean;inclusions?:string;enabled?:boolean;reference?:boolean;credit?:string};
export const defaults={name:'Auré Studio',logoUrl:'',tagline:'Photography. Films. A feeling that stays.',email:'nirajpaul1991@gmail.com',phone:'+91 73670 50371',phoneSecondary:'+91 99424 19838',instagram:'',youtube:'',heroImage:'/images/hero-beach.webp',showAI:true,showStore:true,showReferences:true};
export const references:Item[]=[
  {id:'ref-bagal',kind:'video',title:'तू मेरे बगल में बैठे (Tu Mere Bagal Mein Baithe)',category:'Creative references',description:'Romantic lo-fi storytelling by Heartwave. A supplied creative reference, shown through the official YouTube embed.',image:'https://i.ytimg.com/vi/AVylvSx7PoE/hqdefault.jpg',youtube:'AVylvSx7PoE',access:'public',reference:true},
  {id:'ref-sapno',kind:'video',title:'सपनों का बाज़ार (Sapno Ka Bazaar)',category:'Creative references',description:'Where Your Heart is the Currency. Soulful audio visualizer by Heartwave, shown through the official YouTube embed.',image:'https://i.ytimg.com/vi/0QZUcXIc5m0/hqdefault.jpg',youtube:'0QZUcXIc5m0',access:'public',reference:true},
  {id:'ref-samunder',kind:'video',title:'Samunder Ka Rasta',category:'Creative references',description:'Deep love ballad and ocean metaphor by Heartwave. A supplied creative reference, shown through the official YouTube embed.',image:'https://i.ytimg.com/vi/Z66P9nFT6RU/hqdefault.jpg',youtube:'Z66P9nFT6RU',access:'public',reference:true},
  {id:'ref-heartbreak',kind:'video',title:'Maine Tumhe Bhagwan Mana',category:'Creative references',description:'Cinematic heartbreak narrative by Heartwave. A supplied creative reference, shown through the official YouTube embed.',image:'https://i.ytimg.com/vi/EY_nIrYctmI/hqdefault.jpg',youtube:'EY_nIrYctmI',access:'public',reference:true},
  {id:'ref-frequency',kind:'video',title:'Tu Meri Tarang, Meri Frequency',category:'Creative references',description:'Romantic lo-fi love song by Heartwave. A supplied creative reference, shown through the official YouTube embed.',image:'https://i.ytimg.com/vi/QKNfFZY-xx8/hqdefault.jpg',youtube:'QKNfFZY-xx8',access:'public',reference:true},
  {id:'ref-rain',kind:'video',title:'Tum Mere Ho',category:'Creative references',description:'Rainy Café Romance by Heartwave. A supplied creative reference, not a studio client project.',image:'https://i.ytimg.com/vi/gg3RcbdGSUk/hqdefault.jpg',youtube:'gg3RcbdGSUk',access:'public',reference:true},
  {id:'ref-duet',kind:'video',title:'Tujhse Hi Chalna',category:'Creative references',description:'Soulful romantic duet by Heartwave. A supplied creative reference, not offered for purchase.',image:'https://i.ytimg.com/vi/fVY3aABEgA4/hqdefault.jpg',youtube:'fVY3aABEgA4',access:'public',reference:true}
];
export const newStudioImages:Item[]=[
  {id:'studio-01',kind:'image',title:'Warmth in the evening light',category:'Pre-wedding',image:'/images/new-01.webp',description:'Candid evening portrait in golden street atmosphere',credit:'Auré Studio'},
  {id:'studio-10',kind:'image',title:'Under the illuminated banyan',category:'Weddings',image:'/images/new-10.webp',description:'Romantic evening portrait under glowing fairy lights',credit:'Auré Studio'},
  {id:'studio-07',kind:'image',title:'Golden horizon vows',category:'Weddings',image:'/images/new-07.webp',description:'Sunset coastal silhouette along the ocean shore',credit:'Auré Studio'},
  {id:'studio-11',kind:'image',title:'A promise held gently',category:'Weddings',image:'/images/new-11.webp',description:'Close-up detail of hands reaching out over fallen blossoms',credit:'Auré Studio'},
  {id:'studio-02',kind:'image',title:'Through the lens',category:'Pre-wedding',image:'/images/new-02.webp',description:'Candid moments between frames and night lights',credit:'Auré Studio'},
  {id:'studio-03',kind:'image',title:'Where dreams take flight',category:'Cinematic landscapes',image:'/images/new-03.webp',description:'Cinematic vision with light, atmosphere, and a glowing dove',credit:'Auré Studio'},
  {id:'studio-04',kind:'image',title:'Reflections of a journey',category:'Portraits',image:'/images/new-04.webp',description:'Dual-tone editorial portrait study in amber and blue',credit:'Auré Studio'},
  {id:'studio-05',kind:'image',title:'Serenity by the tide',category:'Pre-wedding',image:'/images/new-05.webp',description:'Timeless coastal pre-wedding session in white',credit:'Auré Studio'},
  {id:'studio-06',kind:'image',title:'Reflections in the rain',category:'Pre-wedding',image:'/images/new-06.webp',description:'Intimate rain-kissed reflection portrait by the coast',credit:'Auré Studio'},
  {id:'studio-08',kind:'image',title:'Grace in the afternoon glow',category:'Portraits',image:'/images/new-08.webp',description:'Soulful portrait in traditional attire beneath the banyan canopy',credit:'Auré Studio'},
  {id:'studio-09',kind:'image',title:'Laughter and sunlight',category:'Celebrations',image:'/images/new-09.webp',description:'Candid celebration portrait with garden fountain and warm lens flare',credit:'Auré Studio'}
];
const initialImages:Item[]=[{id:'sample-1',kind:'image',title:'A moment, made timeless',category:'Weddings',image:'/images/wedding-1.jpg',description:'Illustrative photograph • Unsplash',credit:'Licensed reference photography. See image credits.'},{id:'sample-2',kind:'image',title:'The quiet in between',category:'Pre-wedding',image:'/images/wedding-2.jpg',description:'Illustrative photograph • Unsplash'},{id:'sample-3',kind:'image',title:'Little moments. Big feelings.',category:'Celebrations',image:'/images/celebration.jpg',description:'Illustrative photograph • Unsplash'},{id:'sample-4',kind:'image',title:'A story in every glance',category:'Portraits',image:'/images/portrait.jpg',description:'Illustrative photograph • Unsplash'},...collectionImages];
export const sampleImages:Item[]=[...newStudioImages,...initialImages];
export const serviceIdeas:Item[]=[{id:'wedding',kind:'service',title:'Wedding stories',category:'Weddings',description:'From the first look to the last dance. Photography and films shaped around your celebration.',image:'/images/wedding-1.jpg',inclusions:'Photography & cinematic films\nCoverage tailored to your celebration\nPersonal consultation'},{id:'celebration',kind:'service',title:'Life, celebrated',category:'Celebrations',description:'Birthdays, anniversaries, and all the moments you wish would last a little longer.',image:'/images/celebration.jpg',inclusions:'Birthday & family photography\nEvent highlights\nCustom coverage'},{id:'portrait',kind:'service',title:'Portraits with presence',category:'Portraits',description:'A little direction. Room to be yourself. Portraits and pre-wedding stories that feel like you.',image:'/images/portrait.jpg',inclusions:'Portrait & pre-wedding sessions\nLocation planning\nPersonal creative direction'}];

export type Testimonial = {
  id: string;
  quote: string;
  couple: string;
  location: string;
  eventType: string;
  badgeImage: string;
  year: string;
  highlight: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 't-1',
    quote: "Watching our wedding film felt like reliving every unspoken emotion. Niraj and the Auré Studio team didn't just document the day — they captured the soul of our families laughing, crying, and dancing till dawn without ever feeling intrusive.",
    couple: "Rhea & Rohan",
    location: "Udaipur, Rajasthan",
    eventType: "3-Day Royal Palace Celebration",
    badgeImage: "/images/new-01.webp",
    year: "2024",
    highlight: "“A cinematic masterpiece our families will rewatch for generations.”"
  },
  {
    id: 't-2',
    quote: "We didn't want stiff posing or generic drone cuts. Auré Studio gave us the gentle space to just be ourselves by the sunset tide. When the teaser arrived, both of our mothers wept tears of joy. Truly pure, emotional cinema.",
    couple: "Tanya & Kabir",
    location: "South Goa",
    eventType: "Coastal Sunset Wedding",
    badgeImage: "/images/new-07.webp",
    year: "2024",
    highlight: "“Pure poetry on film. They made us feel so effortless and seen.”"
  },
  {
    id: 't-3',
    quote: "From our first consultation to the final 4K master delivery, the artistry and care were extraordinary. The audio recording of our personal vows layered over the evening lantern lighting was breathtaking beyond words.",
    couple: "Meera & Siddharth",
    location: "Alibaug, Maharashtra",
    eventType: "Intimate Beachside Vows",
    badgeImage: "/images/new-10.webp",
    year: "2024",
    highlight: "“The audio fidelity, color grading, and attention to detail are unmatched.”"
  }
];

export type FAQ = {
  question: string;
  answer: string;
  category: string;
};

export const faqs: FAQ[] = [
  {
    question: "Do you travel for destination weddings & elopements across India and abroad?",
    answer: "Yes, destination celebrations are at the heart of our studio. We regularly travel across India (Udaipur, Goa, Jaipur, Mussoorie, Kerala, Alibaug) and internationally. Travel, logistics, and stay are billed transparently at actual cost or seamlessly bundled into an all-inclusive custom proposal.",
    category: "Destination"
  },
  {
    question: "How far in advance should we reserve our wedding dates?",
    answer: "To ensure each couple receives our full creative focus and bespoke post-production, we commission a strictly limited number of weddings per season. Peak season dates (October through March) often reserve 6 to 12 months ahead. We recommend contacting us as soon as your venue or dates are shortlisted.",
    category: "Booking"
  },
  {
    question: "What is your turnaround timeline for photographs and cinematic films?",
    answer: "We know the anticipation is high! We deliver a curated set of 25–40 color-graded preview photographs within 48 to 72 hours of your celebration for sharing with family and friends. Your complete curated high-resolution photography gallery is delivered within 4 to 6 weeks, and your cinematic 4K wedding film master with bespoke audio design within 8 to 10 weeks.",
    category: "Deliverables"
  },
  {
    question: "Do we receive raw footage and unedited photographs?",
    answer: "Every photograph and film scene we deliver is individually color-graded and sound-engineered to our studio's signature standard. For couples who want to archive every archival camera angle and toast, we offer full unedited documentary reels and RAW archival footage hard drives as an optional add-on.",
    category: "Deliverables"
  },
  {
    question: "Can we customize our photography, film, and coverage package?",
    answer: "Every love story is distinct. All our commissions are modular: you can seamlessly combine multi-day cinematic coverage, pre-wedding narrative portraits, aerial drone cinematography, same-day reception highlight edits, and Italian leather-bound fine-art heirloom albums.",
    category: "Customization"
  }
];

export const featuredStory = {
  title: "Vows by the Tide: Tanya & Kabir's Sunset Celebration",
  subtitle: "A 3-Day Coastal Saga in South Goa",
  couple: "Tanya & Kabir",
  location: "Cavelossim Beach, South Goa",
  year: "2024",
  palette: ["#f1eee5", "#cfb58a", "#617062", "#8c6b4f"],
  quote: "“Under the amber Konkan sky, two soulmates promised each other a lifetime of laughter, stillness, and tides.”",
  intro: "From golden morning haldi beneath swaying coconut fronds to heartfelt sunset vows as the tide rolled in, Tanya and Kabir’s Goa celebration was an ode to warmth, quiet tenderness, and spontaneous joy.",
  chapters: [
    {
      num: "01",
      title: "Morning Haldi & Yellow Marigolds",
      time: "10:30 AM",
      desc: "Sunlight filtering through palm canopies as turmeric, rose petals, and spontaneous laughter filled the heritage courtyard.",
      image: "/images/new-08.webp"
    },
    {
      num: "02",
      title: "Sunset Vows Along the Shoreline",
      time: "05:45 PM",
      desc: "The gentle roar of the Arabian Sea as barefoot vows were exchanged under an open-air ivory canopy in golden hour light.",
      image: "/images/hero-beach.webp"
    },
    {
      num: "03",
      title: "Dancing Under the Glowing Banyan",
      time: "08:30 PM",
      desc: "Warm incandescent fairy lights, acoustic guitar melodies, and an unscripted night of celebration with their closest circle.",
      image: "/images/new-10.webp"
    }
  ]
};

