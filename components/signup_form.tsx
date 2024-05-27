// "use client";
// import React, { useState, useContext } from "react";
// import Cookies from "js-cookie";
// import { useRouter } from "next/navigation";

// import { signUp } from "@/lib/api/auth";
// // import { AlertMessage } from "@/components/alertmessage/AlertMessage";
// import { SignUpParams } from "@/types";
// import { AuthContext } from "@/app/contexts/AuthContext";

// export const SignUpForm: React.FC = () => {
//   const router = useRouter();

//   const { setIsSignedIn, setCurrentUser } = useContext(AuthContext);
//   const [name, setName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [passwordConfirmation, setPasswordConfirmation] = useState<string>("");
//   const [alertMessageOpen, setAlertMessageOpen] = useState<boolean>(false);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     const params: SignUpParams = {
//       name: name,
//       email: email,
//       password: password,
//       passwordConfirmation: passwordConfirmation,
//     };

//     try {
//       const res = await signUp(params);
//       console.log(res);

//       if (res.status === 200) {
//         // アカウント作成と同時にログインさせてしまう
//         // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
//         Cookies.set("_access_token", res.headers["access-token"]);
//         Cookies.set("_client", res.headers["client"]);
//         Cookies.set("_uid", res.headers["uid"]);

//         setIsSignedIn(true);
//         setCurrentUser(res.data.data);

//         router.push("/");

//         console.log("Signed in successfully!");
//       } else {
//         setAlertMessageOpen(true);
//       }
//     } catch (err) {
//       console.log(err);
//       setAlertMessageOpen(true);
//     }
//   };

//   return (
//     <div className="mx-auto md:w-2/3 w-full px-10 pt-24 pb-16">
//       <p className="text-4xl font-bold text-center">ログイン</p>
//       <form onSubmit={handleSubmit} className="mb-0">
//         <div className="mt-16">
//           <label htmlFor="name" className="text-2xl">
//             お名前
//           </label>
//           <input
//             type="text"
//             id="name"
//             placeholder="name"
//             className="w-full my-5 py-3"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <label htmlFor="email" className="text-2xl">
//             メールアドレス
//           </label>
//           <input
//             type="email"
//             id="email"
//             placeholder="test@example.com"
//             className="w-full my-5 py-3"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor="password" className="text-2xl">
//             パスワード
//           </label>
//           <input
//             type="password"
//             id="password"
//             placeholder="password"
//             className="w-full my-5 py-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             autoComplete="current-password"
//           />
//         </div>
//         <div>
//           <label htmlFor="password-confirmation" className="text-2xl">
//             パスワード確認
//           </label>
//           <input
//             type="password"
//             id="password-confirmation"
//             placeholder="password confirmation"
//             className="w-full my-5 py-3"
//             value={passwordConfirmation}
//             onChange={(e) => setPasswordConfirmation(e.target.value)}
//             required
//             autoComplete="current-password"
//           />
//         </div>
//         <div className="py-6 pb-20">
//           <button
//             type="submit"
//             className="font-bold text-xl bg-blue-500 px-3 rounded-full text-white"
//           >
//             サインアップ
//           </button>
//         </div>
//       </form>
//       {/* <AlertMessage // エラーが発生した場合はアラートを表示
//         open={alertMessageOpen}
//         setOpen={setAlertMessageOpen}
//         severity="error"
//         message="Invalid emai or password"
//       /> */}
//     </div>
//   );
// };
"use client";
import { z } from "zod";
// import { useForm, SubmitHandler, Form } from "react-hook-form";
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

export const Sign_up_form: React.FC = () => {
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
    <div>
      <form onSubmit={handleSubmit}>
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-xl">新規登録</CardTitle>
          </CardHeader>
          {/* <Form {...form}> */}
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                {/* <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => ( */}
                <Label>名前</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="name"
                  className="mb-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />

                {/* )} */}
                {/* /> */}

                {/* <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => ( */}

                <Label>メールアドレス</Label>

                <Input
                  type="email"
                  id="email"
                  placeholder="test@example.com"
                  className="mb-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                {/* )}
                  /> */}

                {/* <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => ( */}

                <Label>パスワード</Label>

                <Input
                  type="password"
                  id="password"
                  placeholder="password"
                  className="mb-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                <Label>確認用パスワード</Label>

                <Input
                  type="password"
                  id="password-confirmation"
                  placeholder="password confirmation"
                  className="mb-2"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  required
                  autoComplete="current-password"
                />

                {/* )}
                  /> */}
              </div>
              {/* <Button disabled={isLoading} type="submit" className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                アカウント作成
              </Button> */}
              <div className=" text-xs text-slate-500">
                新規登録することで、利用規約、プライバシーポリシーに同意したことになります。
              </div>
              <Button variant="default" className="w-full" type="submit">
                新規登録
              </Button>
              <div className="mt-4 text-center text-sm">
                <Link href="/login" className="underline">
                  すでにアカウントをお持ちの方はこちら
                </Link>
              </div>
            </div>
          </CardContent>

          {/* </Form> */}
        </Card>
      </form>
    </div>
  );
};

export default Sign_up_form;
