import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const certificateData = req.body;

    // Path to the JSON file where certificate data is stored
    const filePath = path.join(process.cwd(), "data", "certificates.json");
    const certificates = JSON.parse(fs.readFileSync(filePath, "utf8"));

    // Add new certificate to the list
    certificates.push(certificateData);

    // Save the updated list back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(certificates, null, 2));

    res.status(200).json({ message: "Certificate saved successfully!" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
