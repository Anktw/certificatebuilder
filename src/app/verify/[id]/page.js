"use client";
import { useEffect, useState } from "react";
import CertificatePreview from "@/app/components/CertificatePreview";

// Fetch certificate data from JSON file
const fetchCertificates = async () => {
  const res = await fetch("/verify.json");
  const certificates = await res.json();
  return certificates;
};

export default function CertificatePage({ params }) {
  const { id } = params; // Extract the certificate ID from the URL
  const [certificate, setCertificate] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch certificates and find the one with the matching ID
    fetchCertificates()
      .then((certificates) => {
        const foundCert = certificates.find((cert) => cert.id === id.toUpperCase());
        if (foundCert) {
          setCertificate(foundCert);
        } else {
          setError("Certificate not found");
        }
      })
      .catch((err) => {
        setError("Error fetching certificates");
      });
  }, [id]);

  if (error) return <div>{error}</div>;
  if (!certificate) return <div>Loading...</div>;

  return (
    <CertificatePreview
      name={certificate.name}
      skill={certificate.skill}
      weeks={certificate.weeks}
      startDate={certificate.startDate}
    />
  );
}
