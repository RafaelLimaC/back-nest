import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../repositories/NoteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { GetManyNoteUseCase } from './getManyNotesUseCase';
import { Note } from '../../entities/Note';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getManyNotesUseCase: GetManyNoteUseCase;

describe('GET MANY NOTES USE CASE', () => {
  beforeEach(() => {
    noteRepositoryInMemory = new NoteRepositoryInMemory();
    getManyNotesUseCase = new GetManyNoteUseCase(noteRepositoryInMemory);
  });

  it('get many notes', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() =>
      makeNote({
        userId: user.id,
      }),
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: user.id,
    });

    expect(result).toEqual(notes);
  });

  it('get only user notes', async () => {
    const user1 = makeUser({});
    const user2 = makeUser({});
    const notes = [...new Array(10)].map((_, index) =>
      makeNote({
        userId: index < 5 ? user1.id : user2.id,
      }),
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: user1.id,
    });

    expect(result).toHaveLength(5);
  });

  it('control notes per page', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map(() =>
      makeNote({
        userId: user.id,
      }),
    );

    noteRepositoryInMemory.notes = notes;

    const result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '8',
    });

    expect(result).toHaveLength(8);
  });

  it('control notes page', async () => {
    const user = makeUser({});
    const notes = [...new Array(10)].map((_, index) =>
      makeNote({
        userId: user.id,
        title: index < 5 ? 'page 1' : 'page 2',
      }),
    );

    noteRepositoryInMemory.notes = notes;

    let result: Note[];

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '1',
    });

    expect(result[0].title).toEqual('page 1');

    result = await getManyNotesUseCase.execute({
      userId: user.id,
      perPage: '5',
      page: '2',
    });

    expect(result[0].title).toEqual('page 2');
  });
});
