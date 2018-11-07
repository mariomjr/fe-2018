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
    const endereco = document.getElementById('enderecoInput').value;
    const caixaPostal = document.getElementById('caixapostalEnderecoInput').value;
    const cep = document.getElementById('cepInput').value;
    const bairro = document.getElementById('bairroInput').value;
    const distrito = document.getElementById('distritoInput').value;

    const enredecoFull = endereco +' '+bairro;
    const myList = document.getElementById('registeredEndereco');
    const node = document.createElement('li');
    const span = document.createElement('span');
    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        myList.removeChild(node);
    });
    span.innerHTML = enredecoFull;
    node.appendChild(span);
    node.appendChild(btnDel);
    myList.appendChild(node);

    document.getElementById('tabelaVaziaEndereco').style.display = 'none';

    var enderecoObj = new endereco(endereco, bairro);

    saveLocalStorage(enderecoObj,'enderecos');
    clearAllModalEndereco();
}

function clearAllModalEndereco() {
    document.getElementById('enderecoInput').value = '';
    document.getElementById('bairroInput').value = '';
}

