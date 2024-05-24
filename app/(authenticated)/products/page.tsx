import Header from "@/components/Header";
import ProductsLayout from "./layout";
import Products from "@/components/Products";

export default function Page() {
  return (
    <ProductsLayout>
      <Header title={"商品一覧"} />
      <div className="py-5 px-4 flex-grow">
        <Products />
      </div>
    </ProductsLayout>
  );
}
