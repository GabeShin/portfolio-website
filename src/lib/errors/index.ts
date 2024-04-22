export class HuggingFaceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HuggingFaceError";
  }
}

export class ChatGPTError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ChatGPTErrors";
  }
}
