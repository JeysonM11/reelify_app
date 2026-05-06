const buildSvgDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const genres = [
  "Action",
  "Adventure",
  "Animation",
  "Crime",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

const makePoster = ({ title, symbol, accent, secondary, third }) =>
  buildSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1080">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="55%" stop-color="${secondary}"/>
          <stop offset="100%" stop-color="${third}"/>
        </linearGradient>
        <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(0,0,0,0.05)"/>
          <stop offset="100%" stop-color="rgba(0,0,0,0.55)"/>
        </linearGradient>
      </defs>
      <rect width="720" height="1080" fill="url(#bg)"/>
      <circle cx="560" cy="180" r="210" fill="rgba(255,255,255,0.12)"/>
      <circle cx="150" cy="930" r="240" fill="rgba(0,0,0,0.18)"/>
      <path d="M0 760C140 650 250 630 372 690C470 739 562 750 720 690V1080H0Z" fill="rgba(0,0,0,0.18)"/>
      <rect x="60" y="60" width="600" height="960" rx="44" fill="none" stroke="rgba(255,255,255,0.28)" stroke-width="2"/>
      <rect x="86" y="86" width="548" height="908" rx="34" fill="url(#fade)"/>
      <text x="98" y="168" fill="rgba(255,255,255,0.72)" font-family="Arial, Helvetica, sans-serif" font-size="32" letter-spacing="6">REELIFY</text>
      <text x="98" y="430" fill="white" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700">${title}</text>
      <text x="98" y="520" fill="rgba(255,255,255,0.86)" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="4">${symbol}</text>
      <text x="98" y="860" fill="rgba(255,255,255,0.85)" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3">CINEMATIC EDITION</text>
      <text x="98" y="910" fill="rgba(255,255,255,0.6)" font-family="Arial, Helvetica, sans-serif" font-size="20">Original editorial artwork</text>
    </svg>
  `);

const makeAvatar = (initials, accent, shadow) =>
  buildSvgDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${shadow}"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="36" fill="url(#avatarBg)"/>
      <circle cx="60" cy="50" r="22" fill="rgba(255,255,255,0.88)"/>
      <path d="M28 104c6-20 20-30 32-30s26 10 32 30" fill="rgba(255,255,255,0.88)"/>
      <text x="60" y="79" text-anchor="middle" fill="#0E0E0E" font-family="Arial, Helvetica, sans-serif" font-size="34" font-weight="700">${initials}</text>
    </svg>
  `);

export const users = [
  { id: "u-ava", name: "Ava Moreno", avatar: makeAvatar("AM", "#E8A020", "#7A4F08"), joinedAt: "2024-03-18" },
  { id: "u-eli", name: "Eli Navarro", avatar: makeAvatar("EN", "#55B7A4", "#154B45"), joinedAt: "2023-11-02" },
  { id: "u-lina", name: "Lina Park", avatar: makeAvatar("LP", "#CF8460", "#7C3526"), joinedAt: "2025-01-27" },
];

