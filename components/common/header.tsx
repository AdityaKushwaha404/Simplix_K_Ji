import { FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavLink from './nav-link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export default function Header() {
  return (
    <nav className="container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto">
      {/* Logo */}
      <div className="flex lg:flex-1 items-center gap-1 lg:gap-2 shrink-0">
        <NavLink href="/" className="flex items-center gap-1">
          <FileText className="w-5 h-5 lg:w-8 lg:h-8 text-gray-900 hover:rotate-12 transform transition duration-200 ease-in-out" />
          <span className="font-extrabold text-gray-900 lg:text-xl">Simplix</span>
        </NavLink>
      </div>

      {/* Middle Navigation */}
      <div className="flex lg:justify-center gap-4 lg:gap-12 lg:items-center">
        <NavLink href="/#pricing">Pricing</NavLink>
        <SignedIn>
          <NavLink href="/dashboard">Your Summaries</NavLink>
        </SignedIn>
      </div>

      {/* Right Side Auth/User Buttons */}
      <div className="flex lg:justify-end lg:flex-1">
        <SignedIn>
          <div className="flex gap-2 items-center">
            <NavLink href="/upload">Upload a PDF</NavLink>
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>

        <SignedOut>
          <div>
            <NavLink href="/sign-in">Sign In</NavLink>
          </div>
        </SignedOut>
      </div>
    </nav>
  );
}
