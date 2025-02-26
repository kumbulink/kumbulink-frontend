import { Link } from "react-router-dom"

interface BackButtonProps {
  pathname: string
}

export const BackButton = ({ pathname }: BackButtonProps) => {
  return (
    <Link to={{ pathname }}>
      <button className='mr-4'>
        <svg width='24' height='24' viewBox='0 0 24 24' fill='none'>
          <path
            d='M15 18L9 12L15 6'
            stroke='black'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </Link>
  )
}