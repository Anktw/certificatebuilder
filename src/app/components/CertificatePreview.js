"use client";
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Generate random 6-character ID
const generateCertificateID = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const CertificatePreview = ({ name, skill, weeks, startDate }) => {
  const [certificateID, setCertificateID] = useState(""); // Use state for certificate ID

  useEffect(() => {
    // Generate certificate ID only on the client-side after component mounts
    setCertificateID(generateCertificateID());
  }, []); // Empty dependency array ensures this runs only once after mount

  // Function to calculate the completion date based on start date and number of weeks
  const calculateCompletionDate = (startDate, weeks) => {
    const start = new Date(startDate);
    const completion = new Date(start.setDate(start.getDate() + weeks * 7));
    const dd = String(completion.getDate()).padStart(2, "0");
    const mm = String(completion.getMonth() + 1).padStart(2, "0");
    const yyyy = completion.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  // Function to save certificate data in verify.json
  const saveCertificate = async (certificateData) => {
    const response = await fetch("/api/saveCertificate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(certificateData),
    });

    const result = await response.json();
    return result.message;
  };

  // Function to download the certificate as PDF
  const downloadCertificate = async () => {
    // Prepare certificate data
    const certificateData = {
      id: certificateID,
      name,
      skill,
      weeks,
      startDate,
      completionDate: calculateCompletionDate(startDate, weeks),
    };
  
    // Save the certificate data to JSON
    const message = await saveCertificate(certificateData);
    alert(message); // Show alert on successful save
  
    // Generate the certificate as a PDF
    const certificateElement = document.querySelector(".certificate");
  
    // Adjust canvas scale and ensure PDF dimensions match the canvas
    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height], // Match PDF size to canvas
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
  };
  

  if (!name || !skill || !weeks || !startDate || !certificateID) return null; // Wait for certificateID

  return (
    <div className="mt-6">
      {/* Certificate Preview */}
      <div className="relative bg-white text-black p-10 border-4 border-black certificate">
  <div className="bg-black text-white py-6 flex justify-center items-center w-full absolute top-0 left-0">
    <img
      alt="vercel-logotype Logo"
      loading="eager"
      width="120"
      height="30"
      decoding="async"
      data-nimg="1"
      className="geist-hide-on-light"
      src="https://www.vercel.com/mktng/_next/static/media/vercel-logotype-dark.e8c0a742.svg"
    />
  </div>

  <div className="text-center mt-20">
    <p className="mb-4 font-mono text-lg">This certifies that</p>
    <h2 className="text-5xl font-bold mb-4">{name}</h2>
    <p className="mb-4 font-mono text-lg">
      has successfully completed the
      <br /> Open Intern Program sponsored by Vercel
    </p>
    <h3 className="text-3xl font-bold mb-4">{skill}</h3>
    <p className="mb-6 font-bold font-serif text-lg">
      Developer Certification,
      <br /> representing approximately {weeks * 40} hours of coursework
    </p>

    <div className="flex flex-row justify-between mx-10 items-center">
      <div className="mt-8 mb-6 text-center">
        <img src="/image.png" alt="Signature" className="mx-auto h-12" />
        <p className="mt-2 font-bold">Guillermo Rauch</p>
        <p className="font-mono">CEO of Vercel</p>
      </div>

      <div className="text-left">
        <p className="font-sans text-black text-lg">
          Started on: <strong>{startDate}</strong>
        </p>
        <p className="font-sans text-black text-lg">
          Issued on: <strong>{calculateCompletionDate(startDate, weeks)}</strong>
        </p>
        <p className="font-sans text-black text-lg">
          Certificate ID: <strong>{certificateID}</strong>
        </p>
      </div>
    </div>

    <p className="text-sm font-serif mt-6">
      Verify this certification at https://openintern.vercel.app/verify/{certificateID}
    </p>
  </div>
</div>

      {/* Button to Download the Certificate */}
      <div className="flex justify-center mt-4">
        <button
          onClick={downloadCertificate}
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;
