"use client";
import Header from "@/components/Header";
import Slider from "@/components/Slider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Product } from "@/types/product";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function Page({ params }: { params: { id: string } }) {
  const router = useRouter();
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

  // フォームの入力値を管理するstate
  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState(1);

  // フォームの入力値を更新する関数
  const handleSubmit = async (e: React.FormEvent) => {
    console.log("クリックしました");
    const user_id = 1;
    const product_id = product?.id;

    e.preventDefault();
    try {
      // APIを呼び出して、cart_itemsを作成する
      await axios.post("http://localhost:3000/api/v1/cart_items", {
        cart_item: {
          user_id,
          product_id,
          quantity,
          grind,
        },
      });

      router.push("/products/cart_items");
    } catch (error) {
      console.error(error);
    }
  };

  const FormSchema = z.object({
    quantity: z.string().transform((val) => Number(val)),
    grind: z.string().transform((val) => Number(val)),
  });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      quantity: 1,
      grind: 1,
    },
  });

  if (!product) {
    return <p>読み込み中...</p>;
  }
  return (
    <div className=" bg-white pb-6">
      <Header title={"商品詳細"} />
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
      <Form {...form}>
        <form onSubmit={handleSubmit} className="px-5 flex flex-col gap-5">
          <div className="flex flex-col gap-4">
            <div className="">
              <FormField
                control={form.control}
                name="grind"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="font-semibold">挽き方</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setGrind(parseInt(value));
                      }}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">豆のまま</SelectItem>
                        <SelectItem value="2">中挽き</SelectItem>
                        <SelectItem value="3">粗挽き</SelectItem>
                        <SelectItem value="4">中細挽き</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem className="flex justify-between items-center">
                    <FormLabel className="font-semibold">数量</FormLabel>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setQuantity(parseInt(value));
                      }}
                      value={String(field.value)}
                      defaultValue={String(field.value)}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="選択してください" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit">購入する</Button>
        </form>
      </Form>
    </div>
  );
}
