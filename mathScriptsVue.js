const mathApp = Vue.createApp({
    data() {
        return {
            test: 3,
            isInMenu: true,
            isGameOver: false,
            currentName: "Ano"
        }
    }
})

/*HTML-be:
Head: <script src="https://unpkg.com/vue@next"></script>
Body:
        <div v-if="isInMenu">
            <h1>Are you good in Math?</h1>
            <h3>Do this minigame to find out!</h3>
            <button id='startButton'>START</button>
            
        </div>

    <script src="./mathScriptsVue.js"></script>

    <script>
        const mountedMathApp = mathApp.mount('#main')
    </script>
*/