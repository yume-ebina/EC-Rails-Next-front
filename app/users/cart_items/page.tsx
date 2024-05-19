"use client";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { CartItem } from "@/types/cartItem ";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Cart_items() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [cart_items, setCart_items] = useState<CartItem[]>([]);

  const fetchCart_items = async () => {
    try {
      const res = await axios.get<CartItem[]>(
        "http://localhost:3000/api/v1/cart_items"
      );
      setCart_items(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchCart_items();
  }, []);

  const subtotal = cart_items.reduce(
    (sum, item) => (sum += item.price * item.quantity),
    0
  );
  const addTax = subtotal * 0.1;
  const shipping = cart_items ? 500 : 0;

  const handleSubmit = async () => {
    const shipping_name = "ホゲホゲ";
    const postal_code = "111-1111";
    const address1 = "東京都";
    const address2 = "品川区hogehoge";
    const address3 = "hoge";
    const shipping_tel = "000-0000-0000";
    const postage = shipping;
    const billing_amount = subtotal + addTax + shipping;
    const status = 1;
    const user_id = 1;
    const order_products = cart_items;
    try {
      // APIを呼び出して、order.new、cart_itemsをorder_productsにコピー
      await axios.post("http://localhost:3000/api/v1/orders/confirm", {
        order: {
          shipping_name,
          postal_code,
          address1,
          address2,
          address3,
          shipping_tel,
          postage,
          billing_amount,
          status,
          user_id,
          order_products,
        },
      });
      router.push("/users/cart_items/confirm");
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:3000/api/v1/cart_items/destroy_all");
      router.push("/products");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Header title={"カート"} />
          {cart_items.length == 0 ? (
            <div className="mx-4 my-5">
              <div className="bg-white border border-slate-50 rounded-sm p-6">
                <p className="text-center text-xl">カートに商品はありません</p>
              </div>
            </div>
          ) : (
            <div className="mx-4 my-5 bg-white rounded-lg text-card-foreground shadow-sm grid gap-y-8 p-6">
              <div className="grid gap-3">
                <p className="font-bold mb-4">カート内商品</p>
                <div>
                  {cart_items.map((cart_item) => (
                    <div key={cart_item.id}>
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <img
                          src="/dummy-1.png"
                          alt="product image"
                          className="rounded-lg"
                        />
                        <div>
                          <p className="font-bold mb-3">{cart_item.name}</p>
                          <p>¥{cart_item.price}</p>
                        </div>
                      </div>
                      <div className="grid gap-2">
                        <div className="flex justify-between">
                          <p className="text-sm">挽き方</p>
                          <p className="text-sm">{cart_item.grind}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm">数量</p>
                          <p className="text-sm">{cart_item.quantity}</p>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-sm">小計</p>
                          <p className="text-sm">
                            ¥{cart_item.price * cart_item.quantity}
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
                <Button
                  variant="link"
                  className="text-primary"
                  onClick={handleDelete}
                >
                  カートの中身を全て削除
                </Button>
                <Button onClick={handleSubmit}>注文手続きへ進む</Button>
                <Button asChild variant="outline">
                  <Link href="/products">買い物を続ける</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
