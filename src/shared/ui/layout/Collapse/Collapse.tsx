import { useState } from 'react'

import { ChevronRightIcon } from '@/shared/ui'

interface CollapseProps {
  title: string
  children: React.ReactNode
}

export const Collapse = ({ title, children }: CollapseProps) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='bg-white mb-2'>
      <button
        className='w-full px-4 py-4 flex items-center justify-between text-left'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className='text-gray-900 pr-8'>{title}</span>
        <ChevronRightIcon
          className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-200 ${
          isOpen ? 'max-h-[500px]' : 'max-h-0'
        }`}
      >
        <div className='px-4 pb-4 max-w-none'>
          {/* <ReactMarkdown
            components={{
              p: ({ children }) => (
                <p className='text-base text-gray-600 mb-4'>{children}</p>
              ),
              ul: ({ children }) => (
                <ul className='space-y-2 mt-4'>{children}</ul>
              ),
              li: ({ children, ...props }) => (
                <li className='text-base' {...props}>
                  {children}
                </li>
              ),
              code: ({ children, ...props }) => (
                <span className='text-inherit bg-transparent' {...props}>
                  {children}
                </span>
              ),
              pre: ({ children, ...props }) => (
                <div className='bg-gray-100 p-2 rounded' {...propsReactMarkdown}>
                  {children}
                </div>
              )
            }}
          >
            {children as string}
          </ReactMarkdown> */}
          {children}
        </div>
      </div>
    </div>
  )
}
