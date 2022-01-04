const localStorageKeys = {
  selectedNoteId: 'SELECTED_NOTE_ID',
};

export class LocalStorage {
  public static getSelectedNoteId(): number | null {
    const value = localStorage.getItem(localStorageKeys.selectedNoteId);
    if (!value) return null;

    const id = Number(value);
    if (!id) return null;

    return id;
  }

  public static setSelectedNoteId(id: number | null) {
    if (id == null) {
      this.removeSelectedNoteId();
    } else {
      localStorage.setItem(localStorageKeys.selectedNoteId, id.toString());
    }
  }

  public static removeSelectedNoteId() {
    localStorage.removeItem(localStorageKeys.selectedNoteId);
  }
}
