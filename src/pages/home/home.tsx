import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import type { Offer, OfferWPPostWithACF } from '@/shared/types'
import { useUserStore } from '@/shared/model'
import { useSearch } from '@/shared/hooks'
import { http } from '@/shared/lib'
import {
  Spinner,
  MenuIcon,
  JoinUsPopup,
  PopupWrapper,
  SearchBar,
  OfferCard,
  OfferDetails,
  SideMenu
} from '@/shared/ui'

export const HomePage = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [isPopUpOpen, setIsPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
  const [isLoading, setIsLoading] = useState(false)
  const isAuthenticated = useUserStore(state => state.user !== null)

  const { filteredItems: filteredOffers, handleSearch } = useSearch(offers)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await http.get<OfferWPPostWithACF[]>(
          '/wp/v2/classifieds?offer_status=created'
        )

        const parsedOffers = offers?.data.map(offer => {
          const {
            sellerFromCountry,
            sellerToCountry,
            sourceAmount,
            targetAmount,
            sellerFrom,
            sellerTo,
            status
          } = offer.acf
          const { id, date } = offer

          return {
            id,
            date,
            sellerFromCountry,
            sellerToCountry,
            sourceAmount,
            targetAmount,
            sellerFrom,
            sellerTo,
            status
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
      setIsPopupOpen(true)
    } else {
      void navigate('/create-offer')
    }
  }

  const handleOfferCardClick = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await http.get<OfferWPPostWithACF>(
        `/wp/v2/classifieds/${id}`
      )
      setPopupContent(
        <OfferDetails
          offer={response.data}
          onClose={() => setIsPopupOpen(false)}
        />
      )
      setIsLoading(false)
      setIsPopupOpen(true)
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
        <SearchBar onSearch={handleSearch} />
      </div>

      <main className='bg-gray-100 min-h-[calc(100vh-8rem)] relative'>
        <div className='px-4 pt-4 pb-32'>
          {filteredOffers.length === 0 && (
            <div className='space-y-4 mt-4 pl-5 pr-5'>
              <p className='text-gray-500 text-2xl text-center mt-48'>
                Nenhum anúncio disponível. Sê quem dá o pontapé de saída!
              </p>
            </div>
          )}

          {filteredOffers.length > 0 && (
            <div className='space-y-4 mt-4'>
              {filteredOffers.map((offer, index) => (
                <OfferCard
                  key={index}
                  {...offer}
                  handleClick={handleOfferCardClick}
                  displayStatus={false}
                />
              ))}
            </div>
          )}
        </div>

        {/* TODO: Add gradient to the bottom of the page*/}
        <div
          className='fixed bottom-0 left-0 right-0 h-32 pointer-events-none'
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
            className='w-full bg-primary-orange text-white py-4 text-xl rounded-md'
          >
            Anunciar
          </button>
        </div>
      </main>

      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
      />

      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupWrapper>
    </div>
  )
}
