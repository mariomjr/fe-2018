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
    var inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", id);

    const enredecoFull = enderecoIt +' '+bairro;
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
    btnEdit.addEventListener("click", () => {
        editarEndereco(node);
    });
    span.innerHTML = enredecoFull;
    node.appendChild(inputHidden);
    node.appendChild(span);
    node.appendChild(btnDel);
    node.appendChild(btnEdit);
    myList.appendChild(node);

    document.getElementById('tabelaVaziaEndereco').style.display = 'none';

    var enderecoObj = new enderecoC(enderecoIt, bairro, tipoEndereco, dataInicio, 
        indicadorDiaInicio, indicadorMesInicio, indicadorAnoInicio, dataFim, indicadorDiaFim, indicadorMesFim, indicadorAnoFim,
        caixaPostal, cep, distrito);

    saveLocalStorage(enderecoObj,'enderecos');
    clearAllModalEndereco();
}

function editarEndereco(node){
    var id = $("input[type=hidden]").val();
    console.log(node);
    console.log(id);
}

function clearAllModalEndereco() {
    document.getElementById('enderecoInput').value = '';
    document.getElementById('bairroInput').value = '';
}

