"use client";

import {useState} from 'react'
import {Menu} from 'lucide-react'
import Link from 'next/link'
import {Button} from '@/components/ui/button'
import {SignOutButton, UserButton, useUser} from "@clerk/nextjs";

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const {user} = useUser()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <svg
                className="h-8 w-8 text-primary"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </Link>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-4">
                <li>
                  <Link href="/" className="text-muted-foreground hover:text-primary">
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-4">
              <UserButton/>
              <div className="hidden lg:block">
                <p className="text-sm font-medium">{user?.fullName}</p>
                <p className="text-xs text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
              </div>
            </div>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="h-6 w-6"/>
              <span className="sr-only">Open menu</span>
            </Button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium text-muted-foreground hover:text-primary hover:bg-accent">
              Dashboard
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-muted">
            <div className="flex items-center px-5">
              <div className="flex-shrink-0">
                <UserButton/>
              </div>
            </div>
            <div className="mt-3 px-2 space-y-1">
              <div className="block w-full text-left px-3 py-2">
                <SignOutButton/>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>);
}