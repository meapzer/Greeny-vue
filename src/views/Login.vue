<template>
  <v-container fluid class="limit-width vld-parent" data-aos="fade-up">
    <v-card class="card">
        <v-form v-model="valid">
            <v-layout column class="center">

              <h1>Login</h1>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex
                xs12
                md4
              >
                <v-text-field
                  type="password"
                  v-model="password"
                  :rules="passwordRules"
                  label="Password"
                  required
                ></v-text-field>

              </v-flex>

              <v-flex xs12 md4>
                <v-btn @click="submit" :loading="loginLoading">Login</v-btn>
              </v-flex>

              
              <v-flex class="margin" xs12 md4 v-if="error.length > 0">
                <span class="error">{{ error }}</span>
              </v-flex>
            </v-layout>
        </v-form>
    </v-card>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue'
  import router from '../router'

  export default Vue.extend({
    name: 'Login',

    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        (v: string) => !!v || 'E-mail is required',
        (v: string) => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      password: '',
      passwordRules: [
        (v: string) => !!v || 'Password is required',
      ],
      error: '',
      loginLoading: false,
      

    }),
    computed: {
      isLoggedIn() {        
        return this.$store.getters.isLoggedIn
      }
    },

    methods: {
      submit() {  
        this.loginLoading = true
        
        const user = {
          email: this.email,
          password: this.password,
        }

        this.$store.dispatch('login', user)
          .then(() => {
            if(this.isLoggedIn) {
              router.push({name: "Dashboard"})
            } else {
              this.error = "Wrong credentials"
            }
          })
          .catch(() => {
            this.error = "Wrong credentials"
          })
          .finally(() => {
            this.loginLoading = false
          })
        
        
      }
    },

  })
</script>

<style scoped>

.limit-width {
  max-width: 960px;
}

.card {
  padding: 12px;
  
}

.center {
  text-align: center;
}

.error {
  color: white;
  border-radius: 3px;
  padding: 5px;
}

.margin {
  margin: 20px 0;
}

</style>