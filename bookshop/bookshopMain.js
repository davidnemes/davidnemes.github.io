const bookShop = Vue.createApp({
    data() {
        return {
            accounts: [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}],
            books: [
                {title: "Harry Potter and the Sorcerer's Stone", src: "./imgs/book-covers/harry-potter.jpg", id: "2001", price: 2200},
                {title: "The Lion, the Witch, and the Wardrobe", src: "./imgs/book-covers/narnia.jpg", id: "2002", price: 1990},
                {title: "Bible", src: "./imgs/book-covers/bible.jpg", id: "2003", price: 3500},
                {title: "Pinocchio", src: "./imgs/book-covers/pinocchio.jpg", id: "2004", price: 2490}
            ],
            cart: [],
            addedToCartClass: '',
            accCounter: null,
            currentBook: {title: "Title", src: "src", id: "id"}, // default properties
            //Conditional rendering booleans
            atSignIn: false,
            atRegister: false,
            atShop: true,
            accOpened: false,

            noBookSelected: true,
            bookSelected: false,
            atCart: false,
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
                    alert.innerText = "*Username and Password alread taken"
                }
                return
            }
            
            this.accounts.push({un: un, pw: pw})
            if(signIn) {
                this.atRegister = false
                this.atShop = true
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

        goToCart() {

        },
        openAccMenu() {
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
            this.cart.push(this.currentBook.id)
            this.addedToCartClass = 'addedToCart'
            setTimeout(() => {
                this.addedToCartClass = ''
            }, 750)
            alert.innerText = null
        },
        backToBooks() {
            this.bookSelected = false
            this.noBookSelected = true
        },
    },
})

// un = username ; pw = password

const getEl = id => { //shortening the process of getting elements
    return document.getElementById(id)
}