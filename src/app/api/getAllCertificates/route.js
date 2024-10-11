import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all keys that start with 'certificate:'
    const keys = await kv.keys('certificate:*');
    
    const certificates = [];
    
    // Loop through each key and get the corresponding certificate data
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
