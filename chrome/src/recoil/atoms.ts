import { atom } from 'recoil';
import { LocalStorage } from '@/lib/localStorage';

export const selectedNoteIdState = atom<number | null>({
  key: 'selectedNoteIdState',
  default: LocalStorage.getSelectedNoteId(),
});
