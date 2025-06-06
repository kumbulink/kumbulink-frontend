import type { WP_REST_API_Post } from 'wp-types'

export interface Offer {
  id: number
  date: string
  sender: string
  senderBank: string
  sourceAmount: string
  recipient: string
  recipientBank: string
  targetAmount: string
  status: 'created' | 'pending' | 'done'
}

export interface WPPostWithACF extends WP_REST_API_Post {
  acf: Offer
}
