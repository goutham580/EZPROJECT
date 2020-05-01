<template>
  <v-container
    id="login"
    class="fill-height justify-center"
    tag="section"
  >
    <v-row justify="center">
      <v-slide-y-transition appear>
        <base-material-card
          color="success"
          light
          max-width="100%"
          width="400"
          class="px-5 py-3"
        >
          <template v-slot:heading>
            <div class="text-center">
              <h1 class="display-2 font-weight-bold mb-2">
                Login
              </h1>
              <!--
              <v-btn
                v-for="(social, i) in socials"
                :key="i"
                :href="social.href"
                class="ma-1"
                icon
                rel="noopener"
                target="_blank"
              >
                <v-icon
                  v-text="social.icon"
                />
              </v-btn>-->
            </div>
          </template>

          <v-card-text class="text-center">
            <!--<div class="text-center grey--text body-1 font-weight-light">
              Or Be Classical
            </div>-->

            <form>
            <v-text-field
              v-model="form.username"
              :error-messages="userNameErrors"
              @blur="$v.form.username.$touch()"
              color="secondary"
              label="Email..."
              prepend-icon="mdi-email"
            />

            <v-text-field
              v-model="form.password"
              :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPwd ? 'text' : 'password'"
              :error-messages="pwdErrors"
              @blur="$v.form.password.$touch()"
              class="mb-8"
              color="secondary"
              label="Password..."
              prepend-icon="mdi-lock-outline"
              @click:append="showPwd = !showPwd"
            />

            <pages-btn
              large
              color=""
              depressed
              class="v-btn--text success--text"
              @click.prevent="login"
            >
              LOGIN
            </pages-btn>
            </form>
          </v-card-text>
        </base-material-card>
      </v-slide-y-transition>
    </v-row>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, email } from 'vuelidate/lib/validators'
  export default {
    name: 'PagesLogin',
    mixins: [validationMixin],
    components: {
      PagesBtn: () => import('./components/Btn'),
    },
    data () {
      return {
        showPwd: false,
        form: {
          username: null,
          password: null,
        }
      }
    },
    validations: {
      form: {
        username: {
          required,
          email,
        },
        password: {
          required,
        }
      } 
    },
    computed: {
      userNameErrors () {
        const errors = []
        if (!this.$v.form.username.$dirty) return errors
        !this.$v.form.username && errors.push('Must be valid e-mail')
        !this.$v.form.username.required && errors.push('E-mail is required')
        return errors
      },
      pwdErrors () {
        const errors = []
        if (!this.$v.form.password.$dirty) return errors
        !this.$v.form.password.required && errors.push('Password is required')
        return errors
      },
      isFormInvalid () {
        return this.$v.form.$invalid
      }
    },
    methods: {
      login () {
        this.$v.form.$touch()
        this.$store.dispatch('auth/loginWithEmailAndPassword', this.form)
          .then(() => this.$router.push('/main/dashboard'))
          .catch((err) => {
            const error = err.response.data.errors.message
            this.$toasted.error(error, {duration: 5000})
          })
      }
    }
  }
</script>
