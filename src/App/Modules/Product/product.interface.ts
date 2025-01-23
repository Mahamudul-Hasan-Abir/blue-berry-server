export interface TReview {
  userId: string;
  rating: number;
  comment: string;
}

export type TProduct = {
  image: string;
  name: string;
  description: string;
  price: number;
  quantity: [string];
  reviews: TReview[];
  category: string;
  isAvailable: boolean;
  isDeleted: boolean;
};
