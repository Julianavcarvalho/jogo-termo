const divisao = document.querySelector('.divisao')
const apagaEnter = document.querySelector('#apagar-e-enter')
const primeiraLinha = document.querySelector('#primeiraLinha')
const segundaLinha = document.querySelector('#segundaLinha')
const terceiraLinha = document.querySelector('#terceiraLinha')


const teclaPrimeiraLinha = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const teclaSegundaLinha = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const teclaTerceiraLinha = ['Z', 'X', 'C', 'V', 'B', 'N', 'M']


const linha = 6
const coluna = 5
let linhaAtual = 0
let colunaAtual = 0


let palavras = ['SENAI', 'NOITE', 'MILHO', 'LETRA', 'MOUSE']


let palavra = palavras[Math.floor(Math.random() * palavras.length)];
// console.log(palavra)


let palavrasMapa = {}

for (let i = 0; i < palavra.length; i++) {
    palavrasMapa[palavra[i]] = i
}
const tentativas = []



for (let linhaIndex = 0; linhaIndex < linha; linhaIndex++) {
    tentativas[linhaIndex] = new Array(coluna)
    const divisaoLinha = document.createElement('div')
    divisaoLinha.setAttribute('id', 'linha' + linhaIndex)
    divisaoLinha.setAttribute('class', 'div-linha')
    for (let colunaIndex = 0; colunaIndex < coluna; colunaIndex++) {
        const divisaoColuna = document.createElement('div')
        divisaoColuna.setAttribute('id', 'linha' + linhaIndex + 'coluna' + colunaIndex)
        let classColuna;
        if (linhaIndex === 0) {
            classColuna = 'div-coluna digitando'
        } else {
            classColuna = 'div-coluna desativado'
        }
        divisaoColuna.setAttribute('class', classColuna)
        divisaoLinha.append(divisaoColuna)
        tentativas[linhaIndex][colunaIndex] = ''
    }
    divisao.append(divisaoLinha)

}



const checkTentativa = () => {
    const tentativa = tentativas[linhaAtual].join("")
    if (tentativa.length !== coluna) {
        return;
    }

    let atColuna = document.querySelectorAll('.digitando')
    for (let i = 0; i < coluna; i++) {
        const letra = tentativa[i]
        if (palavrasMapa[letra] === undefined) {
            atColuna[i].classList.add('errado')
        } else {
            if (palavrasMapa[letra] === i) {
                atColuna[i].classList.add('certo')
            } else {
                atColuna[i].classList.add('deslocado')
            }
        }
    }

    if (tentativa === palavra) {
        window.alert('Parabéns, você conseguiu!')
        return
    } else {
        if (linhaAtual === linha - 1) {
            window.alert('Errou!')
        } else {
            proximaLinha()
        }
    }
}



const proximaLinha = () => {
    let digColuna = document.querySelectorAll('.digitando')
    for (let i = 0; i < digColuna.length; i++) {
        digColuna[i].classList.remove('digitando')
        digColuna[i].classList.add('desativado')
    }
    linhaAtual++
    colunaAtual = 0

    const linhaAtualElemento = document.querySelector('#linha' + linhaAtual)
    let atColuna = linhaAtualElemento.querySelectorAll('.div-coluna')
    for (let i = 0; i < atColuna.length; i++) {
        atColuna[i].classList.remove('desativado')
        atColuna[i].classList.add('digitando')
    }
}



const tecladoOnClick = key => {
    if (colunaAtual === coluna) {
        return
    }
    const divAtual = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual)
    divAtual.textContent = key
    tentativas[linhaAtual][colunaAtual] = key
    colunaAtual++
}



const criarLinhaTeclado = (keys, linhaTeclado) => {
    keys.forEach(key => {
        let botaoElemento = document.createElement('button')
        botaoElemento.textContent = key
        botaoElemento.setAttribute('id', key)
        botaoElemento.addEventListener('click', () => tecladoOnClick(key))
        linhaTeclado.append(botaoElemento)
    })
}



criarLinhaTeclado(teclaPrimeiraLinha, primeiraLinha)
criarLinhaTeclado(teclaSegundaLinha, segundaLinha)
criarLinhaTeclado(teclaTerceiraLinha, terceiraLinha)


const backspace = () => {
    if (colunaAtual === 0) {
        return
    }

    colunaAtual--
    tentativas[linhaAtual][colunaAtual] = ''
    const div = document.querySelector('#linha' + linhaAtual + 'coluna' + colunaAtual)
    div.textContent = ''
}



const backspaceBotao = document.createElement('button')
backspaceBotao.addEventListener('click', backspace)
backspaceBotao.textContent = '<x'
apagaEnter.append(backspaceBotao)


const enterButton = document.createElement('button')
enterButton.addEventListener('click', checkTentativa)
enterButton.textContent = 'ENTER'
apagaEnter.append(enterButton)


document.onkeydown = function (evt) {
    evt = evt || window.evt
    if (evt.key === 'Enter') {
        checkTentativa()
    } else if (evt.key === 'Backspace') {
        backspace()
    } else {
        tecladoOnClick(evt.key.toUpperCase())
    }
}