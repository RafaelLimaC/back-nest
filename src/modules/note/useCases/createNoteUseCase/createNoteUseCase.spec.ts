import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('CREATE NOTE USE CASE', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);
  });

  it('create note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Fazer o almoço',
      userId: '123123',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
