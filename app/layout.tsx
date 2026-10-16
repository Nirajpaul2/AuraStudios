import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={metadataBase:new URL('https://aure-cinematic-studio.nirajpaul2.chatgpt.site'),title:{default:'Auré Studio — Photography, Films & AI Cinematics',template:'%s | Auré Studio'},description:'Honest photographs. Cinematic films. Explore wedding stories, creative filmmaking, and AI editing possibilities with Auré Studio.',openGraph:{title:'Auré Studio — Every frame, a feeling.',description:'Photography. Films. A feeling that stays.',images:[{url:'/images/hero-beach.png',width:1024,height:576,alt:'Auré Studio — Coastal Wedding Photography'}],type:'website'},icons:{icon:'/favicon.svg'}};
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'ProfessionalService'],
  name: 'Auré Studio',
  alternateName: 'Auré Cinematic Studio',
  description: 'Bespoke wedding photography, cinematic films, and fine-art storytelling across India and worldwide destinations.',
  url: 'https://aure-cinematic-studio.nirajpaul2.chatgpt.site',
  logo: 'https://aure-cinematic-studio.nirajpaul2.chatgpt.site/favicon.svg',
  image: 'https://aure-cinematic-studio.nirajpaul2.chatgpt.site/images/hero-beach.png',
  telephone: '+91-73670-50371',
  email: 'nirajpaul1991@gmail.com',
  priceRange: '₹₹₹₹',
  currenciesAccepted: 'INR',
  paymentAccepted: 'Credit Card, Debit Card, Net Banking, UPI',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Goa' },
    { '@type': 'AdministrativeArea', name: 'Udaipur' },
    { '@type': 'AdministrativeArea', name: 'Jaipur' },
    { '@type': 'AdministrativeArea', name: 'Mumbai' },
    { '@type': 'AdministrativeArea', name: 'Alibaug' },
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Worldwide Destination Weddings' }
  ],
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'IN'
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '5.0',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '38',
    reviewCount: '38'
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Rhea & Rohan' },
      datePublished: '2024-03-15',
      reviewBody: "Watching our wedding film felt like reliving every unspoken emotion. Niraj and the Auré Studio team didn't just document the day — they captured the soul of our families laughing, crying, and dancing till dawn.",
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Tanya & Kabir' },
      datePublished: '2024-05-20',
      reviewBody: "We didn't want stiff posing. Auré Studio gave us the gentle space to just be ourselves by the sunset tide. When the teaser arrived, both of our mothers wept tears of joy. Truly pure, emotional cinema.",
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Meera & Siddharth' },
      datePublished: '2024-02-10',
      reviewBody: 'From our first consultation to the final 4K master delivery, the artistry and care were extraordinary. The audio recording of our personal vows layered over the evening lantern lighting was breathtaking beyond words.',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5'
      }
    }
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Cinematic Photography & Film Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Wedding Stories & Films',
          description: 'Comprehensive wedding photography and cinematic 4K film masters shaped around your celebration.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Pre-Wedding & Portrait Sessions',
          description: 'Intimate location planning, personal creative direction, and editorial portraiture.'
        }
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'AI Cinematics & Film Color Grading',
          description: 'Bespoke color science, footage restoration, and cinematic atmosphere.'
        }
      }
    ]
  }
};

export default function Layout({children}:{children:React.ReactNode}){
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

