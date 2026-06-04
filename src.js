function iniciarSimulacao(valorCarro, entrada, parcelas){
    if (entrada < (0.2 * valorCarro)){
        return "Entrada insuficiente";
    }
    if(parcelas < 12 || parcelas > 60){
        return "Número de parcelas inválido";
    }
    return "Sucesso, pode prosseguir com a simulação";
}

function calcularIpva(valorCarro, estado){
    let aliquota;
    if(estado === "SP" || estado === "RJ" || estado === "MG"){
        aliquota = 0.04;
    }else {
        aliquota = 0.03;
    }
    return valorCarro * aliquota;
}

function gerarHistoricoIpva(valorCarro, estado, parcelas){
    let historicoIpva = [];
    let valorAtual = valorCarro;
    let anosTotal = parseInt(parcelas / 12);
    for(let i = 1 ; i <= anosTotal ; i++){
        let ipvaAnual = calcularIpva(valorAtual, estado);
        historicoIpva.push(parseFloat(ipvaAnual.toFixed(2)));
        valorAtual *= 0.9;
    }
    return historicoIpva;
}                

function calcularFinanciamentoSac(valorFinanciado , taxaJuros, totalMeses){
    let amortizacao = valorFinanciado / totalMeses; 
    let cronogramaParcelas = [];
    let saldoDevedor = valorFinanciado; 

    for (let i = 0 ; i<totalMeses; i++) { 
        let jurosMes = saldoDevedor * (taxaJuros / 100);
        let valorParcela = amortizacao + jurosMes;
        cronogramaParcelas.push({mes : i + 1, valor: parseFloat(valorParcela.toFixed(2))});
        saldoDevedor -= amortizacao;
    } 
    return cronogramaParcelas;
}

function calcularTempoSuficienteParaCompra(valorCarro, capacidadeSomaMensal){
    if (capacidadeSomaMensal <= 0) {
        return "Infinito (capacidade de poupança deve ser maior que zero)";
    }
    
    let saldoPoupado = 0;
    let mesesPassados = 0;
    while(saldoPoupado < valorCarro){
        saldoPoupado = (saldoPoupado + capacidadeSomaMensal) * 1.005;
        mesesPassados ++;
    }
    return mesesPassados;
}

function exibirRelatorio(valorCarro, entrada, parcelas, salario, estado, taxaJuros) {
    let validacao = iniciarSimulacao(valorCarro, entrada, parcelas, salario, estado);
    if (validacao !== "Sucesso, pode prosseguir com a simulação") {
        console.log(validacao);
        return;
    }
    let valorFinanciado = valorCarro - entrada;
    let cronograma = calcularFinanciamentoSac(valorFinanciado, taxaJuros, parcelas);
    let historicoIpva = gerarHistoricoIpva(valorCarro, estado, parcelas);
    let primeiraParcela = cronograma[0].valor;
    let ultimaParcela = cronograma[cronograma.length - 1].valor;

    console.log("-- RELATÓRIO DO FINANCIAMENTO--");
    console.log(`Carro: R$ ${valorCarro} | Estado: ${estado}`);
    console.log(`1ª Parcela: R$ ${primeiraParcela}`);
    console.log(`Última Parcela: R$ ${ultimaParcela}`);
    
    if(historicoIpva.length > 0) {
        console.log(`IPVA Ano 1: R$ ${historicoIpva[0]}`);
    }

    if (primeiraParcela > (salario * 0.3)) {
        console.log("Cuidado: Parcela muito alta para o seu salário!");
        let mesesPoupando = calcularTempoSuficienteParaCompra(valorCarro, primeiraParcela);
        console.log(`Melhor poupar! Você teria o carro em ${mesesPoupando} meses.`);
    } else {
        console.log("PARABÉNS: O financiamento cabe no seu bolso.");
    }
}

function iniciarSimulacao(valorCarro, entrada, parcelas, salario, estado){
    if (entrada < (0.2 * valorCarro)){
        return "Entrada insuficiente";
    }
    if(parcelas < 12 || parcelas > 60){
        return "Número de parcelas inválido";
    }
    return "Sucesso, pode prosseguir com a simulação";
}

function calcularIpva(valorCarro, estado){
    let aliquota;
    if(estado === "SP" || estado === "RJ" || estado === "MG"){
        aliquota = 0.04;
    }else {
        aliquota = 0.03;
    }
    return valorCarro * aliquota;
}

function gerarHistoricoIpva(valorCarro, estado, parcelas){
    let historicoIpva = [];
    let valorAtual = valorCarro;
    let anosTotal = parseInt(parcelas / 12);
    for(let i = 1 ; i <= anosTotal ; i++){
        let ipvaAnual = calcularIpva(valorAtual, estado);
        historicoIpva.push(parseFloat(ipvaAnual.toFixed(2)));
        valorAtual *= 0.9;
    }
    return historicoIpva;
}                

