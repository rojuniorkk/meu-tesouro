const USER_WIDTH = window.innerWidth;
const USER_HEIGHT = window.innerHeight;
const USER_TYPE = USER_HEIGHT < 768 ? 'desktop' : 'mobile';

const emoji = ['❤️', '🩷', '🤍', '💞', '💓', '❤️‍🔥']

function chuva_efffect() {

    if (chuva.style.display == 'block') {
        const element = document.createElement(Math.random() < .7 ? 'div' : 'img');

        element.classList.add('chuva-element')

        switch (element.tagName) {
            case 'DIV':
                element.textContent = emoji[irandom(0, emoji.length - 1)]
                break;
            default:
                element.src = `./src/img/chuva/${irandom(1, 7)}.jpg`
                element.style.width = '40px'
                element.style.height = '40px'
                break;
        }

        let anim_duration = irandom(4, 5)

        element.style.top = '-50px'
        element.style.left = `${irandom(0, (USER_WIDTH - 50))}px`
        element.style.animationDuration = `${anim_duration}s`
        element.classList.add('cair')

        chuva.appendChild(element)

        setTimeout(() => {
            element.remove()
        }, (1000 * (anim_duration + 5)))
    }
}

function estrelas() {

    const bg_estrelas = document.getElementById('estrelas');
    const count_estrelas = USER_TYPE == 'mobile' ? 400 : 1500

    let StarPositions = []

    function get_position(size, e) {

        /*
            Função faz que as estrelas não ocupe o mesmo lugar, 
            tendo uma margem de 2x o tamanho da estrela.
        */

        let X = irandom(size, USER_WIDTH - size);
        let Y = irandom(size, USER_HEIGHT - size);
        let D = size * 2

        if (StarPositions.length > 0) {
            for (let exo of StarPositions) {
                if (Math.abs(X - exo.x) < D && Math.abs(Y - exo.y) < D) {
                    return get_position(size, e)
                }
            }
        }

        StarPositions.push({ x: X, y: Y })
        return { x: X, y: Y }

    }

    for (let i = 0; i <= count_estrelas; i++) {

        let SIZE = 1
        let OPACITY = (irandom(1, 100) / 100)

        let e = document.createElement('div');
        e.style.width = `${SIZE}px`;
        e.style.height = `${SIZE}px`;
        e.style.opacity = `${OPACITY}`;
        e.style.backgroundColor = '#fff';

        if (USER_TYPE == 'desktop') {
            e.style.scale = '0.5';
        }

        let POSITION = get_position(SIZE, e)

        e.style.position = 'absolute';
        e.style.top = `${POSITION.y}px`;
        e.style.left = `${POSITION.x}px`;

        if (irandom(0, 1) == 0) {
            e.classList.add('start-anim');
            e.style.animationDelay = `${irandom(0, 12)}s`;
        }

        bg_estrelas.appendChild(e)
    }
}

const mapa = document.getElementById('mapa')
const bau = document.getElementById('bau')
const book = document.getElementById('book')
const chuva = document.getElementById('chuva')

mapa.onanimationend = (a) => {
    if (a.animationName == 'scale-off') {
        mapa.style.display = 'none'
        bau.classList.add('bau-subir-anim')
        bau.style.display = 'block'
    }
}

bau.onanimationend = (a) => {
    if (a.animationName == 'bau-subir' && bau.getAttribute('active') == 0) {
        bau.classList.remove('bau-subir-anim')
    }
}

book.onanimationend = (a) => {
    console.log(a)
    if (a.animationName == 'scale-off') {
        book.classList.remove('book-open-anim')
        book.classList.add('float-anim')

        playSound('./src/audio/music.mp3', true)
    }
}

bau.addEventListener('click', () => {
    let active = bau.getAttribute('active')

    if (active == 0) {
        playSound('../src/audio/chest.mp3')

        bau.setAttribute('active', 1)
        bau.classList.add('bau-click-anim')
        bau.style.backgroundImage = `url(./src/img/c-open.png)`

        setTimeout(() => {
            chuva.style.display = 'block'
            bau.classList.remove('bau-click-anim')
            bau.classList.add('bau-ativar-anim')

            book.classList.add('book-open-anim')
            bau.classList.add('bau-desativar-anim')
        }, (1000 * .35))
    }
})

function rmapa() {

    let rect = mapa.getBoundingClientRect()

    let padding = 20
    let size = USER_TYPE == 'mobile' ? 30 : 20
    let x = mapa.offsetLeft + irandom(padding, (rect.width - size) - padding * 2)
    let y = mapa.offsetTop + irandom(padding, (rect.height - size) - padding * 2)

    let cross = document.createElement('div')
    cross.id = 'cross'
    cross.style.width = `${size}px`
    cross.style.height = `${size}px`
    cross.style.top = `${y}px`
    cross.style.left = `${x}px`

    mapa.appendChild(cross);

    cross.addEventListener('click', () => {
        cross.remove()
        mapa.classList.add('mapa-fechar-anim')
    })
}

rmapa();
estrelas();

setInterval(() => {
    chuva_efffect()
}, 50)
