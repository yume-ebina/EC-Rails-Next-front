// "use client";
// import { UserType } from "@/lib/nextauth";
// import Link from "next/link";
// import { Button } from "./ui/button";
// import { UserNavigation } from "./UserNavigation";

// interface NavigationProps {
//   user: UserType | null;
// }

// export const Navigation = ({ user }: NavigationProps) => {
//   return (
//     <div className="shadow-lg shadow-gray-100 mb-10">
//       {/* <div className=" container mx-auto flex max-w-screen-md items-center justify-between">
//         <Link href="/" className="cursor-pointer text-xl font-bold">
//           PUTEMARUcoffee
//         </Link> */}

//       {user ? (
//         <div>
//           <UserNavigation user={user} />
//         </div>
//       ) : (
//         <div className="flex items-center space-x-1">
//           <Button asChild variant="ghost" className="font-bold">
//             <Link href="/login">ログイン</Link>
//           </Button>
//           <Button asChild variant="ghost" className="font-bold">
//             <Link href="/signup">新規登録</Link>
//           </Button>
//         </div>
//       )}
//     </div>
//     // </div>
//   );
// };
