import Link from "next/link"
import { Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"
import Container from "@/components/shop/Container"
import Image from "next/image"

export default function Footer() {
  return (
    <footer className="bg-white text-black dark:bg-gray-900 dark:text-white py-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-3 ">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-blue-400">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/committees" className="hover:text-blue-400">
                  Committees
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-blue-400">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-blue-400">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={18} className="mr-2" />
                <a href="mailto:info@gymkhana.edu" className="hover:text-blue-400">
                  info@gymkhana.edu
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2" />
                <a href="tel:+1234567890" className="hover:text-blue-400">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <div>
              <Image
                src="/gymkhana1.png"
                alt="Gymkhana Logo"
                width={100}
                height={100}
              />
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <Facebook size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Twitter size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </Container>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center">
        <p>&copy; {new Date().getFullYear()} Gymkhana. All rights reserved.</p>
      </div>
    </footer>
  )
}

