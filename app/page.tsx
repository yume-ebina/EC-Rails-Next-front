import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Products from "@/components/Products";

export default function Home() {
  return (
    <div>
      <Header title={"商品一覧"} />
      <div className="py-5 px-4 flex-grow">
        <Products />
      </div>
      <Footer />
    </div>
  );
}
