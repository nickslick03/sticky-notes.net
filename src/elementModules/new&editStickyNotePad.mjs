import { getStickyNotePadsArray, removeStickyNotePad, stickyNotePadFactory } from "../objectModules/stickyNotePad.mjs";
import { mainMenuElement } from "../websitePages/mainMenu.mjs";
import { getSecondaryColor } from "./stickyNoteElement.mjs";
import { Main } from "./transition.js";

export const stickyNotePadForm = (() => {
    const stickyNotePadFormContainer = document.getElementById('stickyNotePadForm');
    const header = stickyNotePadFormContainer.querySelector('h2');
    const newStickyNotePadButton = document.getElementById('newStickyNotePad');
    const coverDiv = document.createElement('div');
    let openedStickyNotePad = null;
    const name = stickyNotePadFormContainer.children[1];
    const color = stickyNotePadFormContainer.children[2].children[1];
    const buttonContainer = stickyNotePadFormContainer.children[3];
    const deleteButton = document.createElement('div');
    const cancelButton = buttonContainer.children[0];
    const confirmButton = buttonContainer.children[1];
    coverDiv.id = 'coverDiv';
    deleteButton.innerText = 'delete';
    stickyNotePadFormContainer.remove();
    function openPopup(stickyNotePad) {
        if(stickyNotePad) {
            header.textContent = 'Edit Sticky Note Pad';
            openedStickyNotePad = stickyNotePad;
            name.value = stickyNotePad.name;
            color.value = stickyNotePad.color;
            buttonContainer.appendChild(deleteButton);
        } else {
            header.textContent = 'New Sticky Note Pad';
            color.value = '#ff0000';
        }
        changeBackgroundColor();
        document.body.appendChild(coverDiv);
        document.body.appendChild(stickyNotePadFormContainer);
    }
    function changeBackgroundColor() {
        stickyNotePadFormContainer.style.backgroundColor = color.value;
    }
    function closePopup() {
        stickyNotePadFormContainer.remove();
        coverDiv.remove();
        deleteButton.remove();
        name.value = '';
        color.value = '';
    }
    newStickyNotePadButton.addEventListener('click', () => {
        openPopup();
    });
    cancelButton.addEventListener('click', () => {
        closePopup();
    });
    confirmButton.addEventListener('click', () => {
        for(let stickyNotePad of getStickyNotePadsArray()) {
            if(stickyNotePad.name === name.value) {
                if(openedStickyNotePad) {
                    if(openedStickyNotePad.name !== stickyNotePad.name) {
                        alert(name.value + ' is already the name of another sticky note pad. Please use a different name.');
                        return;
                    } else {
                        continue;
                    }
                }
                alert(name.value + ' is already the name of another sticky note pad. Please use a different name.');
                return;
            }
        }
        if(openedStickyNotePad) {
            let children = openedStickyNotePad.getChildren();
            for(let stickyNote of children) {
                stickyNote.pad = name.value;
            }
            openedStickyNotePad.name = name.value;
            openedStickyNotePad.color = color.value;
            openedStickyNotePad = null;
        } else {
            stickyNotePadFactory(name.value, color.value);
        }
        Main.reappend();
        closePopup();
    });
    deleteButton.addEventListener('click', () => {
        if(confirm(`This will delete all sticky notes in ${openedStickyNotePad.name}!\nAre you sure want to continue?`)) {
            removeStickyNotePad(openedStickyNotePad);
            openedStickyNotePad = null;
            Main.replace(mainMenuElement);
            closePopup();
        }
    });
    return {
        openPopup,
    }
})();