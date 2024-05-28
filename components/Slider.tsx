import { Product } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Slider({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product>();

  const fetchProduct = async () => {
    const id = params.id;

    try {
      const res = await axios.get<Product>(
        `http://localhost:3000/api/v1/products/${id}`
      );
      console.log(res.data);

      setProduct(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const images = product?.images;

  if (!product || !images) {
    return <p>読み込み中...</p>;
  }

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true} // スライドを中央に配置
      loop={true} // スライドをループさせる
      speed={1000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }} // スライド表示時間
      pagination={{
        clickable: true,
      }} // ページネーション, クリックで対象のスライドに切り替わる
    >
      {images.map((src: string, index: number) => {
        return (
          <SwiperSlide key={`${index}`}>
            <img
              src={src}
              width={345}
              height={220}
              alt="product_image"
              className="rounded"
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
