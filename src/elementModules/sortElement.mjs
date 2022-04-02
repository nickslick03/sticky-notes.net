export default (() => {
    const sortContainer = document.createElement('div');
    const sortTitle = document.createElement('div');
    const sortDropdown = document.createElement('div');
    sortContainer.className = 'sortContainer';
    sortDropdown.className = 'sortDropdown';
    sortTitle.textContent = 'sort';
    for(let element of [sortTitle, sortDropdown]) {
        sortContainer.appendChild(element);
    }
    return {
        stickyNote() {
            let cloneContainer = sortContainer.cloneNode(true);
            for(let sortOption of ['importance', 'date', 'title', 'pad']) {
                const div = document.createElement('div');
                div.innerText = sortOption;
                cloneContainer.lastChild.appendChild(div);
            }
            return cloneContainer;
        },
        stickyNotePad() {
            let cloneContainer = sortContainer.cloneNode(true);
            for(let sortOption of ['importance', 'date', 'title']) {
                const div = document.createElement('div');
                div.innerText = sortOption;
                cloneContainer.lastChild.appendChild(div);
            }
            return cloneContainer;
        }
    }
})();