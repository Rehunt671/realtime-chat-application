import React from 'react';
import './globals.css';
import Navbar from '../components/Navbar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const username = 'JohnDoe';

  return (
    <html lang="en">
      <body>
        {/* Move Navbar here */}
        <Navbar username={username} />
          <main >
            {children}
          </main>
      </body>
    </html>
  );
}
