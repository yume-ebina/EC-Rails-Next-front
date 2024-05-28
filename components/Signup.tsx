"use client";
import { z } from "zod";
import { useForm, SubmitHandler, Form } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Loader2 } from "lucide-react";
import React, { useState, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { signUp } from "@/lib/api/auth";
// import { AlertMessage } from "@/components/alertmessage/AlertMessage";
import { SignUpParams } from "@/types";
import { AuthContext } from "@/app/contexts/AuthContext";

export const Signup: React.FC = () => {
  const router = useRouter();

  const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
  const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

  const schema = z.object({
    name: z.string().min(2, { message: "2文字以上入力する必要があります" }),
    email: z.string().email({ message: "メールアドレスの形式ではありません" }),
    password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
  });

  type InputType = z.infer<typeof schema>;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params: SignUpParams = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
    };

    try {
      const res = await signUp(params);
      console.log(res);

      if (res.status === 200) {
        // アカウント作成と同時にログインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        Cookies.set("_access_token", res.headers["access-token"]);
        Cookies.set("_client", res.headers["client"]);
        Cookies.set("_uid", res.headers["uid"]);

        setIsSignedIn(true);
        setCurrentUser(res.data.data);

        router.push("/");

        console.log("Signed in successfully!");
      } else {
        setAlertMessageOpen(true);
      }
    } catch (err) {
      console.log(err);
      setAlertMessageOpen(true);
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      {/* <Form {...form}> */}
      <form onSubmit={handleSubmit} className="mt-25">
        <CardContent>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                {/* <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => ( */}
                <FormItem>
                  <FormLabel>名前</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      id="name"
                      placeholder="name"
                      className="w-full my-5 py-3"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {/* )} */}
                {/* /> */}

                {/* <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => ( */}
                <FormItem>
                  <FormLabel>メールアドレス</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      id="email"
                      placeholder="test@example.com"
                      className="w-full my-5 py-3"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {/* )}
                  /> */}

                {/* <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => ( */}
                <FormItem>
                  <FormLabel>パスワード</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      id="password"
                      placeholder="password"
                      className="w-full my-5 py-3"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                {/* )}
                  /> */}
              </div>
              <div className=" text-sm text-slate-500">
                サインアップすることで、利用規約、プライバシーポリシーに同意したことになります。
              </div>
            </div>
            {/* <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                アカウント作成
              </Button> */}
            <Button variant="default" className="w-full" type="submit">
              新規登録
            </Button>
            <div className=" text-center mt-5">
              <Link href="/login" className="text-sm text-primary-foreground">
                すでにアカウントをお持ちの方
              </Link>
            </div>
          </div>
        </CardContent>
      </form>
      {/* </Form> */}
    </Card>
  );
};

export default Signup;