function calcularFinanciamentoSac(valorFinanciado , taxaJuros, totalMeses){
    let amortizacao = valorFinanciado / totalMeses; 
    let cronogramaParcelas = [];
    let saldoDevedor = valorFinanciado; 

    for (let i = 0 ; i<totalMeses; i++) { 
        let jurosMes = saldoDevedor * (taxaJuros / 100);
        let valorParcela = amortizacao + jurosMes;
        cronogramaParcelas.push({mes : i + 1, valor: parseFloat(valorParcela.toFixed(2))});
        saldoDevedor -= amortizacao;
    } 
    return cronogramaParcelas;
}

function calcularTempoSuficienteParaCompra(valorCarro, capacidadeSomaMensal){
    if (capacidadeSomaMensal <= 0) {
        return "Infinito (capacidade de poupança deve ser maior que zero)";
    }
    
    let saldoPoupado = 0;
    let mesesPassados = 0;
    while(saldoPoupado < valorCarro){
        saldoPoupado = (saldoPoupado + capacidadeSomaMensal) * 1.005;
        mesesPassados ++;
    }
    return mesesPassados;
}

function exibirRelatorio(valorCarro, entrada, parcelas, salario, estado, taxaJuros) {
    let validacao = iniciarSimulacao(valorCarro, entrada, parcelas, salario, estado);
    if (validacao !== "Sucesso, pode prosseguir com a simulação") {
        console.log(validacao);
        return;
    }
    let valorFinanciado = valorCarro - entrada;
    let cronograma = calcularFinanciamentoSac(valorFinanciado, taxaJuros, parcelas);
    let historicoIpva = gerarHistoricoIpva(valorCarro, estado, parcelas);
    let primeiraParcela = cronograma[0].valor;
    let ultimaParcela = cronograma[cronograma.length - 1].valor;

    console.log("-- RELATÓRIO DO FINANCIAMENTO--");
    console.log(`Carro: R$ ${valorCarro} | Estado: ${estado}`);
    console.log(`1ª Parcela: R$ ${primeiraParcela}`);
    console.log(`Última Parcela: R$ ${ultimaParcela}`);
    
    if(historicoIpva.length > 0) {
        console.log(`IPVA Ano 1: R$ ${historicoIpva[0]}`);
    }

    if (primeiraParcela > (salario * 0.3)) {
        console.log("Cuidado: Parcela muito alta para o seu salário!");
        let mesesPoupando = calcularTempoSuficienteParaCompra(valorCarro, primeiraParcela);
        console.log(`Melhor poupar! Você teria o carro em ${mesesPoupando} meses.`);
    } else {
        console.log("PARABÉNS: O financiamento cabe no seu bolso.");
    }
}


let perguntaValorCarro = parseFloat(prompt("Digite o valor do carro: R$ "))
let perguntaEntrada = parseFloat(prompt("Digite o valor da entrada: R$ "))

if (!isNaN(perguntaValorCarro) && !isNaN(perguntaEntrada)){
    let simulacaoInicial = iniciarSimulacao(perguntaValorCarro, perguntaEntrada)
    if (perguntaEntrada < (0.2 * perguntaValorCarro)){
        console.log("Entrada insuficiente")
    } else {
        let perguntaParcelas = parseInt(prompt("Digite a quantidade de parcelas (entre 12 e 60): "))
        if (!isNaN(perguntaParcelas)){
            if (perguntaParcelas < 12 || perguntaParcelas > 60) {
                console.log("Número de parcelas inválido");
            }else{
                let perguntaEstado = prompt("Digite a sigla da sua Unidade Federal (UF): ").toUpperCase()
                if (isNaN(perguntaEstado)){
                    let perguntaSalario = parseFloat(prompt("Digite o valor do seu salário: R$ "))
                    let perguntaTaxaJuros = parseFloat(prompt("Digite o valor da taxa de juros (% ao mês): "))
                    if (!isNaN(perguntaSalario) && !isNaN(perguntaTaxaJuros)) {
                        exibirRelatorio(perguntaValorCarro, perguntaEntrada, perguntaParcelas, perguntaSalario, perguntaEstado, perguntaTaxaJuros)
                    } else{
                        console.log("Informação Inválida: Salário ou Taxa de Juros inválidos.")
                    }
                } else {
                    console.log("Informação Inválida: O estado deve ser uma sigla de texto (ex: SP).")
                }
            }
        } else {
            console.log("Informação Inválida: A quantidade de parcelas precisa ser um número.")
        }
    }
}
else {
    console.log("Informação Inválida: Valor do carro ou Entrada inválidos.")
}