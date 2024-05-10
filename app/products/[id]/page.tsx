"use client";
import React, { useEffect, useState } from "react";
import { Product } from "@/types/product";
import axios from "axios";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Slider from "@/components/Slider";

export default function Page({ params }: { params: { id: string } }) {
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

  if (!product) {
    return <p>読み込み中...</p>;
  }
  return (
    <div className=" bg-white pb-6">
      <Header back_link={"/products"} title={"商品詳細"} />
      <div className="px-4 py-5 flex flex-col gap-4">
        <div className="">
          <Slider
            params={{
              id: product.id,
            }}
          />
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xl text-slate-900 font-bold">{product.name}</p>
          <div className="flex gap-4 text-base text-slate-900 font-bold">
            <p>¥{product.price}</p>
          </div>
          <p className="text-base text-slate-900">{product.description}</p>
        </div>
      </div>
      <div className="px-5 flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p className="font-semibold flex items-center">挽き方</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bean">豆のまま</SelectItem>
                <SelectItem value="naka">中挽き</SelectItem>
                <SelectItem value="ara">粗挽き</SelectItem>
                <SelectItem value="hoso">中細挽き</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <p className="font-semibold flex items-center">数量</p>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="-" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button>今すぐ買う</Button>
        <Button variant="outline">カートに追加</Button>
      </div>
    </div>
  );
}
