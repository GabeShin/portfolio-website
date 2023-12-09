export type MessageSender = "user" | "bot";

export type MessageType = {
  id: string; // Unique Identifier for each message
  sender: MessageSender; // Sender of the message
  content: string; // Content of the message
  date: Date; // Date when the message was created
};
