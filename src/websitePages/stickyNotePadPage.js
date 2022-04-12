import { stickyNotePadForm } from "../elementModules/new&editStickyNotePad.mjs";
import { createStickyNode } from "../elementModules/stickyNoteElement.mjs";
import { Main } from "../elementModules/transition.js";
import { mainMenuElement } from "./mainMenu.mjs";

const pageSkeleton = (() => {
    const container = document.createElement('div');
    const topContainer = document.createElement('div');
    const backLink = document.createElement('div');
    const title = document.createElement('h2');
    const edit = document.createElement('div');
    const stickyNotesContainer = document.createElement('div');
    container.className = 'moduleContainer';
    topContainer.className = 'topContainer';
    backLink.classList.add('link');
    backLink.classList.add('noselect');
    edit.classList.add('editButton');
    stickyNotesContainer.className = 'moduleSubContainer';
    backLink.textContent = 'Back';
    title.textContent = 'All Sticky Notes';
    edit.textContent = 'Edit';
    backLink.addEventListener('click', () => {
        Main.replace(mainMenuElement);
    });
    for(let element of [backLink, title, edit]) {
        topContainer.appendChild(element);
    }
    for(let element of [topContainer, stickyNotesContainer]) {
        container.appendChild(element);
    }
    return {
        topContainer,
        title,
        edit,
        container,
        stickyNotesContainer
    }
})()

export const stickyNotePadPage = pad => {
    return () => {
        pageSkeleton.title.textContent = pad.name;
        const newEditButton = pageSkeleton.edit.cloneNode(true);
        pageSkeleton.edit.remove();
        pageSkeleton.topContainer.appendChild(newEditButton);
        pageSkeleton.edit = newEditButton;
        pageSkeleton.edit.addEventListener('click', () => {
            stickyNotePadForm.openPopup(pad);
        });
        reappendStickyNotes(pad);
        return pageSkeleton.container;
    }
}

function reappendStickyNotes(pad) {
    pageSkeleton.stickyNotesContainer.textContent = '';
    const stickyNotesList = pad.getChildren();
    for(let stickyNote of stickyNotesList) {
        pageSkeleton.stickyNotesContainer.appendChild(createStickyNode(stickyNote));
    }
}