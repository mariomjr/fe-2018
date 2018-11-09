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

    const enderecoFull = enderecoIt +' '+bairro;
    adicionarItemLista(enderecoFull, id);

    document.getElementById('tabelaVaziaEndereco').style.display = 'none';

    var enderecoObj = new enderecoC(id, enderecoIt, bairro, tipoEndereco, dataInicio, 
        indicadorDiaInicio, indicadorMesInicio, indicadorAnoInicio, dataFim, indicadorDiaFim, indicadorMesFim, indicadorAnoFim,
        caixaPostal, cep, distrito);

    saveLocalStorage(enderecoObj,nameLocalStoregeEndereco);
    clearAllModalEndereco();
}

function adicionarItemLista(nomeItemLista, idHidden){

    var inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", id);
    const myList = document.getElementById('registeredEndereco');
    const node = document.createElement('li');
    const span = document.createElement('span');
    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        myList.removeChild(node);
    });
    const btnEdit = document.createElement('button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary float-right';
    btnEdit.setAttribute('data-target', '#cadastroEnderecoModal');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.addEventListener("click", () => {
        editarEndereco(node);
    });
    span.innerHTML = nomeItemLista;
    node.appendChild(inputHidden);
    node.appendChild(span);
    node.appendChild(btnDel);
    node.appendChild(btnEdit);
    myList.appendChild(node);
}

function findEnderecoByid(id){
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
    var idVal = node.childNodes[0].value;
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

