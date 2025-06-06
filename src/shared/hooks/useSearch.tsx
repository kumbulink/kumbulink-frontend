import { useState, useEffect } from 'react'

import type { Offer as SearchableItem } from '@/shared/types'

export const useSearch = <T extends SearchableItem>(items: T[]) => {
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
      const { sender, recipient, sourceAmount, targetAmount, bank } = item

      return (
        sender?.toLowerCase().includes(searchTermLower) ||
        recipient?.toLowerCase().includes(searchTermLower) ||
        sourceAmount?.includes(searchTerm) ||
        targetAmount?.includes(searchTerm) ||
        bank?.toLowerCase().includes(searchTermLower)
      )
    })

    setFilteredItems(filtered)
  }

  return {
    filteredItems,
    handleSearch
  }
}
