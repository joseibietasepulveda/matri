import { NextResponse } from 'next/server';

type ConfirmPayload = {
  fullName: string;
  spouseName?: string;
  attendance: 'yes' | 'no';
  dietaryRestrictions?: string;
  message?: string;
};

export async function POST(req: Request) {
  try {
    const data: ConfirmPayload = await req.json();
    if (!data.fullName?.trim() || !['yes', 'no'].includes(data.attendance)) {
      return NextResponse.json({ error: 'Datos de confirmación inválidos' }, { status: 400 });
    }

    const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json({ error: 'GOOGLE_APPS_SCRIPT_URL not configured' }, { status: 500 });
    }

    const payload = {
      fullName: data.fullName.trim(),
      spouseName: data.spouseName?.trim() ?? '',
      attendance: data.attendance,
      dietaryRestrictions: data.dietaryRestrictions?.trim() ?? '',
      message: data.message?.trim() ?? '',
      timestamp: new Date().toISOString(),
    };

    const res = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
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
