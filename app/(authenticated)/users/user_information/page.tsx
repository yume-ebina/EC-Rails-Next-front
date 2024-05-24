"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import Header from "@/components/Header";
import Login from "@/components/Login";
import { Button } from "@/components/ui/button";
import { useContext } from "react";

export default function Page() {
  const { isSignedIn, currentUser } = useContext(AuthContext);
  return (
    <div>
      {isSignedIn && currentUser ? (
        <div>
          <Header title={"ユーザー情報"} />
          <div className="mx-4 my-5">
            <div className="bg-white border border-slate-50 rounded-sm p-6">
              <div className="mb-4 flex justify-between">
                <p className="text-xl font-bold">ユーザー情報</p>
                <Button variant="outline">変更</Button>
              </div>
              <div className="space-y-3">
                <p>{currentUser.name}</p>
                <p>111-1111</p>
                <p>東京都品川区hogehogehogehoge</p>
                <p>080-111-0000</p>
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
