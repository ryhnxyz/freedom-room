import JournalDetailClient, { ArticleData } from './JournalDetailClient';

const ARTICLES_DATABASE: Record<string, ArticleData> = {
  'passive-cooling': {
    id: 'passive-cooling',
    title: 'Designing for Passive Cooling in Texas Hill Country Architecture',
    category: 'ARCHITECTURE',
    date: 'August 18, 2026',
    author: 'Soren Kjaergaard',
    readTime: '5 min read',
    summary: 'How solar orientation vectors and deep overhangs slash residential HVAC energy requirements by 42% without sacrificing natural light.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Traditional luxury home construction in Central Texas often relies heavily on brute-force mechanical air conditioning. At Tumbuh, our Scandinavian-inspired architectural team took a fundamentally different approach grounded in passive thermal envelope engineering.',
      'By aligning each parcel\'s primary axis along prevailing southeasterly Hill Country wind corridors and utilizing 4-foot floating roof overhangs, solar heat gain is reflected before hitting glass surfaces during peak 3 PM summer radiation hours.',
      'Furthermore, double-height foyer stairwells act as natural thermal chimneys, allowing warm interior air to rise and vent automatically through automated clerestory windows while pulling cool ground-level air across covered courtyard patios.',
      'In testing across peak July afternoons where ambient temperatures reached 104°F, interior ambient temperatures inside un-air-conditioned Tumbuh residences stabilized at 76°F, dramatically decreasing total electric load requirements.',
    ],
  },
  'net-zero-investment': {
    id: 'net-zero-investment',
    title: 'Why Net-Zero Solar Integration Boosts Long-Term Home Valuation',
    category: 'INVESTMENT',
    date: 'August 10, 2026',
    author: 'Evelyn Vance',
    readTime: '7 min read',
    summary: 'An analysis of luxury estate resale data in Austin showing a 14.2% price premium for homes equipped with integrated microgrids.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop',
    content: [
      'With Austin energy grid volatility making headlines in recent years, luxury homebuyers are increasingly prioritizing energy independence alongside high-end kitchen appliances and swimming pools.',
      'Tumbuh’s standard 7.2 kW rooftop solar array paired with commercial-grade subterranean storage channels allows homeowners to operate completely off-grid for up to 72 hours during severe weather events.',
      'Appraisal data from West Austin enclave sales reveals that homes with verified Zero Net Energy (ZNE) certification appreciate 1.8x faster than traditional luxury builds, making sustainable infrastructure one of the highest-ROI architectural decisions.',
      'Buyers recognize that zero monthly electric bills combined with guaranteed emergency power resiliency protect both lifestyle comfort and capital asset value over decades.',
    ],
  },
  'biophilic-interiors': {
    id: 'biophilic-interiors',
    title: 'Biophilic Interior Design: Bringing the Texas Oak Forest Indoors',
    category: 'INTERIORS',
    date: 'July 29, 2026',
    author: 'Marcus Thorne',
    readTime: '4 min read',
    summary: 'Selecting native limestone, rift-cut white oak, and pocketing glass walls to create seamless indoor-outdoor living volumes.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop',
    content: [
      'Biophilic design is more than adding potted plants to a living room — it is the deliberate spatial integration of natural materials, organic sightlines, and natural light rhythms into daily life.',
      'In Tumbuh residences, 12-foot pocketing glass doors disappear completely into exterior wall cavities, transforming living rooms into covered alfresco pavilions overlooking protected oak greenbelts.',
      'Finishes utilize zero-VOC natural oil sealants on rift-cut white oak cabinetry and hand-chiseled Texas Hill Country limestone walls, maintaining pristine interior air quality for residents.',
      'Morning sunlight enters through clerestory windows designed to mimic the natural canopy shadow patterns of surrounding oak trees, fostering deep circadian alignment.',
    ],
  },
};

export function generateStaticParams() {
  return [
    { id: 'passive-cooling' },
    { id: 'net-zero-investment' },
    { id: 'biophilic-interiors' },
  ];
}

export default async function JournalDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const article = ARTICLES_DATABASE[resolvedParams.id] || ARTICLES_DATABASE['passive-cooling'];
  return <JournalDetailClient article={article} />;
}
