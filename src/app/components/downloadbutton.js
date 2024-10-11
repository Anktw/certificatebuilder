"use client";
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadButton = ({ certificateElementSelector, fileName, certificateData, saveCertificate }) => {
  const downloadCertificate = async () => {
    const message = await saveCertificate(certificateData);
    alert(message);

    const certificateElement = document.querySelector(certificateElementSelector);
    html2canvas(certificateElement, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <button
      onClick={downloadCertificate}
      className="bg-green-600 text-white py-2 px-6 rounded shadow-lg hover:bg-green-700"
    >
      Download Certificate
    </button>
  );
};

export default DownloadButton;