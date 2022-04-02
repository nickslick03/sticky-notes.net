import { getStickyNodePadsArray, getStickyNodesArray } from "../elementModules/stickyNoteElement.mjs";
import { appendMain } from "../elementModules/transition.js";
import { allStickyNotesPage } from "./allStickyNotes.js";

const menuSkeleton = (() => {
    const container = document.createElement('div');
    const websiteTitle = document.createElement('h1');
    const topStickyNotesTitle = document.createElement('h2');
    const topStickyNotesContainer = document.createElement('div');
    const allStickyNotes = document.createElement('div');
    const stickyNotePadsTitle = document.createElement('h2');
    const stickyNotePadsContainer = document.createElement('div');
    container.className = 'moduleContainer';
    topStickyNotesContainer.className = 'moduleSubContainer';
    stickyNotePadsContainer.className = 'moduleSubContainer';
    allStickyNotes.className = 'link';
    websiteTitle.textContent = 'Sticky-Notes .net';
    topStickyNotesTitle.textContent = 'Top Sticky Notes';
    allStickyNotes.textContent = 'All Sticky Notes...';
    stickyNotePadsTitle.textContent = 'Sticky Note Pads';
    for(let element of [topStickyNotesTitle, allStickyNotes]) {
        element.classList.add('noselect');
        element.addEventListener('click', () => {
            appendMain(allStickyNotesPage());
        });
    }
    stickyNotePadsTitle.classList.add('noselect');
    for(let element of [websiteTitle, topStickyNotesTitle, topStickyNotesContainer, allStickyNotes, stickyNotePadsTitle, stickyNotePadsContainer]) {
        container.appendChild(element);
    }
    return {
        container,
        topStickyNotesContainer,
        stickyNotePadsContainer,
    }
})();

export const mainMenuElement = () => {
    menuSkeleton.topStickyNotesContainer.innerText = '';
    menuSkeleton.stickyNotePadsContainer.innerText = '';
    const stickyNodesArray = getStickyNodesArray('importance');
    const stickyNodePadsArray = getStickyNodePadsArray('name');
    let index = 0;
    if(stickyNodesArray.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'stickyNoteContainer';
        empty.style.backgroundImage = 'radial-gradient(hsla(360, 0%, 40%, 0), hsla(360, 0%, 40%, 0.5))';
        empty.style.padding = '40px';
        empty.style.boxSizing = 'border-box';
        empty.textContent = 'Press the + in the corner to add some sticky notes!';
        menuSkeleton.topStickyNotesContainer.appendChild(empty);
    } else {
        while(index < 4) {
        if(stickyNodesArray.length > index) {
            menuSkeleton.topStickyNotesContainer.appendChild(stickyNodesArray[index]);
        }
        index++;
        }
    }
    for(let pad of stickyNodePadsArray) {
        menuSkeleton.stickyNotePadsContainer.appendChild(pad);
    }
    return menuSkeleton.container;
}