const game = Vue.createApp({
    data() {
        return {
            gameList: [],
            xTurn: true,
            xSrc: './images/x-amobahoz.png',
            oSrc: './images/kor-amobahoz.png',
            defaultSrc: './images/feherkocka-amobahoz.jpg',
            numOfSquares: 144,
            gameOver: false,
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

            if (!this.gameList[numId].state && !this.gameOver) {
                if(this.xTurn) {
                    this.gameList[numId].src = this.xSrc
                    this.gameList[numId].state = 'x'
                } else {
                    this.gameList[numId].src = this.oSrc
                    this.gameList[numId].state = 'o'
                }
                this.xTurn = !this.xTurn
                this.checkGameEnd()
            }
        },

        checkGameEnd() {
            let sqsInARow = Math.sqrt(this.numOfSquares)
            let totalBest = {kind: null, inARow: 1, ids: []}
            this.gameList.forEach(square => {
                if(!square.state) {
                    return
                }
                let sqId = this.getIdNum(square.id, true)
                let sqPos = square.position
                let sqState = square.state
                let best = 1
                let bestsIds = []
                switch(sqPos) {
                    case 'normal':
                        let normalTests = [-sqsInARow-1, -sqsInARow, -sqsInARow+1, -1, 1, sqsInARow-1, sqsInARow, sqsInARow+1]
                        normalTests.forEach(difference => {
                            let result = 1
                            let currentIdToCheck = sqId + difference
                            let currentIdsChecked = [] // ez a nyerő kockák pirosításához kell
                            currentIdsChecked.push(sqId)
                            let stillGood = true
                            while(stillGood) {
                                if(sqState === this.gameList[currentIdToCheck].state) {
                                    result++
                                    currentIdsChecked.push(currentIdToCheck)
                                    if(this.checkDifference(this.gameList[currentIdToCheck].position, difference, sqsInARow)) {
                                        currentIdToCheck += difference
                                    } else {
                                        stillGood = false
                                    }
                                } else {
                                    stillGood = false
                                }
                            }
                            if(result>best) {
                                best = result
                                bestsIds = currentIdsChecked
                            }
                        })
                    break
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
                    default:
                        alert('Oops.. something went really wrong!')
                }

                if(best>totalBest.inARow) {
                    totalBest.kind = sqState
                    totalBest.inARow = best
                    totalBest.ids = bestsIds
                }
            })
            
            if(totalBest.inARow === 5) {
                totalBest.ids.forEach(id => {
                    this.gameList[id].ifWonThenClass = 'winningSquare'
                })
                if (totalBest.kind === 'x') {
                    alert('X won!')
                } else {
                    alert('O won!')
                }
                this.gameOver = true
            }
        },

        checkDifference(position, diff, sqsInARow) { //ez a method fixeli a szélső kockákat
            if(position === 'normal'){
                return true
            }
            switch(position){
                case 'left':
                    if(diff===-sqsInARow-1 || diff===-1 || diff===sqsInARow-1) {
                        return false
                    } else {
                        return true
                    }
                break
                case 'top':
                    if(diff===-sqsInARow-1 || diff===-sqsInARow || diff===-sqsInARow+1) {
                        return false
                    } else {
                        return true
                    }
                break
                case 'right':
                    if(diff===-sqsInARow+1 || diff===1 || diff===sqsInARow+1) {
                        return false
                    } else {
                        return true
                    }
                break
                case 'bottom':
                    if(diff===sqsInARow-1 || diff===sqsInARow || diff===sqsInARow+1) {
                        return false
                    } else {
                        return true
                    }
                break
                case 'tlc':
                    if(diff===sqsInARow || diff===1 || diff===sqsInARow+1) {
                        return true
                    } else {
                        return false
                    }
                break
                case 'trc':
                    if(diff===sqsInARow || diff===-1 || diff===sqsInARow-1) {
                        return true
                    } else {
                        return false
                    }
                break
                case 'blc':
                    if(diff===-sqsInARow || diff===1 || diff===-sqsInARow+1) {
                        return true
                    } else {
                        return false
                    }
                break
                case 'brc':
                    if(diff===-sqsInARow || diff===-1 || diff===-sqsInARow-1) {
                        return true
                    } else {
                        return false
                    }
                break
            }
        },

        resetGame() {
            this.gameList.forEach(item => {
                item.src = this.defaultSrc
                item.state = null
                item.ifWonThenClass = ''
            })
            this.xTurn = true
            this.gameOver = false
        },

        //ez a method a játék előkészítését végzi, csak egyszer az elején van használva
        changeNumOfSquares() {
            this.gameList = []
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

                this.gameList.push({id: id, state: null, position: sqPosition, src: this.defaultSrc, ifWonThenClass: '',})
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

        changeBoxSize(e) {
            this.numOfSquares = e.target.value
            console.log(this.numOfSquares)
            this.changeNumOfSquares()
        }
    }
})
