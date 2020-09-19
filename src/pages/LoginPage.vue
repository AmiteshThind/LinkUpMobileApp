<template>
  <q-page class="bg-secondary" padding>
    <div class="row text-center">
      <div class="col">
        <p style="color:#70B096;font-size:75px;padding-top:5rem">
          <b>LinkUp</b>
        </p>
      </div>
    </div>
    <form @submit.prevent="login">
      <div class="row q-mb-sm  justify-center">
        <div class="col-7">
          <q-input
            type="email"
            ref="email"
            :rules="[ val => isValidEmailAddress(val) || 'Please enter valid email address']"
            lazy-rules
           
            outlined
            v-model="signInFormData.email"
            label="Email Address"
          />
        </div>
      </div>

      <div class="row q-mb-sm justify-center">
        <div class="col-7">
          <q-input
            outlined
            :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']"
            lazy-rules
            v-model="signInFormData.password"
            label="Password"
            type="password"
            ref="password"
          />
        </div>
      </div>

      <div class="row text-center no-padding no-margin">
        <div class="col">
          <q-btn
            no-caps
            flat
            to="/SignUp"
            style="text-decoration:underline;"
            text-color="blue-4"
          >Don't' have an account? Register</q-btn>
        </div>
      </div>

      <div class="row justify-center text-center q-mt-md">
        <div class="col-7">
          <q-btn
          @click="login"
          type="submit"
            color="secondary"
            no-caps
            text-color="grey-8"
            size="md"
            class="c"
            style="width: 14rem;font-size:15px"
          >
            <div class="ellipsis">Login</div>
          </q-btn>
        </div>
      </div>
    </form>
    <div class="row justify-center text-center q-mt-md">
      <div class="col-3 q-mt-sm">
        <q-separator />
      </div>
      <div class="col-1">OR</div>
      <div class="col-3 q-mt-sm">
        <q-separator />
      </div>
    </div>

    <div class="row justify-center text-center q-mt-md">
      <div class="col-7">
        <q-btn
          color="secondary"
          no-caps
          text-color="grey-8"
          size="md"
          class="c"
          style="width: 14rem;font-size:15px"
        >
          <div class="ellipsis">
            <q-img
              class="q-ma-sm absolute-left"
              src="../assets/googleIcon.png"
              style="height:25px; max-width: 25px"
            />Sign In With Google
          </div>
        </q-btn>
      </div>
    </div>
    <div class="row absolute-bottom">
      <q-img src="../assets/pic.png" />
    </div>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  data() {
    return {
      signInFormData: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions("authData", ["loginUser"]),
    login() {
      this.$refs.email.validate();
      this.$refs.password.validate();
      if (!this.$refs.password.hasError && !this.$refs.email.hasError) {
        this.loginUser(this.signInFormData);
      }
    },
    isValidEmailAddress(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
</script>

<style>
a {
  color: #7ea7ee;
}

.c {
  border-radius: 0.3rem;
}
</style>