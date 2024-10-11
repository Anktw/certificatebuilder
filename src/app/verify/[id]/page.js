import { kv } from '@vercel/kv';
import CertificatePreview from "@/app/components/CertificatePreview";

export default async function CertificatePage({ params }) {
  // Capture the ID from params
  const { id } = params;

  try {
    // Fetch the certificate using the exact ID from the route params
    const certificate = await kv.get(`certificate:${id.toUpperCase()}`);
    
    // If certificate is not found, return not found message
    if (!certificate) {
      return (
        <div className="font-bold h-screen text-4xl flex justify-center align-middle items-center">
          <h1 className="p-5">Certificate not found</h1>
          <span>
            {/* Icon */}
          </span>
        </div>
      );
    }

    // Pass the fetched certificate details to the preview component
    return (
      <CertificatePreview
        name={certificate.name}
        skill={certificate.skill}
        weeks={certificate.weeks}
        startDate={certificate.startDate}
      />
    );
  } catch (error) {
    // Handle fetch error
    return <div>Error fetching certificate: {error.message}</div>;
  }
}
