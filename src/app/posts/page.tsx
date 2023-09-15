"use client";
import SearchBar from "@/components/posts/searchbar";
import { Post } from "@/interfaces/posts.interface";
import dummyPosts from "../test/post.dummy";
import PostItem from "@/components/posts/post-item";

const PostPage = () => {
  return (
    <main>
      <SearchBar />
      {/* create post-item list with dummyPosts */}
      <div className="flex flex-col rounded-sm ml-5 mr-5">
        {dummyPosts.map((post: Post) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default PostPage;
