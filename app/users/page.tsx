import Header from "@/components/Header";
import Link from "next/link";
import "remixicon/fonts/remixicon.css";

export default function Page() {
  return (
    <div>
      <Header title={"マイページ"} />
      <div className="m-6">
        <div className="bg-white h-[64px] border-b">
          <Link href="/users/login">
            <div className="h-[64px] flex items-center justify-between px-4 py-5">
              <p className="text-base font-bold">ログイン情報</p>
              <i className="ri-arrow-right-s-line ri-xl"></i>
            </div>
          </Link>
        </div>
        <div className="bg-white h-[64px] border-b">
          <Link href="/users/user_information">
            <div className="h-[64px] flex items-center justify-between px-4 py-5">
              <p className="text-base font-bold">ユーザー情報</p>
              <i className="ri-arrow-right-s-line ri-xl"></i>
            </div>
          </Link>
        </div>
        <div className="bg-white h-[64px] border-b">
          <Link href="/users/payment">
            <div className="h-[64px] flex items-center justify-between px-4 py-5">
              <p className="text-base font-bold">お支払い情報</p>
              <i className="ri-arrow-right-s-line ri-xl"></i>
            </div>
          </Link>
        </div>
        <div className="bg-white h-[64px] border-b">
          <Link href="/users/cart_items">
            <div className="h-[64px] flex items-center justify-between px-4 py-5">
              <p className="text-base font-bold">カート情報</p>
              <i className="ri-arrow-right-s-line ri-xl"></i>
            </div>
          </Link>
        </div>
        <div className="bg-white h-[64px] border-b">
          <Link href="/users/ordered">
            <div className="h-[64px] flex items-center justify-between px-4 py-5">
              <p className="text-base font-bold">購入履歴</p>
              <i className="ri-arrow-right-s-line ri-xl"></i>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
