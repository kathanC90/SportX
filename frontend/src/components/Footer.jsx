import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-sm">&copy; 2025 SportX. All Rights Reserved.</p>
        <div className="flex space-x-4 text-lg">
          <FaFacebook className="cursor-pointer hover:text-blue-500" />
          <FaTwitter className="cursor-pointer hover:text-blue-400" />
          <FaInstagram className="cursor-pointer hover:text-pink-500" />
        </div>
      </div>
    </footer>
  );
}
