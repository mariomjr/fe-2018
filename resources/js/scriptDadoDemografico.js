$("#paisesSelect2").load("tabs/paisesSelect.html");
var nameLocalStorageDadoDemografico = 'dadoDemografico';

new dgCidadesEstados({
    cidade: document.getElementById('cidade2'),
    estado: document.getElementById('estado2')
})

function changePais2(radioInput) {
    if (radioInput.value == 'BRASIL') {
        document.getElementById('cardBrasil2').style.display = '';
        document.getElementById('cardOutro2').style.display = 'none';
    } else {
        document.getElementById('cardBrasil2').style.display = 'none';
        document.getElementById('cardOutro2').style.display = '';
    }
}

function adicionarDadoDemografico() {
    const nomeMae = document.getElementById('nomeMae').value;
    const nomePai = document.getElementById('nomePai').value;

    const situacaoFamiliar = $("input[name='situacaoFamiliar']:checked").val();

    const dataNascimento = document.getElementById('dataNascimento').value;
    const indicadorDiaNascimento = $("input[name='indicador_acuracia_dia_nascimento']:checked").val();
    const indicadorMesNascimento = $("input[name='indicador_acuracia_mes_nascimento']:checked").val();
    const indicadorAnoNascimento = $("input[name='indicador_acuracia_ano_nascimento']:checked").val();
    const seguimento = document.getElementById('seguimento').checked;

    const dataObito = document.getElementById('dataObito').value;
    const indicadorDiaObito = $("input[name='indicador_acuracia_dia_obito']:checked").val();
    const indicadorMesObito = $("input[name='indicador_acuracia_mes_obito']:checked").val();
    const indicadorAnoObito = $("input[name='indicador_acuracia_ano_obito']:checked").val();
    const fonteNotificacao = $("input[name='fonteNotificacao']:checked").val();

    const etnia = $("input[name='etnia']:checked").val();

    const genero = $("input[name='genero']:checked").val();

    const nacionalidade = $("input[name='nacionalidade']:checked").val();
    
    var varPais = '';
    var varDataEntradaNoBrasil = null;
    var varEstadoNascimento = '';
    var varCidadeNascimento = '';
    if ($("input[name='nacionalidade']:checked").val() == 'BRASIL') {
        varPais = 'Brasil';
        varEstadoNascimento = document.getElementById('estado2').value;
        varCidadeNascimento = document.getElementById('cidade2').value;
    } else {
        varPais = document.getElementById('paisesSelect2').value;
        varDataEntradaNoBrasil = $("input[name='dataEntradaNoBrasil']:checked").val();
    }
    const estadoNascimento = varEstadoNascimento;
    const cidadeNascimento = varCidadeNascimento;
    const pais = varPais;
    const dataEntradaNoBrasil = varDataEntradaNoBrasil;

    const pluralidadeNascimento = document.getElementById('pluralidadeNascimento').value;
    const ordemNascimento = document.getElementById('ordemNascimento').value;

    const comentarioIdentificacao = document.getElementById('comentarioIdentificacao').value;

    var id = "id" + Math.random().toString(16).slice(2);

    document.getElementById('tabelaVaziaDadoDemografico').style.display = 'none';

    var dadoDemograficoObj = new dadoDemograficoC(id, nomeMae, nomePai, situacaoFamiliar,
        dataNascimento, indicadorDiaNascimento, indicadorMesNascimento, indicadorAnoNascimento, seguimento,
        dataObito, indicadorDiaObito, indicadorMesObito, indicadorAnoObito, fonteNotificacao,
        etnia, genero, nacionalidade, pais, estadoNascimento, cidadeNascimento, dataEntradaNoBrasil,
        pluralidadeNascimento, ordemNascimento, comentarioIdentificacao
    );

    saveDadoDemograficoLocalStorage(dadoDemograficoObj, nameLocalStorageDadoDemografico);

    clearAllModalDadoDemografico();

    adicionarItemTableDadoDemografico(dadoDemograficoObj);

}

function adicionarItemTableDadoDemografico(dadoDemograficoC) {
    var tableRef = document.getElementById('tableDadoDemografico').getElementsByTagName('tbody')[0];
    var newRow = tableRef.insertRow(tableRef.rows.length);

    // Insert a cell in the row at index 0
    var cell0 = newRow.insertCell(0);//Nome da Mãe
    var cell1 = newRow.insertCell(1);//Nome do Pai
    var cell2 = newRow.insertCell(2);//Data de Nascimento
    var cell3 = newRow.insertCell(3);//Etnia
    var cell4 = newRow.insertCell(4);//Gênero
    var cell5 = newRow.insertCell(5);//País
    var cell6 = newRow.insertCell(6);//Opções

    var inputHidden = document.createElement("input");
    inputHidden.setAttribute("type", "hidden");
    inputHidden.setAttribute("value", dadoDemograficoC.id);

    cell0.appendChild(inputHidden);
    cell0.appendChild(document.createTextNode(dadoDemograficoC.nomeMae));
    cell1.appendChild(document.createTextNode(dadoDemograficoC.nomePai));
    cell2.appendChild(document.createTextNode(dadoDemograficoC.dataNascimento));
    cell3.appendChild(document.createTextNode(dadoDemograficoC.etnia));
    cell4.appendChild(document.createTextNode(dadoDemograficoC.genero));
    cell5.appendChild(document.createTextNode(dadoDemograficoC.pais));

    const btnEdit = document.createElement('button');
    btnEdit.setAttribute('type', 'button');
    btnEdit.innerHTML = 'Editar';
    btnEdit.className = 'btn btn-sm btn-primary float-right mr-1';
    btnEdit.setAttribute('data-target', '#cadastroDadoDemograficoModal');
    btnEdit.setAttribute('data-toggle', 'modal');
    btnEdit.addEventListener("click", () => {
        editarDadoDemografico(newRow);
    });

    const btnDel = document.createElement('button');
    btnDel.innerHTML = 'Apagar';
    btnDel.className = 'btn btn-sm btn-danger float-right';
    btnDel.addEventListener("click", () => {
        tableRef.removeChild(newRow);
        if (tableRef.rows.length == 0) {
            document.getElementById('tabelaVaziaDadoDemografico').style.display = '';
        }
    });
    cell6.appendChild(btnEdit);
    cell6.appendChild(btnDel);
}

