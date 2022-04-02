import { createStickyNode } from "../elementModules/stickyNoteElement.mjs";
import { replaceMain } from "../elementModules/transition.js";
import { mainMenuElement } from "./mainMenu.mjs";

const pageSkeleton = (() => {
    const container = document.createElement('div');
    const topContainer = document.createElement('div');
    const backLink = document.createElement('div');
    const title = document.createElement('h2');
        const stickyNotesContainer = document.createElement('div');
    container.className = 'moduleContainer';
    topContainer.className = 'topContainer';
    backLink.classList.add('link');
    backLink.classList.add('noselect');
    stickyNotesContainer.className = 'moduleSubContainer';
    backLink.textContent = 'Back';
    title.textContent = 'All Sticky Notes';
    backLink.addEventListener('click', () => {
        replaceMain(mainMenuElement());
    });
    for(let element of [backLink, title]) {
        topContainer.appendChild(element);
    }
    for(let element of [topContainer, stickyNotesContainer]) {
        container.appendChild(element);
    }
    return {
        title,
        container,
        stickyNotesContainer
    }
})()

export const stickyNotePadPage = pad => {
    pageSkeleton.title.textContent = pad.name;
    reappendStickyNotes(pad);
    return pageSkeleton.container;
}

function reappendStickyNotes(pad) {
    pageSkeleton.stickyNotesContainer.textContent = '';
    const stickyNotesList = pad.getChildren();
    for(let stickyNote of stickyNotesList) {
        pageSkeleton.stickyNotesContainer.appendChild(createStickyNode(stickyNote));
    }
}