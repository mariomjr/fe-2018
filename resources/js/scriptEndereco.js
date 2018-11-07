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