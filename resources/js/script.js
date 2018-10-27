function init() {
    $(".load-html").each(function () {
        $(this).load(this.dataset.source);
    });
    $(document).ready(() => {
        addEnterEvenToButtons();
    });
}


function addItemToList(listId, input, inputList) {
    const name = document.getElementById(input).value;
    if(!name) return;
    const myList = document.getElementById(listId);
    if(myList.childElementCount >= 9) return;
    const node = document.createElement('li');
    const span = document.createElement('span');
    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        names = document.getElementById(inputList).value.split(',');
        index = names.indexOf(name);
        names.splice(index, 1);
        document.getElementById(inputList).value = names.toString();
        myList.removeChild(node);
    });
    span.innerHTML = name;
    node.appendChild(span);
    node.appendChild(btnDel);
    myList.appendChild(node);
    document.getElementById(input).value = '';

    addValuesToInput(listId, inputList);
}

function addValuesToInput(listId, inputId) {
    const myList = [...document.getElementById(listId).children];
    const namesList = [];
    myList.forEach(element => {
        const name = element.children[0].innerHTML;
        namesList.push(name);
    });
    document.getElementById(inputId).value = namesList.toString();
}

function registerName() {
    const titles = document.getElementById('titlesInputList').value.replace(/,/g, " ");
    const names = document.getElementById('namesInputList').value.replace(/,/g, " ");
    //const surnames = document.getElementById('surnamesInputList').value.replace(',', " ");
    //const suffix = document.getElementById('suffixInputList').value.replace(',', " ");

    const fullName = titles + " " + names;
    if(!fullName.trim()) return;
    const myList = document.getElementById('registeredNames');
    const node = document.createElement('li');
    const span = document.createElement('span');
    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        myList.removeChild(node);
    });
    span.innerHTML = fullName;
    node.appendChild(span);
    node.appendChild(btnDel);
    myList.appendChild(node);

    const nameUse = document.getElementById('nameUse').value;
    const nameRepresentation = document.getElementById('nameRepresentation').value;

    const nameInfo = {
        full_name: fullName,
        use: nameUse,
        represetation: nameRepresentation
    }
    saveNameLocalStorage(nameInfo);
}

function removeNamesFormInput() {

}

function addEnterEvenToButtons() {
    document.getElementById("titleInput").addEventListener("keyup", function(event) {
        event.preventDefault();
        if (event.keyCode === 13) {
            document.getElementById("buttonAddTitle").click();
            document.getElementById("titleInput").focus();
        }
    });
}

function saveNameLocalStorage(nameInfo) {
    currentList = JSON.parse(localStorage.getItem('names')) || [];
    currentList.push(nameInfo);
    localStorage.setItem('names', JSON.stringify(currentList));
}