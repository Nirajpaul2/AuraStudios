import collectionImages from './collection-images.json' with { type: 'json' };
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

export const moodboardData = {
  lighting: [
    { id: 'l-golden', title: 'Golden Hour Shoreline', desc: 'Warm amber backlit silhouettes, sun flares, soft coastal haze', tag: 'Warm Amber', colorSwatch: '#cfb58a', image: '/images/hero-beach.webp' },
    { id: 'l-twilight', title: 'Twilight Lanterns & Candles', desc: 'Deep twilight sky, incandescent fairy lights, moody warm shadows', tag: 'Midnight & Gold', colorSwatch: '#8c6b4f', image: '/images/new-10.webp' },
    { id: 'l-flora', title: 'Courtyard Sunlight & Florals', desc: 'Lush natural daylight, marigold yellows, vivid vibrant petals', tag: 'Bright Floral', colorSwatch: '#d4a359', image: '/images/new-08.webp' },
    { id: 'l-monsoon', title: 'Moody Monsoon Coastal', desc: 'Atmospheric clouds, gentle rain reflections, soft cinematic greens', tag: 'Emerald & Sage', colorSwatch: '#617062', image: '/images/new-06.webp' }
  ],
  pacing: [
    { id: 'p-poetic', title: 'Poetic & Contemplative', desc: 'Slow, lingering frames layered over acoustic spoken vows', tag: 'Soulful Slow' },
    { id: 'p-joyful', title: 'Joyful & Celebratory', desc: 'Spontaneous candid laughter, dhol beats, dancing energy', tag: 'High Energy' },
    { id: 'p-grand', title: 'Grand Royal Symphonic', desc: 'Sweeping drone compositions, palace architecture, cinematic crescendos', tag: 'Majestic Scale' }
  ],
  texture: [
    { id: 't-35mm', title: 'Kodak 35mm Analog Warmth', desc: 'Subtle halation, organic film grain, timeless nostalgic pastels', tag: 'Analog Grain' },
    { id: 't-4k', title: 'Crisp 4K Ultra-HDR Master', desc: 'Incredible detail, true deep blacks, vibrant edge-to-edge clarity', tag: 'Modern Cinema' },
    { id: 't-vintage', title: 'Muted Editorial Velvet', desc: 'Understated contrast, warm skin tones, velvet shadows', tag: 'Fine-Art Editorial' }
  ],
  focus: [
    { id: 'f-micro', title: 'Unspoken Micro-Moments', desc: 'Secret stolen glances, teary smiles, hands held softly', tag: 'Intimate Glances' },
    { id: 'f-rituals', title: 'Sacred Rituals & Tradition', desc: 'The agni fire, phere vows, sindoor details, ancestral blessings', tag: 'Sacred Ceremonies' },
    { id: 'f-portraits', title: 'Bespoke Couple Portraits', desc: 'Quiet private sessions away from crowds in cinematic landscape', tag: 'Editorial Vows' }
  ]
};

export type ProofingPhoto = {
  id: string;
  title: string;
  category: string;
  image: string;
};

export type ProofingGallery = {
  passcode: string;
  couple: string;
  location: string;
  eventDate: string;
  coverImage: string;
  totalPhotos: number;
  maxAlbumSelections: number;
  photos: ProofingPhoto[];
};

