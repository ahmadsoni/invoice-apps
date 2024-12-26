import create from "zustand";

type EditorMode = "add" | "update";

interface EditorModeStore {
  mode: EditorMode;
  id: string | null;
  setMode: (mode: EditorMode, id?: string) => void;
  resetMode: () => void;
}

const useEditorModeStore = create<EditorModeStore>((set) => ({
  mode: "add",
  id: null,
  setMode: (mode, id) => set({ mode, id: mode === "update" ? id || null : null }), 
  resetMode: () => set({ mode: "add", id: null }),
}));

export default useEditorModeStore;
