"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Login from "@/components/Login";
import Link from "next/link";
import { OrderProduct } from "@/types";
import { AuthContext } from "@/app/contexts/AuthContext";
import Cookies from "js-cookie";

export default function Page() {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  const [order_products, setOrder_products] = useState<OrderProduct[]>([]);

  const fetchOrder_products = async () => {
    try {
      const res = await axios.get<OrderProduct[]>(
        "http://localhost:3000/api/v1/orders/determine",
        {
          headers: {
            "access-token": Cookies.get("_access_token"),
            client: Cookies.get("_client"),
            uid: Cookies.get("_uid"),
          },
        }
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
    (sum, item) => (sum += item.price * item.quantity),
    0
  );
  const addTax = subtotal * 0.1;
  const shipping = order_products ? 500 : 0;

  return (
    <div>
      {isSignedIn && currentUser ? (
        <div>
          <Header title={"購入確定"} />
          <div className="mx-4 my-5 bg-white rounded-lg text-card-foreground shadow-sm grid gap-y-8 p-6">
            <div className="text-center">
              <i className="ri-checkbox-circle-fill ri-6x text-green-500"></i>
              <p className="text-xl font-bold">購入完了しました！</p>
            </div>

            <div className="grid gap-3">
              <p className="font-bold mb-4">注文情報</p>
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
            <Button asChild>
              <Link href="/products">商品一覧へ</Link>
            </Button>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
