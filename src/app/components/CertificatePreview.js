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
    alert(message);  // Show alert on successful save

    // Generate the certificate as a PDF
    const certificateElement = document.querySelector(".certificate");
    html2canvas(certificateElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("certificate.pdf");
    });
  };

  if (!name || !skill || !weeks || !startDate || !certificateID) return null; // Wait for certificateID

  return (
    <div className="mt-6">
      {/* Certificate Preview */}
      <div className="certificate shadow-lg p-8 rounded">
        <h1 className="text-center font-bold text-3xl mb-4">Certificate of Completion</h1>
        <p className="text-center text-lg">
          This certifies that <strong>{name}</strong> has successfully completed{" "}
          <strong>{weeks}</strong> weeks of <strong>{skill}</strong>.
        </p>
        <p className="text-center mt-2">
          Started on: <strong>{startDate}</strong>
        </p>
        <p className="text-center mt-2">
          Date of Completion: <strong>{calculateCompletionDate(startDate, weeks)}</strong>
        </p>
        <p className="text-center mt-2">
          Verify this certification at /verify/{certificateID}
        </p>
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
