export interface Session {
  accessToken?: string;
  user?: {
    id?: string;
    name?: string;
    image?: string;
  };
}

export interface SignUpParams {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

// サインイン
export interface SignInParams {
  email: string;
  password: string;
}

// ユーザー
export interface User {
  id: number;
  uid: string;
  provider: string;
  email: string;
  name: string;
  nickname?: string;
  image?: string;
  allowPasswordChange: boolean;
  created_at: Date;
  updated_at: Date;
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

export type CreateTestParams = {};

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
  user_id: number;
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  grind: string;
};

export type Order = {
  id: string;
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
  order_products: [];
  created_at: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  images: [];
};

export type OrderProduct = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  grind: string;
  order_id: string;
  product_id: string;
  created_at: string;
};
