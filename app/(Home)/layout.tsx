
import Navbar from "./_components/(header)/Navbar";
import Footer from "./_components/(footer)/Footer";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 pt-16">
        {children}
      </div>
      <Footer />
    </>
  )
}