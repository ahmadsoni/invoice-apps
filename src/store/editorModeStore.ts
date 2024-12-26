import create from "zustand";

type EditorMode = "add" | "update";

interface EditorModeStore {
  mode: EditorMode;
  setMode: (mode: EditorMode) => void;
  resetMode: () => void;
}

const useEditorModeStore = create<EditorModeStore>((set) => ({
  mode: "add",
  setMode: (mode) => set({ mode }),
  resetMode: () => set({ mode: "add" }),
}));

export default useEditorModeStore;
