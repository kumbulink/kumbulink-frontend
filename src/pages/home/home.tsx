import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import http from '@shared/utils/http.ts'
import type { WP_REST_API_Post } from 'wp-types'

import { SearchBar } from './components/SearchBar'
import { OfferCard } from './components/OfferCard'
import { SideMenu } from './components/SideMenu'
import { OfferDetailsPopup } from './components/OfferDetailsPopup'
import { Spinner } from '@shared/ui/Spinner'

import { MenuIcon } from '@shared/ui/icons'
import { JoinUsPopup } from '@components/JoinUsPopup'
import { Popup } from '@components/Popup'

interface ExchangeOffer {
  id: number
  date: string
  sender: string
  recipient: string
  sourceAmount: string
  targetAmount: string
  tax?: string
  bank: string
  paymentKey: string
}

export interface WPPostWithACF extends WP_REST_API_Post {
  acf: ExchangeOffer
}

export const HomePage = () => {
  const [offers, setOffers] = useState<ExchangeOffer[]>([])
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isPopUpOpen, setIsPopUpOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = localStorage.getItem('jwt_token')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await http.get<WPPostWithACF[]>('/wp/v2/classifieds')

        const parsedOffers = offers?.data.map(ad => {
          const {
            sender,
            recipient,
            sourceAmount,
            targetAmount,
            bank,
            paymentKey
          } = ad.acf
          const { id, date } = ad

          return {
            id,
            date,
            sender,
            recipient,
            sourceAmount,
            targetAmount,
            bank,
            paymentKey
          }
        })
        setOffers(parsedOffers || [])
      } catch (err) {
        console.error(err)

        return {}
      }
    }

    void fetchOffers()
  }, [])

  const handleCreateAdClick = () => {
    if (!isAuthenticated) {
      setPopupContent(<JoinUsPopup />)
      setIsPopUpOpen(true)
    } else {
      void navigate('/criar-anuncio')
    }
  }

  const handleOfferCardClick = async (id: number) => {
    // if (!isAuthenticated) {
    //   setPopupContent(<JoinUsPopup />)
    //   setIsPopUpOpen(true)
    //   return
    // }
    setIsLoading(true)
    try {
      const response = await http.get<WPPostWithACF>(`/wp/v2/classifieds/${id}`)
      setPopupContent(
        <OfferDetailsPopup
          offer={response.data}
          onClose={() => setIsPopUpOpen(false)}
        />
      )
      setIsLoading(false)
      setIsPopUpOpen(true)
    } catch (err) {
      setIsLoading(false)
      console.error(err)
    }
  }

  return (
    <div className='min-h-screen bg-primary-green'>
      {isLoading && <Spinner />}

      <header className='px-4 py-2 flex items-center justify-between bg-primary-green'>
        <button
          onClick={() => setIsSideMenuOpen(true)}
          className='text-white p-2'
        >
          <MenuIcon />
        </button>
        <img src='kumbulink-horizontal.svg' alt='Kumbulink' className='h-10' />
        <div className='w-8' />
      </header>

      <div className='px-4 py-2 bg-primary-green'>
        <SearchBar />
      </div>

      <main className='bg-gray-100 min-h-[calc(100vh-8rem)] relative'>
        <div className='px-4 pt-4 pb-32'>
          {offers.length === 0 && (
            <div className='space-y-4 mt-4 pl-5 pr-5'>
              <p className='text-gray-500 text-2xl text-center mt-48'>
                Nenhum anúncio disponível. Sê quem dá o pontapé de saída!
              </p>
            </div>
          )}

          {offers.length > 0 && (
            <div className='space-y-4 mt-4'>
              {offers.map((offer, index) => (
                <OfferCard
                  key={index}
                  {...offer}
                  handleClick={handleOfferCardClick}
                />
              ))}
            </div>
          )}
        </div>

        <div
          className='fixed bottom-0 left-0 right-0 h-48 pointer-events-none'
          style={{
            background:
              'linear-gradient(to top, rgb(243 244 246) 15%, rgba(243, 244, 246, 0.9) 30%, rgba(243, 244, 246, 0.7) 50%, rgba(243, 244, 246, 0.3) 70%, rgba(243, 244, 246, 0) 85%)',
            backdropFilter: 'blur(1.5px)',
            WebkitBackdropFilter: 'blur(1.5px)'
          }}
        />

        <div className='fixed bottom-8 left-4 right-4 z-50'>
          <button
            onClick={handleCreateAdClick}
            className='w-full bg-primary-orange text-white py-4 font-medium rounded-lg'
          >
            Anunciar
          </button>
        </div>
      </main>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />

      <Popup isOpen={isPopUpOpen} onClose={() => setIsPopUpOpen(false)}>
        {popupContent}
      </Popup>
    </div>
  )
}
