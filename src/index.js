import './style.css';
import { mainMenuElement } from './websitePages/mainMenu.mjs';
import { Main } from './elementModules/transition.js';
import { retriveStickyNotePads, retriveStickyNotes } from './localStorage.mjs';

retriveStickyNotePads();
retriveStickyNotes();
Main.replace(mainMenuElement);