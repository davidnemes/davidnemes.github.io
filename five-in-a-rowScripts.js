const game = Vue.createApp({
    data() {
        return {
            gameList: [],
            xTurn: true,
            xSrc: './images/x-amobahoz.png',
            oSrc: './images/kor-amobahoz.png',
            defaultSrc: './images/feherkocka-amobahoz.jpg',
            styleObj: {},
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
        prepareGame() {
            for(let i=1; i<=this.numOfSquares; i++) {
                let id = `item-${i}`
                this.gameList.push({id: id, isLocked: false, src: this.defaultSrc})
            }
            let x = this.numOfSquares
            let sqrt = Math.sqrt(x)
            let width = ((x/sqrt)*40)+((x/sqrt)*2)
            this.styleObj = {width: `${width}px`}
        }
    }
})
