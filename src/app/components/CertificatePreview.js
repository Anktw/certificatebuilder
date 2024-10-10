"use client";
import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Generate random 6-character ID
const generateCertificateID = () => {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
};

const CertificatePreview = ({ name, skill, weeks, startDate }) => {
  const [certificateID, setCertificateID] = useState("");

  useEffect(() => {
    setCertificateID(generateCertificateID());
  }, []);

  const calculateCompletionDate = (startDate, weeks) => {
    const start = new Date(startDate);
    const completion = new Date(start.setDate(start.getDate() + weeks * 7));
    const dd = String(completion.getDate()).padStart(2, "0");
    const mm = String(completion.getMonth() + 1).padStart(2, "0");
    const yyyy = completion.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

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

  const downloadCertificate = async () => {
    const certificateData = {
      id: certificateID,
      name,
      skill,
      weeks,
      startDate,
      completionDate: calculateCompletionDate(startDate, weeks),
    };

    const message = await saveCertificate(certificateData);
    alert(message);

    const certificateElement = document.querySelector(".certificate");
    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("certificate.pdf");
    });
  };

  if (!name || !skill || !weeks || !startDate || !certificateID) return null;

  return (
    <div className="mt-6">
      <div
        className="certificate"
        style={{
          width: "1122px",
          height: "615px", // Make sure this height matches the actual content
          position: "relative",
          backgroundColor: "#f8f9fa",
          border: "15px solid #000",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          display: "flex", // Flexbox to help with layout
          flexDirection: "column", // Ensures vertical stacking of elements
          justifyContent: "space-between", // Distribute content evenly without extra space
        }}
      >
        <div className="relative bg-white text-black border-4 border-white">
          <div className="bg-black text-white py-4 text-center">
            <div className="flex items-center justify-center">
              <svg
                width="200"
                height="30"
                viewBox="0 0 283 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M141.04 16C130 16 122.04 23.2 122.04 34C122.04 44.8 131 52 142.04 52C148.71 52 154.59 49.36 158.23 44.91L150.58 40.49C148.56 42.7 145.49 43.99 142.04 43.99C137.25 43.99 133.18 41.49 131.67 37.49H159.69C159.91 36.37 160.04 35.21 160.04 33.99C160.04 23.2 152.08 16 141.04 16ZM131.58 30.5C132.83 26.51 136.25 24 141.03 24C145.82 24 149.24 26.51 150.48 30.5H131.58ZM248.72 16C237.68 16 229.72 23.2 229.72 34C229.72 44.8 238.68 52 249.72 52C256.39 52 262.27 49.36 265.91 44.91L258.26 40.49C256.24 42.7 253.17 43.99 249.72 43.99C244.93 43.99 240.86 41.49 239.35 37.49H267.37C267.59 36.37 267.72 35.21 267.72 33.99C267.72 23.2 259.76 16 248.72 16ZM239.27 30.5C240.52 26.51 243.94 24 248.72 24C253.51 24 256.93 26.51 258.17 30.5H239.27ZM200.24 34C200.24 40 204.16 44 210.24 44C214.36 44 217.45 42.13 219.04 39.08L226.72 43.51C223.54 48.81 217.58 52 210.24 52C199.19 52 191.24 44.8 191.24 34C191.24 23.2 199.2 16 210.24 16C217.58 16 223.53 19.19 226.72 24.49L219.04 28.92C217.45 25.87 214.36 24 210.24 24C204.17 24 200.24 28 200.24 34ZM282.72 5V51H273.72V5H282.72ZM36.95 0L73.9 64H0L36.95 0ZM129.33 5L101.62 53L73.91 5H84.3L101.62 35L118.94 5H129.33ZM188.24 17V26.69C187.24 26.4 186.18 26.2 185.04 26.2C179.23 26.2 175.04 30.2 175.04 36.2V51H166.04V17H175.04V26.2C175.04 21.12 180.95 17 188.24 17Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
          <div className="text-center mt-16">
            <p className="mb-2 font-serif text-xl italic">
              This certifies that
            </p>
            <h2 className="text-4xl font-bold mb-3">{name}</h2>
            <p className="mb-3 font-serif text-xl italic">
              has successfully completed the
              <br /> Open Intern Program sponsored by Vercel
            </p>
            <h3 className="text-3xl font-semibold mb-2">{skill}</h3>
            <p className="font-serif text-lg mb-4">
              Developer Certification,
              <br /> representing approximately {weeks * 40} hours of coursework
            </p>
          </div>

          <div className="flex justify-between mt-10 mx-10">
            <div className="text-center">
              <img src="/image.png" alt="Signature" className="mx-auto h-12" />
              <p className="font-bold">Guillermo Rauch</p>
              <p className="font-mono">CEO of Vercel</p>
            </div>

            <div className="text-right">
              <p className="font-sans text-lg">
                Started on: <strong>{startDate}</strong>
              </p>
              <p className="font-sans text-lg">
                Issued on:{" "}
                <strong>{calculateCompletionDate(startDate, weeks)}</strong>
              </p>
              <p className="font-sans text-lg">
                Certificate ID: <strong>{certificateID}</strong>
              </p>
            </div>
          </div>

          <p className="text-center text-sm mt-6">
            Verify this certification at https://openintern.vercel.app/verify/
            {certificateID}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={downloadCertificate}
          className="bg-green-600 text-white py-2 px-6 rounded shadow-lg hover:bg-green-700"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;
