const escapeXml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");

const hashString = (value) => {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
};

const pickColors = (seed) => {
  const palette = [
    ["#E8A020", "#5A3411", "#101010"],
    ["#D57A2A", "#36231A", "#0B0B0B"],
    ["#CFA057", "#2B2017", "#090909"],
    ["#9B6736", "#231A15", "#070707"],
    ["#B4833E", "#302414", "#0A0A0A"],
  ];

  return palette[hashString(seed) % palette.length];
};

const buildDataUri = (svg) => `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;

export const generatePosterDataUri = ({ title, subtitle = "", accentSeed = "" }) => {
  const [accent, secondary, tertiary] = pickColors(`${title}-${accentSeed}`);
  const safeTitle = escapeXml(title || "Untitled");
  const safeSubtitle = escapeXml(subtitle || "CINEMATIC EDITION");

  return buildDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 1080">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="55%" stop-color="${secondary}"/>
          <stop offset="100%" stop-color="${tertiary}"/>
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
      <text x="98" y="430" fill="white" font-family="Georgia, 'Times New Roman', serif" font-size="78" font-weight="700">${safeTitle}</text>
      <text x="98" y="520" fill="rgba(255,255,255,0.86)" font-family="Arial, Helvetica, sans-serif" font-size="28" letter-spacing="4">${safeSubtitle}</text>
      <text x="98" y="860" fill="rgba(255,255,255,0.85)" font-family="Arial, Helvetica, sans-serif" font-size="24" letter-spacing="3">CINEMATIC EDITION</text>
      <text x="98" y="910" fill="rgba(255,255,255,0.6)" font-family="Arial, Helvetica, sans-serif" font-size="20">Original editorial artwork</text>
    </svg>
  `);
};

export const generateAvatarDataUri = ({ name, accentSeed = "" }) => {
  const initials = (name || "Viewer")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0] || "V")
    .join("")
    .toUpperCase();
  const [accent, secondary] = pickColors(`${name}-${accentSeed}`);

  return buildDataUri(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <defs>
        <linearGradient id="avatarBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}"/>
          <stop offset="100%" stop-color="${secondary}"/>
        </linearGradient>
      </defs>
      <rect width="120" height="120" rx="32" fill="url(#avatarBg)"/>
      <text 
        x="60" 
        y="65" 
        text-anchor="middle" 
        dominant-baseline="middle" 
        fill="white" 
        font-family="Arial, Helvetica, sans-serif" 
        font-size="48" 
        font-weight="900"
        style="text-shadow: 0 4px 12px rgba(0,0,0,0.2)"
      >${escapeXml(initials)}</text>
    </svg>
  `);
};
