import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const DesktopLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      {children}
    </>
  );
};

export default DesktopLayout;
