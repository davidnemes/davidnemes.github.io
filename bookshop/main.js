const bookShop = Vue.createApp({
    data() {
        return {
            data: 'hey',
            signedOut: true,
            register: false
        }
    },
    methods: {
        logInHappened(e) {
            e.preventDefault()
            let un = getEl("usernameInput").value
            let pw = getEl("passwordInput").value
            let alert = getEl("signInAlert")
            if(!un || !pw) {
                alert.innerText = "*Please fill out both username and password!"
                return
            }
            let unFound = false
            let pwFound = false
            accounts.forEach(user => {
                if(un === user.un) {
                    unFound = true
                    if(pw === user.pw){
                        pwFound = true
                        this.signedOut = false
                    }
                }
            })
            if(!unFound) {
                console.log('it ran')
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
            let un = getEl("registerUsername").value
            let pw = getEl("registerPassword").value
            let pwAgain = getEl("registerPasswordRepeat").value
            let alert = getEl("registerAlert")
            let signIn = getEl("registerCheckbox").checked
            console.log(signIn)

            if(un.length < 4 || pw.length < 4) {
                alert.innerHTML = "*Please give at least a 4 letter long<br>username and password!"
                return
            }
            if(pw !== pwAgain) {
                alert.innerText = "*Passwords don't match"
                return
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
    },
})

// un = username ; pw = password

const getEl = id => { //shortening the process of getting elements
    return document.getElementById(id)
}
let accounts = [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}]