export const movies = [
  { id: "m-nocturne-protocol", title: "Nocturne Protocol", genre: ["Sci-Fi", "Thriller"], year: 2025, director: "Mara Volkov", poster: makePoster({ title: "Nocturne\nProtocol", symbol: "// SIGNAL LOST", accent: "#E8A020", secondary: "#4A3420", third: "#121212" }), synopsis: "A signal analyst in a coastal megacity discovers a hidden protocol that can rewrite memory, identity, and the politics of the night.", avgRating: 0 },
  { id: "m-gilded-echo", title: "The Gilded Echo", genre: ["Drama", "Mystery"], year: 2024, director: "Jonas Akechi", poster: makePoster({ title: "The Gilded\nEcho", symbol: "// A LOST RECORD", accent: "#CC8A53", secondary: "#33231B", third: "#0E0E0E" }), synopsis: "A newspaper archivist rebuilds a vanished scandal from fragments, uncovering an intimate story hidden inside a national myth.", avgRating: 0 },
  { id: "m-iron-luna", title: "Iron Luna", genre: ["Action", "Sci-Fi"], year: 2023, director: "Nadia Rahman", poster: makePoster({ title: "Iron Luna", symbol: "// LUNAR ASSAULT", accent: "#A17739", secondary: "#262A31", third: "#050505" }), synopsis: "Mercenary pilots defend a moon colony after a corporate siege turns the mining ring into a battlefield of neon dust and steel.", avgRating: 0 },
  { id: "m-midnight-courier", title: "Midnight Courier", genre: ["Crime", "Drama"], year: 2024, director: "Paolo De Santis", poster: makePoster({ title: "Midnight\nCourier", symbol: "// DO NOT DELIVER", accent: "#9B5132", secondary: "#1D1716", third: "#090909" }), synopsis: "A motorcycle courier becomes the only witness to a deal that implicates judges, crime families, and his own missing brother.", avgRating: 0 },
  { id: "m-velvet-orbit", title: "Velvet Orbit", genre: ["Romance", "Sci-Fi"], year: 2025, director: "Sana Ito", poster: makePoster({ title: "Velvet\nOrbit", symbol: "// LOVE ON LOOP", accent: "#D28C63", secondary: "#2B2031", third: "#111111" }), synopsis: "Two orbital designers fall for each other while building a resort that can only exist in zero gravity.", avgRating: 0 },
  { id: "m-ashen-orchard", title: "Ashen Orchard", genre: ["Horror", "Mystery"], year: 2022, director: "Elara Finch", poster: makePoster({ title: "Ashen\nOrchard", symbol: "// THE TREES REMEMBER", accent: "#7C5A2F", secondary: "#1A1712", third: "#060606" }), synopsis: "A family estate grows silent after harvest, except for the orchard trees that begin returning voices from the dead.", avgRating: 0 },
  { id: "m-celestial-run", title: "Celestial Run", genre: ["Adventure", "Action"], year: 2023, director: "Rico Alvarez", poster: makePoster({ title: "Celestial\nRun", symbol: "// HORIZON CHASE", accent: "#B97A2A", secondary: "#16222D", third: "#050505" }), synopsis: "Smugglers cross a desert planet during a storm that reveals a buried route to a city lost in the clouds.", avgRating: 0 },
  { id: "m-the-last-gallery", title: "The Last Gallery", genre: ["Drama", "Fantasy"], year: 2024, director: "Mila Stern", poster: makePoster({ title: "The Last\nGallery", symbol: "// PAINTED MEMORY", accent: "#C88F5A", secondary: "#28312B", third: "#0D0D0D" }), synopsis: "Inside a museum that closes forever, an artist discovers the canvases are portals to the lives of the people who viewed them.", avgRating: 0 },
  { id: "m-ghost-market", title: "Ghost Market", genre: ["Crime", "Thriller"], year: 2025, director: "Ibrahim Noor", poster: makePoster({ title: "Ghost\nMarket", symbol: "// NIGHT EXCHANGE", accent: "#927040", secondary: "#231C1B", third: "#080808" }), synopsis: "An investigator tracks a black-market auction where the items being sold include evidence, secrets, and a future mayor.", avgRating: 0 },
  { id: "m-blue-atlas", title: "Blue Atlas", genre: ["Animation", "Adventure"], year: 2022, director: "Tessa Ori", poster: makePoster({ title: "Blue\nAtlas", symbol: "// CARTOGRAPHY OF WONDER", accent: "#5E9CD4", secondary: "#1D3557", third: "#08111F" }), synopsis: "A cartographer fox and a retired pilot map the sky islands that drift across a young ocean world.", avgRating: 0 },
  { id: "m-salt-anthem", title: "Salt Anthem", genre: ["Drama", "Music"], year: 2023, director: "Lucia Vale", poster: makePoster({ title: "Salt\nAnthem", symbol: "// CHORUS OF TIDE", accent: "#C28A67", secondary: "#243741", third: "#090909" }), synopsis: "A retired vocalist returns to a harbor town to record one final album as the sea rises around the family dock.", avgRating: 0 },
  { id: "m-iron-choir", title: "Iron Choir", genre: ["Action", "Drama"], year: 2021, director: "Dario Kwon", poster: makePoster({ title: "Iron\nChoir", symbol: "// BROKEN HARMONY", accent: "#A96E43", secondary: "#171717", third: "#070707" }), synopsis: "A once-famous stunt team reunites for one impossible performance that may save their neighborhood from demolition.", avgRating: 0 },
  { id: "m-winter-archive", title: "Winter Archive", genre: ["Mystery", "Drama"], year: 2024, director: "Nora Bell", poster: makePoster({ title: "Winter\nArchive", symbol: "// RECORDS IN ICE", accent: "#88A0B7", secondary: "#2B3440", third: "#0A0A0A" }), synopsis: "A municipal clerk uncovers a sealed archive that rewrites the history of a small town over a single winter.", avgRating: 0 },
  { id: "m-crimson-drift", title: "Crimson Drift", genre: ["Action", "Thriller"], year: 2025, director: "Ayumi Sato", poster: makePoster({ title: "Crimson\nDrift", symbol: "// REDLINE PURSUIT", accent: "#9A5B3A", secondary: "#221619", third: "#080808" }), synopsis: "A diplomat races through a floodlit port city after stealing the only copy of a treaty that could trigger war.", avgRating: 0 },
  { id: "m-moonlit-index", title: "Moonlit Index", genre: ["Fantasy", "Romance"], year: 2022, director: "Anya Greer", poster: makePoster({ title: "Moonlit\nIndex", symbol: "// A LIBRARY OF SPELLS", accent: "#C18B4F", secondary: "#2B2436", third: "#0B0B0B" }), synopsis: "A librarian finds a catalog that records every love story ever lost inside the pages of impossible books.", avgRating: 0 },
  { id: "m-ember-city", title: "Ember City", genre: ["Sci-Fi", "Drama"], year: 2021, director: "Theo Mercer", poster: makePoster({ title: "Ember\nCity", symbol: "// AFTER THE FIRE", accent: "#D07A36", secondary: "#172029", third: "#050505" }), synopsis: "Years after a solar flare, a city survives on reflection towers and one engineer who still believes the skyline can be rebuilt.", avgRating: 0 },
  { id: "m-sable-runway", title: "Sable Runway", genre: ["Crime", "Romance"], year: 2023, director: "Camila Ortega", poster: makePoster({ title: "Sable\nRunway", symbol: "// LOVE IN FLIGHT", accent: "#D19B63", secondary: "#221D1B", third: "#0A0A0A" }), synopsis: "At an airport built over a forgotten marsh, a customs officer and a jewel thief keep missing the same departure.", avgRating: 0 },
  { id: "m-lantern-district", title: "Lantern District", genre: ["Animation", "Fantasy"], year: 2025, director: "Mori Tanaka", poster: makePoster({ title: "Lantern\nDistrict", symbol: "// CITY OF GLOW", accent: "#E8A020", secondary: "#2A2A31", third: "#090909" }), synopsis: "A girl and her lantern-shaped robot restore color to a city where night has been outlawed.", avgRating: 0 },
  { id: "m-quiet-signal", title: "Quiet Signal", genre: ["Mystery", "Sci-Fi"], year: 2024, director: "Isla Vaughn", poster: makePoster({ title: "Quiet\nSignal", symbol: "// TRANSMISSION RECEIVED", accent: "#6BA1A8", secondary: "#13252A", third: "#060606" }), synopsis: "A radio engineer follows a repeating emergency broadcast that appears to originate from tomorrow.", avgRating: 0 },
  { id: "m-skyline-afterglow", title: "Skyline Afterglow", genre: ["Drama", "Romance"], year: 2025, director: "Felix Moreau", poster: makePoster({ title: "Skyline\nAfterglow", symbol: "// LAST LIGHT", accent: "#BE7B59", secondary: "#2A2634", third: "#090909" }), synopsis: "Two former photographers reunite to shoot the city they once loved before a farewell festival erases it forever.", avgRating: 0 },
];

