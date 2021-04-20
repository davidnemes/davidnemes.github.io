const bookShop = Vue.createApp({
    data() {
        return {
            data: 'hey'
        }
    },
    methods: {
        logInHappened(e) {
            e.preventDefault()
            let un = document.getElementById("usernameInput").value
            let pw = document.getElementById("passwordInput").value
        },
    },
})

// un = username ; pw = password
let accounts = [{un: 'bigreader01', pw: 'povHey9'}, {un: "jonas74", pw: "aks5We"}, {un: "phil_13", pw: "7ebnu8"}]