import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { db } from '@/lib/db';
import { LocalStorage } from '@/lib/localStorage';
import { Note } from '@/models/note';
import { selectedNoteIdState } from '@/recoil/atoms';

export const useNotes = (): Note[] => {
  const notes = useLiveQuery(
    () => db.notes.orderBy('updatedAt').reverse().toArray() ?? [],
  ) as Note[];
  return notes ?? [];
};

export const useNote = (id: number | null): Note | null => {
  const note = useLiveQuery(() => {
    if (id == null) return undefined;
    return db.notes.get(id);
  }, [id]) as Note;
  return note ?? null;
};

export const useSelectedNote = (): Note | null => {
  const selectedNoteId = useRecoilValue(selectedNoteIdState);
  return useNote(selectedNoteId);
};

export const useSelectNote = () => {
  const setSelectedNoteId = useSetRecoilState(selectedNoteIdState);

  const selectNote = useCallback(
    (note: Note | null) => {
      const id = note?.id ?? null;
      setSelectedNoteId(id);
      LocalStorage.setSelectedNoteId(id);
    },
    [setSelectedNoteId],
  );

  return { selectNote };
};

export const useCreateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createNote = useCallback((params: Pick<Note, 'title' | 'body'>) => {
    setLoading(true);
    const now = new Date();
    const newNote = { ...params, createdAt: now, updatedAt: now };
    return db.notes
      .add(newNote)
      .then(id => {
        return { id, ...newNote } as Note;
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { createNote, loading };
};

export const useUpdateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateNote = useCallback(
    (id: number, params: Partial<Pick<Note, 'title' | 'body'>>) => {
      setLoading(true);
      const now = new Date();
      return db.notes.update(id, { ...params, updatedAt: now });
    },
    [],
  );

  return { updateNote, loading };
};

export const useDeleteNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const deleteNote = useCallback((id: number) => {
    setLoading(true);
    return db.notes.delete(id);
  }, []);

  return { deleteNote, loading };
};
