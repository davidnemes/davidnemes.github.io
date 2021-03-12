const game = Vue.createApp({
    data() {
        return {
            gameList: ['item-1', 'item-2', 'item-3', 'item-4', 'item-5', 'item-6', 'item-7', 'item-8', 'item-9'],
            xTurn: true,
            xSrc: './images/x-amobahoz.png',
            oSrc: './images/kor-amobahoz.png',
            usedSquares: []
        }
    },
    methods: {
        gotClick(e) {
            id = e.target.id
            if (this.usedSquares.every( x => x !== id)) {
                if(this.xTurn) {
                    e.target.src = this.xSrc
                } else {
                    e.target.src = this.oSrc
                }
                this.xTurn = !this.xTurn
                this.usedSquares.push(id)
            }
        },
    }
})
