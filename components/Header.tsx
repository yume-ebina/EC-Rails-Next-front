import Link from "next/link";
import "remixicon/fonts/remixicon.css";

type HeaderProps = {
  back_link: string;
  title: string;
};

export default function Header(props: HeaderProps) {
  return (
    <div className="h-[44px] p-2 flex justify-center bg-white sticky top-0">
      <div className=" absolute top-3 left-0">
        <Link href={props.back_link}>
          <i className="ri-arrow-left-s-line ri-xl "></i>
        </Link>
      </div>
      <div className="font-semibold items-center">{props.title}</div>
    </div>
  );
}
