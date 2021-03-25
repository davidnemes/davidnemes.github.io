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
        gotClick(e) {
            let id = e.target.id
            let splittedId = id.split('-')
            let numId = parseInt(splittedId[1]) - 1

            if (!this.gameList[numId].isLocked) {
                if(this.xTurn) {
                    this.gameList[numId].src = this.xSrc
                } else {
                    this.gameList[numId].src = this.oSrc
                }
                this.xTurn = !this.xTurn
                this.gameList[numId].isLocked = true
            }
        },
        resetGame() {
            this.gameList.forEach(item => {
                item.src = this.defaultSrc
                item.isLocked = false
            })
            this.xTurn = true
        },
        //ez a method a játék előkészítését végzi, csak egyszer az elején van használva
        prepareGame() {
            for(let i=1; i<=this.numOfSquares; i++) {
                let id = `item-${i}`
                this.gameList.push({id: id, isLocked: false, src: this.defaultSrc})
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
        }
    }
})
