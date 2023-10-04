"use client";
import SearchBar from "@/components/posts/searchbar";
import { IPost } from "@/interfaces/posts.interface";
import PostItem from "@/components/posts/post-item";
import { useEffect, useState } from "react";

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
    } catch (error) {
      console.error("Could not fetch posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main>
      <SearchBar />
      {/* create post-item list with dummyPosts */}
      <div className="flex flex-col rounded-sm ml-5 mr-5">
        {posts.map((post: IPost) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default PostPage;
