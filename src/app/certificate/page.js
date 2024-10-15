"use client";
import { useState } from "react";
import CertificatePreview from "../components/CertificatePreview";
import Input from "../components/input";
import ContactForm from "../components/contactform";
const CertificatePage = () => {
  const [name, setName] = useState("");
  const [skill, setSkill] = useState("");
  const [weeks, setWeeks] = useState("");
  const [startDate, setStartDate] = useState("");

  const [showCertificate, setShowCertificate] = useState(false);

  const skillsList = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Ruby",
    "Go",
    "Swift",
    "Kotlin",
    "PHP",
    "TypeScript",
    "Rust",
    "Scala",
    "R",
    "MATLAB",
    "Perl",
    "Objective-C",
    "Shell",
    "Haskell",
    "Lua",
    "Dart",
    "Elixir",
    "Groovy",
    "F#",
    "Visual Basic",
    "SQL",
    "NoSQL",
    "GraphQL",
    "HTML/CSS",
    "SASS/SCSS",
    "React.js",
    "Vue.js",
    "Angular",
    "Node.js",
    "Django",
    "Flask",
    "Spring Boot",
    "Express.js",
    "Ruby on Rails",
    "Laravel",
    "Bootstrap",
    "Tailwind CSS",
    "Next.js",
    "Gatsby",
    "WordPress",
    "Drupal",
    "Firebase",
    "AWS",
    "Google Cloud",
    "Azure",
    "DevOps",
    "Docker",
    "Kubernetes",
    "Web Development",
    "Frontend Development",
    "Backend Development",
    "Full Stack Development",
    "Full Stack MERN",
    "Full Stack MEAN",
    "Mobile App Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Cybersecurity",
    "Cloud Computing",
    "Blockchain Development",
    "Game Development",
    "IoT (Internet of Things)",
    "Embedded Systems",
    "Software Testing",
    "DevOps Engineering",
    "UI/UX Design",
    "Data Engineering",
    "Database Administration",
    "Agile Methodologies",
    "Project Management",
  ];

  const handleGenerate = () => {
    setShowCertificate(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 items-center bg-background shadow-lg rounded-lg text-foreground">
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center">
        Generate Kar lo Bsdwalon
      </h1>
      <p className="font-medium py-3 md:py-6 border p-4 m-3 rounded-3xl">
        <span className="text-2xl pr-4 font-serif">Disclaimer -</span>Due to a
        busy schedule, this site&apos;s CSS is currently not optimized for
        screens smaller than 768px. For the best experience, I recommend using a
        desktop screen. If you&apos;d like to contribute, please fill out the
        contact form at the end of the page. Please consider that this site is
        made for<span className="text-xl font-bold"> fun purpose </span> only. I
        strongly encourage you to pursue legitimate qualification, its not that
        hard. If you cannot do so, I urge you to reconsider your life&apos;s
        path (just kidding).
      </p>
      <form className="space-y-0 md:space-y-3 p-10 md:p-0">
        <label className="block text-sm font-bold" htmlFor="Name">
          Name?
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="E.g. Ved Prakash"
        />

        <div className="relative">
          <label className="block text-sm font-bold" htmlFor="skill">
            Skills/Language
          </label>
          <select
            id="skill"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
            className="w-full border border-foreground rounded-xl py-4 px-4 bg-background focus:outline-none focus:border-gray-400 transition-all mb-6"
            required
          >
            <option value="" disabled>
              Select a Skill or Language
            </option>
            {skillsList.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <Input
          value={weeks}
          onChange={(e) => setWeeks(e.target.value)}
          label="No of Weeks?"
          type="number"
        />
        <div className="relative">
          <Input
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            label="Start Date"
            type="date"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-foreground"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10m2 5a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h10a2 2 0 012 2z"
              />
            </svg>
          </div>
        </div>
      </form>

      <div className="flex justify-center">
        <button
          onClick={handleGenerate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        ><span className="flex gap-2">
          Generate Certificate
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="m480-420 240-160-240-160v320Zm28 220h224q-7 26-24 42t-44 20L228-85q-33 5-59.5-15.5T138-154L85-591q-4-33 16-59t53-30l46-6v80l-36 5 54 437 290-36Zm-148-80q-33 0-56.5-23.5T280-360v-440q0-33 23.5-56.5T360-880h440q33 0 56.5 23.5T880-800v440q0 33-23.5 56.5T800-280H360Zm0-80h440v-440H360v440Zm220-220ZM218-164Z"/></svg>
          </span></button>
      </div>
      <div></div>
      <div className="mt-5 justify-center px-4 mx-4 flex">
        {showCertificate ? (
          <div className="certificate-preview-container px-4">
            <CertificatePreview
              name={name || "Ved Prakash"}
              skill={skill || "Java"}
              weeks={weeks || "4"}
              startDate={startDate || "06-10-2024"}
            />
          </div>
        ) : (
          <div className="certificate-preview-container px-4">
            <CertificatePreview
              name="Ved Prakash"
              skill="Java"
              weeks="4"
              startDate="06-10-2024"
            />
            <div className="flex justify-center mt-4"></div>
          </div>
        )}
      </div>
      <h1 className="mt-8 text-3xl font-bold mb-6 text-center">
        Suggestions? Bugs? Contact me
      </h1>
      <ContactForm />
    </div>
  );
};
export default CertificatePage;