function findDadoDemograficoByid(idVal) {
    currentList = JSON.parse(localStorage
        .getItem(nameLocalStorageDadoDemografico) || []);

    const objFound = currentList.find(item => item.id === idVal);

    return objFound;
}

function editarDadoDemografico(node) {
    var idVal = node.childNodes[0].childNodes[0].value;
    const objFound = findDadoDemograficoByid(idVal);
    removeDadoDemograficoLocalStorage(idVal);

    document.getElementById('dataNascimento').value = objFound.dataNascimento;

    $('input:radio[name="indicador_acuracia_dia_nascimento"][value="' + objFound.indicadorDiaNascimento + '"]').prop('checked', true);
    $('input:radio[name="indicador_acuracia_mes_nascimento"][value="' + objFound.indicadorMesNascimento + '"]').prop('checked', true);
    $('input:radio[name="indicador_acuracia_ano_nascimento"][value="' + objFound.indicadorAnoNascimento + '"]').prop('checked', true);
    document.getElementById('seguimento').checked = objFound.seguimento.checked;

    document.getElementById('dataObito').value = objFound.dataObito;
    $('input:radio[name="indicador_acuracia_dia_obito"][value="' + objFound.indicadorDiaObito + '"]').prop('checked', true);
    $('input:radio[name="indicador_acuracia_mes_obito"][value="' + objFound.indicadorMesObito + '"]').prop('checked', true);
    $('input:radio[name="indicador_acuracia_ano_obito"][value="' + objFound.indicadorAnoObito + '"]').prop('checked', true);
    $('input:radio[name="fonteNotificacao"][value="' + objFound.fonteNotificacao + '"]').prop('checked', true);
    
    $('input:radio[name="etnia"][value="' + objFound.etnia + '"]').prop('checked', true);

    $('input:radio[name="genero"][value="' + objFound.genero + '"]').prop('checked', true);

    $('input:radio[name="nacionalidade"][value="' + objFound.nacionalidade + '"]').prop('checked', true);

    if ($("input[name='nacionalidade']:checked").val() == 'BRASIL') {
        pais = "Brasil"
    } else {
        document.getElementById('paisesSelect2').value = objFound.pais;
        dataEntradaNoBrasil = objFound.dataEntradaNoBrasil;
    }

    document.getElementById('estado2').value = objFound.estado;
    document.getElementById('cidade2').value = objFound.cidade;
    
    document.getElementById('pluralidadeNascimento').value = objFound.pluralidadeNascimento;
    document.getElementById('ordemNascimento').value = objFound.ordemNascimento;

    document.getElementById('comentarioIdentificacao').value = objFound.comentarioIdentificacao;

    
}

function clearAllModalDadoDemografico() {
    document.getElementById('dataNascimento').value = '';
    $("input:radio[name='indicador_acuracia_dia_nascimento']:checked").val(['']);
    $("input:radio[name='indicador_acuracia_mes_nascimento']:checked").val(['']);
    $("input:radio[name='indicador_acuracia_ano_nascimento']:checked").val(['']);
    document.getElementById('seguimento').checked = '';
    document.getElementById('dataObito').value = '';
    $("input:radio[name='indicador_acuracia_dia_obito']:checked").val(['']);
    $("input:radio[name='indicador_acuracia_mes_obito']:checked").val(['']);
    $("input:radio[name='indicador_acuracia_ano_obito']:checked").val(['']);
    $("input:radio[name='fonteNotificacao']:checked").val(['']);
    $("input:radio[name='etnia']:checked").val(['']);
    $("input:radio[name='genero']:checked").val(['']);
    $("input:radio[name='nacionalidade']:checked").val(['']);
    pais = '';
    document.getElementById('estado2').value = '';
    document.getElementById('cidade2').value = '';
    document.getElementById('paisesEndereco').value = '';
    dataEntradaNoBrasil = null;
    document.getElementById('pluralidadeNascimento').value = '';
    document.getElementById('ordemNascimento').value = '';
    document.getElementById('comentarioIdentificacao').value = '';
}

function saveDadoDemograficoLocalStorage(dadoDemografico, tag) {
    currentList = JSON.parse(localStorage.getItem(tag)) || [];
    const index = currentList.findIndex(item => item.id === dadoDemografico.id);

    if (index > -1) {
        currentList.splice(index, 1, bond);
    } else {
        currentList.push(dadoDemografico);
    }

    localStorage.setItem(tag, JSON.stringify(currentList));
}

function removeDadoDemograficoLocalStorage(id) {
    currentList = JSON.parse(localStorage
        .getItem(nameLocalStorageDadoDemografico)) || [];
    currentList.forEach(storageItem => {
        const index = currentList.findIndex(item => item.id === id);
        if (index > -1) {
            currentList.splice(index, 1);
        }
    });

    localStorage.setItem(nameLocalStorageDadoDemografico,
        JSON.stringify(currentList));
}