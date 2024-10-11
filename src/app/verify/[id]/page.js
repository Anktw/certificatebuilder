import { kv } from '@vercel/kv';
import CertificatePreview from "@/app/components/CertificatePreview";

export default async function CertificatePage({ params }) {
  const { id } = params;

  try {
    const certificate = await kv.get(`certificate:${id.toUpperCase()}`);

    if (!certificate) {
      return <div>Certificate not found</div>;
    }

    return (
      <CertificatePreview
        name={certificate.name}
        skill={certificate.skill}
        weeks={certificate.weeks}
        startDate={certificate.startDate}
      />
    );
  } catch (error) {
    return <div>Error fetching certificate: {error.message}</div>;
  }
}
