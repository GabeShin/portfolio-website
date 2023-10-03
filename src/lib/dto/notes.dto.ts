export type NoteDto = {
  id: string;
  vector: number[];
  payload: {
    source: string;
    contents: string;
  };
};
