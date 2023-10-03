import { QdrantClient } from "@qdrant/js-client-rest";
import { NoteDto } from "./notes.dto";

export type GetCollectionResponseDto = ReturnType<
  typeof QdrantClient.prototype.getCollection
>;

export type GetCollectionsResponseDto = ReturnType<
  typeof QdrantClient.prototype.getCollections
>;

export type UpsertDataResponseDto = ReturnType<
  typeof QdrantClient.prototype.upsert
>;

export type CreateNoteRequestBodyDto = Omit<NoteDto, "id">;

export type CreateNoteResponseDto = ReturnType<
  typeof QdrantClient.prototype.upsert
>;

export type DeleteNoteResponseDto = ReturnType<
  typeof QdrantClient.prototype.delete
>;

export type SearchNotesResponseDto = ReturnType<
  typeof QdrantClient.prototype.search
>;
