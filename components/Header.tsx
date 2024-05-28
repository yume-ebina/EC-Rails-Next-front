"use client";
import { useRouter } from "next/navigation";
import "remixicon/fonts/remixicon.css";
import { AuthContext } from "@/app/contexts/AuthContext";
import { signOut } from "@/lib/api/auth";
import Link from "next/link";
import { useContext } from "react";
import Cookies from "js-cookie";
import { Button } from "./ui/button";

type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext);
  const router = useRouter();

  const handleSignOut = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signOut();

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token");
        Cookies.remove("_client");
        Cookies.remove("_uid");

        setIsSignedIn(false);
        router.push("/");

        console.log("Succeeded in sign out");
      } else {
        console.log("Failed in sign out");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const AuthButtons = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <>
            <Button variant="ghost" onClick={handleSignOut}>
              ログアウト
            </Button>
          </>
        );
      } else {
        return (
          <>
            <Link className="mr-5" href="/login">
              ログイン
            </Link>
          </>
        );
      }
    } else {
      return <></>;
    }
  };
  return (
    <div className="h-[44px] p-2 flex justify-center bg-white sticky top-0 z-10">
      <div className="absolute top-3 left-0">
        <button
          onClick={() => {
            router.back();
          }}
        >
          <i className="ri-arrow-left-s-line ri-xl"></i>
        </button>
      </div>
      <div className="font-semibold text-center items-center">
        {props.title}
      </div>
      <div className="absolute top-0 right-0">
        <AuthButtons />
      </div>
    </div>
  );
}
