import { getStickyNodesArray } from '../elementModules/stickyNoteElement.mjs';
import sortElement from '../elementModules/sortElement.mjs';
import { Main } from '../elementModules/transition.js';
import { mainMenuElement } from './mainMenu.mjs';

const allStickyNotesSkeleton = (() => {
  const container = document.createElement('div');
  const topContainer = document.createElement('div');
  const backLink = document.createElement('div');
  const title = document.createElement('h2');
  const sortContainer = sortElement.stickyNote();
  const stickyNotesContainer = document.createElement('div');
  container.className = 'moduleContainer';
  topContainer.className = 'topContainer';
  backLink.classList.add('link');
  backLink.classList.add('noselect');
  stickyNotesContainer.className = 'moduleSubContainer';
  backLink.textContent = 'Back';
  title.textContent = 'All Sticky Notes';
  backLink.addEventListener('click', () => {
    Main.replace(mainMenuElement);
  });
  sortContainer.lastChild.addEventListener('click', (element) => {
    reappendStickyNotes(element.target.textContent);
  });
  for (const element of [backLink, title, sortContainer]) {
    topContainer.appendChild(element);
  }
  for (const element of [topContainer, stickyNotesContainer]) {
    container.appendChild(element);
  }
  return {
    container,
    stickyNotesContainer,
  };
})();

export const allStickyNotesPage = () => {
  reappendStickyNotes('importance');
  return allStickyNotesSkeleton.container;
};

function reappendStickyNotes(sortMethod) {
  allStickyNotesSkeleton.stickyNotesContainer.textContent = '';
  const stickyNodesArray = getStickyNodesArray(sortMethod);
  for (const stickyNode of stickyNodesArray) {
    allStickyNotesSkeleton.stickyNotesContainer.appendChild(stickyNode);
  }
}
