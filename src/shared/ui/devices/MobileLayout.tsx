import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export const MobileLayout: React.FC<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default MobileLayout
