import { stickyNotePadForm } from "../elementModules/new&editStickyNotePad.mjs";
import sortElement from "../elementModules/sortElement.mjs";
import { createStickyNode } from "../elementModules/stickyNoteElement.mjs";
import { Main } from "../elementModules/transition.js";
import { sortStickyNotesArray } from "../objectModules/stickyNote.mjs";
import { mainMenuElement } from "./mainMenu.mjs";

const pageSkeleton = (() => {
    const container = document.createElement('div');
    const topContainer = document.createElement('div');
    const backLink = document.createElement('div');
    const title = document.createElement('h2');
    const sortContainer = sortElement.stickyNotePad();
    const edit = document.createElement('div');
    const stickyNotesContainer = document.createElement('div');
    container.className = 'moduleContainer';
    topContainer.className = 'topContainer';
    backLink.classList.add('link');
    backLink.classList.add('noselect');
    edit.classList.add('editButton');
    stickyNotesContainer.className = 'moduleSubContainer';
    backLink.textContent = 'Back';
    edit.textContent = 'Edit';
    backLink.addEventListener('click', () => {
        Main.replace(mainMenuElement);
    });
    for(let element of [backLink, edit, title, sortContainer]) {
        topContainer.appendChild(element);
    }
    for(let element of [topContainer, stickyNotesContainer]) {
        container.appendChild(element);
    }
    return {
        sortContainer,
        title,
        edit,
        container,
        stickyNotesContainer
    }
})()

export const stickyNotePadPage = pad => {
    return () => {
        pageSkeleton.title.textContent = pad.name;
        pageSkeleton.sortContainer.lastChild.addEventListener('click', element => {
            reappendStickyNotes(pad, element.target.textContent);
        });
        pageSkeleton.edit.addEventListener('click', () => {
            stickyNotePadForm.openPopup(pad);
        });
        reappendStickyNotes(pad);
        return pageSkeleton.container;
    }
}

function reappendStickyNotes(pad, sortMethod) {
    pageSkeleton.stickyNotesContainer.textContent = '';
    const stickyNotesList = sortStickyNotesArray(pad.getChildren(), sortMethod);
    for(let stickyNote of stickyNotesList) {
        pageSkeleton.stickyNotesContainer.appendChild(createStickyNode(stickyNote));
    }
}