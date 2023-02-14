const { createApp } = Vue;

createApp({
    data() {
        return {
            username: '',
            password: '',
            users: [],
            message: '',
            signIn: true,
            listUsers: false,
            female: false,
            male: false,
            count: '',
            viewUsers: [],
            alert: false

        }
    },
    methods: {

        async getUsers() {
            
           const response = await fetch('https://randomuser.me/api/?results=15')
                .then(resp => resp.json())
                .then(data => data );
            return response;

        },

        async getFlag(user) {
            const urlFlag = await fetch(`https://countryflagsapi.com/png/${user.nat}`)
                .then(response => response.blob())
                .then(flag => URL.createObjectURL(flag));

            user.countryFlag = urlFlag;

        },


        async searchAll() {

            this.allUsers = await this.getUsers();

            this.allUsers = this.allUsers.results;

            this.allUsers?.forEach(user => {
                if (this.users.length > 0) {
                    this.users.push({ photo: user.picture.large, name: user.name.first + ' ' + user.name.last, age: user.registered.age, nat: user.nat, countryFlag: '', email: user.email, phone: user.phone, cell: user.cell, gender: user.gender, username: user.login.username, password: user.login.password, status: true, login: false })
                } else {
                    this.users = [{ photo: user.picture.large, name: user.name.first + ' ' + user.name.last, age: user.registered.age, nat: user.nat, countryFlag: '', email: user.email, phone: user.phone, cell: user.cell, gender: user.gender, username: user.login.username, password: user.login.password, status: true, login: false }]
                }
            });

            this.users?.forEach(user => {
                this.getFlag(user);
            })

            console.log(this.users);
        },

        login() {

            if (this.username !== '' && this.password !== '') {

                this.users.forEach(user => {
                    if (user.username === this.username && user.password === this.password) {
                        user.status = false;
                        user.login = true;
                        this.username = '';
                        this.password = '';
                        this.alert = false;
                        this.signIn = false;
                        this.listUsers = true;

                        this.logueado();
                    }
                })

                if (this.signIn === true) {
                    this.message = 'Error en la contraseña o username';
                    this.alert = true;
                }

            } else {
                this.message = 'Todos los campos son obligatorios';
                this.alert = true;
            }

        },

        logueado() {
            this.viewUsers = this.users.filter(user => user.login == false)
        },

        logout() {
            this.signIn = true;
            this.listUsers = false;
            this.users.forEach(user => {
                user.login = false;
                user.status = true;
            })
            console.log(this.users);
            this.count = '';
            this.female = false;
            this.male = false;
        },

        filterGender() {

            if (this.male && !this.female) {
                this.users.forEach(user => {
                    if (user.gender == 'male') {
                        user.status = true;
                    } else {
                        user.status = false;
                    }
                })
            }
            else if (this.female && !this.male) {
                this.users.forEach(user => {
                    if (user.gender == 'female') {
                        user.status = true;
                    } else {
                        user.status = false;
                    }
                })
            }
            else if (this.male && this.female) {
                this.users.forEach(user => {
                    user.status = true;
                })
            }
            else {
                this.users.forEach(user => {
                    user.status = false;
                })
            }
            this.count = '';
            this.viewUsers = this.users.filter(user => user.status == true && user.login == false)
        },

        filterCount() {
            this.users.forEach(user => {
                user.status = false;
                for (let i = 0; i <= this.count; i++) {
                    if (user.username == this.viewUsers[i].username) {
                        user.status = true;
                    }
                }
            })

        },

        removeUser(index) {
            this.users.splice(index, 1);
            this.viewUsers = this.users.filter(user => user.status == true);
        },

        closeAlert() {
            this.alert = false;
        }




    },
    mounted() {
        this.searchAll();
    },
    created() {

    }
}).mount("#root");





