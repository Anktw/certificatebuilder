import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const certificateData = await req.json();
    
    // Store the certificate data using a unique ID
    await kv.set(`certificate:${certificateData.id}`, certificateData);

    // Return a success response
    return NextResponse.json({ message: 'Certificate saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving certificate:', error);

    // Return an error response
    return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 });
  }
}
