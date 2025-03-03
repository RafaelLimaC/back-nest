import { Note } from '../entities/Note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Rotina diária',
      userId: '123123',
      description: 'Beba água',
      ...override,
    },
    id,
  );
};
