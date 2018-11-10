
var nameLocalStoregeComunicacaoElestronica = 'comunicacaoEletronica';

var idEdicaoComunicacao = "";

function adicionarComunicacaoEletronica() {
    
    const meioComunicacao = document.getElementById('meioComunicacaoSl').value;
    const preferencia = document.getElementById('preferenciaSl').value;
    const telefone = document.getElementById('telefoneInput').value;
    const utilizacao = document.getElementById('utilizacaoSl').value;

    const id = "id" + Math.random().toString(16).slice(2);

    document.getElementById('tabelaVaziaComunicacaoEletronica').style.display = 'none';

    const comunicacaoEletronicaObj = new comunicacaoEletronicaC(id, meioComunicacao, telefone, preferencia, utilizacao);

    adicionarItemTableComunicacaoEletronica(comunicacaoEletronicaObj);

    saveLocalStorage(comunicacaoEletronicaObj,nameLocalStoregeComunicacaoElestronica);
    clearAllModalComunicacaoEletronica();
}

function adicionarItemTableComunicacaoEletronica(comunicacaoEletronicaC){
    const tableRefIdent = document.getElementById('tableComunicacoesEletronicas').getElementsByTagName('tbody')[0];
    const newRowIdent   = tableRefIdent.insertRow(tableRefIdent.rows.length);
    
    // Insert a cell in the row at index 0
    let cell0  = newRowIdent.insertCell(0);//Meio
    let cell1  = newRowIdent.insertCell(1);//Telefone
    let cell2  = newRowIdent.insertCell(2);//Preferencia
    let cell3  = newRowIdent.insertCell(3);//Utilização
    let cell4  = newRowIdent.insertCell(4);//Opções

    let inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", comunicacaoEletronicaC.id);

    cell0.appendChild(inputHidden);
    cell0.appendChild(document.createTextNode(comunicacaoEletronicaC.meioComunicacao));
    cell1.appendChild(document.createTextNode(comunicacaoEletronicaC.telefone));
    cell2.appendChild(document.createTextNode(comunicacaoEletronicaC.preferencia));
    cell3.appendChild(document.createTextNode(comunicacaoEletronicaC.utilizacao));

    let btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary';
    btnEdit.setAttribute('data-target', '#cadastroComunicacaoEletronicaModal');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.addEventListener("click", () => {
        editarComunicacaoEletronica(newRowIdent);
    });

    let btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger ';
    btnDel.addEventListener("click", () => {
        tableRefIdent.removeChild(newRowIdent);
        if(tableRefIdent.rows.length == 0){
            document.getElementById('tabelaVaziaComunicacaoEletronica').style.display = '';
        }
    });
    cell4.appendChild(btnEdit);
    cell4.appendChild(btnDel);
}

function findComunicacaoEletroenicaByid(idVal){
    const item = localStorage.getItem(nameLocalStoregeComunicacaoElestronica);
    const jsonList = JSON.parse(item);

    for (var i = 0; i < jsonList.length; i++){
        if (jsonList[i].id == idVal){
            var objFound = jsonList[i];
        }
    }
    return objFound;
}

function editarComunicacaoEletronica(node){
    let idVal = node.childNodes[0].childNodes[0].value;
    const objFound = findComunicacaoEletroenicaByid(idVal);

    idEdicao = idVal;
    
    document.getElementById('meioComunicacaoSl').value = objFound.meioComunicacao;
    document.getElementById('preferenciaSl').value = objFound.preferencia;
    document.getElementById('telefoneInput').value = objFound.telefone;
    document.getElementById('utilizacaoSl').value = objFound.utilizacao;
    
}

function clearAllModalComunicacaoEletronica() {
    idEdicaoComunicacao = "";
    document.getElementById('meioComunicacaoSl').value = '';
    document.getElementById('preferenciaSl').value = '';
    document.getElementById('telefoneInput').value = '';
    document.getElementById('utilizacaoSl').value = '';
}

