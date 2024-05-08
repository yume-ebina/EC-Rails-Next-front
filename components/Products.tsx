"use client";
import { Product } from "@/types/product";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get<Product[]>(
        "http://localhost:3000/api/v1/products"
      );
      setProducts(res.data);
    } catch (error) {
      console.log("データの取得に失敗しました");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-6">
      {products.map((product) => (
        <Link href={`/products/${product.id}`} key={product.id}>
          <div className="rounded-3xl bg-white shadow-sm">
            <div className="h-[120px]">
              <img
                src={product.image}
                alt="product image"
                className="rounded-t-3xl"
              />
            </div>
            <div className="py-2 mt-3 px-4 h-[80px]">
              <p className="font-semibold text-base">{product.name}</p>
              <p className="font-light text-base">¥{product.price}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
