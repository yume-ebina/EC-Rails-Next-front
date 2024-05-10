"use client";
import Header from "@/components/Header";
import Login from "@/components/Login";
import Logout from "@/components/Logout";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Session() {
  const { data: session, status } = useSession();
  return (
    <div>
      <Header title={"ログインまたは登録"} />
      <div>
        {status === "authenticated" ? (
          <div>
            <p>セッションの期限：{session.expires}</p>
            <p>ようこそ、{session.user?.name}さん</p>
            <img
              src={session.user?.image ?? ``}
              alt=""
              style={{ borderRadius: "50px" }}
            />
            <div>
              <Link href="/products">商品一覧へ</Link>
              <Logout />
            </div>
          </div>
        ) : (
          <Login />
        )}
      </div>
    </div>
  );
}
