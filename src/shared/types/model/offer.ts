import type { WP_REST_API_Post } from 'wp-types'

export interface Offer {
  id: number
  date: string
  sellerFromCountry: string
  sellerFrom: {
    bank: string
    id: number
  }
  sourceAmount: string
  sellerToCountry: string
  sellerTo: {
    bank: string
    id: number
  }
  targetAmount: string
  status: 'created' | 'pending' | 'done'
}

export interface AcceptedOffer {
  id: number
  offer: {
    fields: Offer
    id: number
  }
  buyerFromCountry: string
  buyerFrom: {
    bank: string
    id: number
  }
  buyerToCountry: string
  buyerTo: {
    bank: string
    id: number
  }
  totalToBuyer: string
  totalToSeller: string
  sellerPaymentProof: string
  buyerPaymentProof: string
  status: 'created' | 'pending' | 'done'
}

export interface OfferWPPostWithACF extends WP_REST_API_Post {
  acf: Offer
}

export interface AcceptedOfferWPPostWithACF extends WP_REST_API_Post {
  acf: AcceptedOffer
  offer: {
    fields: Offer
    id: number
  }
}

export interface PaymentProofUpload {
  field: string,
  key: string,
  sucess: boolean,
  temporary_url: string
}
