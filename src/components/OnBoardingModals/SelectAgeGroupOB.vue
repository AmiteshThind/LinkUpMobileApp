<template>
  <q-page class="window-height window-width row text-center justify-center">
    <div>
      <div class="row q-ml-lg q-mr-lg q-mt-md" style="padding-top:10rem">
        <div class="col">
          <p style="font-size:27px">Which age group do you fall under?</p>
        </div>
      </div>

      <div class="q-pa-md absolute-center">
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="ageGroup" val="Young Age Adult" label="Young Age Adult (18-35)" />
        </div>
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="ageGroup" val="Middle Age Adult" label="Middle Age Adult (36-55)" />
        </div>
        <div class="row q-py-md" style="font-size:18px">
          <q-radio size="lg" v-model="ageGroup" val="Old Age Adult" label="Old Age Adult (56+)" />
        </div>
      </div>

      <div v-if="ageGroup" class="absolute-bottom row" style="padding-bottom:5rem">
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
  name: "SelectAgeGroupOB",
  mounted(){
      this.ageGroup = this.userAgeGroup;
  },
  data: function () {
    return {
       
      ageGroup: "",
    };
  },
  methods:{
       ...mapActions('navigationData',['nextOnBoardingPageActive']),
          ...mapActions('userData',['setUserAgeGroup']),
          nextPage(){
              this.nextOnBoardingPageActive();
              this.setUserAgeGroup(this.ageGroup);
          }

  },
  computed:{
      ...mapGetters('userData',['userAgeGroup'])
  }
};
</script>
<style scoped>
h5 {
  color: rgb(169, 169, 169);
}
</style> 
 