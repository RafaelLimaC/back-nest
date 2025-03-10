import { Note } from '../entities/Note';

export abstract class NoteRepository {
  abstract create(note: Note): Promise<void>;

  abstract findById(id: string): Promise<Note | null>;

  abstract delete(id: string): Promise<void>;
}
