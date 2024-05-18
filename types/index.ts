export interface Session {
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export interface User {
  id?: string;
}

export interface Session {
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export interface ApiResponse {
  id: number;
  title: string;
  body: string;
  rating: string;
  visibility: boolean;
  user_id: number;
  item_url?: string;
  image_url?: string;
  price?: number;
  favorite_cosmetic_id?: number;
  skin_type: string;
  skin_trouble: string;
  age: number;
  userName: string;
  user: {
    id: number;
    name: string;
  };
}

export type LoadingContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export type UserInfoContextType = {
  postal_code: string;
  address1: string;
  address2: string;
  address3: string;
  tel: string;
};

export type ApiResponseNotification = {
  id: number;
  item_type: string;
  open_date: string | null;
  expiry_date: string | null;
  created_at: string;
  updated_at: string;
  user_id: number;
};

export type Notification = {
  id: number;
  productType: string;
  openDate: Date | null;
  expiryDate: Date | null;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  grind: string;
};

export type Order = {
  order_id: string;
  product_id: string;
  quantity: number;
  grind: string;
  price: number;
  shipping_name: string;
  postal_code: string;
  address1: string;
  address2: string;
  address3: string;
  shipping_tel: string;
  postage: number;
  billing_amount: number;
  status: number;
  user_id: number;
  created_at: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: [];
};
