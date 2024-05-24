"use client";
import { AuthContext } from "@/app/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/api/auth";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext } from "react";

const Page = () => {
  const router = useRouter();
  const { isSignedIn, setIsSignedIn, currentUser } = useContext(AuthContext);
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

  return (
    <>
      {isSignedIn && currentUser ? (
        <>
          <h1>Signed in successfully!</h1>
          <h2>Email: {currentUser?.email}</h2>
          <h2>Name: {currentUser?.name}</h2>
          <Button onClick={handleSignOut}>ログアウト</Button>
        </>
      ) : (
        <h1>Not signed in</h1>
      )}
    </>
  );
};

export default Page;
