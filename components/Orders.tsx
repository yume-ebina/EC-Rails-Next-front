"use client";
import { Order } from "@/types/index";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { OrderProduct } from "@/types";
import Cookies from "js-cookie";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get<Order[]>(
        "http://localhost:3000/api/v1/orders",
        {
          headers: {
            "access-token": Cookies.get("_access_token"),
            client: Cookies.get("_client"),
            uid: Cookies.get("_uid"),
          },
        }
      );
      setOrders(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    fetchOrders();
  }, []);

  const shipping = orders ? 500 : 0;

  let subtotal = 0;
  orders.map(
    (order) =>
      (subtotal = order.order_products.reduce(
        (sum, item: OrderProduct) => (sum += item.price * item?.quantity),
        0
      ))
  );

  return (
    <div>
      {orders.map((order: Order) => (
        <div key={order.id}>
          <div className="mx-4 my-5 bg-white rounded-lg text-card-foreground shadow-sm grid gap-y-8 p-6">
            <div className="grid gap-3">
              <p>{format(order.created_at, "yyyy-MM-dd HH:mm:ss")}</p>
              {order.order_products.map((order_product: OrderProduct) => (
                <div key={order_product.id}>
                  <div>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <img
                        src="/dummy-1.png"
                        alt="product image"
                        className="rounded-lg"
                      />
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
                  <p className="text-sm">¥{subtotal * 0.1}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">送料</p>
                  <p className="text-sm">¥{shipping}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">合計</p>
                  <p className="font-bold text-lg">¥{order.billing_amount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
