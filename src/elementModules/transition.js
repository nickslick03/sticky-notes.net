export const appendMain = (() => {
    const main = document.querySelector('main');
    let inProgress = false;
    let currentElement;
    return nextElement => {
        if(inProgress) {
            return;
        } else {
            if(currentElement === undefined) {
                inProgress = true;
                makeInvisible(nextElement);
                main.appendChild(nextElement);
                setTimeout(() => {
                    clearStyle(nextElement);
                }, 1);
                setTimeout(() => {
                    currentElement = nextElement;
                    inProgress = false;
                }, 1001);
            } else {
                console.log('hi');
                console.log(nextElement);
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
                }, 1000);
                setTimeout(() => {
                    currentElement = nextElement;
                    inProgress = false;
                }, 2000);
            }
        }
    };
})()





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