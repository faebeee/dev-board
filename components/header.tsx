import { SidebarTrigger } from '@/components/ui/sidebar';
import { FC } from 'react';

export const Header: FC<{title: string}> = ({ title }) => {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <SidebarTrigger/>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-4">
                <li>
                  <h1 className="text-muted-foreground hover:text-primary">
                    {title}
                  </h1>
                </li>
              </ul>
            </nav>
          </div>
          <div className="hidden md:flex items-center space-x-4">
          </div>
        </div>
      </div>
    </header>);
};