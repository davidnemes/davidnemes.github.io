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
            let un = document.getElementById("usernameInput").value
            let pw = document.getElementById("passwordInput").value
            let alert = document.getElementById("signInAlert")
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
        registerClicked() {
            this.register = true
        },
        showPw(id) {
            let input = document.getElementById(id)
            if(input.type === "password") {
                input.type = 'text'
            } else {
                input.type = 'password'
            }
        }
    },
})

// un = username ; pw = password
let accounts = [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}]