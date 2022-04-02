const coverDiv = document.createElement('div');
coverDiv.id = 'coverDiv';

export const replaceMain = (() => {
    const main = document.querySelector('main');
    let inProgress = false;
    let currentElement;
    return nextElement => {
        if(inProgress) {
            return;
        } else {
            if(currentElement === undefined) {
                document.body.appendChild(coverDiv);
                inProgress = true;
                makeInvisible(nextElement);
                main.appendChild(nextElement);
                setTimeout(() => {
                    clearStyle(nextElement);
                    topOfPage();
                }, 1);
                setTimeout(() => {
                    currentElement = nextElement;
                    inProgress = false;
                    coverDiv.remove();
                }, 1001);
            } else {
                document.body.appendChild(coverDiv);
                inProgress = true;
                makeInvisible(currentElement);
                nextElement.style.position = 'absolute';
                makeInvisible(nextElement);
                main.appendChild(nextElement);
                setTimeout(() => {
                    currentElement.remove();
                    clearStyle(currentElement);
                    nextElement.style.position = 'static';
                    clearStyle(nextElement);
                    topOfPage();
                }, 1000);
                setTimeout(() => {
                    currentElement = nextElement;
                    inProgress = false;
                    coverDiv.remove();
                }, 2000);
            }
        }
    };
})();


export const body = (() => {
    let inProgress = false;
    let currentElement;
    return {
        append(element) {
            if(currentElement !== undefined || inProgress) {
                return;
            }
            inProgress = true;
            currentElement = element;
            document.body.appendChild(coverDiv);
            currentElement.className = 'center';
            makeInvisible(currentElement);
            main.appendChild(currentElement);
            setTimeout(() => {
                clearStyle(currentElement);
            }, 1);
            setTimeout(() => {
                inProgress = false;
            }, 1001);
        },
        unappend() {
            inProgress = true;
            makeInvisible(currentElement);
            setTimeout(() => {
                currentElement.remove();
                clearStyle(currentElement);
                currentElement.className = '';
                inProgress = false;
            }, 1000);
        }
    }
})();

function makeInvisible(element) {
    element.style.visibility = 'hidden';
    element.style.opacity = '0';
    element.style.transform = 'translateY(50px)';
}

function clearStyle(element) {
    element.style.visibility = '';
    element.style.opacity = '';
    element.style.transform = '';
}

function topOfPage() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }