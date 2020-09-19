<template>
  <div>
     
    <div v-if="onBoardingPageActive==0">
        
      <first-page-o-b />
    </div>
    <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
      <div v-if="onBoardingPageActive==1">
        <get-location-o-b />
      </div>
    </transition>
     <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
    <div v-if="onBoardingPageActive==2">
      <select-gender-o-b />
    </div>
     </transition>
      <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
    <div v-if="onBoardingPageActive==3">
      <select-age-group-o-b />
    </div>
      </transition>
       <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
    <div v-if="onBoardingPageActive==4">
      <select-interests-o-b />
    </div>
       </transition>
        <transition
      appear
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutLeft"
    >
    <div v-if="onBoardingPageActive==5">
      <select-skill-level-o-b />
    </div>
        </transition>
  </div>
</template>

<script>
import FirstPageOB from "components/OnBoardingModals/FirstPageOB";
import GetLocationOB from "components/OnBoardingModals/GetLocationOB";
import SelectGenderOB from "components/OnBoardingModals/SelectGenderOB";
import SelectAgeGroupOB from "components/OnBoardingModals/SelectAgeGroupOB";
import SelectInterestsOB from "components/OnBoardingModals/SelectInterestsOB";
import SelectSkillLevelOB from "components/OnBoardingModals/SelectSkillLevelOB";
import { mapGetters,mapActions } from "vuex";

export default {
  name: "OnBoardingPage",
  data: () => {
    return {};
  },
  components: {
    firstPageOB: FirstPageOB,
    getLocationOB: GetLocationOB,
    selectGenderOB: SelectGenderOB,
    selectAgeGroupOB: SelectAgeGroupOB,
    selectInterestsOB: SelectInterestsOB,
    selectSkillLevelOB: SelectSkillLevelOB,
  },
  computed: {
    ...mapGetters("navigationData", ["onBoardingPageActive"]),
    
    
  },
  methods:{
    
      ...mapActions('authData',['logoutUser'])
  }
};
</script>
<style scoped>
</style> 
 