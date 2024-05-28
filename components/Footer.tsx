import Link from "next/link";
import "remixicon/fonts/remixicon.css";

export default function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-0 h-[95px] pb-7 pt-4 px-5 bg-white border-t border-slate-500">
      <div className="flex flex-row justify-between">
        <Link href="/">
          <div className="flex flex-col items-center">
            <i className="ri-user-line ri-lg"></i>
            <p className="text-xs mt-1">メニュー</p>
          </div>
        </Link>
        <Link href="/users/history">
          <div className="flex flex-col items-center">
            <i className="ri-user-line ri-lg"></i>
            <p className="text-xs mt-1">購入履歴</p>
          </div>
        </Link>
        <Link href="/users">
          <div className="flex flex-col items-center">
            <i className="ri-user-line ri-lg"></i>
            <p className="text-xs mt-1">マイページ</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
