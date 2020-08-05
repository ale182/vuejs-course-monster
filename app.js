new Vue({
    el: '#app',
    data: {
        running: false,
        playerLife: 100,
        monsterLife: 100,
        logs: [],
    },
    computed: {
        hasResult() {
            return this.playerLife == 0 || this.monsterLife == 0
        }
    },
    methods: {
        startGame() {
            this.running = true
            this.playerLife = 100
            this.monsterLife = 100
        },
        attack(especial) {
            this.hurt('monsterLife', 5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.monsterLife > 0)
                this.hurt('playerLife', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        hurt(prop, min, max, especial, source, target, cls) {
            const plus = especial ? 5 : 0
            const hurt = this.getRandom(min + plus, max + plus)
            // esta usando o max para que o valor nao fique negativo
            // chega no maximo em 0
            this[prop] = Math.max(this[prop] - hurt, 0)
            this.registerLog(`${source} atingiu ${target} com ${hurt}`, cls)
        },
        healAndHurt() {
            this.heal(10, 15)
            this.hurt('playerLife', 7, 12, false)
        },
        heal(min, max) {
            const heal = this.getRandom(min, max)
            // usa o min, para nao passar de 100
            this.playerLife = Math.min(this.playerLife + heal, 100)
        },
        getRandom(min, max) {
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        registerLog(text, cls) {
            // unshift é pra colocar no começo do array
            this.logs.unshift({text, cls})
        }
    },
    watch: {
        hasResult(value) {
            if (value)
                this.running = false
        }
    }
})