import React, { useState, useEffect } from 'react';
import DesktopLayout from './DesktopLayout';
import MobileLayout from './MobileLayout';
import { Outlet } from 'react-router-dom'; // Usado para renderizar as páginas (como HomePage, LoginPage)

const Layout: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Definindo mobile para telas abaixo de 768px
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Chama ao carregar a página

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <Outlet />
        </MobileLayout>
      ) : (
        <DesktopLayout>
          <Outlet />
        </DesktopLayout>
      )}
    </>
  );
};

export default Layout;