export const proofingGalleries: Record<string, ProofingGallery> = {
  'RHEA2024': {
    passcode: 'RHEA2024',
    couple: 'Rhea & Rohan',
    location: 'The Oberoi Udaivilas, Udaipur',
    eventDate: 'November 2024',
    coverImage: '/images/new-01.webp',
    totalPhotos: 24,
    maxAlbumSelections: 80,
    photos: [
      { id: 'rhea-01', title: 'Evening warmth along the lake', category: 'Portraits', image: '/images/new-01.webp' },
      { id: 'rhea-02', title: 'Laughter during the baraat', category: 'Rituals', image: '/images/new-09.webp' },
      { id: 'rhea-03', title: 'Under the illuminated banyan', category: 'Reception', image: '/images/new-10.webp' },
      { id: 'rhea-04', title: 'Golden hour vows by the shore', category: 'Portraits', image: '/images/new-07.webp' },
      { id: 'rhea-05', title: 'A sacred promise held gently', category: 'Rituals', image: '/images/new-11.webp' },
      { id: 'rhea-06', title: 'Sunlight and yellow marigolds', category: 'Rituals', image: '/images/new-08.webp' },
      { id: 'rhea-07', title: 'Quiet pre-wedding reflections', category: 'Portraits', image: '/images/new-05.webp' },
      { id: 'rhea-08', title: 'The night dance celebration', category: 'Reception', image: '/images/new-02.webp' },
      { id: 'rhea-09', title: 'Rain-kissed coastal embrace', category: 'Portraits', image: '/images/new-06.webp' },
      { id: 'rhea-10', title: 'Grand palace courtyards in dusk', category: 'Highlights', image: '/images/new-04.webp' },
      { id: 'rhea-11', title: 'The morning bridal preparation', category: 'Highlights', image: '/images/wedding-1.jpg' },
      { id: 'rhea-12', title: 'First look quiet tears', category: 'Highlights', image: '/images/wedding-2.jpg' }
    ]
  },
  'TANYA2024': {
    passcode: 'TANYA2024',
    couple: 'Tanya & Kabir',
    location: 'Cavelossim Beach, South Goa',
    eventDate: 'December 2024',
    coverImage: '/images/hero-beach.webp',
    totalPhotos: 20,
    maxAlbumSelections: 80,
    photos: [
      { id: 'tanya-01', title: 'Sunset coastal vows', category: 'Portraits', image: '/images/hero-beach.webp' },
      { id: 'tanya-02', title: 'Morning haldi blessings', category: 'Rituals', image: '/images/new-08.webp' },
      { id: 'tanya-03', title: 'Under glowing fairy lights', category: 'Reception', image: '/images/new-10.webp' },
      { id: 'tanya-04', title: 'Barefoot walk along the sand', category: 'Highlights', image: '/images/new-05.webp' },
      { id: 'tanya-05', title: 'A promise held gently', category: 'Rituals', image: '/images/new-11.webp' },
      { id: 'tanya-06', title: 'Golden amber seaside portrait', category: 'Portraits', image: '/images/new-07.webp' },
      { id: 'tanya-07', title: 'Fountain laughter in the sun', category: 'Highlights', image: '/images/new-09.webp' },
      { id: 'tanya-08', title: 'Night dance with loved ones', category: 'Reception', image: '/images/new-02.webp' }
    ]
  },
  'DEMO2025': {
    passcode: 'DEMO2025',
    couple: 'Sample Couple (Demo Gallery)',
    location: 'Udaipur & Goa Heritage Showcase',
    eventDate: 'Wedding Season 2025',
    coverImage: '/images/hero-beach.webp',
    totalPhotos: 12,
    maxAlbumSelections: 80,
    photos: [
      { id: 'demo-01', title: 'Barefoot vows along the tide', category: 'Highlights', image: '/images/hero-beach.webp' },
      { id: 'demo-02', title: 'Warmth in the evening light', category: 'Portraits', image: '/images/new-01.webp' },
      { id: 'demo-03', title: 'Under the glowing banyan', category: 'Reception', image: '/images/new-10.webp' },
      { id: 'demo-04', title: 'Golden horizon vows', category: 'Highlights', image: '/images/new-07.webp' },
      { id: 'demo-05', title: 'Haldi laughter and marigolds', category: 'Rituals', image: '/images/new-08.webp' },
      { id: 'demo-06', title: 'A promise held gently', category: 'Rituals', image: '/images/new-11.webp' },
      { id: 'demo-07', title: 'Laughter and sunlight fountain', category: 'Highlights', image: '/images/new-09.webp' },
      { id: 'demo-08', title: 'Serenity by the coastal tide', category: 'Portraits', image: '/images/new-05.webp' },
      { id: 'demo-09', title: 'Night lights and laughter', category: 'Reception', image: '/images/new-02.webp' },
      { id: 'demo-10', title: 'Reflections in the gentle rain', category: 'Portraits', image: '/images/new-06.webp' },
      { id: 'demo-11', title: 'Traditional afternoon grace', category: 'Rituals', image: '/images/new-08.webp' },
      { id: 'demo-12', title: 'Where dreams take flight', category: 'Highlights', image: '/images/new-03.webp' }
    ]
  }
};

export type ColorGradingScene = {
  id: string;
  title: string;
  location: string;
  image: string;
  description: string;
  logLabel: string;
  gradeLabel: string;
  highlights: string[];
};

export const colorGradingScenes: ColorGradingScene[] = [
  {
    id: 'beach-sunset',
    title: 'Coastal Sunset Vows',
    location: 'South Goa Shoreline',
    image: '/images/hero-beach.webp',
    description: 'Balancing extreme sunset dynamic range, preserving highlights in white attire while warming natural skin tones.',
    logLabel: '10-Bit S-Log3 / Flat Sensor RAW',
    gradeLabel: 'Auré Kodak Gold Cinema Master',
    highlights: ['Natural Golden Amber Skin Tones', 'Retained Ocean Horizon Dynamic Range', 'Gentle Highlight Halation']
  },
  {
    id: 'twilight-banyan',
    title: 'Twilight Fairy Lights & Banyan',
    location: 'Heritage Courtyard',
    image: '/images/new-10.webp',
    description: 'Elevating deep night shadows, preserving warm 2800K incandescent sparkle without blowing out string lights.',
    logLabel: 'Low-Light High ISO Camera RAW',
    gradeLabel: 'Auré Tungsten Glow Film Grade',
    highlights: ['Lush Warm Tungsten Contrast', 'Clean Micro-Noise Reduction', 'Luminescent Foliage Separation']
  },
  {
    id: 'haldi-sun',
    title: 'Morning Haldi & Yellow Flora',
    location: 'Palace Courtyard',
    image: '/images/new-08.webp',
    description: 'Calibrating vibrant yellow marigolds and turmeric powder to look rich and cinematic without oversaturating skin.',
    logLabel: 'Midday Harsh Sunlight RAW',
    gradeLabel: 'Auré Daylight Pastel Harmony',
    highlights: ['Calibrated Marigold Yellows', 'Softened Direct Sun Contrast', 'True Skin Pigment Fidelity']
  }
];


