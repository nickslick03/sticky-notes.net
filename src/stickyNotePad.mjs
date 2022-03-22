import { getStickyNotesArray } from "./stickyNote.mjs";

const stickyNotePadsArray = [];

const stickyNotePadFunctions = {
    getChildren() 
    {
        let stickyNotesArray = getStickyNotesArray();
        let targetStickyNotes = [];
        for(let stickyNote of stickyNotesArray) {
            if(stickyNote.pad === this.name) {
                targetStickyNotes.push(stickyNote);
            }
        }
        return targetStickyNotes;
    }
}

export const stickyNotePadFactory = (name, color) => {
    let length = stickyNotePadsArray.length;
    stickyNotePadsArray.push(Object.create(stickyNotePadFunctions));
    stickyNotePadsArray[length].name = name;
    stickyNotePadsArray[length].color = color;
    return stickyNotePadsArray[length];
}

export const getStickyNotePadsArray = sortMethod => {
    const arrayCopy = [...stickyNotePadsArray];
    if(sortMethod === "name") {
        arrayCopy.sort((a, b) => {
            if(a.name < b.name) {
                return -1;
            } else {
                return 1;
            }
        });
    } else if(sortMethod === "color") {
        const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'black', 'brown', 'gray', 'white'];
        arrayCopy.sort((a, b) => {
            return colors.indexOf(a.color) - colors.indexOf(b.color);
        })
    }
    return arrayCopy;
}

export const removeStickyNotePad = (index) => {
    stickyNotePadsArray.splice(index, 1);
    if(stickyNotePadsArray.length === 0) {
        stickyNotePadFactory("main", "red");
    }
}

stickyNotePadFactory("main", "red");