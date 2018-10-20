function init() {
    $(".load-html").each(function () {
        $(this).load(this.dataset.source);
    });
    console.log('teste');
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
    console.log(document.getElementById("pacienteForm").elements.namedItem('titlesInputList').value);    
}