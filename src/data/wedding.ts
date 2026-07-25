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
  youtubeMusicPlaylistUrl?: string;
  sharedAlbumUrl?: string;
  whatsappGroupUrl?: string;
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
  weddingDate: "2027-02-20T18:30:00-03:00",
  weddingDateLabel: "20 DE FEBRERO DE 2027",
  weddingTime: "17:30 hrs a 04:00 hrs",
  venueName: "Viñedos Torreón de Paredes",
  venueDescription: "Una celebración íntima y elegante rodeada de naturaleza y buena compañía.",
  venueAddress: "Las Nieves, SN, Rengo, Región de O´Higgins",
  googleMapsUrl:
    "https://www.google.com/maps/place/Vi%C3%B1edos+Torreon+de+Paredes/@-34.4061997,-70.8292092,17z/data=!3m1!4b1!4m6!3m5!1s0x96649f96102a6f6b:0xb78cd14d8f2d81ef!8m2!3d-34.4062042!4d-70.8266343!16s%252Fg%252F11xfx8d9p?hl=es-cl&entry=ttu&g_ep=EgoyMDI2MDcxNC4wIKXMDSoASAFQAw%3D%3D",
  wazeUrl: "https://waze.com/ul?ll=-34.4062042%2C-70.8266343&navigate=yes&zoom=17",
  calendarTitle: "Matrimonio Rosario & Ignacio",
  calendarDescription: "Matrimonio en Rengo",
  calendarLocation: "Viñedos Torreón de Paredes, Rengo, Región de O´Higgins",
  calendarStartDate: "20270220T183000",
  calendarEndDate: "20270221T050000",
  calendarFile: "/rosario-ignacio.ics",
  youtubeMusicPlaylistUrl: "https://music.youtube.com/playlist?list=PLYTAt1dPospo&jct=Ew4DF4zE5hu8Bdr7-Pc8OQ",
  sharedAlbumUrl: "https://photos.app.goo.gl/r4JitWdmZpBjNkmQ6",
  whatsappGroupUrl: "https://chat.whatsapp.com/IrBJdzXdZGMJKAVVfPWSGm?s=sw&p=i&ilr=0",
  whatsappShareUrl: "https://wa.me/?text=Te%20invito%20a%20compartir%20este%20d%C3%ADa%20tan%20especial%20con%20nosotros%20Rosario%20%26%20Ignacio.",
  whatsappContactUrl: "https://wa.me/56912345678?text=Hola%2C%20necesito%20coordinar%20transporte%20para%20el%20matrimonio.",
  hotels: [
    {
      name: "Hotel Ontiveros",
      distance: "25 min",
      url: "https://www.booking.com/hotel/cl/ontiveros-san-fernando.es.html?aid=318615&label=Spanish_Chile_ES_CL_21461610385-hXKRja6GSeh%2Ag57L9Njh0AS637942154639%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-912298704641%3Alp1003325%3Ali%3Adec%3Adm%3Aag21461610385%3Acmp340119025&sid=6d165b09cdf32359d74d2a56f91b0985&dest_id=-900285&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1784321849&srpvid=a9d593574dbd0766&type=total&ucfs=1&",
    },
    {
      name: "Hotel Viña Casa Silva",
      distance: "20 min",
      url: "https://www.casasilva.cl/experiencias/hotel/",
    },
    {
      name: "Hotel Boutique Santa Teresita",
      distance: "20 min",
      url: "https://www.booking.com/hotel/cl/santa-teresita.es.html?aid=318615&label=Spanish_Chile_ES_CL_21461610385-hXKRja6GSeh%2Ag57L9Njh0AS637942154639%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atidsa-912298704641%3Alp1003325%3Ali%3Adec%3Adm%3Aag21461610385%3Acmp340119025&sid=6d165b09cdf32359d74d2a56f91b0985&dest_id=-900285&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1784322720&srpvid=b6a895015b5200d3&type=total&ucfs=1&",
    },
    {
      name: "Hotel Terrado de Rancagua",
      distance: "25 min",
      url: "https://terrado.cl/destinos/rancagua/?gad_source=1&gad_campaignid=23933987254&gbraid=0AAAAAqkm-r_DZN5mm3HZNg7-c6IypwffV",
    },
    {
      name: "Hotel Piedra Verde",
      distance: "25 min",
      url: "https://hotelpiedraverde.cl/",
    },
    {
      name: "Hotel Hacienda Los Lingues",
      distance: "15 min",
      url: "https://www.booking.com/hotel/cl/hacienda-los-lingues.es.html?aid=311839&label=hacienda-los-lingues-nOs1Tv3GQ_s0mu1H%2A5F1rwS175912568791%3Apl%3Ata%3Ap1%3Ap2%3Aac%3Aap%3Aneg%3Afi%3Atikwd-410404240244%3Alp1003325%3Ali%3Adec%3Adm%3Appccp%3DUmFuZG9tSVYkc2RlIyh9YVujEjbMrKBV6ty0ha1YbaI&sid=6d165b09cdf32359d74d2a56f91b0985&dest_id=-890326&dest_type=city&dist=0&group_adults=2&group_children=0&hapos=1&hpos=1&no_rooms=1&req_adults=2&req_children=0&room1=A%2CA&sb_price_type=total&sr_order=popularity&srepoch=1784322572&srpvid=738b94c2a4390393&type=total&ucfs=1&",
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
    venue: ["/images/wedding/venue.jpg"],
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
