"use client";
import React, { useEffect, useState } from "react";

type Product = {
  id: number;
  name: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Product[]>([]);
  const [newTitle, setNewTitle] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/products");
      if (!response.ok) {
        throw new Error("データの取得に失敗しました");
      }
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h2 className="text-3xl mb-4">商品一覧</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.name}</li>
        ))}
      </ul>
    </main>
  );
}
