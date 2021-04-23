const bookShop = Vue.createApp({
    data() {
        return {
            accounts: [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}],
            signedOut: true,
            register: false,
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
                        this.signedOut = false
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
            this.register = true
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
                this.register = false
                this.signedOut = false
            } else {
                this.register = false
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
            this.register = false
        }
    },
})

// un = username ; pw = password

const getEl = id => { //shortening the process of getting elements
    return document.getElementById(id)
}