// "use client";

// import { useState } from "react";
// import { z } from "zod";
// import { useForm, SubmitHandler, Form } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
// import toast from "react-hot-toast";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "./ui/form";
// import { Input } from "./ui/input";
// import { Loader2 } from "lucide-react";
// import { TemporarrySignup } from "@/actions/user";

// const schema = z.object({
//   name: z.string().min(2, { message: "2文字以上入力する必要があります" }),
//   email: z.string().email({ message: "メールアドレスの形式ではありません" }),
//   password: z.string().min(8, { message: "8文字以上入力する必要があります" }),
// });

// type InputType = z.infer<typeof schema>;

// const Signup = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSignUp, setISignUp] = useState(false);

//   const form = useForm<InputType>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//     },
//   });

//   const onSubmit: SubmitHandler<InputType> = async (data) => {
//     setIsLoading(true);
//     try {
//       const res = await TemporarrySignup({
//         name: data.name,
//         email: data.email,
//         password: data.password,
//         rePassword: data.password,
//       });
//     } catch (error) {
//       toast.error("サインアップに失敗しました");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="mx-auto max-w-sm">
//       <CardHeader>
//         <CardTitle className="text-xl">Sign Up</CardTitle>
//         <CardDescription>
//           Enter your information to create an account
//         </CardDescription>
//       </CardHeader>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <CardContent>
//             <div className="grid gap-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div className="grid gap-2">
//                   <FormField
//                     control={form.control}
//                     name="name"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>名前</FormLabel>
//                         <FormControl>
//                           <Input placeholder="hogehoge" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="email"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>メールアドレス</FormLabel>
//                         <FormControl>
//                           <Input placeholder="xxxx.@aaaa.com" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />

//                   <FormField
//                     control={form.control}
//                     name="password"
//                     render={({ field }) => (
//                       <FormItem>
//                         <FormLabel>パスワード</FormLabel>
//                         <FormControl>
//                           <Input placeholder="password" {...field} />
//                         </FormControl>
//                         <FormMessage />
//                       </FormItem>
//                     )}
//                   />
//                 </div>
//                 <div className=" text-sm text-slate-500">
//                   サインアップすることで、利用規約、プライバシーポリシーに同意したことになります。
//                 </div>
//               </div>
//               <Button disabled={isLoading} type="submit" className="w-full">
//                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//                 アカウント作成
//               </Button>
//               <div className=" text-center mt-5">
//                 <Link href="/login" className="text-sm text-primary-foreground">
//                   すでにアカウントをお持ちの方
//                 </Link>
//               </div>
//             </div>
//           </CardContent>
//         </form>
//       </Form>
//     </Card>
//   );
// };

// export default Signup;
