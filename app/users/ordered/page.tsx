"use client";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Orders from "@/components/Orders";
import { Order } from "@/types/orders";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { data: session, status } = useSession();

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

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Header title={"購入履歴"} />
          {orders.map((order) => (
            <div key={order.order_id}>
              <Orders />
            </div>
          ))}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
