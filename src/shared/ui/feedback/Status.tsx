import React from 'react'

interface StatusProps {
  status: 'created' | 'matched' | 'pending' | 'done'
  label?: string
}

const statusStyles = {
  created: {
    bg: 'bg-gray-300',
    text: 'text-black text-xs',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='10' cy='10' r='10' fill='#fff' fillOpacity='0.3' />
        <path
          d='M6 10.5L9 13.5L14 8.5'
          stroke='#fff'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  },
  matched: {
    bg: 'bg-primary-orange',
    text: 'text-white text-xs',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='10' cy='10' r='10' fill='#fff' fillOpacity='0.3' />
        <path
          d='M10 5V10L13 12'
          stroke='#fff'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  },
  pending: {
    bg: 'bg-yellow-400',
    text: 'text-white text-xs',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='10' cy='10' r='10' fill='#fff' fillOpacity='0.3' />
        <path
          d='M10 5V10L13 12'
          stroke='#fff'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  },
  done: {
    bg: 'bg-primary-green',
    text: 'text-white',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle cx='10' cy='10' r='10' fill='#fff' fillOpacity='0.3' />
        <path
          d='M6 10.5L9 13.5L14 8.5'
          stroke='#fff'
          strokeWidth='1.5'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
    )
  }
}

export const Status: React.FC<StatusProps> = ({ status, label }) => {
  const style = statusStyles[status]
  return (
    <span
      className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium ${style.bg} ${style.text}`}
      style={{ minHeight: 25 }}
    >
      {style.icon}
      {label}
    </span>
  )
}
