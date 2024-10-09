import { useRouter } from "next/router";
import fs from "fs";
import path from "path";

export async function getStaticProps(context) {
  const { id } = context.params;

  const filePath = path.join(process.cwd(), "data", "certificates.json");
  const certificates = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const certificate = certificates.find(cert => cert.id === id);

  return {
    props: {
      certificate: certificate || null,
    },
  };
}

export async function getStaticPaths() {
  const filePath = path.join(process.cwd(), "data", "certificates.json");
  const certificates = JSON.parse(fs.readFileSync(filePath, "utf8"));

  const paths = certificates.map(cert => ({
    params: { id: cert.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

const CertificateVerification = ({ certificate }) => {
  if (!certificate) {
    return <h1>Certificate not found</h1>;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold">Certificate Verified!</h1>
      <p>
        <strong>{certificate.name}</strong> successfully completed{" "}
        <strong>{certificate.skill}</strong> in{" "}
        <strong>{certificate.weeks}</strong> weeks.
      </p>
      <p>Started on: {certificate.startDate}</p>
      <p>Date of Completion: {certificate.completionDate}</p>
    </div>
  );
};

export default CertificateVerification;
