import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-primary/40 text-gray-400 py-6 sm:py-8 relative">
      {/* Gradient line effect */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
      
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Pnyx Institute. All rights reserved.
        </p>
        <div className="flex space-x-4 sm:space-x-6">
          <Link href="#" className="text-sm hover:text-primary transition-colors">
            Courses
          </Link>
          <Link href="#" className="text-sm hover:text-primary transition-colors">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}
