// "use client";

// import { UserType } from "@/types";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "./ui/dropdown-menu";
// import Image from "next/image";
// import Link from "next/link";
// import { signOut } from "next-auth/react";

// interface UserNavigationProps {
//   user: UserType;
// }
// export const UserNavigation = ({ user }: UserNavigationProps) => {
//   return (
//     <div>
//       <DropdownMenu>
//         <DropdownMenuTrigger>
//           <div className="relative w-10 h-10 flex-shrink-0">
//             <Image
//               src={user.avatar || "/default.jpeg"}
//               className="rounded-full object-cover"
//               alt={user.name || "avatar"}
//               fill
//             />
//           </div>
//         </DropdownMenuTrigger>

//         <DropdownMenuContent className="bg-white p-2 w-[300px]" align="end">
//           <Link href={`user/${user.uid}`}>
//             <DropdownMenuItem className="cursor-pointer">
//               <div className="break-words">
//                 <div className="mb-2">{user.name || ""}</div>
//                 <div className="text-slate-500">{user.email || ""}</div>
//               </div>
//             </DropdownMenuItem>
//           </Link>

//           <DropdownMenuSeparator />

//           <Link href="/users">
//             <DropdownMenuItem className="cursor-pointer">
//               マイページ
//             </DropdownMenuItem>
//           </Link>

//           <Link href="/users/history">
//             <DropdownMenuItem className="cursor-pointer">
//               購入履歴
//             </DropdownMenuItem>
//           </Link>

//           <DropdownMenuItem
//             onSelect={async () => {
//               await signOut({ callbackUrl: "/" });
//             }}
//             className="text-primary cursor-pointer"
//           >
//             ログアウト
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   );
// };
