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
    span.innerHTML = name;
    node.appendChild(span);
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
    span.innerHTML = fullName;
    node.appendChild(span);
    myList.appendChild(node);
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