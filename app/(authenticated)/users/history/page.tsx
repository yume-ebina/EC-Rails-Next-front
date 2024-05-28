"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Orders from "@/components/Orders";
import { Order } from "@/types/index";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const { isSignedIn, currentUser } = useContext(AuthContext);

  const fetchOrder_orders = async () => {
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
    fetchOrder_orders();
  }, []);

  return (
    <div>
      {isSignedIn && currentUser ? (
        <div>
          <Header title={"購入履歴"} />
          {orders.length == 0 ? (
            <div className="mx-4 my-5">
              <div className="bg-white border border-slate-50 rounded-sm p-6">
                <p className="text-center text-base">
                  購入した商品はありません
                </p>
              </div>
            </div>
          ) : (
            <Orders />
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
