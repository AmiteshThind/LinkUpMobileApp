<template>
  <q-page class="window-height window-width row text-center justify-center">
    <div>
      <div class="row q-ml-lg q-mr-lg q-mt-md" style="padding-top:10rem">
        <div class="col">
          <p style="font-size:27px">What is your current gender identity?</p>
        </div>
      </div>

      <div class="q-pa-md absolute-center">
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="gender" val="male" label="Male" />
        </div>
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="gender" val="female" label="Female" />
        </div>
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="gender" val="others" label="Others" />
        </div>
      </div>

      <div v-if="gender" class="absolute-bottom row" style="padding-bottom:5rem">
        <div class="col">
          <q-btn flat style="color: #70B096" size="lg" @click="nextPage" label="TAP TO CONTINUE" />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {mapActions,mapGetters} from 'vuex';
export default {
  name: "SelectGenderOB",
  mounted(){
      this.gender = this.userGender;
  },
  data: function () {
    return { 
      gender: "",
    };
  },
  methods:{
       ...mapActions('navigationData',['nextOnBoardingPageActive']),
       ...mapActions('userData',['setUserGender']),
       nextPage(){
           this.nextOnBoardingPageActive();
           this.setUserGender(this.gender);
       }
  },
  computed:{
      ...mapGetters('userData',['userGender'])
  }
};
</script>
<style scoped>
h5 {
  color: rgb(169, 169, 169);
}
</style> 
 