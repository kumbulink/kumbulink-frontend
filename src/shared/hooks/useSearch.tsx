import { useState, useEffect } from 'react'

import type { Offer, AcceptedOffer } from '@/shared/types'

type Searchable = Offer | AcceptedOffer

export const useSearch = <T extends Searchable>(items: T[]) => {
  const [filteredItems, setFilteredItems] = useState<T[]>(items)

  useEffect(() => {
    setFilteredItems(items)
  }, [items])

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredItems(items)
      return
    }

    const searchTermLower = searchTerm.toLowerCase()
    const filtered = items.filter(item => {
      const sellerFromCountry = (item as Offer).sellerFromCountry
      const sellerToCountry = (item as Offer).sellerToCountry
      const sourceAmount = (item as Offer).sourceAmount
      const targetAmount = (item as Offer).targetAmount
      const sellerFrom = (item as Offer).sellerFrom
      const sellerTo = (item as Offer).sellerTo

      return (
        sellerFromCountry?.toLowerCase().includes(searchTermLower) ||
        sellerToCountry?.toLowerCase().includes(searchTermLower) ||
        sourceAmount?.includes(searchTerm) ||
        targetAmount?.includes(searchTerm) ||
        sellerFrom?.bank?.toLowerCase().includes(searchTermLower) ||
        sellerTo?.bank?.toLowerCase().includes(searchTermLower)
      )
    })

    setFilteredItems(filtered)
  }

  return {
    filteredItems,
    handleSearch
  }
}
