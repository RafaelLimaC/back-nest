import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;

  abstract findById(id: string): Promise<Note | null>;

  abstract findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]>;

  abstract delete(id: string): Promise<void>;

  abstract save(note: Note): Promise<void>;
}
