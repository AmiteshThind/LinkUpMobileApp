<template>
  <q-page class="bg-secondary" padding>
    <div class="row text-center">
      <div class="col">
        <p style="color:#70B096;font-size:75px;padding-top:5rem">
          <b>SignUp</b>
        </p>
      </div>
    </div>
<form @submit.prevent="register">
    <div class="row q-mb-sm q-mt-lg justify-center">
      <div class="col-7">
        <q-input  :rules="[ val => val.length > 0 || 'Please Enter First Name']" ref='name' outlined v-model="formData.firstName"   label="First Name" />
      </div>
    </div>
    <div class="row q-mb-sm justify-center">
      <div class="col-7">
        <q-input  type="email"
            ref="email"
            :rules="[ val => isValidEmailAddress(val) || 'Please enter valid email address']"
            lazy-rules
            
            outlined v-model="formData.email" label="Email Address" />
      </div>
    </div>

    <div class="row q-mb-sm  justify-center">
      <div class="col-7">
        <q-input outlined v-model="formData.password"  :rules="[ val => val.length >= 6 || 'Please use minimum 6 characters']" lazy-rules ref="password" type="password" label="Password" />
      </div>
    </div>
</form>
    <div class="row text-center no-padding no-margin">
      <div class="col">
        <q-btn
          no-caps
          flat
          style="text-decoration:underline"
          text-color="blue-4"
          to="/"
        >Already have an account?Login</q-btn>
      </div>
    </div>

    <div class="row justify-center text-center q-mt-md">
      <div class="col-7">
        <q-btn
        @click="register"
        type="submit"
          color="secondary"
          no-caps
          text-color="grey-8"
          size="md"
          class="c"
          style="width: 14rem;font-size:15px"
        >
          <div class="ellipsis">Sign Up</div>
        </q-btn>
      </div>
    </div>

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
            />Sign Up With Google
          </div>
        </q-btn>
      </div>
    </div>
    <div class="row absolute-bottom">
      <q-img src="../assets/pic2.png" />
    </div>
  </q-page>
</template>

<script>
import {mapActions} from 'vuex';
export default {
    data(){
        return{
            formData:{
                email:'',
                password:'',
                firstName:''
            }
        }
    },
   methods: {
    ...mapActions("authData", ["registerUser"]),
      ...mapActions("userData", ["setUserNameAndEmail"]),
    register() {
      this.$refs.email.validate();
       this.$refs.name.validate();
      this.$refs.password.validate();
      if (this.formData.firstName && !this.$refs.password.hasError && !this.$refs.email.hasError) {
        this.registerUser(this.formData);
        this.setUserNameAndEmail(this.formData);
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