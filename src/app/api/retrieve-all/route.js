import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const keys = await kv.keys('certificate:*');


    const certificates = await Promise.all(
      keys.map(key => kv.get(key))
    );
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
