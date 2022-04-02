import { getStickyNotesArray } from "./stickyNote.mjs";

const stickyNotePadsArray = [];

const canGetChildren = {
    getChildren() {
        let stickyNotesArray = getStickyNotesArray();
        let targetStickyNotes = [];
        for(let stickyNote of stickyNotesArray) {
            if(stickyNote.pad === this.name) {
                targetStickyNotes.push(stickyNote);
            }
        }
        return targetStickyNotes;
    },
};

export const stickyNotePadFactory = (name, color) => {
    const stickyNotePad = Object.assign({}, 
        canGetChildren,
        {
            name, 
            color: hexToHSL(color),
        });
    stickyNotePadsArray.push(stickyNotePad);
    return stickyNotePadsArray[stickyNotePadsArray.length - 1];
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

export const getStickyNotePad = name => {
    for(let stickyNotePad of stickyNotePadsArray) {
        if(stickyNotePad.name === name) {
            return stickyNotePadsArray[stickyNotePadsArray.indexOf(stickyNotePad)];
        }
    }
}

export const removeStickyNotePad = index => {
    stickyNotePadsArray.splice(index, 1);
    if(stickyNotePadsArray.length === 0) {
        stickyNotePadFactory("main", "red");
    }
}

function hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta == 0)
      h = 0;
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    else if (cmax == g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
  
    return "hsl(" + h + "," + s + "%," + l + "%)";
  }