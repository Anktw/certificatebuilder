import { MongoClient } from 'mongodb';
import VerifiedCertificatePreview from '@/app/components/VerifiedCertificatePreview';
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

export async function getCertificate(id) {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const certificatesCollection = db.collection('certificates');

    const certificate = await certificatesCollection.findOne({ id: id.toUpperCase() });
    return certificate;
  } finally {
    await client.close();
  }
}

export default async function CertificatePage({ params }) {
  const { id } = params;

  try {
    const certificate = await getCertificate(id);

    if (!certificate) {
      return (
        <div className="font-bold h-screen text-4xl flex justify-center align-middle items-center">
          <h1 className="p-5">Certificate not found</h1>
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960" width="48px" fill="#e8eaed">
              <path d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Zm0 160q17 0 28.5-11.5T520-360q0-17-11.5-28.5T480-400q-17 0-28.5 11.5T440-360q0 17 11.5 28.5T480-320Zm-40-140h80v-180h-80v180Z"/>
            </svg>
          </span>
        </div>
      );
    }
    return (
      <div className='justify-center flex '>
      <VerifiedCertificatePreview
        name={certificate.name}
        skill={certificate.skill}
        weeks={certificate.weeks}
        startDate={certificate.startDate}
        certificateID={id.toUpperCase()}
      />
      </div>
    );
  } catch (error) {
    return <div>Error fetching certificate: {error.message}</div>;
  }
}
