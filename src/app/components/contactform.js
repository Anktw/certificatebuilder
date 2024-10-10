"use client";
import { useState } from "react";
import LoadingBar from "./loader";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("Message sent!");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus(""), 5000);
      } else {
        setStatus("Failed to send. Please try again.");
      }
    } catch (error) {
      setStatus("Failed to send. Please check your connection.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 ">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block">
            You? (optional)
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 rounded-xl bg-background text-foregorund border border-foreground"
            placeholder="Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-foregorund my-2">
            Your Email? (optional)
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full p-2 rounded-xl bg-background text-foregorund border border-foreground"
            placeholder="Your email"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-foreground my-2">
            Message*
          </label>
          <textarea
            id="message"
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            className="w-full p-2 rounded-md bg-background text-foreground border border-foreground"
            placeholder="Your message"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "Sending..."}
          className={` p-2 rounded-full transition group ${
            status === "Sending..."
              ? "cursor-not-allowed"
              : "text-foreground rounded border-2"
          }`}
        >
          {status === "Sending..." ? (
            <span style={{ display: "flex", alignItems: "center" }}>
              <LoadingBar />
            </span>
          ) : (
            <span style={{ display: "flex", alignItems: "center" }}>
              Send
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="currentColor"
                className={` transform transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-105 mx-1 fill-black`}
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" fill="white"  />
              </svg>
            </span>
          )}
        </button>
        {status && <p className={` transition-all ease-out animate-fadeInLeft my-4 py-4 ${status ? 'animate-fadeInDown' : 'animate-fadeInUp'} p-5 m-3`}>{status}</p>}
      </form>
    </div>
  );
}
