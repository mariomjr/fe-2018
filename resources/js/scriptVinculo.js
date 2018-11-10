let editingId = '';

function registerBond() {
    const name = document.getElementById('bondNameInput').value;
    const bondRelation = document.getElementById('bondRelation').value;
    const bondStartDate = document.getElementById('bondStartDate').value;
    const bondEndDate = document.getElementById('bondEndDate').value;

    document.getElementById('tabelaVinculoVazia').style.display = 'none';

    let id;
    if (!editingId) {
        id = parseInt(name, 36) + '' + new Date().getTime();
    } else {
        id = editingId;
    }
    const update = id === editingId;
    const bond = new vinculoC(
        id,
        name,
        bondRelation,
        bondStartDate,
        bondEndDate
    );
    saveBondLocalStorage(bond, 'bonds');
    clearBondFields();
    addBondTableRow(
        id,
        [name, bondRelation, bondStartDate, bondEndDate],
        update
    );
}

function clearBondFields() {
    editingId = '';
    document.getElementById('bondNameInput').value = '';
    document.getElementById('bondRelation').value = '';
    document.getElementById('bondStartDate').value = '';
    document.getElementById('bondEndDate').value = '';
}

function addBondTableRow(id, cellInfoList, update) {
    if (update) {
        const tds = [...document.getElementById(id).children];
        tds.forEach((td, index) => {
            if(td.childElementCount === 0) {
                td.innerHTML = cellInfoList[index];
            }
        });
        editingId = '';
    } else {
        const tbody = document.getElementById('bondsTableBody');
        const newRow = tbody.insertRow();
        newRow.id = id;

        cellInfoList.forEach((textField, index) => {
            const newCell = newRow.insertCell(index);
            const newText = document.createTextNode(textField);
            newCell.appendChild(newText);
        });

        const newCell = newRow.insertCell(cellInfoList.length);
        const btnDel = document.createElement('button');
        btnDel.innerHTML = 'Apagar';
        btnDel.className = 'btn btn-sm btn-danger float-right';
        btnDel.addEventListener('click', () => {
            tbody.deleteRow(newRow.rowIdex);
            removeBondLocalStorage('bonds', id);
            if (tbody.getElementsByTagName('tr').length === 0) {
                document.getElementById('tabelaVinculoVazia').style.display =
                    'block';
            }
        });

        const btnEdit = document.createElement('button');
        btnEdit.setAttribute('type', 'button');
        btnEdit.innerHTML = 'Editar';
        btnEdit.className = 'btn btn-sm btn-primary float-right mr-1';
        btnEdit.setAttribute('data-target', '#cadastroVinculoModal');
        btnEdit.setAttribute('data-toggle', 'modal');
        btnEdit.addEventListener('click', () => {
            const bond = getBondLocalStorage('bonds', id);
            if (bond) {
                editingId = bond.id;
                document.getElementById('bondNameInput').value = bond.name;
                document.getElementById('bondRelation').value = bond.relation;
                document.getElementById('bondStartDate').value = bond.startDate;
                document.getElementById('bondEndDate').value = bond.endDate;
            }
        });
        newCell.appendChild(btnDel);
        newCell.appendChild(btnEdit);
    }
}

function removeBondLocalStorage(tag, id) {
    currentList = JSON.parse(localStorage.getItem(tag)) || [];
    currentList.forEach(storageItem => {
        const index = currentList.findIndex(item => item.id === id);
        if (index > -1) {
            currentList.splice(index, 1);
        }
    });
    localStorage.setItem(tag, JSON.stringify(currentList));
}

function getBondLocalStorage(tag, id) {
    currentList = JSON.parse(localStorage.getItem(tag)) || [];
    const bond = currentList.find(item => item.id === id);

    return bond;
}

function saveBondLocalStorage(bond, tag) {
    currentList = JSON.parse(localStorage.getItem(tag)) || [];
    const index = currentList.findIndex(item => item.id === bond.id);
    if (index > -1) {
        currentList.splice(index, 1, bond);
    } else {
        currentList.push(bond);
    }
    localStorage.setItem(tag, JSON.stringify(currentList));
}
