import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../App";

function Home() {
  const { darkMode } = useTheme();
  const { token } = useContext(AuthContext);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
      ),
      title: "Secure Storage",
      description:
        "Your files are encrypted and stored securely using advanced blockchain technology",
      color: "from-cyan-400 to-blue-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 10V3L4 14h7v7l9-11h-7z"
          />
        </svg>
      ),
      title: "Lightning Fast",
      description:
        "IPFS-powered storage ensures fast access to your files from anywhere in the world",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: "Decentralized",
      description:
        "No single point of failure. Your data is distributed across a secure network",
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      ),
      title: "NFT Metadata Pinning",
      description:
        "Pin and manage NFT metadata securely on IPFS with blockchain verification for digital asset integrity",
      color: "from-orange-400 to-red-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
          />
        </svg>
      ),
      title: "Storage Platform",
      description:
        "Comprehensive storage solution with advanced file management, sharing, and access control features",
      color: "from-indigo-400 to-purple-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
    {
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
      ),
      title: "Supply Chain Management",
      description:
        "Track and verify product authenticity throughout the supply chain using blockchain technology",
      color: "from-teal-400 to-cyan-500",
      bgColor: "bg-gray-900/50 border border-gray-800",
    },
  ];

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "256-bit", label: "Encryption" },
    { number: "24/7", label: "Support" },
    { number: "0", label: "Data Loss" },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Dark Theme */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div
            className={`text-center transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-sm font-medium mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2 animate-pulse"></span>
              Powered by Blockchain Technology
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent leading-tight">
              Welcome to Xinetee
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Experience the future of file storage with cutting-edge blockchain
              technology and IPFS. Secure, decentralized, and lightning-fast
              storage solutions for the modern world.
            </p>

            {token && (
              <div className="text-center mb-8">
                <div className="inline-flex items-center px-6 py-3 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-lg font-medium mb-4">
                  🎉 Welcome back!
                </div>
                <br />
                <Link
                  to="/dashboard"
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
                >
                  Go to Dashboard
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {!token && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link
                  to="/login"
                  className="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                >
                  Get Started
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <Link
                  to="/register"
                  className="group inline-flex items-center px-8 py-4 border-2 border-gray-600 text-lg font-semibold rounded-xl text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-500 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                >
                  Create Account
                  <svg
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </Link>
              </div>
            )}

            {/* Stats Section */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="text-center p-4 rounded-xl bg-gray-900/50 backdrop-blur-sm border border-gray-800 hover:border-gray-700 transition-all duration-300"
                >
                  <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-400 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section with Dark Theme */}
      <div className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium mb-4">
              ✨ Features
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Why Choose Xinetee?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Experience the future of file storage with cutting-edge blockchain
              technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl ${feature.bgColor} hover:shadow-2xl hover:shadow-cyan-500/10 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer backdrop-blur-sm`}
              >
                <div
                  className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 text-center leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section with Dark Theme */}
      <div className="py-24 bg-gradient-to-br from-gray-900 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6">
                🚀 About Us
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About Xinetee
              </h2>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Xinetee is a revolutionary file storage platform that combines
                the power of blockchain technology with IPFS (InterPlanetary
                File System) to provide secure, decentralized, and efficient
                file storage solutions.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                Our platform ensures that your files are not only secure but
                also easily accessible from anywhere in the world, while
                maintaining complete privacy and control over your data.
              </p>

              {/* Feature List */}
              <div className="space-y-4 mb-8">
                {[
                  "🔒 End-to-end encryption for maximum security",
                  "⚡ Lightning-fast file access with IPFS",
                  "🌐 Decentralized storage network",
                  "💎 Blockchain-verified file integrity",
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/login"
                  className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-semibold rounded-lg text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
                >
                  Try Xinetee
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Link>
                <a
                  href="https://xinetee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center px-6 py-3 border-2 border-gray-600 text-base font-semibold rounded-lg text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-500 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
                >
                  Learn More
                  <svg
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="relative">
              {/* Main Card */}
              <div className="p-8 rounded-2xl bg-gray-900/50 shadow-2xl border border-gray-800 backdrop-blur-sm">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg shadow-cyan-500/25">
                    <svg
                      className="w-16 h-16 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">
                    Blockchain-Powered
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Built on Ethereum smart contracts for maximum security and
                    transparency
                  </p>

                  {/* Tech Stack */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-gray-800/50 text-center border border-gray-700">
                      <div className="text-sm font-semibold text-cyan-400">
                        Ethereum
                      </div>
                      <div className="text-xs text-gray-400">
                        Smart Contracts
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-gray-800/50 text-center border border-gray-700">
                      <div className="text-sm font-semibold text-emerald-400">
                        IPFS
                      </div>
                      <div className="text-xs text-gray-400">Storage</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce shadow-lg shadow-yellow-400/50"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400/50"></div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section with Dark Theme */}
      <div className="py-20 bg-gradient-to-r from-gray-900 to-black">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of users who trust Xinetee for their file storage
            needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-semibold rounded-xl text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-cyan-500/25"
            >
              Start Free Trial
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-8 py-4 border-2 border-gray-600 text-lg font-semibold rounded-xl text-gray-300 bg-gray-900/50 hover:bg-gray-800/50 hover:border-gray-500 transform hover:scale-105 transition-all duration-200 backdrop-blur-sm"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer with Dark Theme */}
      <footer className="py-16 bg-black border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">Xinetee</h3>
              <p className="text-gray-400 text-sm">
                Secure, decentralized file storage powered by blockchain
                technology and IPFS.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="https://xinetee.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-cyan-400 transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                © 2024 Xinetee. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a
                  href="https://xinetee.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Website
                </a>
                <Link
                  to="/login"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-200"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
