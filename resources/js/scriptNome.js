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
    const surnames = document.getElementById('surnamesInputList').value.replace(/,/g, " ");
    const suffix = document.getElementById('suffixInputList').value.replace(/,/g, " ");
    const fullName = titles + " " + names + " " + surnames + " " + suffix;

    document.getElementById('tabelaVazia').style.display = 'none';

    const titlesList = document.getElementById('titlesInputList').value;
    const namesList = document.getElementById('namesInputList').value;
    const surnamesList = document.getElementById('surnamesInputList').value;
    const suffixesList = document.getElementById('suffixInputList').value;
    const nameUse =  document.getElementById('nameUse').value;
    const nameUseCondition = document.getElementById('nameUseCondition').value;
    const nameRepresentation = document.getElementById('nameRepresentation').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const preferredName = document.getElementById('preferredName').checked;

    let name = new nameC(fullName, titlesList, namesList, surnamesList, suffixesList, nameUse,
        nameRepresentation, startDate, endDate, nameUseCondition, preferredName);

    saveLocalStorage(name,'names');
    clearFields();
    addNameTableRow([fullName, nameRepresentation, nameUse, startDate, endDate, (preferredName ? 'Sim' : 'Não')]);

}

function addNameTableRow(cellInfoList) {
    const tbody = document.getElementById('namesTableBody');
    const newRow  = tbody.insertRow();

    cellInfoList.forEach((textField, index) => {
        const newCell  = newRow.insertCell(index);
        const newText  = document.createTextNode(textField);
        newCell.appendChild(newText);
    });

    const newCell  = newRow.insertCell(cellInfoList.length);
    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        tbody.deleteRow(newRow.rowIdex);
        if(tbody.getElementsByTagName('tr').length === 0) {
            document.getElementById('tabelaVazia').style.display = 'block';
        }
    });

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary float-right mr-1';
    btnEdit.addEventListener("click", () => {
        
    });
    newCell.appendChild(btnDel);
    newCell.appendChild(btnEdit);

}

function clearFields() {
    document.getElementById('titlesInputList').value = ''
    document.getElementById('namesInputList').value = '';
    document.getElementById('surnamesInputList').value = '';
    document.getElementById('suffixInputList').value = '';
    document.getElementById('nameRepresentation').value = '';
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';

    const titlesList = [...document.getElementById('titlesList').children];
    titlesList.forEach(li => {
        document.getElementById('titlesList').removeChild(li);
    });
    const namesList = [...document.getElementById('namesList').children];
    namesList.forEach(li => {
        document.getElementById('namesList').removeChild(li);
    });
    const surnamesList = [...document.getElementById('surnamesList').children];
    surnamesList.forEach(li => {
        document.getElementById('surnamesList').removeChild(li);
    });
    const suffixList = [...document.getElementById('suffixList').children];
    suffixList.forEach(li => {
        document.getElementById('suffixList').removeChild(li);
    });
}