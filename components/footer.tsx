// components/Footer.tsx
import Link from 'next/link';
import { FaTwitter, FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-blue-400 mb-4">Solidarity</h3>
            <p className="text-gray-300 mb-4 max-w-md">
              &ldquo;Solidarity is the bridge between dreams and direction — where potential finds purpose, and every learner discovers their path.&rdquo;
            </p>
            <div className="flex space-x-4">
              {[FaTwitter, FaLinkedin, FaGithub, FaEnvelope].map((Icon, index) => (
                <button
                  key={index}
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Icon size={20} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Features', 'How It Works', 'For Students', 'For Institutes'].map((item) => (
                <li key={item}>
                  <Link
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <button className="text-gray-300 hover:text-white transition-colors duration-200">
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 Solidarity. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2 md:mt-0">
            Built with ❤️ for the future of education
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;