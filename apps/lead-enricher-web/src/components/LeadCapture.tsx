import { useState, FormEvent } from "react";
import { Users, Factory, Calendar } from "lucide-react";
import Navbar from "./Home/Navbar";
import axios from "axios";
import toast from "react-hot-toast";

interface EnrichedCompanyData {
  url: string;
  hash: string;
  name: string;
  website: string;
  size: string;
  industry: string;
  description: string;
  followers: number;
  founded: number | null;
  headquarters_city: string | null;
  headquarters_country: string | null;
  headquarters_state: string | null;
  headquarters_street1: string | null;
  headquarters_street2: string | null;
  headquarters_zip: string | null;
  logo_url: string;
  headquarters_new_address: string;
}

export default function LeadCaptureForm() {
  const [companyName, setCompanyName] = useState<string>("");
  const [websiteUrl, setWebsiteUrl] = useState<string>("");
  const [enrichedData, setEnrichedData] = useState<EnrichedCompanyData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        "https://lead-enricher-v1.braveforest-f0c4e1ce.eastus2.azurecontainerapps.io/api/enrich",
        {
          company: companyName,
          website: websiteUrl,
        }
      );
      setEnrichedData(response?.data);
    } catch (error) {
      console.error("Error enriching lead:", error);
      toast.error("Failed to enrich lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="md:flex h-screen">
        <div className="md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
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

        <div className="md:w-1/2 flex items-center justify-center bg-white p-6">
          {loading ? (
            <div className="flex justify-center items-center space-x-2">
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-8 h-8 text-gray-200 animate-spin fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            </div>
          ) : enrichedData ? (
            <div className="min-h-screen flex items-center justify-center p-4">
              <div className="w-full max-w-2xl bg-white  rounded-lg shadow-lg p-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gray-100 rounded-full p-4">
                    <img
                      src={enrichedData.logo_url}
                      alt="company-img"
                      className="w-8 h-8"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {enrichedData.name}
                    </h2>
                    <a
                      href={enrichedData.url}
                      className="text-blue-600  hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {enrichedData.url}
                    </a>
                  </div>
                </div>

                <div className="grid gap-4 text-sm">
                  <div className="flex items-center gap-3 text-gray-600 ">
                    <Users className="w-5 h-5" />
                    <span>{enrichedData.size}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 ">
                    <Factory className="w-5 h-5" />
                    <span>{enrichedData.industry}</span>
                  </div>

                  <div className="flex items-center gap-3 text-gray-600 ">
                    <Calendar className="w-5 h-5" />
                    <span>Founded in {enrichedData.founded}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 ">
                  <h3 className="text-lg font-semibold mb-2 text-gray-900 ">
                    About
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {enrichedData.description}
                  </p>
                </div>
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
