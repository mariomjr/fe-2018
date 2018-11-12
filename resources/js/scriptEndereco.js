$("#paisesSelect").load("tabs/paisesSelect.html");

new dgCidadesEstados({
    cidade: document.getElementById('cidade1'),
    estado: document.getElementById('estado1')
})

function changePais(radioInput) {
    if(radioInput.value == 'BRASIL'){
        document.getElementById('cardBrasil').style.display='';
        document.getElementById('cardOutro').style.display='none';
    }else{
        document.getElementById('cardBrasil').style.display='none';
        document.getElementById('cardOutro').style.display='';
    }
}

var nameLocalStoregeEndereco = 'enderecos';

function adicionarEndereco() {
    
    const tipoEndereco = document.getElementById('tipoEnderecoSl').value;
    
    const dataInicio = document.getElementById('dataInicialEnderecoInput').value;
    const indicadorDiaInicio = $("input[name='indicadorDiaInicioOp']:checked").val();
    const indicadorMesInicio = $("input[name='indicadorMesInicioOp']:checked").val();
    const indicadorAnoInicio = $("input[name='indicadorAnoInicioOp']:checked").val();

    const dataFim = document.getElementById('dataFinalEnderecoInput').value;
    const indicadorDiaFim = $("input[name='indicadorDiaFinalOp']:checked").val();
    const indicadorMesFim = $("input[name='indicadorMesFinalOp']:checked").val();
    const indicadorAnoFim = $("input[name='indicadorAnoFinalOp']:checked").val();

    const enderecoIt = document.getElementById('enderecoInput').value;
    const caixaPostal = document.getElementById('caixapostalEnderecoInput').value;
    const cep = document.getElementById('cepInput').value;
    const bairro = document.getElementById('bairroInput').value;
    const distrito = document.getElementById('distritoInput').value;

    var id = "id" + Math.random().toString(16).slice(2);

    document.getElementById('tabelaVaziaEndereco').style.display = 'none';

    var enderecoObj = new enderecoC(id, enderecoIt, bairro, tipoEndereco, dataInicio, 
        indicadorDiaInicio, indicadorMesInicio, indicadorAnoInicio, dataFim, indicadorDiaFim, indicadorMesFim, indicadorAnoFim,
        caixaPostal, cep, distrito);


    adicionarItemTableEndereco(enderecoObj);
    saveLocalStorage(enderecoObj,nameLocalStoregeEndereco);
    clearAllModalEndereco();
}


function adicionarItemTableEndereco(enderecoC){
    var tableRef = document.getElementById('tableEndereco').getElementsByTagName('tbody')[0];
    var newRow   = tableRef.insertRow(tableRef.rows.length);
    
    // Insert a cell in the row at index 0
    var cell0  = newRow.insertCell(0);//Tipo endereço
    var cell1  = newRow.insertCell(1);//Endereço
    var cell2  = newRow.insertCell(2);//Bairro
    var cell3  = newRow.insertCell(3);//Caixa postal
    var cell4  = newRow.insertCell(4);//Cep
    var cell5  = newRow.insertCell(5);//Distrito
    var cell6  = newRow.insertCell(6);//Opçoes

    var inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", enderecoC.id);

    cell0.appendChild(inputHidden);
    cell0.appendChild(document.createTextNode(enderecoC.tipoEndereco));
    cell1.appendChild(document.createTextNode(enderecoC.endereco));
    cell2.appendChild(document.createTextNode(enderecoC.bairro));
    cell3.appendChild(document.createTextNode(enderecoC.caixaPostal));
    cell4.appendChild(document.createTextNode(enderecoC.cep));
    cell5.appendChild(document.createTextNode(enderecoC.distrito));

    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary mr-1';
    btnEdit.setAttribute('data-target', '#cadastroEnderecoModal');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.addEventListener("click", () => {
        editarEndereco(newRow);
    });

    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger ';
    btnDel.addEventListener("click", () => {
        tableRef.removeChild(newRow);
        if(tableRef.rows.length == 0){
            document.getElementById('tabelaVaziaEndereco').style.display = '';
        }
    });
    cell6.appendChild(btnEdit);
    cell6.appendChild(btnDel);
}

function findEnderecoByid(idVal){
    const item = localStorage.getItem(nameLocalStoregeEndereco);
    const jsonList = JSON.parse(item);

    for (var i = 0; i < jsonList.length; i++){
        if (jsonList[i].id == idVal){
            var objFound = jsonList[i];
        }
    }
    return objFound;
}

function editarEndereco(node){
    var idVal = node.childNodes[0].childNodes[0].value;
    const objFound = findEnderecoByid(idVal);

    document.getElementById('tipoEnderecoSl').value = objFound.tipoEndereco;
    
    document.getElementById('dataInicialEnderecoInput').value = objFound.dataInicio;
    $('input:radio[name="indicadorDiaInicioOp"][value="'+objFound.indicadorDiaInicio+'"]').prop('checked', true);
    $('input:radio[name="indicadorMesInicioOp"][value="'+objFound.indicadorMesInicio+'"]').prop('checked', true);
    $('input:radio[name="indicadorAnoInicioOp"][value="'+objFound.indicadorAnoInicio+'"]').prop('checked', true);

    document.getElementById('dataFinalEnderecoInput').value = objFound.dataFim;
    $('input:radio[name="indicadorDiaFinalOp"][value="'+objFound.indicadorDiaFim+'"]').prop('checked', true);
    $('input:radio[name="indicadorMesFinalOp"][value="'+objFound.indicadorMesFim+'"]').prop('checked', true);
    $('input:radio[name="indicadorAnoFinalOp"][value="'+objFound.indicadorAnoFim+'"]').prop('checked', true);

    document.getElementById('enderecoInput').value = objFound.endereco;
    document.getElementById('caixapostalEnderecoInput').value = objFound.caixaPostal;
    document.getElementById('cepInput').value = objFound.cep;
    document.getElementById('bairroInput').value = objFound.bairro;
}

function clearAllModalEndereco() {
    document.getElementById('dataInicialEnderecoInput').value = '';
    $('input:radio[name="indicadorDiaInicioOp"]').val(['']);
    $('input:radio[name="indicadorMesInicioOp"]').val(['']);
    $('input:radio[name="indicadorAnoInicioOp"]').val(['']);

    document.getElementById('dataFinalEnderecoInput').value = '';
    $("input[name='indicadorDiaFinalOp']").val(['']);
    $("input[name='indicadorMesFinalOp']").val(['']);
    $("input[name='indicadorAnoFinalOp']").val(['']);

    document.getElementById('tipoEnderecoSl').value = '';
    document.getElementById('enderecoInput').value = '';
    document.getElementById('bairroInput').value = '';
    document.getElementById('caixapostalEnderecoInput').value = '';
    document.getElementById('cepInput').value = '';
}