export const reviews = [
  { id: "r-001", userId: "u-ava", movieId: "m-nocturne-protocol", rating: 5, comment: "Precision, dread, and elegance. It feels like a future that remembers how to haunt you.", createdAt: "2026-05-04T21:10:00Z" },
  { id: "r-002", userId: "u-eli", movieId: "m-nocturne-protocol", rating: 4, comment: "The visual language is immaculate. I wanted one more emotional beat at the end.", createdAt: "2026-04-28T18:40:00Z" },
  { id: "r-003", userId: "u-lina", movieId: "m-nocturne-protocol", rating: 5, comment: "Smart, tense, and beautifully structured. No wasted frame.", createdAt: "2026-05-02T14:26:00Z" },
  { id: "r-004", userId: "u-ava", movieId: "m-gilded-echo", rating: 5, comment: "A meticulous slow burn with gorgeous texture and a devastating final act.", createdAt: "2026-05-01T22:02:00Z" },
  { id: "r-005", userId: "u-eli", movieId: "m-gilded-echo", rating: 4, comment: "Loved the editorial rhythm. The mystery unfolds with real confidence.", createdAt: "2026-04-19T19:55:00Z" },
  { id: "r-006", userId: "u-lina", movieId: "m-gilded-echo", rating: 4, comment: "More melancholy than I expected, which made it better.", createdAt: "2026-04-30T17:31:00Z" },
  { id: "r-007", userId: "u-ava", movieId: "m-iron-luna", rating: 4, comment: "Big scale, clean choreography, and a killer midnight skyline.", createdAt: "2026-05-05T08:12:00Z" },
  { id: "r-008", userId: "u-eli", movieId: "m-iron-luna", rating: 5, comment: "The moon base siege is pure cinema. Loud in the best possible way.", createdAt: "2026-05-03T23:18:00Z" },
  { id: "r-009", userId: "u-lina", movieId: "m-iron-luna", rating: 4, comment: "A little brutal, very stylish, and absolutely memorable.", createdAt: "2026-05-04T12:08:00Z" },
  { id: "r-010", userId: "u-ava", movieId: "m-midnight-courier", rating: 5, comment: "Neo-noir with a heartbeat. I stayed for the mood and the momentum.", createdAt: "2026-04-21T11:16:00Z" },
  { id: "r-011", userId: "u-eli", movieId: "m-midnight-courier", rating: 4, comment: "The city feels alive. The courier route is an amazing device.", createdAt: "2026-05-01T09:06:00Z" },
  { id: "r-012", userId: "u-lina", movieId: "m-midnight-courier", rating: 4, comment: "I liked how every reveal stayed grounded in character.", createdAt: "2026-05-02T15:44:00Z" },
  { id: "r-013", userId: "u-ava", movieId: "m-velvet-orbit", rating: 4, comment: "Tender and immaculate. The zero-g staging is unreal.", createdAt: "2026-04-22T20:05:00Z" },
  { id: "r-014", userId: "u-eli", movieId: "m-velvet-orbit", rating: 5, comment: "A romantic concept film that somehow still feels intimate.", createdAt: "2026-05-04T19:22:00Z" },
  { id: "r-015", userId: "u-lina", movieId: "m-velvet-orbit", rating: 4, comment: "I bought every glance. Beautiful production design.", createdAt: "2026-05-03T07:50:00Z" },
  { id: "r-016", userId: "u-ava", movieId: "m-ashen-orchard", rating: 5, comment: "One of the best haunted-house setups I have seen in years.", createdAt: "2026-05-04T10:20:00Z" },
  { id: "r-017", userId: "u-eli", movieId: "m-ashen-orchard", rating: 4, comment: "The sound design is doing heroic work here.", createdAt: "2026-05-01T21:33:00Z" },
  { id: "r-018", userId: "u-lina", movieId: "m-ashen-orchard", rating: 4, comment: "Cold, patient, and unnerving. Very effective.", createdAt: "2026-05-02T18:41:00Z" },
  { id: "r-019", userId: "u-ava", movieId: "m-celestial-run", rating: 4, comment: "A pure chase picture with enough wonder to feel bigger than the plot.", createdAt: "2026-04-23T13:44:00Z" },
  { id: "r-020", userId: "u-eli", movieId: "m-celestial-run", rating: 5, comment: "Fast, clear, and cinematic. Great use of scale and motion.", createdAt: "2026-04-25T16:05:00Z" },
  { id: "r-021", userId: "u-lina", movieId: "m-celestial-run", rating: 4, comment: "Adventure first, but the geography is the real star.", createdAt: "2026-05-03T22:01:00Z" },
  { id: "r-022", userId: "u-ava", movieId: "m-the-last-gallery", rating: 5, comment: "A love letter to art spaces and the people who disappear inside them.", createdAt: "2026-04-29T08:34:00Z" },
  { id: "r-023", userId: "u-eli", movieId: "m-the-last-gallery", rating: 4, comment: "Quietly magical. The concept is elegant and strange.", createdAt: "2026-05-02T20:18:00Z" },
  { id: "r-024", userId: "u-lina", movieId: "m-the-last-gallery", rating: 5, comment: "This is the sort of drama that makes small gestures feel enormous.", createdAt: "2026-05-05T13:09:00Z" },
  { id: "r-025", userId: "u-ava", movieId: "m-ghost-market", rating: 4, comment: "Sharp, humid, and always one step ahead of you.", createdAt: "2026-05-05T14:50:00Z" },
  { id: "r-026", userId: "u-eli", movieId: "m-ghost-market", rating: 4, comment: "Great conspiracy texture. I wanted one more chase sequence.", createdAt: "2026-04-24T09:15:00Z" },
  { id: "r-027", userId: "u-lina", movieId: "m-ghost-market", rating: 5, comment: "Noir with real visual confidence. The auction scene rules.", createdAt: "2026-05-01T17:20:00Z" },
  { id: "r-028", userId: "u-ava", movieId: "m-blue-atlas", rating: 5, comment: "Utterly charming. The worldbuilding is gentle but detailed.", createdAt: "2026-04-20T10:01:00Z" },
  { id: "r-029", userId: "u-eli", movieId: "m-blue-atlas", rating: 4, comment: "Beautiful for all ages without talking down to anyone.", createdAt: "2026-05-04T16:35:00Z" },
  { id: "r-030", userId: "u-lina", movieId: "m-blue-atlas", rating: 4, comment: "The color script is the whole victory here.", createdAt: "2026-05-04T18:11:00Z" },
  { id: "r-031", userId: "u-ava", movieId: "m-salt-anthem", rating: 4, comment: "Tender, atmospheric, and full of lived-in detail.", createdAt: "2026-04-18T22:24:00Z" },
  { id: "r-032", userId: "u-eli", movieId: "m-salt-anthem", rating: 5, comment: "The score alone is worth the watch. Very moving.", createdAt: "2026-05-03T11:14:00Z" },
  { id: "r-033", userId: "u-lina", movieId: "m-salt-anthem", rating: 4, comment: "Resonant, restrained, and nicely observed.", createdAt: "2026-05-02T06:47:00Z" },
  { id: "r-034", userId: "u-ava", movieId: "m-ember-city", rating: 4, comment: "A world with texture. The afterglow palette is gorgeous.", createdAt: "2026-05-04T09:30:00Z" },
  { id: "r-035", userId: "u-eli", movieId: "m-ember-city", rating: 5, comment: "Big emotional architecture. I loved the rebuilt skyline imagery.", createdAt: "2026-05-04T21:48:00Z" },
  { id: "r-036", userId: "u-lina", movieId: "m-ember-city", rating: 4, comment: "Poised between grief and hope in a way that works.", createdAt: "2026-04-27T18:11:00Z" },
  { id: "r-037", userId: "u-ava", movieId: "m-quiet-signal", rating: 5, comment: "This is the kind of mystery that keeps rearranging itself in your head.", createdAt: "2026-05-03T20:02:00Z" },
  { id: "r-038", userId: "u-eli", movieId: "m-quiet-signal", rating: 4, comment: "Conceptually ambitious and visually cold in a good way.", createdAt: "2026-05-01T13:42:00Z" },
  { id: "r-039", userId: "u-lina", movieId: "m-skyline-afterglow", rating: 4, comment: "A graceful farewell piece. The chemistry is subtle and real.", createdAt: "2026-05-05T08:58:00Z" },
  { id: "r-040", userId: "u-ava", movieId: "m-skyline-afterglow", rating: 5, comment: "This feels like the last song at the best party you ever attended.", createdAt: "2026-05-05T09:17:00Z" },
];

export const appSeed = { users, movies, reviews, activeUserId: "u-ava" };
