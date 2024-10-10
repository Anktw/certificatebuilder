import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const certificateData = await req.json();

    // Define the file path for 'verify.json'
    const filePath = path.join(process.cwd(), 'public', 'verify.json');

    // Read the existing certificate data from the file
    let certificates = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      certificates = JSON.parse(fileContent);
    }

    // Add the new certificate data
    certificates.push(certificateData);

    // Write the updated certificate data back to the file
    fs.writeFileSync(filePath, JSON.stringify(certificates, null, 2));

    // Return a success response
    return NextResponse.json({ message: 'Certificate saved successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Error saving certificate:', error);

    // Return an error response
    return NextResponse.json({ error: 'Failed to save certificate' }, { status: 500 });
  }
}
