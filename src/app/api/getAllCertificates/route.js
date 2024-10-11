import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const keys = await kv.keys('certificate:*');
    
    const certificates = [];
    
    for (const key of keys) {
      const certificate = await kv.get(key);
      if (certificate) {
        certificates.push(certificate);
      }
    }
    
    return NextResponse.json(certificates, { status: 200 });
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return NextResponse.json({ error: 'Failed to fetch certificates' }, { status: 500 });
  }
}
