const game = Vue.createApp({
    data() {
        return {
            gameList: [],
            xTurn: true,
            xSrc: './images/x-amobahoz.png',
            oSrc: './images/kor-amobahoz.png',
            defaultSrc: './images/feherkocka-amobahoz.jpg',
            numOfSquares: 144,
        }
    },
    methods: {
        getIdNum(id, forArray) {
            let splittedId = id.split('-')
            if(forArray) {
                return parseInt(splittedId[1]) - 1
            }
            return parseInt(splittedId[1])
        },
        gotClick(e) {
            numId = this.getIdNum(e.target.id, true)

            if (!this.gameList[numId].state) {
                if(this.xTurn) {
                    this.gameList[numId].src = this.xSrc
                    this.gameList[numId].state = 'x'
                } else {
                    this.gameList[numId].src = this.oSrc
                    this.gameList[numId].state = 'o'
                }
                this.xTurn = !this.xTurn
            }
        },
        checkGameEnd() {
            let sqsInARow = Math.sqrt(this.numOfSquares)
            this.gameList.forEach(square => {
                if(!square.state) {
                    return
                }
                let sqId = this.getIdNum(square.id, false)
                let sqPos = square.position
                switch(sqPos) {
                    case 'tlc':
                        
                    break
                    case 'trc':

                    break
                    case 'blc':

                    break
                    case 'brc':

                    break
                    case 'top':

                    break
                    case 'bottom':

                    break
                    case 'left':

                    break
                    case 'right':

                    break
                    case 'normal':

                    break
                    default:
                        alert('Oops.. something went really wrong!')
                }

            })
        },
        resetGame() {
            this.gameList.forEach(item => {
                item.src = this.defaultSrc
                item.state = null
            })
            this.xTurn = true
        },
        //ez a method a játék előkészítését végzi, csak egyszer az elején van használva
        prepareGame() {
            for(let i=1; i<=this.numOfSquares; i++) {
                
                let id = `item-${i}`
                let sqsInARow = Math.sqrt(this.numOfSquares)
                let sqPosition

                if(i <= sqsInARow) {
                    if(i === 1) {
                        sqPosition = 'tlc' // aka top left corner
                    } else if(i === sqsInARow) {
                        sqPosition = 'trc' // aka top right corner
                    } else {
                        sqPosition = 'top'
                    }
                } else if(i >= this.numOfSquares - sqsInARow) {
                    if(i === this.numOfSquares - sqsInARow) {
                        sqPosition = 'blc' // aka bottom left corner
                    } else if (i === this.numOfSquares) {
                        sqPosition = 'brc' // aka bottom right corner
                    } else {
                        sqPosition = 'bottom'
                    }
                } else if(i % sqsInARow === 0){
                    sqPosition = 'right'
                } else if(i % sqsInARow === 1){
                    sqPosition = 'left'
                } else {
                    sqPosition = 'normal'
                }

                this.gameList.push({id: id, state: null, position: sqPosition, src: this.defaultSrc})
            }
            //itt a gameBody szélességét számolom ki, állítom be a responsive megjelenéssel együtt
            let sqrt = Math.sqrt(this.numOfSquares)
            let width = (sqrt*40)+(sqrt*2)
            let widthPx = `${width}px`
            let widthMobile = (sqrt*20)+(sqrt*2)
            let widthPxMobile = `${widthMobile}px`
            let r = document.querySelector(':root')
            r.style.setProperty('--gameBodyWidth', widthPx)
            r.style.setProperty('--gameBodyWidthOnMobile', widthPxMobile)
        },
    }
})
