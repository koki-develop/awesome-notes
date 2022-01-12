const localStorageKeys = {
  selectedNoteId: 'SELECTED_NOTE_ID',
  openDrawer: {
    app: 'OPEN_DRAWER',
    popup: 'OPEN_DRAWER_POPUP',
  },
};

type Options = {
  popup?: boolean;
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

  public static getOpenDrawer(options?: Options): boolean {
    const key = options?.popup
      ? localStorageKeys.openDrawer.popup
      : localStorageKeys.openDrawer.app;
    const value = localStorage.getItem(key);
    return value === 'true';
  }

  public static setOpenDrawer(value: boolean, options?: Options): void {
    const key = options?.popup
      ? localStorageKeys.openDrawer.popup
      : localStorageKeys.openDrawer.app;
    localStorage.setItem(key, JSON.stringify(value));
  }

  private static _removeSelectedNoteId(): void {
    localStorage.removeItem(localStorageKeys.selectedNoteId);
  }
}
