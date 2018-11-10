$("#paisesSelect2").load("tabs/paisesSelect.html");

new dgCidadesEstados2({
    cidade: document.getElementById('cidade2'),
    estado: document.getElementById('estado2')
})

function changePais2(radioInput) {
    if(radioInput.value == 'BRASIL'){
        document.getElementById('cardBrasil2').style.display='';
        document.getElementById('cardOutro2').style.display='none';
    }else{
        document.getElementById('cardBrasil2').style.display='none';
        document.getElementById('cardOutro2').style.display='';
    }
}

var nameLocalStoregeEndereco = 'enderecoNascimento';