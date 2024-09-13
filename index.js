const { select } = require('@inquirer/prompts')     //Esse 'select' é basicamente um objeto dessa biblioteca
const { clear } = require('console')

const start = async () => {     // O async é necessario pro'await' lá e baixo
    while(true){
        // Essa const 'opcao' passa a receber o valor que o usuario decidir. Nesse caso, pode ser: cadastrar, listar, etc
        // Esse objeto 'select' permite que voce "navegue" entre as opcoes
        const opcao = await select({        //Esse 'await' serve pra fazer o menu ficar parado, esperando por uma açao
            message: "Menu >",      //Mensagem obrigatoria
            choices: [      // Escolhas da biblioteca // Essa escolha tem que por obrigacao ser uma array
                {
                    name: "Cadastrar meta",
                    value: "cadastrar"
                },
                {
                    name: "Listar metas",
                    value: "listar"
                },
                {
                    name: "Deletar meta",
                    value: "deletar"
                },
                {
                    name: "Sair",
                    value: "sair"
                }
            ]
        })

                switch(opcao) {
                    case 'cadastrar':
                        clear
                        console.log("Vamos cadastrar!")
                        break
                    case 'listar':
                        console.log("Vamos listar!")
                        break
                    case 'deletar':
                        console.log("Vamos deletar!")
                        break
                    case 'sair':
                        console.log("Até a próxima!")
                        return
                }
            }
}
start()