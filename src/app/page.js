"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./components/Loader";
import Header from "./components/Header";
import MeetingAction from "./components/MeetingAction";
import MeetingFeature from "./components/MeetingFeature";
import VideoGallery from "./components/VideoGallery";
import HelpSupport from "./components/HelpSupport";
import SystemSettings from "./components/SystemSettings";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [recordedVideos, setRecordedVideos] = useState([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      setIsLoading(false);

      const hasShownWelcome = localStorage.getItem("hasShownWelcome");
      if (!hasShownWelcome) {
        toast.success(`Welcome back, ${session?.user?.name}!`);
        localStorage.setItem("hasShownWelcome", "true");
      }

      // Fetch recorded videos
      fetch("/api/videos")
        .then((res) => res.json())
        .then((data) => setRecordedVideos(data))
        .catch((err) => console.error("Error fetching videos:", err));
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status, session]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 dark:bg-gray-900 transition-all">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-gradient-to-br from-gray-600 to-gray-700 text-white p-6 md:sticky md:top-0 transition-all">
        <h2 className="text-3xl font-bold mb-8 animate__animated animate__fadeIn animate__delay-1s">Dashboard</h2>
        <ul className="space-y-6">
          <li>
            <a
              href="#recorded-videos"
              className="block text-lg bg-gray-500 hover:bg-red-400 text-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:animate__pulse"
            >
              Recorded Videos
            </a>
          </li>
          <li>
            <a
              href="#help-support"
              className="block text-lg bg-gray-500 hover:bg-red-400 text-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:animate__pulse"
            >
              Help & Support
            </a>
          </li>
          <li>
            <a
              href="#system-settings"
              className="block text-lg bg-gray-500 hover:bg-gray-400 text-white rounded-lg shadow-md p-4 transition-transform hover:scale-105 hover:animate__pulse"
            >
              System Settings
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-white dark:bg-gray-900">
        {/* Header */}
        <Header />

        {/* Main Section */}
        <div className="px-6 py-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <section className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="w-full md:w-1/2 space-y-6">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-700 animate__animated animate__fadeIn">
                  Enhance Your Communication with NASENIKonnect
                </h1>
                <p className="text-base md:text-lg text-gray-700 dark:text-gray-300">
                  Seamlessly collaborate through advanced video conferencing features with NASENIKonnect.
                </p>
                <MeetingAction />
              </div>
              <div className="w-full md:w-1/2">
                <MeetingFeature />
              </div>
            </section>

            {/* Recorded Videos */}
            <section id="recorded-videos" className="mt-16 animate__animated animate__fadeInUp">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-8">
                Recorded Meetings
              </h2>
              <VideoGallery videos={recordedVideos} />
            </section>

            {/* Help & Support */}
            <section
              id="help-support"
              className="mt-16 bg-gray-100 dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md animate__animated animate__fadeIn"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Need Assistance?
              </h2>
              <HelpSupport />
            </section>

            {/* System Settings */}
            <section
              id="system-settings"
              className="mt-16 bg-gray-100 dark:bg-gray-800 p-6 md:p-8 rounded-lg shadow-md animate__animated animate__fadeIn"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Customize Your Experience
              </h2>
              <SystemSettings />
            </section>
          </div>
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center justify-center py-6 text-gray-700 dark:text-white">
          <p className="text-sm mb-2">&copy; 2024 Federal Inland Revenue Service. All rights reserved.</p>
          <p className="text-sm">
            Follow us on <a href="#" className="text-yellow-400">Facebook</a>, <a href="#" className="text-yellow-400">Twitter</a>, and <a href="#" className="text-yellow-400">LinkedIn</a>.
          </p>
        </footer>
      </main>
    </div>
  );
}
