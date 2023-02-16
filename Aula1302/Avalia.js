const chalk = require("chalk")
module.exports = {
    mensagem(aluno) {
        if (aluno > 6) {
            console.log(chalk.green("O aluno está aprovado: ") + chalk.black.bgGreen(nota))
        } else if (aluno >= 5) {
            console.log(chalk.yellow("O aluno está de recuperação: ") + chalk.black.bgYellow(nota))
        } else {
            console.log(chalk.red("O está reprovado: ") + chalk.black.bgRed(nota))
        }
    }

}
