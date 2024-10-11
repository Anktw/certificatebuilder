"use client";
import React, { useState, useEffect } from "react";

const ViewAllCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/getAllCertificates');
        const data = await response.json();
        if (response.ok) {
          setCertificates(data);
        } else {
          setError(data.error || 'Failed to fetch certificates');
        }
      } catch (err) {
        setError('Error fetching certificates');
      }
    };

    fetchCertificates();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>All Certificates</h1>
      {certificates.length === 0 ? (
        <p>No certificates found.</p>
      ) : (
        <ul>
          {certificates.map((certificate) => (
            <li key={certificate.id}>
              <div>
                <strong>Certificate ID:</strong> {certificate.id}<br />
                <strong>Name:</strong> {certificate.name}<br />
                <strong>Skill:</strong> {certificate.skill}<br />
                <strong>Weeks:</strong> {certificate.weeks}<br />
                <strong>Start Date:</strong> {certificate.startDate}<br />
                <strong>Completion Date:</strong> {calculateCompletionDate(certificate.startDate, certificate.weeks)}<br />
                <a href={`/verify/${certificate.id}`}>View Certificate</a>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const calculateCompletionDate = (startDate, weeks) => {
  const start = new Date(startDate);
  const completion = new Date(start.setDate(start.getDate() + weeks * 7));
  const dd = String(completion.getDate()).padStart(2, "0");
  const mm = String(completion.getMonth() + 1).padStart(2, "0");
  const yyyy = completion.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

export default ViewAllCertificates;
