import { useState, FormEvent } from "react";
import Navbar from "./Home/Navbar";

export default function LeadCaptureForm() {
  const [companyName, setCompanyName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [enrichedData, setEnrichedData] = useState(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Replace with your actual API endpoint
      const response = await fetch("/api/enrich-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, websiteUrl }),
      });
      const data = await response.json();
      setEnrichedData(data);
    } catch (error) {
      console.error("Error enriching lead:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen">
        <div className="w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
              Lead Capture Form
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="mt-1 outline-none block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="websiteUrl"
                  className="block text-sm font-medium text-gray-700"
                >
                  Website URL
                </label>
                <input
                  type="url"
                  id="websiteUrl"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="mt-1 outline-none block w-full rounded-md border-gray-300 shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enrich Lead
              </button>
            </form>
          </div>
        </div>

        {/* Right side: Display Enriched Data */}
        <div className="w-1/2 flex items-center justify-center bg-white p-6">
          {enrichedData ? (
            <div className="w-full max-w-md p-6 bg-gray-50 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4 text-gray-800 text-center">
                Enriched Data
              </h3>
              <div className="text-sm text-gray-700">
                {/* Display fetched enriched data here */}
                {Object.entries(enrichedData).map(([key, value]) => (
                  <div key={key} className="mb-2">
                    <span className="font-semibold capitalize">{key}: </span>
                    <span>{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 text-center">
              <p>No data available. Submit the form to enrich a lead.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
