const { select, input, checkbox } = require('@inquirer/prompts')     //Esse 'select' é basicamente um objeto dessa biblioteca
const fs = require("fs").promises

let mensagem = "Bem vindo ao app de metas!";

let metas

const carregarMetas = async () => {
    try {
        const dados = await fs.readFile("metas.json", "utf-8")
        metas = JSON.parse(dados)
    }
    catch(erro) {
        metas = []
    }
}

const salvarMetas = async () => {
    await fs.writeFile("metas.json", JSON.stringify(metas, null, 2))
}

const cadastrarMeta = async () => {
    const meta = await input({message: "Digite a meta:"})
// Verifica se a entrada está vazia
    if(meta.length == 0) {
        mensagem = "A meta não pode ser vazia!"
        return
    }
// Esse push aqui serve pra enfiar as coisas dentro da array metas (lá ele)
// É aqui que decidimos quais as chaves e valores, dai é só atribuir na chave certa o valor de entrada, 'meta'
    metas.push(
        {
            value: meta,
            checked: false
        }
    )

    mensagem = "Meta cadastrada com sucesso!"
}

const listarMeta = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas registradas!"
        return
    }

    const respostas = await checkbox({
        message: "Setas para navegar entre metas, barra de espaço para marcar e desmarcar as metas e enter para finalizar!",
        choices: [...metas],
        instructions: false
    })

    metas.forEach((m) => {
        m.checked = false
    })

    if(respostas.length == 0) {
        mensagem = "Nenhuma meta foi selecionada!"
        return
    }


    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    mensagem = "Meta selelcionada com sucesso!"

}

const metasRealizadas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas registradas!"
        return
    }

    const realizadas = metas.filter((meta) => { // Esse metodo 'filter, forEach', sao metodos HOF(Higher order functions). Isso significa que sao metodos que recebem funcoes como parametro
        return meta.checked
})
    if(realizadas.length == 0) {
        mensagem = "Nenhuma meta foi realizada ainda!"
        return
    }

    await select({
        message: "Metas realizadas:",
        choices: [...realizadas]
    })
}

const metasAbertas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas registradas!"
        return
    }

    const abertas = metas.filter((meta) => {
        return !meta.checked
    })

    if(abertas.length == 0) {
        mensagem = "Todas as metas já foram cumpridas. Continue assim!"
        return
    }

    await select({
        message: "Metas a serem cumpridas: " + abertas.length,
        choices: [...abertas]
    })
}

const deletarMetas = async () => {
    if(metas.length == 0) {
        mensagem = "Não existem metas registradas!"
        return
    }

    const metasDesmarcadas = metas.map((meta) => {
        return {value: meta.value, checked: false}
    })

    const itensADeletar = await checkbox({
        message: "Setas para navegar entre metas, barra de espaço para marcar e desmarcar as metas e enter para finalizar!",
        choices: [...metasDesmarcadas],
        instructions: false
    })

    if(itensADeletar.length == 0) {
        mensagem = "Nenhuma meta foi deletada!"
        return
    }

    itensADeletar.forEach((item) => {
        metas = metas.filter((meta) => {
            return meta.value != item
        })
    })

    mensagem = "Meta(s) deletada(s) com sucesso!"
}

const mostrarMensagem = () => {
    console.clear()

    if(mensagem != "") {
        console.log(mensagem)
        console.log("")
        mensagem = ""
    }
}

const start = async () => {     // O async é necessario pro'await' lá e baixo
    
    await carregarMetas()

    while(true){

        mostrarMensagem()
        await salvarMetas()
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
                    name: "Metas Realizadas",
                    value: "realizadas"
                },
                {
                    name: "Metas Abertas",
                    value: "abertas"
                },
                {
                    name: "Deletar metas",
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
                break
                
            case 'listar':
                await listarMeta()
                break

            case 'realizadas':
                await metasRealizadas()
                break

            case 'abertas':
                await metasAbertas()
                break

            case 'deletar':
                await deletarMetas()
                break

            case 'sair':
                console.log("Até a próxima!")
                return
            }
        }
}

start()