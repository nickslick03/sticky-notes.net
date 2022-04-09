import './style.css';
import { format } from 'date-fns';
import { stickyNoteFactory, getStickyNotesArray, removeStickyNote} from './objectModules/stickyNote.mjs';
import { stickyNotePadFactory, getStickyNotePadsArray, getStickyNotePad, removeStickyNotePad } from './objectModules/stickyNotePad.mjs';
import { createStickyNode, getStickyNodesArray } from './elementModules/stickyNoteElement.mjs';
import { mainMenuElement } from './websitePages/mainMenu.mjs';
import { Main } from './elementModules/transition.js';
import { stickyNoteForm } from './elementModules/new&editStickyNote.mjs';
import { stickyNotePadForm } from './elementModules/new&editStickyNotePad.mjs';

stickyNotePadFactory("main", "#0061c2");
stickyNotePadFactory("sub", "#ff5100");
stickyNotePadFactory("bub", "#0f7");



stickyNoteFactory(3, "practice violin", "practice music", "2021-03-15", "main");
stickyNoteFactory(2, "cook dinner", "chicken fajitas and mexican rice", "2021-03-15", "main");
stickyNoteFactory(2, "leg workout", "-calf raise -pistol squat -leg lunges", "2010-03-30", "sub");
stickyNoteFactory(1, "create website", "transition.mjs among other modules", "2021-03-30", "bub");

console.table(getStickyNotesArray());

console.table(getStickyNotePadsArray()[0].getChildren());

setTimeout(() => {
    Main.replace(mainMenuElement);
}, 1);