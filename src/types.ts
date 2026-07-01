/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type CareType = "Assisted Living" | "Memory Care" | "Independent Living";

export interface Community {
  id: string;
  name: string;
  careTypes: CareType[];
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  description: string;
  imageUrl: string;
  amenities: string[];
  features: string[];
  phone: string;
}

export interface Message {
  id: string;
  sender: 'user' | 'advisor';
  text: string;
  timestamp: string;
}

export interface TourBooking {
  id: string;
  communityId: string;
  communityName: string;
  date: string;
  timeSlot: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  notes?: string;
  status: 'confirmed' | 'pending';
}
