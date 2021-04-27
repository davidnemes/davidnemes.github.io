bookShop.component('sign-in', {
    props: {
        atsignin: {type: Boolean, required: true},

    },
    data() {
        return {}
    },
    template:
    /*html*/
    `<div id="signIn" v-if="atsignin">
        <h1>Welcome to our Bookshop!</h1>
        <h3>Sign up or Log in</h3>
        <div>
            <label for="usernameInput">Username:</label><br>
            <input type="text" id="usernameInput" class="textInput"><br>
            <label for="passwordInput">Password:</label><br>
            <input type="password" class="textInput" id="passwordInput" maxlength="15"><button @click="showPw('passwordInput')" class="showTextButton"><img src="./imgs/lock-icon.jpg" alt="lock" style="width: 15px"></button><br>
            <button class="submitButton" @click="logInHappened">Log in</button>
        </div>
        <p class="alert" id="signInAlert"></p>
        <p id="registerLink" @click="registerClicked">Haven't you registrated yet?<br>Do it here</p>
    </div>`,
    methods: {
        showPw(id) {
            this.$emit(`show-pw`, id)
        },
        logInHappened() {
            this.$emit('log-in')
        },
        registerClicked() {
            this.$emit('register')
        }
    }
})