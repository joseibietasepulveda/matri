export type Hotel = {
  name: string;
  distance?: string;
  description?: string;
  url?: string;
};

export type Guest = {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  rsvp?: 'yes' | 'no' | 'pending';
  guestsCount?: number;
  meal?: string;
  note?: string;
  photoUrl?: string;
};

export type EventItem = {
  id: string;
  title: string;
  description?: string;
  start?: string; // ISO string
  end?: string; // ISO string
  location?: string;
};

export type Images = {
  cover?: string;
  couple?: string[];
  venue?: string[];
  gallery?: string[];
};

export type WeddingConfig = {
  coupleName: string;
  weddingDate: string;
  weddingDateLabel?: string;
  weddingTime?: string;
  venueName?: string;
  venueDescription?: string;
  venueAddress?: string;
  googleMapsUrl?: string;
  wazeUrl?: string;
  calendarTitle?: string;
  calendarDescription?: string;
  calendarLocation?: string;
  calendarStartDate?: string;
  calendarEndDate?: string;
  calendarFile?: string;
  spotifyPlaylistUrl?: string;
  sharedAlbumUrl?: string;
  whatsappShareUrl?: string;
  whatsappContactUrl?: string;
  hotels?: Hotel[];
  dressCode?: string;
  formEndpoint?: string;
  dressNotes?: string[];
  gratitudeText?: string;
  footerSignature?: string;
  images?: Images;
  guests?: Guest[];
  events?: EventItem[];
};

export const weddingConfig: WeddingConfig = {
  coupleName: "Rosario & José Ignacio",
  weddingDate: "2027-02-20T17:30:00-03:00",
  weddingDateLabel: "20 DE FEBRERO DE 2027",
  weddingTime: "17:30 hrs a 04:00 hrs",
  venueName: "Viñedos Torreón de Paredes",
  venueDescription: "Una celebración íntima y elegante rodeada de naturaleza y buena compañía.",
  venueAddress: "Las Nieves, SN, Rengo, Región de O´Higgins",
  googleMapsUrl:
    "https://www.google.com/maps/place/Vi%C3%B1edos+Torreon+de+Paredes/@-34.4061997,-70.8292092,17z/data=!3m1!4b1!4m6!3m5!1s0x96649f96102a6f6b:0xb78cd14d8f2d81ef!8m2!3d-34.4062042!4d-70.8266343!16s%252Fg%252F11xfx8d9p?hl=es-cl&entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D",
  wazeUrl: "https://waze.com/ul?q=Vi%C3%B1edos+Torreon+de+Paredes&Rengo%2C+Regi%C3%B3n+de+O%E2%80%99Higgins&navigate=yes",
  calendarTitle: "Matrimonio Rosario & Ignacio",
  calendarDescription: "Matrimonio en Rengo",
  calendarLocation: "Viñedos Torreón de Paredes, Rengo, Región de O´Higgins",
  calendarStartDate: "20270220T173000",
  calendarEndDate: "20270221T040000",
  calendarFile: "/rosario-ignacio.ics",
  spotifyPlaylistUrl: "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M?si=74f0b9909843472d",
  sharedAlbumUrl: "https://drive.google.com/drive/folders/1ABC123xyz",
  whatsappShareUrl: "https://wa.me/?text=Te%20invito%20a%20compartir%20este%20d%C3%ADa%20tan%20especial%20con%20nosotros%20Rosario%20%26%20Ignacio.",
  whatsappContactUrl: "https://wa.me/56912345678?text=Hola%2C%20necesito%20coordinar%20transporte%20para%20el%20matrimonio.",
  hotels: [
    {
      name: "Hotel Ontiveros",
      distance: "25 min",
      description: "Ideal para quienes buscan comodidad y acceso sencillo al evento.",
      url: "https://www.example.com/hotel-cumbres",
    },
    {
      name: "Hotel Viña Casa Silva",
      distance: "20 min",
      description: "Una opción elegante y tranquila para disfrutar de la zona.",
      url: "https://www.example.com/the-olive-house",
    },
    {
      name: "Hotel Boutique Santa Teresita",
      distance: "20 min",
      description: "Perfecto para una estadía íntima y acogedora cerca del matrimonio.",
      url: "https://www.example.com/casa-de-altura",
    }
  ],
  dressCode: "Tenida formal",
  formEndpoint: "/api/confirm",
  dressNotes: [],
  gratitudeText: "Estamos muy felices de celebrar este día junto a ustedes.",
  footerSignature: "Rosario & Ignacio",
  images: {
    cover: "/images/wedding/cover.jpg",
    couple: ["/images/wedding/couple-1.jpg", "/images/wedding/couple-2.jpg"],
    venue: ["/images/wedding/venue-1.jpg"],
    gallery: [],
  },
  guests: [],
  events: [
    {
      id: "ceremony",
      title: "Ceremonia",
      description: "Ceremonia civil en los jardines",
      start: "2027-02-20T17:30:00-03:00",
      end: "2027-02-20T18:00:00-03:00",
      location: "Jardines Viñedos Torreón de Paredes",
    },
    {
      id: "reception",
      title: "Recepción",
      description: "Aperitivo y cena seguido de fiesta",
      start: "2027-02-20T19:00:00-03:00",
      end: "2027-02-21T04:00:00-03:00",
      location: "Salón principal",
    }
  ],
};

export function findGuestById(id: string, list: Guest[] = weddingConfig.guests || []) {
  return list.find((g) => g.id === id) || null;
}

export function rsvpCount(list: Guest[] = weddingConfig.guests || []) {
  return list.reduce((acc, g) => {
    if (g.rsvp === 'yes') return acc + (g.guestsCount || 1);
    return acc;
  }, 0);
}

export function upcomingEvents(now = new Date().toISOString(), items: EventItem[] = weddingConfig.events || []) {
  return items.filter((e) => e.start && e.start > now).sort((a, b) => (a.start! > b.start! ? 1 : -1));
}