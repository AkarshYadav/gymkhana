import Link from "next/link";
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react";
import Container from "@/components/shop/Container";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/committees", label: "Committees" },
                { href: "/events", label: "Events" },
                { href: "gallery", label: "Gallery" }
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-blue-400 transition duration-300">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail size={18} />
                <a href="mailto:info@gymkhana.edu" className="hover:text-blue-400 transition duration-300">
                  info@gymkhana.edu
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} />
                <a href="tel:+1234567890" className="hover:text-blue-400 transition duration-300">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>

          {/* Logo & Social Links */}
          <div className="flex flex-col items-center">
            <Image src="/gymkhana1.png" alt="Gymkhana Logo" width={100} height={100} className="mb-4" />
            <div className="flex space-x-4">
              {[
                { href: "#", icon: <Facebook size={24} /> },
                { href: "#", icon: <Twitter size={24} /> },
                { href: "#", icon: <Instagram size={24} /> }
              ].map((social, index) => (
                <a key={index} href={social.href} className="hover:text-blue-400 transition duration-300">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-12 pt-6 border-t border-gray-700 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} Gymkhana. All rights reserved.</p>
      </div>
    </footer>
  );
}
