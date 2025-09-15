// src/types/listing.ts

export interface Listing {
  id: string;
  name: string;
  price: number;
  quantity: number;
  status: 'active' | 'sold-out' | 'draft';
  pickupTime: string;
}
