import { NextResponse } from 'next/server';

type ConfirmPayload = {
  name: string;
  email?: string;
  phone?: string;
  rsvp: 'yes' | 'no' | 'pending';
  guestsCount?: number;
  meal?: string;
  note?: string;
  timestamp?: string;
};

export async function POST(req: Request) {
  try {
    const data: ConfirmPayload = await req.json();
    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ error: 'GOOGLE_APPS_SCRIPT_URL not configured' }, { status: 500 });
    }

    if (!data.timestamp) data.timestamp = new Date().toISOString();

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ error: 'Forward failed', details: text }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid payload', details: err instanceof Error ? err.message : String(err) }, { status: 400 });
  }
}
