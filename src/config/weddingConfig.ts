export interface BilingualString {
  en: string;
  ml: string;
}

export interface ScheduleEvent {
  time: BilingualString;
  title: BilingualString;
  description?: BilingualString;
}

export interface Guest {
  guestId: string;
  guestName: BilingualString;
}

export interface WeddingConfig {
  brideName: BilingualString;
  groomName: BilingualString;
  brideNameShort: string;
  groomNameShort: string;
  brideParents: {
    father: BilingualString;
    mother: BilingualString;
  };
  groomParents: {
    father: BilingualString;
    mother: BilingualString;
  };
  weddingDate: string; // ISO format string
  weddingTimeRange: BilingualString;
  venueName: BilingualString;
  venueAddress: BilingualString;
  googleMapsLink: string;
  brideResidenceName: BilingualString;
  brideResidenceAddress: BilingualString;
  brideResidenceMapsLink: string;
  groomResidenceAddress: BilingualString;
  contactNumbers: { name: string; relation: string; number: string }[];
  invitationMessage: BilingualString;
  photoUrls: string[];
  musicUrl: string;
  weddingSchedule: ScheduleEvent[];
  guestList: Record<string, Guest>;
}

export const weddingConfig: WeddingConfig = {
  brideName: {
    en: "Keerthana S Vijaya",
    ml: "കീർത്തന എസ്. വിജയ"
  },
  groomName: {
    en: "Sreerag Krishna",
    ml: "ശ്രീരാഗ് കൃഷ്ണ"
  },
  brideNameShort: "K",
  groomNameShort: "S",
  brideParents: {
    father: {
      en: "Vijayakumar K K",
      ml: "വിജയകുമാർ കെ. കെ."
    },
    mother: {
      en: "Sindhu M R",
      ml: "സിന്ധു എം. ആർ."
    }
  },
  groomParents: {
    father: {
      en: "Radhakrishna Pillai",
      ml: "രാധാകൃഷ്ണ പിള്ള"
    },
    mother: {
      en: "Sailaja",
      ml: "ശൈലജ"
    }
  },
  weddingDate: "2026-09-13T10:00:00+05:30", // Sept 13, 2026, 10:00 AM IST
  weddingTimeRange: {
    en: "between 10:00 AM and 10:30 AM",
    ml: "രാവിലെ 10:00 നും 10:30 നും ഇടയിൽ"
  },
  venueName: {
    en: "Nanak Convention Centre",
    ml: "നാനാക് കൺവെൻഷൻ സെന്റർ"
  },
  venueAddress: {
    en: "SH 1, Pandalam, Kerala, 689501",
    ml: "എസ്.എച്ച്. 1, പന്തളം, കേരളം, 689501"
  },
  googleMapsLink: "https://maps.app.goo.gl/hgUgEXbaWSrkrKGR7",
  brideResidenceName: {
    en: "VijayaBhavanam",
    ml: "വിജയഭവനം"
  },
  brideResidenceAddress: {
    en: "Punthala, Venmony, Alappuzha",
    ml: "പൂന്തല, വെൺമണി, ആലപ്പുഴ"
  },
  brideResidenceMapsLink: "https://maps.app.goo.gl/Qnd4EoiXG8mhRa3i8?g_st=aw",
  groomResidenceAddress: {
    en: "Saikripa, Kuttemperoor, Mannar",
    ml: "സായികൃപ, കുറ്റമ്പേരൂർ, മാന്നാർ"
  },
  contactNumbers: [
    { name: "Vijayakumar K. K.", relation: "Bride's Family", number: "+91 9744724785" },
    { name: "Radhakrishna Pillai", relation: "Groom's Family", number: "+91 8301984598" }
  ],
  invitationMessage: {
    en: "With the divine blessings of our ancestors and families, we cordially invite you to celebrate our wedding and grace the occasion with your esteemed presence and blessings.",
    ml: "ഞങ്ങളുടെ പൂർവികരുടെയും കുടുംബാംഗങ്ങളുടെയും അനുഗ്രഹത്തോടെ, ഈ വിവാഹമംഗളത്തിൽ പങ്കുചേരുവാനും നിങ്ങളുടെ മംഗളകരമായ സാന്നിധ്യത്താൽ ഈ ചടങ്ങ് ധന്യമാക്കുവാനും നിങ്ങളെ സ്നേഹപൂർവ്വം ക്ഷണിക്കുന്നു."
  },
  photoUrls: [
    "/images/kerala_decor.png",
    "/images/kerala_couple_new.png",
    "/images/kerala_venue.png"
  ],
  musicUrl: "/Neelashalabame.mp3",
  weddingSchedule: [
    {
      time: { en: "10:00 AM - 10:30 AM", ml: "രാവിലെ 10:00 - 10:30" },
      title: { en: "Muhurtham (Wedding Ceremony)", ml: "മുഹൂർത്തം (താലികെട്ട് ചടങ്ങ്)" },
      description: { en: "The sacred marriage ritual and Thalikettu ceremony at Nanak Convention Centre.", ml: "നാനാക് കൺവെൻഷൻ സെന്ററിൽ വെച്ച് നടക്കുന്ന പ്രധാന ചടങ്ങായ താലികെട്ട് കർമ്മം." }
    },
    {
      time: { en: "11:30 AM onwards", ml: "രാവിലെ 11:30 മുതൽ" },
      title: { en: "Traditional Kerala Sadhya", ml: "പരമ്പരാഗത സദ്യ" },
      description: { en: "A grand traditional vegetarian feast served on banana leaves.", ml: "വാഴയിലയിൽ വിളമ്പുന്ന വിഭവസമൃദ്ധമായ വിവാഹ സദ്യ." }
    },
    {
      time: { en: "3:00 PM onwards", ml: "വൈകുന്നേരം 3:00 മുതൽ" },
      title: { en: "Wedding Reception", ml: "വിവാഹ സൽക്കാരം" },
      description: { en: "Celebratory gathering and reception at the venue.", ml: "വരവേൽപ്പ് ചടങ്ങുകളും സ്നേഹവിരുന്നും." }
    }
  ],
  guestList: {
    "G001": {
      guestId: "G001",
      guestName: { en: "Rahul and Family", ml: "രാഹുൽ കൂടാതെ കുടുംബാംഗങ്ങളും" }
    },
    "G002": {
      guestId: "G002",
      guestName: { en: "Keerthi and Family", ml: "കീർത്തി കൂടാതെ കുടുംബാംഗങ്ങളും" }
    },
    "G003": {
      guestId: "G003",
      guestName: { en: "Priya", ml: "പ്രിയ" }
    },
    "G004": {
      guestId: "G004",
      guestName: { en: "Dr. Sandeep Kumar", ml: "ഡോ. സന്ദീപ് കുമാർ" }
    },
    "G005": {
      guestId: "G005",
      guestName: { en: "Devadathan", ml: "ദേവദത്തൻ" }
    }
  }
};
export default weddingConfig;
