import { useCallback, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../models/db';
import { Note } from '../models/note';

export const useNotes = (): Note[] => {
  const notes = useLiveQuery(
    () => db.notes.orderBy('updatedAt').toArray() ?? [],
  );
  return notes ?? [];
};

export const useNote = (id: number): Note | null => {
  const note = useLiveQuery(() => db.notes.get(id), [id]);
  return note ?? null;
};

export const useCreateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createNote = useCallback((params: Pick<Note, 'body'>) => {
    setLoading(true);
    const now = new Date();
    return db.notes
      .add({ ...params, createdAt: now, updatedAt: now })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { createNote, loading };
};

export const useUpdateNote = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updateNote = useCallback((id: number, params: Pick<Note, 'body'>) => {
    setLoading(true);
    const now = new Date();
    return db.notes.update(id, { ...params, updatedAt: now });
  }, []);

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
