"use client";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Login from "@/components/Login";
import Link from "next/link";
import { CartItem } from "@/types/cartItem ";

export default function Page() {
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

  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Header title={"購入確認"} />
          <div className="mx-4 my-5 bg-white rounded-lg text-card-foreground shadow-sm grid gap-y-8 p-6">
            <div>
              <p className="font-bold mb-4">ログイン情報</p>
              <div className="grid gap-y-3">
                <p>{session.user?.name}</p>
                <p>111-1111</p>
                <p>東京都品川区hogehogehogehoge</p>
                <p>000-0000-0000</p>
              </div>
            </div>
            <div>
              <p className="font-bold mb-4">登録済みのお支払い情報</p>
              <div className="grid gap-y-3">
                <p>xxxxxxxxxxx1111</p>
                <p>04/25</p>
                <p>HOGE HOGE</p>
              </div>
            </div>
            <div className="grid gap-3">
              <p className="font-bold mb-4">カート内商品</p>
              <div>
                {cart_items.map((cart_item) => (
                  <div key={cart_item.id}>
                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <img
                        src={cart_item.image}
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
                      <div className="border border-slate-300 mb-4"></div>
                    </div>
                  </div>
                ))}

                <div className="grid gap-2">
                  <div className="flex justify-between">
                    <p className="text-sm">小計</p>
                    <p className="text-sm">¥700</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">税額</p>
                    <p className="text-sm">¥70</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">送料</p>
                    <p className="text-sm">¥300</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-sm">合計</p>
                    <p className="font-bold text-lg">¥1070</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href="/users/cart_items/determine">注文を確定</Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
