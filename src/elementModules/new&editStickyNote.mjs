import { format, parseISO } from "date-fns";
import { removeStickyNote, stickyNoteFactory } from "../objectModules/stickyNote.mjs";
import { getStickyNotePadsArray } from "../objectModules/stickyNotePad.mjs";
import { Main } from "./transition.js";


export const stickyNoteForm = (() => {
    const stickyNoteFormContainer = document.getElementById('stickyNoteForm');
    const header = stickyNoteFormContainer.querySelector('h2');
    const newStickyNoteButton = document.getElementById('newStickyNote');
    const coverDiv = document.createElement('div');
    let openedStickyNote = null;
    const title = stickyNoteFormContainer.children[1];
    const importance = stickyNoteFormContainer.children[2].children[1];
    const description = stickyNoteFormContainer.children[3];
    const date = stickyNoteFormContainer.children[4];
    const pad = stickyNoteFormContainer.children[5].children[1];
    const buttonContainer = stickyNoteFormContainer.children[6];
    const deleteButton = document.createElement('div');
    const cancelButton = buttonContainer.children[0];
    const confirmButton = buttonContainer.children[1];
    const inputList = [title, importance, description, date, pad];
    coverDiv.id = 'coverDiv';
    deleteButton.innerText = 'delete';
    stickyNoteFormContainer.remove();
    function openPopup(stickyNote) {
        let padList = getStickyNotePadsArray('name');
        for(let stickyNotePad of padList) {
            let name = document.createElement('option');
            name.setAttribute('value', `${stickyNotePad.name}`);
            name.textContent = stickyNotePad.name;
            pad.appendChild(name);
        }
        if(stickyNote) {
            header.textContent = 'Edit Sticky Note';
            openedStickyNote = stickyNote;
            title.value = stickyNote.title;
            importance.value = stickyNote._importance;
            description.value = stickyNote.description;
            date.value = format(stickyNote.date, 'yyyy-MM-dd');
            pad.value = stickyNote.pad;
            buttonContainer.appendChild(deleteButton);
        } else {
            header.textContent = 'New Sticky Note';
        }
        document.body.appendChild(coverDiv);
        document.body.appendChild(stickyNoteFormContainer);
    }
    function closePopup() {
        deleteButton.remove();
        stickyNoteFormContainer.remove();
        coverDiv.remove();
        for(let input of inputList) {
            input.value = '';
        }
        pad.textContent = '';
    }
    newStickyNoteButton.addEventListener('click', () => {
        openPopup();
    });
    cancelButton.addEventListener('click', () => {
        closePopup();
    });
    confirmButton.addEventListener('click', () => {
        if(parseISO(date.value) == 'Invalid Date') {
            alert('Please enter a valid date.');
            return;
        }
        if(openedStickyNote) {
            openedStickyNote.title = title.value;
            openedStickyNote.importance = parseInt(importance.value);
            openedStickyNote.description = description.value;
            openedStickyNote.date = parseISO(date.value);
            openedStickyNote.pad = pad.value;
            openedStickyNote = null;
        } else {
            stickyNoteFactory(parseInt(importance.value), title.value, description.value, date.value, pad.value);
        }
        Main.reappend();
        closePopup();
    });
    deleteButton.addEventListener('click', () => {
        removeStickyNote(openedStickyNote);
        openedStickyNote = null;
        Main.reappend();
        closePopup();
    });
    return {
        openPopup,
    }
})();