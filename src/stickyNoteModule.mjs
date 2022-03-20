import { compareAsc, compareDesc, parseISO } from 'date-fns';

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
    }
}

export const stickyNoteFactory = (importance, title, description, date, pad) => {
    let length = stickyNotesArray.length;
    stickyNotesArray.push(Object.create(stickyNoteFunctions));
    stickyNotesArray[length].importance = importance;
    stickyNotesArray[length].title = title;
    stickyNotesArray[length].description = description;
    stickyNotesArray[length].date = date;
    stickyNotesArray[length].pad = pad;
    return stickyNotesArray[length];
};

export const getStickyNotesArray = sortMethod => {
    const copyArray = [...stickyNotesArray];
    if(sortMethod === "importance") {
        copyArray.sort((a, b) => {
            let returnValue = b._importance - a._importance;
            if(returnValue === 0) {
                return compareDesc(parseISO(b.date), parseISO(a.date));
            }
            return returnValue;
        });
    } else if(sortMethod === "date") {
        copyArray.sort((a, b) => {
            let returnValue = compareDesc(parseISO(b.date), parseISO(a.date));
            if(returnValue === 0) {
                return b._importance - a._importance;
            }
            return returnValue;
        })
    } else if(sortMethod === "title") {
        copyArray.sort((a, b) => {
            if(a.title < b.title) {
                return -1;
            } else {
                return 1;
            }
        });
    } else if(sortMethod === "pad") {
        copyArray.sort((a, b) => {
            if(a.pad < b.pad) {
                return -1;
            } else {
                return 1;
            }
        })
    }
    return copyArray;
}

export const removeStickyNote = (index) => {
    stickyNotesArray.splice(index, 1);
}