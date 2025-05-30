import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const DesktopLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default DesktopLayout
