"use client";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";

export default function Page() {
  const { data: session, status } = useSession();
  return (
    <div>
      {status === "authenticated" ? (
        <div>
          <Header title={"ログイン情報"} />
          <div className="mx-4 my-5">
            <div className="bg-white border border-slate-50 rounded-sm p-6">
              <div className="mb-4 flex justify-between">
                <p className="text-xl font-bold">ログイン情報</p>
                <Button variant="outline">変更</Button>
              </div>
              <div className="space-y-3">
                <p>sample@hoge.com</p>
                <p>*********</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
