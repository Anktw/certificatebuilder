import { MongoClient } from 'mongodb';
import { NextResponse } from 'next/server';
import dotenv from 'dotenv';

dotenv.config();
let client;
async function connectToDatabase() {
  if (!client) {
    client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
  }
  return client.db(process.env.MONGODB_DB);
}

export async function POST(req) {
  try {
    const certificateData = await req.json();

    const db = await connectToDatabase();
    const certificates = db.collection('certificates');

  
    await certificates.insertOne(certificateData);

    return NextResponse.json({ message: 'Certificate saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving certificate:', error);
    return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 });
  }
}
