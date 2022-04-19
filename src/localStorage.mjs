import { format } from 'date-fns';
import { stickyNoteFactory } from './objectModules/stickyNote.mjs';
import { stickyNotePadFactory } from './objectModules/stickyNotePad.mjs';

export const saveStickyNotePads = (stickyNotePadArray) => {
  const storageList = [];
  for (const stickyNotePad of stickyNotePadArray) {
    storageList.push({});
    for (const key of Object.getOwnPropertyNames(stickyNotePad)) {
      if (key === '_color') {
        storageList[storageList.length - 1].color = stickyNotePad.color;
      } else {
        storageList[storageList.length - 1][key] = stickyNotePad[key];
      }
    }
  }
  localStorage.setItem('stickyNotePads', JSON.stringify(storageList));
};

export const saveStickyNotes = (stickyNoteArray) => {
  const storageList = [];
  for (const stickyNote of stickyNoteArray) {
    storageList.push({});
    for (const key of Object.getOwnPropertyNames(stickyNote)) {
      if (key === 'date') {
        storageList[storageList.length - 1][key] = format(stickyNote[key], 'yyyy-MM-dd');
      } else {
        storageList[storageList.length - 1][key] = stickyNote[key];
      }
    }
  }
  localStorage.setItem('stickyNotes', JSON.stringify(storageList));
};

export const retriveStickyNotePads = () => {
  const localStorageList = localStorage.getItem('stickyNotePads');
  if (!(localStorageList)) {
    localStorage.setItem('stickyNotePads', '[]');
    stickyNotePadFactory('main', '#0061c2');
  } else {
    for (const stickyNotePad of JSON.parse(localStorageList)) {
      stickyNotePadFactory(stickyNotePad.name, stickyNotePad.color);
    }
  }
};

export const retriveStickyNotes = () => {
  const localStorageList = localStorage.getItem('stickyNotes');
  if (!(localStorageList)) {
    localStorage.setItem('stickyNotes', '[]');
    return;
  }
  for (const stickyNote of JSON.parse(localStorageList)) {
    stickyNoteFactory(stickyNote._importance, stickyNote.title, stickyNote.description, stickyNote.date, stickyNote.pad);
  }
};
