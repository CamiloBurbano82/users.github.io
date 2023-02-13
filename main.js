const { createApp } = Vue;

createApp({
    data() {
        return {

            urlUsers: 'https://randomuser.me/api/?results=8',
            urlFlags: 'https://countryflagsapi.com/png/',
            users: [],



        }
    },
    methods: {

        async getUsers() {
            await fetch(this.urlUsers)
                .then(response => response.json())
                .then(resp => this.users = resp)

          
            console.log(this.users)

        },

        async searchAll() {

            this.users = await this.getData(`${this.url}`)

        },




    },
    mounted() {

       this.getUsers();


    },
}).mount("#root");





