import Dexie, { Table } from 'dexie';
import { Note } from '@/models/note';

export class MySubClassedDexie extends Dexie {
  notes!: Table<Omit<Note, 'id'> & { id?: number }>;

  constructor() {
    super('awesome-notes');
    this.version(1).stores({
      notes: '++id, body, createdAt, updatedAt',
    });
  }
}

export const db = new MySubClassedDexie();
