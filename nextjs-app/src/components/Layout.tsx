import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { StickyMobileCTA } from '@/components/StickyMobileCTA';

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      {children}
      <Footer />
      <StickyMobileCTA />
    </div>
  );
};

export default Layout;
