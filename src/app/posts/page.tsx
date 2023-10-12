"use client";
import SearchBar from "@/components/posts/searchbar";
import { IPost } from "@/interfaces/posts.interface";
import PostItem from "@/components/posts/post-item";
import { useEffect, useState } from "react";

const CACHE_DURATION = 10 * 60 * 1000; // 10 minutes in milliseconds

const PostPage = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

  const fetchPosts = async () => {
    try {
      const response = await fetch("/api/posts");

      if (!response.ok) {
        throw new Error("Could not fetch posts!");
      }

      const data = await response.json();
      setPosts(data.data);

      const cachedData = {
        posts: data.data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem("posts", JSON.stringify(cachedData));
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };

  useEffect(() => {
    const cachedData = localStorage.getItem("posts");
    if (cachedData) {
      const { posts, timestamp } = JSON.parse(cachedData);
      const now = new Date().getTime();
      if (now - timestamp < CACHE_DURATION) {
        setPosts(posts);
        return;
      }
    }
    fetchPosts();
  }, []);

  return (
    <main>
      <SearchBar />
      <div className="flex flex-col rounded-sm ml-5 mr-5">
        {posts.map((post: IPost) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default PostPage;
