type MessageSender = "user" | "bot";

export interface IMessage {
  id: string; // Unique Identifier for each post
  sender: MessageSender; // Sender of the message
  content: string; // Content of the message
  date: Date; // Date when the message was created
}
