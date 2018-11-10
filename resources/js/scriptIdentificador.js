
var nameLocalStoregeIdentificadores = 'identificadores';

var idEdicao = "";

function adicionarIdentificador() {
    
    const tipoIdentificador = document.getElementById('tipoIdentificadorSl').value;
    const areaGeografica = document.getElementById('areaGeograficaSl').value;
    
    const data = document.getElementById('dateInput').value;
    const designacao = document.getElementById('designacaoInput').value;
    const emissor = document.getElementById('emissorInput').value;

    const tipoCertidao = document.getElementById('tipoCertidaoSl').value;
    const nomeCartorio = document.getElementById('nomeCartorioInput').value;
    const livro = document.getElementById('livroInput').value;
    const folha = document.getElementById('folhaInput').value;
    const termo = document.getElementById('termoInput').value;

    const carteiraSerie = document.getElementById('serieCarteiraInput').value;
    const carteiraEstado = document.getElementById('estadoCarteiraInput').value;
    const tituloSecao = document.getElementById('secaoTituloInput').value;
    const tituloZona = document.getElementById('zonaTituloInput').value;

    var id = "id" + Math.random().toString(16).slice(2);

    document.getElementById('tabelaVaziaIdentificador').style.display = 'none';

    var identificadorObj = new identificadorC(id, tipoIdentificador, areaGeografica, data, designacao, emissor,
        tipoCertidao, nomeCartorio, livro, folha, termo, carteiraSerie, carteiraEstado,
        tituloSecao, tituloZona);

    adicionarItemTableIdentificador(identificadorObj);

    saveLocalStorage(identificadorObj,nameLocalStoregeIdentificadores);
    clearAllModalIdentificador();
}

function adicionarItemTableIdentificador(identificadorC){
    const tableRefIdent = document.getElementById('tableIdentificador').getElementsByTagName('tbody')[0];
    const newRowIdent   = tableRefIdent.insertRow(tableRefIdent.rows.length);
    
    // Insert a cell in the row at index 0
    let cell0  = newRowIdent.insertCell(0);//Tipo identificador
    let cell1  = newRowIdent.insertCell(1);//Área geográfica
    let cell2  = newRowIdent.insertCell(2);//Data
    let cell3  = newRowIdent.insertCell(3);//Designação
    let cell4  = newRowIdent.insertCell(4);//Emissor
    let cell5  = newRowIdent.insertCell(5);//Tipo de certidão
    let cell6  = newRowIdent.insertCell(6);//Nome do cartório
    let cell7  = newRowIdent.insertCell(7);//Opçoes

    let inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", identificadorC.id);

    cell0.appendChild(inputHidden);
    cell0.appendChild(document.createTextNode(identificadorC.tipoIdentificador));
    cell1.appendChild(document.createTextNode(identificadorC.areaGeografica));
    cell2.appendChild(document.createTextNode(identificadorC.data));
    cell3.appendChild(document.createTextNode(identificadorC.designacao));
    cell4.appendChild(document.createTextNode(identificadorC.emissor));
    cell5.appendChild(document.createTextNode(identificadorC.tipoCertidao));
    cell6.appendChild(document.createTextNode(identificadorC.nomeCartorio));

    let btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary';
    btnEdit.setAttribute('data-target', '#cadastroIdentificadorModal');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.addEventListener("click", () => {
        editarIdentificador(newRowIdent);
    });

    let btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger ';
    btnDel.addEventListener("click", () => {
        tableRefIdent.removeChild(newRowIdent);
        if(tableRefIdent.rows.length == 0){
            document.getElementById('tabelaVaziaIdentificador').style.display = '';
        }
    });
    cell7.appendChild(btnEdit);
    cell7.appendChild(btnDel);
}

function findIdentificadorByid(idVal){
    const item = localStorage.getItem(nameLocalStoregeIdentificadores);
    const jsonList = JSON.parse(item);

    for (var i = 0; i < jsonList.length; i++){
        if (jsonList[i].id == idVal){
            var objFound = jsonList[i];
        }
    }
    return objFound;
}

function editarIdentificador(node){
    let idVal = node.childNodes[0].childNodes[0].value;
    const objFound = findIdentificadorByid(idVal);

    idEdicao = idVal;

    document.getElementById('tipoIdentificadorSl').value = objFound.tipoIdentificador;
    document.getElementById('areaGeograficaSl').value = objFound.areaGeografica;
    
    document.getElementById('dateInput').value = objFound.data;
    document.getElementById('designacaoInput').value = objFound.designacao;
    document.getElementById('emissorInput').value = objFound.emissor;

    document.getElementById('tipoCertidaoSl').value = objFound.tipoCertidao;
    document.getElementById('nomeCartorioInput').value = objFound.nomeCartorio;
    document.getElementById('livroInput').value = objFound.livro;
    document.getElementById('termoInput').value = objFound.termo;

    document.getElementById('serieCarteiraInput').value = objFound.carteiraSerie;
    document.getElementById('estadoCarteiraInput').value = objFound.carteiraEstado;
    document.getElementById('secaoTituloInput').value = objFound.tituloSecao;
    document.getElementById('zonaTituloInput').value = objFound.tituloZona;
    
}

function clearAllModalIdentificador() {
    idEdicao = "";
    document.getElementById('tipoIdentificadorSl').value = '';
    document.getElementById('areaGeograficaSl').value = '';
    
    document.getElementById('dateInput').value = '';
    document.getElementById('designacaoInput').value = '';
    document.getElementById('emissorInput').value = '';

    document.getElementById('tipoCertidaoSl').value = '';
    document.getElementById('nomeCartorioInput').value = '';
    document.getElementById('livroInput').value = '';
    document.getElementById('termoInput').value = '';

    document.getElementById('serieCarteiraInput').value = '';
    document.getElementById('estadoCarteiraInput').value = '';
    document.getElementById('secaoTituloInput').value = '';
    document.getElementById('zonaTituloInput').value = '';
}

