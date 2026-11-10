// Single source of truth for all wedding content. Edit here — components never hardcode copy.
const img = (name) => `${import.meta.env.BASE_URL}images/${name}.jpg`

export const weddingConfig = {
  siteUrl: 'https://vihaan-saanvi.example.com',

  couple: {
    groom: {
      firstName: 'Vihaan',
      fullName: 'Vihaan Mehta',
      role: 'The Groom',
      image: img('groom'),
      imageAlt: 'Vihaan walking with Saanvi across golden hills',
      intro: [
        'Vihaan is an architect who sees the world in light and line. He believes a good space should make you exhale — which is exactly what Saanvi did the day she walked into his life.',
        'Sunday mornings with filter coffee, sketchbooks on every surface and a quiet, steady laugh: he is the calm in every storm, and the first to say "let’s go" when an adventure calls.',
      ],
      facts: [['Raised in', 'Mumbai'], ['Happiest at', 'Sunrise, sea-side'], ['Always says', '"Five more minutes"']],
    },
    bride: {
      firstName: 'Saanvi',
      fullName: 'Saanvi Shah',
      role: 'The Bride',
      image: img('bride'),
      imageAlt: 'Saanvi in a floral dress in golden light',
      intro: [
        'Saanvi is a textile designer who collects colour the way others collect souvenirs. She is warm, wildly curious, and has never met a stranger she could not make a friend of within ten minutes.',
        'With flour on her hands and music in the kitchen, she turns every ordinary evening into a small celebration — and with Vihaan, every day has become one.',
      ],
      facts: [['Raised in', 'Ahmedabad'], ['Happiest at', 'Golden hour, anywhere'], ['Always says', '"Just one more detour"']],
    },
    heading: 'Two people, one story',
  },

  weddingTitle: 'The Coastal Romance',
  weddingDate: '2027-11-22T17:30:00+05:30', // ceremony start, IST
  location: { city: 'Goa', country: 'India', short: 'Goa, India' },

  hero: {
    image: img('hero'),
    imageAlt: 'A couple on a coastal beach at golden hour, veil flowing in the sea breeze',
    tagline: 'Two hearts. One beautiful journey.',
  },

  opening: {
    image: img('opening'),
    kicker: 'Together with our families',
    invite: 'Invite you to celebrate their wedding',
    button: 'Open Invitation',
  },

  story: {
    heading: 'How we got here',
    kicker: 'Our Story',
    chapters: [
      {
        title: 'The First Hello',
        date: 'March 2019',
        image: img('story-1'),
        imageAlt: 'Two hands reaching for each other',
        text: 'A friend’s rooftop in Bandra, a borrowed umbrella and a monsoon that refused to stop. Vihaan offered to walk Saanvi to the rickshaw stand. They walked for two hours instead.',
      },
      {
        title: 'The Unexpected Connection',
        date: 'October 2019',
        image: img('story-2'),
        imageAlt: 'A couple dancing on a dark windswept beach',
        text: 'Neither was looking for anything serious. Then came the late-night calls, the shared playlists, and the slow realisation that home was no longer a place — it was a voice on the other end of the line.',
      },
      {
        title: 'The First Adventure',
        date: 'June 2021',
        image: img('story-3'),
        imageAlt: 'Whitewashed Mediterranean cliffside town above the sea',
        text: 'Their first trip abroad: a missed ferry, whitewashed lanes, and a sunset over the Aegean that made them both go quiet. Saanvi says that was the moment she knew. Vihaan says he knew in the rain.',
      },
      {
        title: 'The Proposal',
        date: 'December 2025',
        image: img('story-4'),
        imageAlt: 'Two gold rings resting among soft roses',
        text: 'On the same Goa shoreline where they once stayed up until sunrise, Vihaan asked a question he had rehearsed for months — and forgot every word of. She said yes before he finished.',
      },
      {
        title: 'Forever Begins',
        date: '22 November 2027',
        image: img('story-5'),
        imageAlt: 'A couple kissing as guests shower them with petals',
        text: 'And now, surrounded by the people who made us who we are, we begin the next chapter. We would be honoured to have you beside us as we say "I do".',
      },
    ],
  },

  events: [
    {
      id: 'welcome-soiree',
      title: 'Welcome Soirée',
      tagline: 'Sea-breeze cocktails & first embraces',
      date: '2027-11-20',
      time: '7:00 PM',
      start: '2027-11-20T19:00:00+05:30',
      end: '2027-11-20T22:30:00+05:30',
      dressCode: 'Resort Chic',
      image: img('event-welcome'),
      imageAlt: 'Elegant long table set with flowers and glassware',
      venue: 'Terrace Lawns',
      accent: '#A5AA91',
    },
    {
      id: 'mehendi-haldi',
      title: 'Mehendi & Haldi',
      tagline: 'Henna, marigold & laughter in the sun',
      date: '2027-11-21',
      time: '11:00 AM',
      start: '2027-11-21T11:00:00+05:30',
      end: '2027-11-21T15:00:00+05:30',
      dressCode: 'Pastel & Floral',
      image: img('event-mehendi'),
      imageAlt: 'Hands adorned with rings holding a peach and cream bouquet',
      venue: 'Garden Courtyard',
      accent: '#D9B6A5',
    },
    {
      id: 'sangeet',
      title: 'Sangeet Under The Stars',
      tagline: 'Music, dance & a sky full of lanterns',
      date: '2027-11-21',
      time: '7:30 PM',
      start: '2027-11-21T19:30:00+05:30',
      end: '2027-11-21T23:59:00+05:30',
      dressCode: 'Glamorous Evening',
      image: img('event-sangeet'),
      imageAlt: 'A groom and bride in warm golden light holding a bouquet',
      venue: 'Beachfront Amphitheatre',
      accent: '#555D48',
    },
    {
      id: 'ceremony',
      title: 'The Wedding Ceremony',
      tagline: 'Vows beside the Arabian Sea',
      date: '2027-11-22',
      time: '5:30 PM',
      start: '2027-11-22T17:30:00+05:30',
      end: '2027-11-22T19:30:00+05:30',
      dressCode: 'Elegant Indian Attire',
      image: img('event-ceremony'),
      imageAlt: 'A floral-lined wedding aisle leading to a white arch',
      venue: 'Heritage Lawn & Sea Pavilion',
      accent: '#D9B6A5',
    },
    {
      id: 'reception',
      title: 'Wedding Reception',
      tagline: 'Dinner, toasts & dancing till late',
      date: '2027-11-22',
      time: '8:00 PM',
      start: '2027-11-22T20:00:00+05:30',
      end: '2027-11-23T00:30:00+05:30',
      dressCode: 'Black Tie Optional',
      image: img('event-reception'),
      imageAlt: 'A candlelit reception table with wine glasses and flowers',
      venue: 'The Grand Ballroom',
      accent: '#292923',
    },
  ],

  gallery: {
    heading: 'Moments, collected',
    kicker: 'The Gallery',
    // `span` controls the editorial masonry rhythm: tall | wide | square
    images: [
      { src: img('g-1'), alt: 'Black and white portrait of a couple sharing a kiss under a veil', category: 'Couple Portraits', ratio: 'tall' },
      { src: img('g-8'), alt: 'Sunset reflecting over a calm coastal shoreline', category: 'Romantic Beach', ratio: 'wide' },
      { src: img('g-2'), alt: 'A lush bridal bouquet of roses and wildflowers', category: 'Floral Details', ratio: 'square' },
      { src: img('g-10'), alt: 'A couple releasing balloons at a celebration', category: 'Celebration', ratio: 'tall' },
      { src: img('g-3'), alt: 'Peach and white florals draped over a ceremony arch', category: 'Floral Details', ratio: 'tall' },
      { src: img('g-9'), alt: 'Palm-fringed Goa beach at golden hour', category: 'Destination', ratio: 'wide' },
      { src: img('g-4'), alt: 'Bride and groom’s shoes on a rustic wooden floor', category: 'Engagement Moments', ratio: 'square' },
      { src: img('g-5'), alt: 'A garden gazebo dressed in flowers and white chairs', category: 'Destination', ratio: 'tall' },
      { src: img('g-7'), alt: 'A wooden Mr & Mrs sign among blossoms', category: 'Engagement Moments', ratio: 'square' },
      { src: img('g-6'), alt: 'Two floral-trimmed chairs on a green lawn', category: 'Celebration', ratio: 'square' },
    ],
  },

  venue: {
    heading: 'Where the sea meets the sky',
    kicker: 'Destination & Venue',
    name: 'Taj Cidade de Goa Heritage',
    image: img('venue'),
    imageAlt: 'Whitewashed Mediterranean-style coastal architecture above the sea at dusk',
    address: 'Vainguinim Beach, Dona Paula, Goa 403004, India',
    description:
      'Perched above Vainguinim Beach, this Portuguese-inspired heritage resort frames the Arabian Sea with terracotta rooftops, arched colonnades and bougainvillea-draped courtyards. Our celebrations unfold across its lawns, terraces and ballroom — a setting made for golden hours.',
    mapsQuery: 'Taj Cidade de Goa Heritage, Vainguinim Beach, Dona Paula, Goa',
    // Public embed (no API key). Swap for a Maps Embed API URL if you add a key.
    mapEmbed: 'https://www.google.com/maps?q=Taj+Cidade+de+Goa+Heritage+Dona+Paula+Goa&output=embed',
    travel: [
      { icon: 'plane', title: 'By Air', text: 'Goa International Airport (Dabolim, GOI) is 5 km away — about 20 minutes by car. Dedicated guest transfers will be arranged.' },
      { icon: 'train', title: 'By Rail', text: 'Vasco da Gama and Madgaon stations are well connected to Mumbai, Delhi and Bengaluru. Pre-arranged pickup available.' },
      { icon: 'bed', title: 'Stay With Us', text: 'A room block is reserved at the venue and nearby boutique hotels. Quote “Vihaan & Saanvi Wedding” when booking before 22 September 2027.' },
      { icon: 'sun', title: 'Best To Know', text: 'Late November is Goa’s golden season: warm days (28–31°C), breezy evenings. Pack linen, light layers and comfortable footwear for the sand.' },
    ],
  },

  rsvp: {
    heading: 'Will you join us?',
    kicker: 'RSVP',
    deadline: '1 October 2027',
    maxGuests: 6,
    dietary: ['No preference', 'Vegetarian', 'Vegan', 'Jain', 'Gluten-free', 'Nut allergy', 'Other (tell us below)'],
    // Connect a real backend: set endpoint to a URL (Formspree, Google Apps Script, your API...).
    // Leave empty to run the polished demo submission.
    endpoint: '',
    successMessage: 'Your response has been received. We cannot wait to celebrate with you.',
  },

  closing: {
    image: img('closing'),
    imageAlt: 'Vihaan and Saanvi laughing together beneath palm trees',
    headline: 'Can’t wait to celebrate with you.',
    signoff: 'With love, Vihaan & Saanvi',
  },

  whatsapp: {
    message:
      'You are invited! 💛 Vihaan & Saanvi are getting married on 22 November 2027 in Goa. Open the invitation: ',
  },

  // Set `src` to an mp3 path/URL (e.g. '/audio/wedding.mp3') to use a real track.
  // When empty, a soft generative ambient score (Web Audio) is used instead.
  music: { src: '', volume: 0.5, label: 'Ambient score' },

  seo: {
    title: 'Vihaan & Saanvi — The Coastal Romance | 22 November 2027, Goa',
    description:
      'Together with their families, Vihaan & Saanvi invite you to celebrate their wedding on 22 November 2027 at Taj Cidade de Goa Heritage, Goa, India.',
  },
}

export const navLinks = [
  { id: 'couple', label: 'The Couple' },
  { id: 'story', label: 'Our Story' },
  { id: 'events', label: 'Events' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'venue', label: 'Venue' },
  { id: 'rsvp', label: 'RSVP' },
]
