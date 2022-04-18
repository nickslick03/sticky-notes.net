import { format, parseISO } from 'date-fns';
import { removeStickyNote, stickyNoteFactory } from '../objectModules/stickyNote.mjs';
import { getStickyNotePadsArray } from '../objectModules/stickyNotePad.mjs';
import { getSecondaryColor } from './stickyNoteElement.mjs';
import { Main } from './transition.js';

export const stickyNoteForm = (() => {
  const stickyNoteFormContainer = document.getElementById('stickyNoteForm');
  const header = stickyNoteFormContainer.querySelector('h2');
  const newStickyNoteButton = document.getElementById('newStickyNote');
  const coverDiv = document.createElement('div');
  let openedStickyNote = null;
  const title = stickyNoteFormContainer.querySelector('[placeholder="title"]');
  const importance = stickyNoteFormContainer.querySelector('#importance');
  const description = stickyNoteFormContainer.querySelector('#description');
  const date = stickyNoteFormContainer.querySelector('#date');
  const pad = stickyNoteFormContainer.querySelector('#pad');
  const buttonContainer = stickyNoteFormContainer.children[stickyNoteFormContainer.children.length - 1];
  const deleteButton = document.createElement('div');
  const cancelButton = buttonContainer.children[0];
  const confirmButton = buttonContainer.children[1];
  const inputList = [title, importance, description, date, pad];
  coverDiv.id = 'coverDiv';
  deleteButton.innerText = 'delete';
  stickyNoteFormContainer.remove();
  function openPopup(stickyNote) {
    const padList = getStickyNotePadsArray('name');
    for (const stickyNotePad of padList) {
      const name = document.createElement('option');
      name.setAttribute('value', `${stickyNotePad.name}`);
      name.textContent = stickyNotePad.name;
      pad.appendChild(name);
    }
    if (stickyNote) {
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
    changeBackgroundImage();
    document.body.appendChild(coverDiv);
    document.body.appendChild(stickyNoteFormContainer);
  }
  function changeBackgroundImage() {
    const padNames = Array.from(pad.children).map((option) => option.textContent);
    const color = getStickyNotePadsArray('name')[padNames.indexOf(pad.value)]._color;
    stickyNoteFormContainer.style.backgroundImage = `radial-gradient(${getSecondaryColor(color)}, ${color})`;
  }
  function closePopup() {
    deleteButton.remove();
    stickyNoteFormContainer.remove();
    coverDiv.remove();
    for (const input of inputList) {
      input.value = '';
    }
    pad.textContent = '';
  }
  newStickyNoteButton.addEventListener('click', () => {
    openPopup();
  });
  pad.addEventListener('click', () => {
    changeBackgroundImage();
  });
  cancelButton.addEventListener('click', () => {
    closePopup();
  });
  confirmButton.addEventListener('click', () => {
    if (parseISO(date.value) == 'Invalid Date') {
      alert('Please enter a valid date.');
      return;
    }
    if (openedStickyNote) {
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
  };
})();
