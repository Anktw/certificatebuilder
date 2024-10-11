import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
export async function POST(req) {
  try {
    const certificateData = await req.json(); 
    await kv.set(`certificate:${certificateData.id}`, certificateData);
    return NextResponse.json({ message: 'Certificate saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving certificate:', error);
    return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 });
  }
}
