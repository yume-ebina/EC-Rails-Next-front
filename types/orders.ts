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
  order_products: [];
  created_at: string;
};
