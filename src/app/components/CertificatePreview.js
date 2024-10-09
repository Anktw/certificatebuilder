import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Function to format date to dd-mm-yyyy
const formatDate = (date) => {
    
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
};

const CertificatePreview = ({ name, skill, weeks, startDate }) => {
  // Function to calculate the completion date based on start date and number of weeks
  const calculateCompletionDate = (startDate, weeks) => {
    const start = new Date(startDate);
    const completion = new Date(start.setDate(start.getDate() + weeks * 7));
    return formatDate(completion);
  };

  const generateCertificateID = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase(); // Generates a random 6-character ID
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
    console.log(result);
  };
  

  // Function to download the certificate as PDF
  const downloadCertificate = () => {
    const certificateElement = document.querySelector(".certificate");
    html2canvas(certificateElement).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "PNG", 0, 0);
      pdf.save("certificate.pdf");
    });
  };

  // Default values if no input
  const defaultName = name || "John Doe";
  const defaultSkill = skill || "Responsive Web Design";
  const defaultWeeks = weeks || 12;
  const defaultStartDate = startDate ? formatDate(startDate) : "01-01-2023";

  return (
    <div className="mt-6">
      {/* Certificate Preview */}
      <div className="certificate bg-gray-100 text-black shadow-lg rounded-lg p-8 relative max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <img
            src="/path/to/logo.png"
            alt="Logo"
            className="h-12"
          />
          <p className="text-sm">Issued {formatDate(new Date())}</p>
        </div>
        
        {/* Certificate Body */}
        <div className="text-center mt-8">
          <h1 className="font-bold text-4xl mb-6">Certificate of Completion</h1>
          <p className="text-lg mb-4">
            This certifies that <strong>{defaultName}</strong> has successfully completed
            the course <strong>{defaultSkill}</strong>.
          </p>
          <p className="text-lg mb-2">
            Duration: <strong>{defaultWeeks} weeks</strong>
          </p>
          <p className="text-lg mb-2">
            Started on: <strong>{defaultStartDate}</strong>
          </p>
          <p className="text-lg">
            Date of Completion: <strong>{calculateCompletionDate(startDate, weeks)}</strong>
          </p>
        </div>

        {/* Signature and Footer */}
        <div className="flex justify-between items-center mt-8">
          <img
            src="/path/to/signature.png"
            alt="Signature"
            className="h-16"
          />
          <div className="text-right">
            <p className="font-bold">Quincy Larson</p>
            <p className="text-sm">Executive Director, freeCodeCamp.org</p>
          </div>
        </div>

        {/* Verification Link */}
        <div className="text-center mt-6 text-sm">
          <p>Verify this certification at /verify/{defaultName.toLowerCase().replace(/\s+/g, "-")}</p>
        </div>
      </div>

      {/* Button to Download the Certificate */}
      <div className="flex justify-center mt-6">
        <button
          onClick={downloadCertificate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Download Certificate
        </button>
      </div>
    </div>
  );
};

export default CertificatePreview;
