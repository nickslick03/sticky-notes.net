import './style.css';
import { format } from 'date-fns';
import { stickyNoteFactory, getStickyNotesArray, removeStickyNote} from './stickyNoteModule.mjs';
import { stickyNotePadFactory, getStickyNotePadsArray } from './stickyNotePadModule.mjs';

stickyNoteFactory(3, "practice violin", "practice music", "2021-03-15", "main");
stickyNoteFactory(2, "cook dinner", "chicken fajitas and mexican rice", "2021-03-15", "main");
stickyNoteFactory(2, "leg workout", "-calf raise -pistol squat -leg lunges", "2010-03-30", "sub");

console.table(getStickyNotesArray("pad"));

stickyNotePadFactory("sub", "blue");
stickyNotePadFactory("bub", "green");
console.table(getStickyNotePadsArray());
console.table(getStickyNotePadsArray()[0].getChildren());

const h1 = document.querySelector('h1');
const input = document.createElement('input');
input.setAttribute('type', 'date');
document.body.appendChild(input);
input.value = "2020-02-02";
h1.addEventListener('click', () => {
    if(input.value) {
        console.log(input.value);
        console.log(getDate(input.value));
    } else {
        console.log('empty');
    }
})

function getDate(date) {
    let year = date.substring(0, date.indexOf('-'));
    let month = date.substring(date.indexOf('-') + 1, date.lastIndexOf('-'));
    let day = date.substring(date.lastIndexOf('-')+ 1, date.length);
    return format(new Date(year, month, day), "MM/dd/yyyy");
}