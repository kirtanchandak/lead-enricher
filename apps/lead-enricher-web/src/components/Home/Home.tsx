import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { auth, onAuthStateChanged } from "../../lib/firebase";
import Navbar from "./Navbar";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  const handleLeadClick = () => {
    if (!isLoggedIn) {
      toast.error("You need to login to capture a lead");
    } else {
      // Redirect to the lead capture form if logged in
      window.location.href = "/lead";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
            Supercharge Your Lead Generation
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl mb-12 text-gray-600">
            Turn basic information into comprehensive leads in seconds with
            LeadEnrich
          </p>
          <a
            className="text-lg px-8 py-4 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onClick={handleLeadClick}
          >
            Capture Lead
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-4 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-600">
            © 2023 LeadEnrich. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
