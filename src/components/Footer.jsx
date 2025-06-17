import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-2xl font-bold text-white">MediaZone</h2>
          <p className="text-sm mt-2">© {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Services</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Contact Us</a></li>
            <li><a href="/about" className="hover:text-white">Carrer</a></li>
            <li><a href="/privacy" className="hover:text-white">Social media</a></li>
          </ul>
        </div>
         <div>
          <h3 className="text-xl font-semibold text-white mb-2">Links</h3>
          <ul className="space-y-2">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-2">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
              <FaLinkedin />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        Built with  copy wright@India
      </div>
    </footer>
  );
}

export default Footer;
