//#region Modulos Externos
const chalk = require('chalk') // biblioteca para colorir e personalizar o texto exibido no terminal
const inquirer = require('inquirer') // biblioteca para criar menus e coletar dados do usuário
//#endregion

//#region Modulos Internos
const fs = require('fs') // biblioteca para manipular arquivos e diretórios
//#endregion

operation() // chama a função principal para iniciar o programa

//#region Operações Iniciais
function operation() {
    // utiliza a biblioteca inquirer para criar um menu de opções para o usuário
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'O Que Deseja Fazer?',
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                'Sair',
            ]
        }
    ]).then((answer) =>{
        // redireciona para a função correspondente à escolha do usuário
        const action = answer['action']
        if(action === 'Criar Conta'){
            console.log('Criando sua conta')
            creatAccount() // chama a função para criar uma nova conta
        }else if(action === 'Consultar Saldo'){
            console.log('Consultando Saldo...')
        }else if(action === 'Depositar'){
            console.log('Depositando...')
        }else if(action === 'Sacar'){
            console.log('Sacando')
        }else if(action === 'Sair'){
            console.log(chalk.bgRed.black('Obrigado por utilizar o Contas ETEC.'))
            setTimeout(() => {
                process.exit() // encerra o programa após 1.5 segundos
            }, 1500);
        }
    })
}
//#endregion

//#region criação de conta
function creatAccount(){
    console.log(chalk.bgRed.white('Parabéns por escolher o banco SANTOANDRÉ'));
    console.log(chalk.white('Escolha as opções de conta: '));

    buildAccount() // chama a função para coletar o nome da nova conta
}

function buildAccount(){
    inquirer.prompt([
        {
            name:'accountName',
            message:'Nome Da Conta: ',
        }
    ]).then((answer) => {
        console.info(answer['accountName'])
        const accountName = answer['accountName']
        // verifica se o arquivo JSON da nova conta já existe
        if(!fs.existsSync('accounts')){
            fs.mkdirSync('accounts') // cria um novo diretório 'accounts' se ele não existir
        }
        if(fs.existsSync(`accounts/${accountName}.json`)){
            console.log(
                chalk.bgWhite.red('Conta Já Exite.')
            )
            buildAccount() // chama a função novamente se o nome da conta já existir
            return
        }
        // cria um novo arquivo JSON para a nova conta, com um saldo inicial de zero
        fs.writeFileSync(
            `accoounts/${accountName}.json`,
            '{"balance": 0}',
            function (err){
                console.error(err)
            }
        )
    
        console.info(chalk.bgWhite.green('Parabéns, Conta Criada!'))
        operation() // volta para o menu principal do programa
    })
}
//#endregion

//#region Deposito na conta
// Função para depositar um valor em uma conta
function deposit() {
    // Utiliza a biblioteca "inquirer" para solicitar ao usuário o nome da conta
    inquirer.prompt([
        {
            name:'accountNamer',
            message:'Qual Conta Deseja Depositar: '
        }
    ]).then((answer) => {
        // Atribui o valor digitado na variável "accountName"
        const accountName = answer['accountName']
        
        // Verifica se a conta existe. Se não existir, chama a função "deposit()" novamente
        if (!checkAccount(accountName)) {
            return deposit()
        }
        
        // Utiliza a biblioteca "inquirer" para solicitar ao usuário o valor a ser depositado
        inquirer.prompt([
            {
                name:'amount',
                message:'Quanto Deseja Depositar? '
            }
        ]).then((answer) => {
            // Atribui o valor digitado na variável "amount"
            const amount = answer['amount']
            
            // Adiciona o valor à conta
            addAmount(accountName, amount)
            
            // Imprime mensagem de sucesso e chama a função "operation()" depois de 1 segundo
            console.log(chalck.bgYellow.red('Sucesso! montante depositado.'))
            setTimeout(() => {
                operation()
            }, 1000);
        })
    })
}

// Função que verifica se uma conta existe
function checkAccount(accountName) {
    // Verifica se o arquivo correspondente à conta existe
    if (!fs.existsSync(`accounts/${accountName}.json`)) {
        return false
    }
    
    return true
}

// Função que retorna os dados de uma conta
function getAccount(accountName) {
    // Lê o arquivo correspondente à conta e retorna os dados em formato JSON
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf8',
        flag: 'r'
    })
    
    return JSON.parse(accountJSON)
}

// Função que adiciona um valor à conta
function addAmount(accountName, amount) {
    // Obtém os dados da conta
    const accountData = getAccount(accountName)
    
    // Verifica se o valor do depósito é válido. Se não for, chama a função "deposit()" novamente
    if (!amount) {
        console.log(chalck.bgWhite.red('Erro de montante!'))
        return deposit()
    }
    
    // Adiciona o valor à conta
    accountData.balance = parseFloat(amount) + parseFloat(accountData.balance)

    // Escreve os dados atualizados da conta no arquivo correspondente
    fs.writeFileSync(`accounts?${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(err)
    })
    
    // Imprime mensagem de sucesso
    console.log(chalck.green('Seu valor foi depositado!'))
}

//#endregion