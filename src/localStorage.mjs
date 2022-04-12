import { format } from "date-fns";
import { stickyNoteFactory } from "./objectModules/stickyNote.mjs";
import { stickyNotePadFactory } from "./objectModules/stickyNotePad.mjs";

export const saveStickyNotePads = stickyNotePadArray => {
    const storageList = [];
    for(let stickyNotePad of stickyNotePadArray) {
        storageList.push({});
        for(let key of Object.getOwnPropertyNames(stickyNotePad)) {
            if(key === '_color') {
                storageList[storageList.length - 1].color = stickyNotePad.color;
            } else {
                storageList[storageList.length - 1][key] = stickyNotePad[key];
            }
            
        }
    }
    localStorage.setItem("stickyNotePads", JSON.stringify(storageList));
};

export const saveStickyNotes = stickyNoteArray => {
    const storageList = [];
    for(let stickyNote of stickyNoteArray) {
        storageList.push({});
        for(let key of Object.getOwnPropertyNames(stickyNote)) {
            if(key === 'date') {
                storageList[storageList.length - 1][key] = format(stickyNote[key], 'yyyy-MM-dd');
            } else {
                storageList[storageList.length - 1][key] = stickyNote[key];
            }
        }
    }
    localStorage.setItem("stickyNotes", JSON.stringify(storageList));
};

export const retriveStickyNotePads = () => {
    for(let stickyNotePad of JSON.parse(localStorage.getItem("stickyNotePads"))) {
        stickyNotePadFactory(stickyNotePad.name, stickyNotePad.color);
    }
}

export const retriveStickyNotes = () => {
    for(let stickyNote of JSON.parse(localStorage.getItem("stickyNotes"))) {
        stickyNoteFactory(stickyNote._importance, stickyNote.title, stickyNote.description, stickyNote.date, stickyNote.pad);
    }
};