const bookShop = Vue.createApp({
    data() {
        return {
            accounts: [{un: 'bigreader01', pw: 'reader', cart: []}, {un: "jonas74", pw: "jonas", cart: []}, {un: "admin", pw: "admin"}],
            books: [
                {title: "Harry Potter and the Sorcerer's Stone", src: "./imgs/book-covers/harry-potter.jpg", id: "2001", price: 2200, inStock: 100},
                {title: "The Lion, the Witch, and the Wardrobe", src: "./imgs/book-covers/narnia.jpg", id: "2002", price: 1990, inStock: 20},
                {title: "Bible", src: "./imgs/book-covers/bible.jpg", id: "2003", price: 3500, inStock: 30},
                {title: "Pinocchio", src: "./imgs/book-covers/pinocchio.jpg", id: "2004", price: 2490, inStock: 0},
            ],
            cart: [],
            addedToCartClass: null,
            accCounter: null,
            currentBook: {},
            currentAccount: {un: "defUsername", pw:"defPw", cart: []},
            admin: false,
            //Conditional rendering booleans
            atSignIn: true,
            atRegister: false,
            atShop: false,

            noBookSelected: true,
            bookSelected: false,
            seeCart: false,

            accOpened: false,
        }
    },
    methods: {

        //LOGIN & REGISTER

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
                        if(un === "admin") {
                            this.admin = true
                        }
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
            
            let newAcc = {un: un, pw: pw, cart: []}
            this.accounts.push(newAcc)
            if(signIn) {
                this.atRegister = false //many many rendering conditional
                this.atShop = true
                this.noBookSelected = true,
                this.bookSelected = false,
                this.seeCart = false,
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

        //SHOP MAIN

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
            this.admin = false
        },
        showBookClicked(e) {
            let bookId = e.target.parentElement.id
            this.noBookSelected = false
            this.bookSelected = true
            this.books.forEach(book => {
                if(bookId === book.id) {
                    this.currentBook = book
                }
            })
        },

        //CART

        addToCart() {
            if(this.admin) {
                console.log("Please don't use this button while on admin");
                return
            }
            let bookNum = parseInt(getEl("bookNumInput").value)
            let alert = getEl('addToCartAlert')
            //check validation
            if(!bookNum || bookNum < 1 || bookNum > 15) {
                alert.innerText = "*Invalid Book Quantity"
                return
            }
            //check if there's enough book
            if(this.currentBook.inStock < bookNum) {
                alert.innerText = "*There's not enough book in Stock"
                return
            }

            let price = bookNum * this.currentBook.price
            //check if the book is already added to the cart
            let itsThere = false
            this.currentAccount.cart.forEach(book => {
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
                this.currentAccount.cart.push(
                    {title: this.currentBook.title, 
                     price: price, 
                     quantity: bookNum === 1 ? null : bookNum, //null means the user ordered only 1 book ; it's more useful at the rendering of the cart
                     id: this.currentBook.id}
                ) 
            }
            //take the books from Stock
            this.books.forEach(book => {
                if(this.currentBook.id === book.id) {
                    book.inStock -= bookNum
                }
            })

            this.addedToCartClass = 'addedToCart'
            setTimeout(() => {
                this.addedToCartClass = null
            }, 750)
            alert.innerText = null

            this.saveAccountCart()
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

            //here i put back the removed book-quantity to Stock
            let quantity
            this.currentAccount.cart.forEach(book => {
                if(book.id === id) {
                    quantity = !book.quantity ? 1 : book.quantity
                }
            })
            this.books.forEach(book => {
                if(book.id === id) {
                    book.inStock += quantity
                }
            })

            let newCart
            if(this.currentAccount.cart.length === 1) {
                newCart = []
            } else {
                newCart = this.currentAccount.cart.filter(book => book.id !== id)
            }
            this.currentAccount.cart = newCart
            this.saveAccountCart()
        },
        saveAccountCart() { //this method syncronizes the real accounts with currentAcc
            this.accounts.forEach(account => {
                if(account.un === this.currentAccount.un) {
                    account.cart = this.currentAccount.cart
                }
            })
        },

        //CREATE, UPDATE, DELETE - ADMIN

        createNewBook() {
            const title = getEl("newBookTitle").value
            const price = parseInt(getEl("newBookPrice").value)
            const inStock = parseInt(getEl("newBookInStock").value)
            if(!title || !price || !inStock) {
                alert("Please fill out everything correctly!")
                return
            }
            //here i look at the id of the last book, then i add one to it
            let lastid = parseInt(this.books[this.books.length -1].id)
            const id = (lastid +1).toString()

            const newBook = {
                title: title, 
                src: "",
                id: id,
                price: price,
                inStock: inStock
            }
            this.books.push(newBook)

            getEl("newBookTitle").value = ''
            getEl("newBookPrice").value = ''
            getEl("newBookInStock").value = 10
        },
        updateBook() {
            const title = getEl("updateTitle").value
            const price = parseInt(getEl("updatePrice").value)
            const inStock = parseInt(getEl("updateInStock").value)

            if(!title || !price) {
                alert("Please fill out everything correctly!")
                return
            }
            this.currentBook.title = title
            this.currentBook.price = price
            this.currentBook.inStock = inStock
        },
        deleteBook(e) {
            let conf = confirm("Please Confirm to Delete")
            if(!conf) {
                return
            }
            const bookId = e.target.parentElement.id
            const bookIndex = this.books.findIndex(book => book.id === bookId)
            this.books.splice(bookIndex, 1)
        }
    },

    computed: {
        totalPrice() {
            let total = 0
            this.currentAccount.cart.forEach(book => {
                total += book.price
            })
            return total
        },
        cartIsEmpty() {
            return this.currentAccount.cart.length ? false : true
        },
        inStock() {
            return this.currentBook.inStock
        }
    },
})

// un = username ; pw = password

const getEl = id => { //shortening the process of getting elements
    return document.getElementById(id)
}