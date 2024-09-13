const { select, input } = require('@inquirer/prompts')     //Esse 'select' é basicamente um objeto dessa biblioteca

let metas = []

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})
// Verifica se a entrada está vazia
    if(meta.length == 0) {
        console.log("A meta não pode ser vazia!")
        return
    }
// Esse push aqui serve pra enfiar as coisas dentro da array metas (lá ele)
// É aqui que decidimos quais as chaves e valores, dai é só atribuir na chave certa o valor de entrada, 'meta'
    metas.push(
        {
            value: meta,
            checked: false,
            ehBemGay: true,
            vddSejaDita: "Lá ele!",
            param: meta
        }
    )
}

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
                await cadastrarMeta()
                console.log(metas)
                break
                
            case 'listar':
                await listarMeta()
                break

            case 'deletar':
                await deletarMeta()
                break

            case 'sair':
                console.log("Até a próxima!")
                return
            }
        }
}

start()