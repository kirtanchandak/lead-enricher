"use client";

import Navbar from "./components/Navbar";

export default function LandingPage() {
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
            Turn basic information into comprehensive lead profiles in seconds
            with LeadEnrich
          </p>
          <button
            className="text-lg px-8 py-4 font-semibold rounded-lg shadow-md hover:shadow-lg transition duration-300"
            onClick={() => {
              // Handle CTA click (e.g., open signup modal, navigate to signup page)
              console.log("CTA clicked");
            }}
          >
            Get Started for Free
          </button>
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
