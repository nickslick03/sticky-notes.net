import { getStickyNotesArray } from "./stickyNote.mjs"
import { getStickyNotePadsArray } from "./stickyNotePad.mjs";

export const createStickyNode = () => {
    const container = document.createElement('div');
    container.classList.add('stickyNoteContainer');
    
}