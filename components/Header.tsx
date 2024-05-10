"use client";
import { useRouter } from "next/navigation";
import "remixicon/fonts/remixicon.css";

type HeaderProps = {
  title: string;
};

export default function Header(props: HeaderProps) {
  const router = useRouter();
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
      <div className="font-semibold items-center">{props.title}</div>
    </div>
  );
}
