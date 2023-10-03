export enum PostCategory {
  PERSONAL = "personal",
  WORK = "work",
  EXPERIENCE = "experience",
}

export interface IPost {
  id: string; // Unique Identifier for each post
  counter: number; // Counter for upvotes and downvotes
  category: PostCategory; // Category of the post
  title: string; // Title of the post
  content: string; // Content of the post (Markdown)
  date: string; // Date when the post was created
  author: string; // Author of the post
  source: string; // Source of the post (Markdown file)
}
