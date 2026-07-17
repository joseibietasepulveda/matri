'use client';

import { useEffect, useMemo, useState, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { weddingConfig } from '@/data/wedding';

type AttendanceValue = 'yes' | 'no';

type FormState = {
  name: string;
  attendance: AttendanceValue | '';
  hasCompanion: string;
  companionName: string;
  restrictions: string;
  comments: string;
};

const initialFormState: FormState = {
  name: '',
  attendance: '',
  hasCompanion: '',
  companionName: '',
  restrictions: '',
  comments: '',
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isWeddingDay, setIsWeddingDay] = useState(false);
  const [isAfterWedding, setIsAfterWedding] = useState(false);
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const weddingDate = useMemo(() => new Date(weddingConfig.weddingDate), []);

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();
      const isSameDay = now.toDateString() === weddingDate.toDateString();

      if (difference < 0 && !isSameDay) {
        setIsWeddingDay(false);
        setIsAfterWedding(true);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      if (difference <= 0 && isSameDay) {
        setIsWeddingDay(true);
        setIsAfterWedding(false);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
      setIsWeddingDay(false);
      setIsAfterWedding(false);
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);
    return () => window.clearInterval(interval);
  }, [weddingDate]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.name.trim()) nextErrors.name = 'Tu nombre es obligatorio.';
    if (!formData.attendance) nextErrors.attendance = 'Por favor confirma tu asistencia.';
    if (formData.hasCompanion === 'yes' && !formData.companionName.trim()) {
      nextErrors.companionName = 'Indica el nombre de tu acompañante.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setSubmitted(true);
  };

  const showCompanionField = formData.hasCompanion === 'yes';
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(weddingConfig.calendarTitle)}&dates=${weddingConfig.calendarStartDate}/${weddingConfig.calendarEndDate}&details=${encodeURIComponent(weddingConfig.calendarDescription)}&location=${encodeURIComponent(weddingConfig.calendarLocation)}`;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,238,225,0.7),_transparent_60%)] text-stone-800">
      <section id="portada" className="relative isolate flex min-h-screen items-center justify-center overflow-hidden bg-[#f7efe7] px-4 py-10 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05))]" />
        <div className="absolute inset-0">
          <Image
            src="/couple-hero.svg"
            alt="Rosario y Ignacio"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-90"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/20 to-[#0f0b08]/80" />
        <div className="relative z-10 w-full max-w-6xl rounded-[2rem] border border-white/20 bg-white/10 px-6 py-10 shadow-[0_30px_80px_rgba(0,0,0,0.25)] backdrop-blur-md sm:px-10 lg:px-16 lg:py-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center text-white">
            <p className="mb-4 text-sm uppercase tracking-[0.35em] text-stone-200">Invitación</p>
            <h1 className="font-serif text-4xl font-semibold tracking-[0.2em] sm:text-5xl lg:text-7xl">
              {weddingConfig.coupleName}
            </h1>
            <p className="mt-4 text-2xl font-light sm:text-3xl">¡Nos casamos!</p>
            <p className="mt-8 text-lg uppercase tracking-[0.3em] text-stone-200">
              {weddingConfig.weddingDateLabel}
            </p>
            {isAfterWedding ? (
              <div className="mt-8 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-lg font-medium">
                Gracias por acompañarnos en este día tan especial.
              </div>
            ) : isWeddingDay ? (
              <div className="mt-8 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-lg font-medium">
                ¡Hoy es el gran día!
              </div>
            ) : (
              <div className="mt-8 grid w-full max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  { label: 'Días', value: timeLeft.days },
                  { label: 'Horas', value: timeLeft.hours },
                  { label: 'Minutos', value: timeLeft.minutes },
                  { label: 'Segundos', value: timeLeft.seconds },
                ].map((unit) => (
                  <div key={unit.label} className="rounded-2xl border border-white/20 bg-white/10 px-3 py-5 backdrop-blur-sm">
                    <p className="text-3xl font-semibold sm:text-4xl">{String(unit.value).padStart(2, '0')}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.3em] text-stone-200">{unit.label}</p>
                  </div>
                ))}
              </div>
            )}
            <Link
              href="#gran-dia"
              className="mt-10 inline-flex items-center rounded-full border border-white/30 bg-[#e7dcc8] px-6 py-3 text-sm font-semibold uppercase tracking-[0.3em] text-stone-800 transition hover:scale-[1.02]"
            >
              Ver detalles
            </Link>
          </div>
        </div>
      </section>

      <section id="gran-dia" className="scroll-mt-12 bg-white px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">El gran día</p>
            <h2 className="mt-4 font-serif text-3xl text-stone-800 sm:text-4xl">{weddingConfig.weddingDateLabel}</h2>
            <div className="mt-8 space-y-4 text-lg leading-8 text-stone-700">
              <p><span className="font-semibold text-stone-900">Hora:</span> {weddingConfig.weddingTime}</p>
              <p><span className="font-semibold text-stone-900">Lugar:</span> {weddingConfig.venueName}</p>
              <p>{weddingConfig.venueAddress}</p>
            </div>
            <div className="mt-8 overflow-hidden rounded-[1.5rem] border border-stone-200 bg-stone-50">
              <div className="flex h-56 items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(231,220,200,0.45),_transparent_70%)]">
                <div className="rounded-full border border-stone-300 bg-white/80 p-5 text-4xl shadow-sm">📷</div>
              </div>
            </div>
          </div>
          <div className="rounded-[2rem] border border-stone-200 bg-white p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <h3 className="font-serif text-2xl text-stone-800">Agregar a mi calendario</h3>
            <p className="mt-3 text-sm text-stone-600">Elige la app que prefieras y guarda esta fecha.</p>
            <div className="mt-6 flex flex-col gap-2.5">
              <a href={googleCalendarUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                <span className="text-base">📅</span>
                Google Calendar
              </a>
              <a href={weddingConfig.calendarFile} download className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                <span className="text-base">🍎</span>
                Apple Calendar (.ics)
              </a>
              <a href="https://outlook.live.com/calendar/0/addcalendar" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50">
                <span className="text-base">🪟</span>
                Outlook
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200">
          <Image src="/couple-gallery.svg" alt="Rosario y Ignacio" width={1600} height={1000} className="h-[420px] w-full object-cover sm:h-[560px]" />
        </div>
      </section>

      <section id="como-llegar" className="scroll-mt-12 bg-[#fcf7ef] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">Cómo llegar</p>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-serif text-3xl text-stone-800 sm:text-4xl">{weddingConfig.venueName}</h2>
              <p className="mt-3 text-lg leading-8 text-stone-700">{weddingConfig.venueAddress}</p>
            </div>
            <div className="flex flex-col gap-3 sm:min-w-[220px]">
              <a href={weddingConfig.wazeUrl} target="_blank" rel="noreferrer" className="rounded-full bg-[#6f7957] px-5 py-3 text-center font-semibold text-white transition hover:opacity-90">
                Abrir en Waze
              </a>
              <a href={weddingConfig.googleMapsUrl} target="_blank" rel="noreferrer" className="rounded-full border border-stone-300 px-5 py-3 text-center font-semibold text-stone-800 transition hover:bg-stone-50">
                Abrir en Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="confirmacion" className="scroll-mt-12 bg-[#f8f4eb] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">Confirmación</p>
            <h2 className="mt-4 font-serif text-3xl text-stone-800 sm:text-4xl">Confirma tu asistencia</h2>
            <p className="mt-3 text-stone-700">Completa el formulario y confirma tu asistencia. Gracias.</p>
          </div>

          <form
            className="mx-auto grid max-w-2xl gap-4 rounded-[1rem] border border-stone-200 bg-white/80 p-6"
            onSubmit={async (e) => {
              e.preventDefault();
              setErrors({});
              const payload = {
                name: formData.name,
                email: formData.companionName || '',
                phone: '',
                rsvp: formData.attendance || 'pending',
                guestsCount: formData.hasCompanion === 'yes' ? 2 : 1,
                meal: formData.restrictions,
                note: formData.comments,
                timestamp: new Date().toISOString(),
              };

              try {
                const res = await fetch('/api/confirm', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload),
                });

                if (!res.ok) throw new Error('Error enviando la confirmación');
                setSubmitted(true);
              } catch (err) {
                setSubmitted(false);
                // show minimal error
                // eslint-disable-next-line no-console
                console.error(err);
                setErrors({ name: 'No se pudo enviar. Intenta más tarde.' });
              }
            }}
          >
            <input
              aria-label="Nombre"
              placeholder="Tu nombre"
              value={formData.name}
              onChange={(e) => setFormData((s) => ({ ...s, name: e.target.value }))}
              className="rounded-md border border-stone-200 px-4 py-3"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <select
                value={formData.attendance}
                onChange={(e) => setFormData((s) => ({ ...s, attendance: e.target.value as any }))}
                className="rounded-md border border-stone-200 px-4 py-3"
                required
              >
                <option value="">Confirmar asistencia</option>
                <option value="yes">Asistiré</option>
                <option value="no">No podré asistir</option>
              </select>

              <select
                value={formData.hasCompanion}
                onChange={(e) => setFormData((s) => ({ ...s, hasCompanion: e.target.value }))}
                className="rounded-md border border-stone-200 px-4 py-3"
              >
                <option value="">¿Traes acompañante?</option>
                <option value="yes">Sí</option>
                <option value="no">No</option>
              </select>
            </div>

            {showCompanionField && (
              <input
                placeholder="Nombre del acompañante"
                value={formData.companionName}
                onChange={(e) => setFormData((s) => ({ ...s, companionName: e.target.value }))}
                className="rounded-md border border-stone-200 px-4 py-3"
              />
            )}

            <input
              placeholder="Restricciones alimentarias"
              value={formData.restrictions}
              onChange={(e) => setFormData((s) => ({ ...s, restrictions: e.target.value }))}
              className="rounded-md border border-stone-200 px-4 py-3"
            />

            <textarea
              placeholder="Comentarios / nota"
              value={formData.comments}
              onChange={(e) => setFormData((s) => ({ ...s, comments: e.target.value }))}
              className="min-h-[120px] rounded-md border border-stone-200 px-4 py-3"
            />

            <div className="flex items-center justify-between gap-4">
              <button type="submit" className="rounded-full bg-[#6f7957] px-6 py-3 font-semibold text-white">Enviar</button>
              {submitted && <span className="text-green-600">Confirmación enviada. ¡Gracias!</span>}
            </div>
          </form>
        </div>
      </section>

      <section id="quedarte" className="scroll-mt-12 bg-[#f8f4eb] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 text-center sm:text-left">
            <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">¿Te quedarás?</p>
            <h2 className="font-serif text-3xl text-stone-800 sm:text-4xl">Hoteles recomendados</h2>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {weddingConfig.hotels.map((hotel) => (
              <article key={hotel.name} className="rounded-[2rem] border border-stone-200 bg-white/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
                <h3 className="font-serif text-2xl text-stone-800">{hotel.name}</h3>
                <p className="mt-3 text-sm uppercase tracking-[0.3em] text-[#8b7353]">{hotel.distance}</p>
                <p className="mt-4 text-stone-700">{hotel.description}</p>
                <a href={hotel.url} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full border border-stone-300 px-4 py-2 text-sm font-medium transition hover:bg-stone-50">
                  Ver hotel
                </a>
              </article>
            ))}
          </div>
          <div className="mt-12 rounded-[2rem] border border-stone-200 bg-white/80 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            <p className="text-lg text-stone-700">¿Necesitas transporte desde tu hotel al matrimonio?</p>
            <p className="mt-3 text-stone-600">Nosotros te ayudamos a coordinarlo.</p>
            <a href={weddingConfig.whatsappContactUrl} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full bg-[#6f7957] px-6 py-3 font-semibold text-white transition hover:opacity-90">
              Coordinar transporte por WhatsApp
            </a>
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200">
          <Image src="/couple-gallery.svg" alt="Rosario y Ignacio" width={1600} height={1000} className="h-[420px] w-full object-cover sm:h-[560px]" />
        </div>
      </section>

      <section id="musica" className="scroll-mt-12 bg-[#fcf7ef] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-stone-200 bg-white/80 p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">Ayúdanos con la música</p>
          <h2 className="mt-4 font-serif text-3xl text-stone-800 sm:text-4xl">¿Qué canción no puede faltar?</h2>
          <a href={weddingConfig.spotifyPlaylistUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-[#6f7957] px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Abrir playlist colaborativa
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200">
          <Image src="/couple-gallery.svg" alt="Compromiso de Rosario y Ignacio" width={1600} height={1000} className="h-[420px] w-full object-cover sm:h-[560px]" />
        </div>
      </section>


      <section id="recuerdos" className={`scroll-mt-12 px-4 py-20 sm:px-6 lg:px-8 ${isAfterWedding ? 'bg-[#f8f4eb]' : 'bg-[#fcf7ef]'}`}>
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-stone-200 bg-white/80 p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <p className="text-sm uppercase tracking-[0.35em] text-[#8b7353]">Comparte tus recuerdos</p>
          <h2 className="mt-4 font-serif text-3xl text-stone-800 sm:text-4xl">{isAfterWedding ? 'Tus fotos y videos serán parte de este recuerdo' : 'Comparte tus recuerdos'}</h2>
          <p className="mt-6 text-lg leading-8 text-stone-700">{isAfterWedding ? 'Después del gran día, esta sección gana aún más protagonismo para conservar cada instante compartido.' : 'Invitamos a todos a subir fotos y videos del matrimonio para conservar este día inolvidable.'}</p>
          <a href={weddingConfig.sharedAlbumUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-[#6f7957] px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Abrir carpeta compartida
          </a>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-stone-200">
          <Image src="/couple-gallery.svg" alt="Gracias por acompañarnos" width={1600} height={1000} className="h-[420px] w-full object-cover sm:h-[560px]" />
        </div>
        <div className="mx-auto mt-10 max-w-4xl rounded-[2rem] border border-stone-200 bg-[#fcf7ef] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <p className="text-lg leading-8 text-stone-700">{weddingConfig.gratitudeText}</p>
          <h2 className="mt-6 font-serif text-3xl text-stone-800 sm:text-4xl">{weddingConfig.footerSignature}</h2>
          <a href={weddingConfig.whatsappShareUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex rounded-full bg-[#6f7957] px-6 py-3 font-semibold text-white transition hover:opacity-90">
            Compartir por WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
