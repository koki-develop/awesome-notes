const localStorageKeys = {
  selectedNoteId: 'SELECTED_NOTE_ID',
  openDrawer: 'OPEN_DRAWER',
};

export class LocalStorage {
  public static getSelectedNoteId(): number | null {
    const value = localStorage.getItem(localStorageKeys.selectedNoteId);
    if (!value) return null;

    const id = Number(value);
    if (!id) return null;

    return id;
  }

  public static setSelectedNoteId(id: number | null): void {
    if (id == null) {
      this._removeSelectedNoteId();
    } else {
      localStorage.setItem(localStorageKeys.selectedNoteId, id.toString());
    }
  }

  public static getOpenDrawer(): boolean {
    const value = localStorage.getItem(localStorageKeys.openDrawer);
    return value === 'true';
  }

  public static setOpenDrawer(value: boolean): void {
    localStorage.setItem(localStorageKeys.openDrawer, JSON.stringify(value));
  }

  private static _removeSelectedNoteId(): void {
    localStorage.removeItem(localStorageKeys.selectedNoteId);
  }
}
