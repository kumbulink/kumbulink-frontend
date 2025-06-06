import { useEffect, useState } from 'react'

import type { WP_REST_API_Post } from 'wp-types'

import { OfferCard, AcceptedOfferDetails } from '@/shared/ui'

import { BackButton, PopupWrapper, SearchBar, Spinner } from '@/shared/ui'
import { http } from '@/shared/lib'

import { useUserStore } from '@/shared/model'
import { useSearch } from '@/shared/hooks'

import type { Offer } from '@/shared/types'

export interface WPPostWithACF extends WP_REST_API_Post {
  acf: Offer
}

export const AcceptedOffersPage = () => {
  const [offers, setOffers] = useState<Offer[]>([])
  const [isPopUpOpen, setIsPopupOpen] = useState(false)
  const [popupContent, setPopupContent] = useState<React.ReactNode>(null)
  const [isLoading, setIsLoading] = useState(false)
  const user = useUserStore(state => state.user)

  const { filteredItems: filteredOffers, handleSearch } = useSearch(offers)

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const offers = await http.get<WPPostWithACF[]>(
          `/wp/v2/matches?author=${user?.id}`
        )

        const parsedOffers = offers?.data.map(ad => {
          const {
            sender,
            recipient,
            sourceAmount,
            targetAmount,
            senderBank,
            recipientBank,
            status
          } = ad.acf
          const { id, date } = ad

          return {
            id,
            date,
            sender,
            recipient,
            sourceAmount,
            targetAmount,
            senderBank,
            recipientBank,
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

  const handleOfferCardClick = async (id: number) => {
    setIsLoading(true)
    try {
      const response = await http.get<WPPostWithACF>(`/wp/v2/matches/${id}`)
      setPopupContent(
        <AcceptedOfferDetails
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
    <div className='flex min-h-screen flex-col bg-white p-4'>
      {isLoading && <Spinner />}

      <div className='flex items-center pt-4'>
        <BackButton pathname='/' />
        <span className='text-title'>Anuncios Aceites</span>
      </div>

      <div className='px-4 py-2 bg-white my-4'>
        <SearchBar onSearch={handleSearch} />
      </div>

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
                displayStatus={true}
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

      <PopupWrapper isOpen={isPopUpOpen} onClose={() => setIsPopupOpen(false)}>
        {popupContent}
      </PopupWrapper>
    </div>
  )
}
