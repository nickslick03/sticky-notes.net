import { format }  from "date-fns";
import { getStickyNotesArray } from "../objectModules/stickyNote.mjs";
import { getStickyNotePad, getStickyNotePadsArray } from "../objectModules/stickyNotePad.mjs";
import { stickyNotePadPage } from "../websitePages/stickyNotePadPage.js";
import { stickyNoteForm } from "./new&editStickyNote.mjs";
import { Main } from "./transition.js";

export const createStickyNode = stickyNote => {
    const container = document.createElement('div');
    container.classList.add('stickyNoteContainer');
    const color = getStickyNotePad(stickyNote.pad)._color;
    container.style.backgroundImage = `radial-gradient(${getSecondaryColor(color)}, ${color})`;
    container.style.color = getTextColor(color);
    const title = document.createElement('h3');
    const importance = document.createElement('div');
    const description = document.createElement('div');
    const date = document.createElement('div');
    title.className = 'title';
    importance.className = 'importance';
    description.className = 'description';
    date.className = 'date';
    title.textContent = stickyNote.title;
    importance.textContent = stickyNote.importance;
    description.textContent = stickyNote.description;
    date.textContent = format(stickyNote.date, 'MM/dd/yyyy');
    container.appendChild(title);
    container.appendChild(importance);
    container.appendChild(description);
    container.appendChild(date);
    container.addEventListener('click', () => {
        stickyNoteForm.openPopup(stickyNote);
    });
    return container;
};

export const createStickyNodePad = stickyNotePad => {
    const container = document.createElement('div');
    container.className = 'stickyNotePadContainer';
    const color = stickyNotePad._color;
    for(let i = 0; i < 3; i++) {
        const div = document.createElement('div');
        div.style.backgroundImage = `radial-gradient(${getSecondaryColor(color)}, ${color})`;
        if(i === 2) {
            div.textContent = stickyNotePad.name;
            div.style.color = getTextColor(color);
        }
        container.appendChild(div);
    }
    container.addEventListener('click', () => {
        Main.replace(stickyNotePadPage(stickyNotePad));
    })
    return container;
}

export const getStickyNodesArray = sortMethod => {
    const nodeArray = [];
    for(let stickyNote of getStickyNotesArray(sortMethod)) {
        nodeArray.push(createStickyNode(stickyNote));
    }
    return nodeArray;
}

export const getStickyNodePadsArray = sortMethod => {
    const nodeArray = [];
    for(let stickyNotePad of getStickyNotePadsArray(sortMethod)) {
        nodeArray.push(createStickyNodePad(stickyNotePad));
    }
    return nodeArray;
}

function getTextColor(color) {
    if(color.substring(color.lastIndexOf(',') + 1, color.lastIndexOf('%')) >= 50) {
        return 'black';
    } else {
        return 'white';
    }
}

export function getSecondaryColor(color) {
    let brightness = parseInt(color.substring(color.lastIndexOf(',') + 1, color.lastIndexOf('%')));
    if(brightness >= 50) {
        brightness -= 10;
        return color.substring(0, color.lastIndexOf(',') + 1) + brightness + color.substring(color.lastIndexOf('%'));
    } else {
        brightness += 10;
        return color.substring(0, color.lastIndexOf(',') + 1) + brightness + color.substring(color.lastIndexOf('%'));
    }
}