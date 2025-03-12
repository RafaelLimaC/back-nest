import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EditNoteUseCase } from './editNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('EDIT NOTE USE CASE', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);
  });

  it('edit note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'title changed';
    const descriptionChanged = 'description changed';

    await editNoteUseCase.execute({
      title: titleChanged,
      noteId: note.id,
      userId: user.id,
      description: descriptionChanged,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged,
    );
  });

  it('throw error when note not found', async () => {
    await expect(
      editNoteUseCase.execute({
        title: 'New title',
        description: 'new description',
        noteId: 'fakeId',
        userId: 'fakeId',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('throw error when note has different user', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];

    await expect(
      editNoteUseCase.execute({
        title: 'New title',
        description: 'new description',
        noteId: note.id,
        userId: 'fakeId',
      }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
