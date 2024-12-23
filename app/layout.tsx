import { AppSidebar } from '@/lib/components/app-sidebar';
import { Login } from '@/lib/components/login';
import { SidebarProvider } from '@/lib/components/ui/sidebar';
import { Toaster } from '@/lib/components/ui/sonner';
import { JiraIssueHighlightProvider } from '@/lib/context/jira-issue-hightlight-provider';
import { ClerkProvider, SignedIn, SignedOut, } from '@clerk/nextjs';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <ClerkProvider>
      <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >

      <SidebarProvider>
        <SignedIn>
          <AppSidebar/>
        </SignedIn>
        <main className="w-full">
          <SignedOut>
            <Login/>
          </SignedOut>
          <SignedIn>
            <JiraIssueHighlightProvider>
              {children}
            </JiraIssueHighlightProvider>
          </SignedIn>
        </main>
      </SidebarProvider>
      <Toaster/>

      </body>
      </html>
    </ClerkProvider>
  );
}
