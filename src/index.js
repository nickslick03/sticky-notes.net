import './style.css';
import { mainMenuElement } from './websitePages/mainMenu.mjs';
import { Main } from './elementModules/transition.js';
import { retriveStickyNotePads, retriveStickyNotes } from './localStorage.mjs';

retriveStickyNotePads();
retriveStickyNotes();
Main.replace(mainMenuElement);

{
  const plusButton = document.getElementById('plusButton');
  document.body.addEventListener('click', (e) => {
    if (e.target === plusButton.children[0]) {
      plusButton.toggleAttribute('data-clicked');
    } else {
      plusButton.toggleAttribute('data-clicked', false);
    }
  });
}
