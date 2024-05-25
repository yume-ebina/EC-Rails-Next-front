"use client";
import { CartItem } from "@/types/cartItem ";
import { Order } from "@/types/orders";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";

export default function Orders() {
  const [order_products, setOrder_products] = useState<CartItem[]>([]);
  const { data: session, status } = useSession();

  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrder_orders = async () => {
    try {
      const res = await axios.get<Order[]>(
        "http://localhost:3000/api/v1/orders"
      );
      setOrders(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchOrder_orders();
  }, []);

  const fetchOrder_products = async () => {
    try {
      const res = await axios.get<CartItem[]>(
        "http://localhost:3000/api/v1/order_products"
      );
      setOrder_products(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchOrder_products();
  }, []);

  const subtotal = order_products.reduce(
    (sum, product) => (sum += product.price * product.quantity),
    0
  );
  const addTax = subtotal * 0.1;
  const shipping = order_products ? 500 : 0;

  return (
    <div className="mx-4 my-5 bg-white rounded-lg text-card-foreground shadow-sm grid gap-y-8 p-6">
      <div className="grid gap-3">
        <div>
          {orders.map((order) => (
            <p key={order.order_id}>
              {format(order.created_at, "yyyy-MM-dd HH:mm:ss")}
            </p>
          ))}
          {order_products.map((order_product) => (
            <div key={order_product.id}>
              <div className="grid grid-cols-2 gap-4 mb-3">
                <img
                  src="/dummy-1.png"
                  alt="product image"
                  className="rounded-lg"
                />
                <div>
                  <p className="font-bold mb-3">{order_product.name}</p>
                  <p>¥{order_product.price}</p>
                </div>
              </div>
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <p className="text-sm">挽き方</p>
                  <p className="text-sm">{order_product.grind}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">数量</p>
                  <p className="text-sm">{order_product.quantity}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">小計</p>
                  <p className="text-sm">
                    ¥{order_product.price * order_product.quantity}
                  </p>
                </div>
                <div className="border border-slate-300 mb-4"></div>
              </div>
            </div>
          ))}

          <div className="grid gap-2">
            <div className="flex justify-between">
              <p className="text-sm">小計</p>
              <p className="text-sm">¥{subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">税額</p>
              <p className="text-sm">¥{addTax}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">送料</p>
              <p className="text-sm">¥{shipping}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-sm">合計</p>
              <p className="font-bold text-lg">
                ¥{subtotal + addTax + shipping}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
