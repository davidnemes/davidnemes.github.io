const bookShop = Vue.createApp({
    data() {
        return {
            accounts: [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}],
            books: [
                {title: "Harry Potter and the Sorcerer's Stone", src: "./imgs/book-covers/harry-potter.jpg", id: "2001", price: 2200},
                {title: "The Lion, the Witch, and the Wardrobe", src: "./imgs/book-covers/narnia.jpg", id: "2002", price: 1990},
                {title: "Bible", src: "./imgs/book-covers/bible.jpg", id: "2003", price: 3500},
                {title: "Pinocchio", src: "./imgs/book-covers/pinocchio.jpg", id: "2004", price: 2490},
            ],
            cart: [],
            addedToCartClass: null,
            accCounter: null,
            currentBook: {},
            currentAccount: {un: "defUsername", pw:"defPw"},
            //Conditional rendering booleans
            atSignIn: false,
            atRegister: false,
            atShop: true,

            noBookSelected: true,
            bookSelected: false,
            seeCart: false,

            accOpened: false,
            cartIsEmpty: true,
        }
    },
    methods: {
        logInHappened() {
            let un = getEl("usernameInput").value
            let pw = getEl("passwordInput").value
            let alert = getEl("signInAlert")
            //check validation
            if(!un || !pw) {
                alert.innerText = "*Please fill out both username and password!"
                return
            }
            //search for the account
            let unFound = false
            let pwFound = false
            this.accounts.forEach(user => {
                if(un === user.un) {
                    unFound = true
                    if(pw === user.pw){
                        pwFound = true
                        this.atSignIn = false
                        this.atShop = true
                        this.currentAccount = user
                    }
                }
            })
            //drop back if datas didn't match
            if(!unFound) {
                alert.innerText = "*Mistyped username"
                return
            } else if (!pwFound) {
                alert.innerText = "*Mistyped password"
                return
            }
            //if everything is good, alert should be empty
            alert.innerText = null
        },
        registerClicked() { //this is the link to the registration form
            this.atRegister = true
            this.atSignIn = false
        },
        registerHappened() {
            //get datas
            let un = getEl("registerUsername").value
            let pw = getEl("registerPassword").value
            let pwAgain = getEl("registerPasswordRepeat").value
            let alert = getEl("registerAlert")
            let signIn = getEl("registerCheckbox").checked
            //check validation
            if(un.length < 4 || pw.length < 4) {
                alert.innerHTML = "*Please give at least a 4 letter long<br>username and password!"
                return
            }
            if(pw !== pwAgain) {
                alert.innerText = "*Passwords don't match"
                return
            }
            //check if datas are already reserved
            let result = ''
            this.accounts.forEach(user => {
                if(user.un === un) {
                    result += 'un'
                }
                if(user.pw === pw) {
                    result += 'pw'
                }
            })
            if(result) {
                if(result === 'un') {
                    alert.innerText = "*Username already taken"
                } else if(result === 'pw') {
                    alert.innerText = "*Password already taken"
                } else {
                    alert.innerText = "*Username and Password already taken"
                }
                return
            }
            
            let newAcc = {un: un, pw: pw}
            this.accounts.push(newAcc)
            if(signIn) {
                this.atRegister = false
                this.atShop = true
                this.currentAccount = newAcc
            } else {
                this.atRegister = false
                this.atSignIn = true
            }
            alert.innerHTML = null
        },
        showPw(id) {
            let input = getEl(id)
            if(input.type === "password") {
                input.type = 'text'
            } else {
                input.type = 'password'
            }
        },
        backToSignIn() {
            this.atRegister = false
            this.atSignIn = true
        },

        accMenuClicked() {
            if(this.accOpened) {
                this.accOpened = false
                clearTimeout(this.accCounter)
                return
            } else {
               this.accOpened = true
            }
            this.accCounter = setTimeout(() => {
                this.accOpened = false
            }, 3000)
        },
        longerCounting() { //this method makes sure that the Acc Menu wont dissappear too early
            clearTimeout(this.accCounter)
            this.accCounter = setTimeout(() => {
                this.accOpened = false
            }, 5000)
        },
        logOut() {
            this.atShop = false
            this.atSignIn = true
            this.accOpened = false
        },

        showBookClicked(e) {
            let bookId = e.target.id
            this.noBookSelected = false
            this.bookSelected = true
            this.books.forEach(book => {
                if(bookId === book.id) {
                    this.currentBook = book
                }
            })
        },
        addToCart() {
            let bookNumStr = getEl("bookNumInput").value
            let bookNum = parseInt(bookNumStr)
            let alert = getEl('addToCartAlert')
            //check validation
            if(!bookNum || bookNum < 1 || bookNum > 15) {
                alert.innerText = "*Invalid Book Quantity"
                return
            }

            this.cartIsEmpty = false
            let price = bookNum * this.currentBook.price
            //check if the book is already added to the cart
            let itsThere = false
            this.cart.forEach(book => {
                if(book.title === this.currentBook.title) {
                    itsThere = true
                    if(!book.quantity) {
                        book.quantity = bookNum + 1
                    } else {
                        book.quantity += bookNum
                    }
                    
                    book.price += price
                }
            })

            if(!itsThere) {
                if(bookNum === 1) {
                    this.cart.push({title: this.currentBook.title, price: price, quantity: null, id: this.currentBook.id}) //null means the user ordered only 1 book ; it's more useful at the rendering of the cart
                } else {
                    this.cart.push({title: this.currentBook.title, price: price, quantity: bookNum, id: this.currentBook.id})
                }
            }
            //this
            this.addedToCartClass = 'addedToCart'
            setTimeout(() => {
                this.addedToCartClass = null
            }, 750)
            alert.innerText = null
        },
        backToBooks() {
            this.bookSelected = false
            this.seeCart = false
            this.noBookSelected = true
        },
        toCart() {
            this.bookSelected = false
            this.noBookSelected = false
            this.seeCart = true
        },
        removeBookFromCart(e) {
            let id = e.target.id
            let newCart
            if(this.cart.length === 1) {
                newCart = []
                this.cartIsEmpty = true
            } else {
                newCart = this.cart.filter(book => book.id === id)
            }
            this.cart = newCart
        }
    },
    computed: {
        totalPrice() {
            let prices = []
            this.cart.forEach(book => {
                let price = book.price
                prices.push(price)
            })
            return prices.reduce((acc, current) => acc + current)
        }
    },
})

// un = username ; pw = password

const getEl = id => { //shortening the process of getting elements
    return document.getElementById(id)
}