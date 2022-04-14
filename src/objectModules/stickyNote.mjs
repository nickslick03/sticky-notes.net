import { compareDesc, parseISO } from 'date-fns';
import { saveStickyNotes } from '../localStorage.mjs';

const stickyNotesArray = [];

const stickyNoteFunctions = {
    get importance() {
        if(this._importance === 1) {
            return "!";
        } else if(this._importance === 2) {
            return "!!";
        } else if(this._importance === 3) {
            return "!!!";
        } else {
            return "";
        }
    },
    set importance(value) {
        this._importance = value;
    }, 
};

export const stickyNoteFactory = (importance, title, description, date, pad) => {
    const stickyNote = Object.create(stickyNoteFunctions);
    Object.assign(stickyNote, {
        importance,
        title,
        description,
        date: parseISO(date),
        pad,
    })
    stickyNotesArray.push(stickyNote);
};

export const getStickyNotesArray = sortMethod => {
    const copyArray = sortStickyNotesArray([...stickyNotesArray], sortMethod);
    saveStickyNotes(stickyNotesArray);
    return copyArray;
};

export const sortStickyNotesArray = (array, sortMethod) => {
    if(sortMethod === "importance") {
        array.sort((a, b) => {
            let returnValue = b._importance - a._importance;
            if(returnValue === 0) {
                return compareDesc(b.date, a.date);
            }
            return returnValue;
        });
        return array;
    } else if(sortMethod === "date") {
        array.sort((a, b) => {
            let returnValue = compareDesc(b.date, a.date);
            if(returnValue === 0) {
                return b._importance - a._importance;
            }
            return returnValue;
        });
        return array;
    } else if(sortMethod === "title") {
        array.sort((a, b) => {
            if(a.title < b.title) {
                return -1;
            } else {
                return 1;
            }
        });
        return array;
    } else if(sortMethod === "pad") {
        array.sort((a, b) => {
            if(a.pad < b.pad) {
                return -1;
            } else {
                return 1;
            }
        });
        return array;
    }
    return array;
};

export const removeStickyNote = stickyNote => {
    stickyNotesArray.splice(stickyNotesArray.indexOf(stickyNote), 1);
};