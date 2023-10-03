import path from "path";
import fs from "fs/promises";
import { CustomError } from "../errors/custom-error";
import HttpStatusCode from "../constants/http-status-codes";
import { IPost, PostCategory } from "@/interfaces/posts.interface";

type ContentlessPost = Omit<IPost, "content">;

export interface IPostService {
  getPosts(): Promise<ContentlessPost[]>;
  getPost(id: string): Promise<IPost>;
}

export class PostService implements IPostService {
  private readonly postsDirectory: string;
  private readonly dbFilePath: string;

  constructor() {
    this.postsDirectory = path.join(process.cwd(), "database", "markdown");
    this.dbFilePath = path.join(process.cwd(), "database", "repository.json");
  }

  async getPosts(): Promise<any> {
    const fileContent = await fs.readFile(this.dbFilePath, "utf8");
    const { data } = JSON.parse(fileContent);

    // Map to array of posts without content.
    const posts: ContentlessPost[] = data.map((post: ContentlessPost) => ({
      id: post.id.toString(),
      date: post.date,
      title: post.title,
      source: post.source,
      counter: 0,
      category: post.category as PostCategory,
      author: "Gabe Shin",
    }));

    return posts;
  }

  async getPost(id: string): Promise<IPost> {
    const fileContent = await fs.readFile(this.dbFilePath, "utf8");
    const { data } = JSON.parse(fileContent);
    const postData = data.find(
      (post: ContentlessPost) => post.id.toString() === id
    );

    if (!postData) {
      return Promise.reject(
        new CustomError("Post not found", HttpStatusCode.NOT_FOUND)
      );
    }

    const fullPath = path.join(this.postsDirectory, postData.source);
    const markdownContent = await fs.readFile(fullPath, "utf8");

    const post: IPost = {
      id: postData.id.toString(),
      title: postData.title,
      source: postData.source,
      content: markdownContent,
      date: postData.date,
      counter: 0,
      category: postData.category as PostCategory,
      author: "Gabe Shin",
    };

    return post;
  }
}
