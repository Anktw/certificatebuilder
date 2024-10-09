"use client";
import { useState } from "react";
import CertificatePreview from "../components/CertificatePreview";
import Input from "../components/input";

const CertificatePage = () => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [weeks, setWeeks] = useState("");
  const [startDate, setStartDate] = useState("");
  
  // State to handle certificate generation
  const [showCertificate, setShowCertificate] = useState(false);

  const skillsList = [
    "JavaScript", "Python", "Java", "C++", "C#", "Ruby", "Go", "Swift", "Kotlin", "PHP", 
    "TypeScript", "Rust", "Scala", "R", "MATLAB", "Perl", "Objective-C", "Shell", "Haskell", 
    "Lua", "Dart", "Elixir", "Groovy", "F#", "Visual Basic", "SQL", "NoSQL", "GraphQL", 
    "HTML/CSS", "SASS/SCSS", "React.js", "Vue.js", "Angular", "Node.js", "Django", "Flask", 
    "Spring Boot", "Express.js", "Ruby on Rails", "Laravel", "Bootstrap", "Tailwind CSS", 
    "Next.js", "Gatsby", "WordPress", "Drupal", "Firebase", "AWS", "Google Cloud", "Azure", 
    "DevOps", "Docker", "Kubernetes", "Web Development", "Frontend Development", 
    "Backend Development", "Full Stack Development", "Full Stack MERN", "Full Stack MEAN", 
    "Mobile App Development", "Data Science", "Machine Learning", "Artificial Intelligence", 
    "Deep Learning", "Natural Language Processing", "Computer Vision", "Cybersecurity", 
    "Cloud Computing", "Blockchain Development", "Game Development", "IoT (Internet of Things)", 
    "Embedded Systems", "Software Testing", "DevOps Engineering", "UI/UX Design", "Data Engineering", 
    "Database Administration", "Agile Methodologies", "Project Management"
  ];

  const handleGenerate = () => {
    setShowCertificate(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 items-center bg-background shadow-lg rounded-lg text-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Generate Your Certificate
      </h1>
      <form className="space-y-6">
        {/* Name Input */}
        <label className="block text-sm font-bold" htmlFor="skill">
            Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="E.g. Ved Prakash"
        />

        {/* Skill Select */}
        <div className="relative">
          <label className="block text-sm font-bold mb-2" htmlFor="skill">
            Skill/Language
          </label>
          <select
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border border-gray-700 rounded-lg py-3 px-4 bg-background focus:outline-none focus:border-gray-400 transition-all"
            required
          >
            <option value="" disabled>Select a Skill or Language</option>
            {skillsList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        {/* Weeks of Completion */}
        <Input
          value={weeks}
          onChange={(e) => setWeeks(e.target.value)}
          label="No of Weeks?"
          type="number"
        />

        {/* Start Date */}
        <Input
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          label="Start Date"
          type="date"
        />
      </form>

      {/* Button to Generate Certificate */}
      <div className="flex justify-center mt-4">
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Generate Certificate
        </button>
      </div>

      {/* Certificate Preview with default values until generated */}
      <div className="mt-8">
        {showCertificate ? (
          <CertificatePreview 
            name={name || "Vivek Parashar"} 
            skill={skill || "Gandupanthi"} 
            weeks={weeks || "4"} 
            startDate={startDate || "06-10-2024"} 
          />
        ) : (
          <CertificatePreview 
            name="Vivek Parashar" 
            skill="Bhaichara " 
            weeks="4" 
            startDate="06-10-2024" 
          />
        )}
      </div>
    </div>
  );
};

export default CertificatePage;
