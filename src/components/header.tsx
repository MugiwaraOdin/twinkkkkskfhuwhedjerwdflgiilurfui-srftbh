import Link from 'next/link'
import Image from 'next/image'
import LoginButton from './login-button'

export default function Header() {
  return (
    <header className="bg-black text-white py-4 px-4 sm:px-6 md:px-16 sticky top-0 z-50 shadow-md gradient-border-b">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo and site name */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/phoenix-logo.svg" alt="Pnyx Institute Logo" width={36} height={36} className="rounded-full" />
          <span className="text-xl font-bold text-primary">Pnyx Institute</span>
        </Link>
        
        {/* Navigation links with improved spacing for mobile */}
        <nav className="space-x-2 sm:space-x-4 md:space-x-6 flex items-center">
          <Link href="#" className="text-sm hover:text-primary transition-colors text-gray-300">
            Courses
          </Link>
          <Link href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
            Cohorts
          </Link>
          <LoginButton />
        </nav>
      </div>
    </header>
  )
}
