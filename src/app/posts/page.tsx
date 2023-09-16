"use client";
import SearchBar from "@/components/posts/searchbar";
import { IPost } from "@/interfaces/posts.interface";
import PostItem from "@/components/posts/post-item";
import dummyPosts from "@/test/post.dummy";

const PostPage = () => {
  return (
    <main>
      <SearchBar />
      {/* create post-item list with dummyPosts */}
      <div className="flex flex-col rounded-sm ml-5 mr-5">
        {dummyPosts.map((post: IPost) => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
};

export default PostPage;
