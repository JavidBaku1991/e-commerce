import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full mt-12 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-inner">
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
        
        {/* Contact Info */}
        <div className="flex flex-col items-center md:items-start text-sm text-gray-700 dark:text-gray-400 gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200 mb-2">Contact Us</h3>
          <span>
            Email:{" "}
            <a
              href="mailto:info@shopease.com"
              className="underline hover:text-blue-600 dark:hover:text-blue-300 transition"
            >
              info@shopease.com
            </a>
          </span>
          <span>Address: 123 Main St, Baku, Azerbaijan</span>
          <span>
            Phone:{" "}
            <a
              href="tel:+994501234567"
              className="underline hover:text-blue-600 dark:hover:text-blue-300 transition"
            >
              +994 50 123 45 67
            </a>
          </span>
        </div>

        {/* Social Links */}
        <div className="flex flex-col items-center gap-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-200">Follow Us</h3>
          <div className="flex gap-6">
            <a
              href="#"
              aria-label="Facebook"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-lg text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition transform hover:-translate-y-1"
            >
              <FaFacebook size={22} />
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-lg text-pink-500 hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-300 transition transform hover:-translate-y-1"
            >
              <FaInstagram size={22} />
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="p-3 rounded-full bg-white dark:bg-gray-800 shadow hover:shadow-lg text-blue-400 hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-200 transition transform hover:-translate-y-1"
            >
              <FaTwitter size={22} />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-300 dark:border-gray-700 py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © 2025 <span className="font-semibold text-blue-700 dark:text-blue-400">ShopEase</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
