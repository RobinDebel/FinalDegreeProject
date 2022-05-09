<template>
         <v-container fluid fill-height>
            <v-layout  justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                     <v-toolbar dark color="black">
                        <v-toolbar-title>
                            <v-row>
                                <v-col cols="4">
                                    <v-btn @click="screen = 'Login'"  dark color="black">Login</v-btn>
                                </v-col>

                                <v-col cols="4">
                                    <v-btn @click="screen = 'Register'"  dark color="black">Register</v-btn>

                                </v-col>
                            </v-row>
                        </v-toolbar-title>
                     </v-toolbar>

                     <div>
                        <v-card-text>
                            <v-form>
                            <v-text-field
                                v-on:keyup.enter="LoginRegister()"
                                prepend-icon="mdi-email"
                                name="Email"
                                label="Email"
                                type="text"
                                v-model="email"

                            ></v-text-field>
                            <v-text-field
                                v-if="screen == 'Register'"
                                prepend-icon="mdi-account-circle"
                                name="Username"
                                label="Username"
                                type="text"
                                v-model="username"

                            ></v-text-field>
                            <v-text-field
                                v-on:keyup.enter="LoginRegister()"
                                id="password"
                                prepend-icon="mdi-lock"
                                name="password"
                                label="Password"
                                type="password"
                                v-model="password"
                            ></v-text-field>
                            </v-form>
                        </v-card-text>

                    <v-alert
                    class="ma-3"
                    v-if="notgood"
                    shaped
                    prominent
                    type="warning"
                    >
                    {{notgoodtext}}
                    </v-alert>
                     </div>
                    
                     <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn @click="LoginRegister" dark color="black" >{{screen}}</v-btn>
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
</template>

<script>
export default {
    name: "LoginOrRegister",
    data(){
        return {
            screen: "Login",
            email: "",
            username: "",
            password: "",
            notgood: false,
            notgoodtext: ""
        }
    },
    methods: {
        LoginRegister(){
            this.notgood = false

            if(this.screen == "Login"){
                
                if(this.email == "" || this.password == "" )
                {
                    this.notgood = true
                    this.notgoodtext = "Please fill in everything"
                }

                if(!this.notgood){
                    const json = {
                    email: this.email,
                    password: this.password
                    }

                    this.$store.dispatch("login", json)
                    .then((res) =>{
                        
                        if(res == undefined){
                            this.notgood = true
                            this.notgoodtext = "Credentials not ok"
                        }
                        if(res && res.status == 200){
                            this.$router.push({name: 'Home'})
                        }
                    })
                }

                

            }
            if(this.screen == "Register"){

                if(this.email == "" || this.username == "" || this.password == "")
                {
                    this.notgood = true
                    this.notgoodtext = "Please fill in everything"
                }

                if(!this.notgood){
                    const json = {
                    email: this.email,
                    username: this.username,
                    password: this.password
                    }
                    

                    this.$store.dispatch("register", json)
                    .then((res)=>{
                        if(res.status == 200){
                            this.password = ""
                            this.screen = "Login"
                        }
                    }) 
                }
                

            }
        }
    },
    beforeCreate() {

        this.$store.dispatch('askSecure')
        .then((res)=> {
            if (res.data.secure){
                this.$router.push({name: 'Home'})
            }
        })
    }
    
}
</script>

