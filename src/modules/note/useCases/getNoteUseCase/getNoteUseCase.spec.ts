import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GetNoteUseCase } from './getNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('GET NOTE USE CASE', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);
  });

  it('get note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(result).toEqual(note);
  });

  it('throw error when note not found', async () => {
    await expect(
      getNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('throw error when note has different user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(
      getNoteUseCase.execute({
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
