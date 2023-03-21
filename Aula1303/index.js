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
