<template>
  <q-page class="window-height window-width row text-center justify-center">
    <div>
      <div class="row q-ml-lg q-mr-lg q-mt-md" style="padding-top:10rem">
        <div class="col">
          <p
            color="primary"
            style="font-size:27px"
          >What is your skill level for the selected sports/recreational activities?</p>
        </div>
      </div>
   <q-scroll-area  style="width: 100%; height: 450px;" >
      <div class="q-mb-sm" v-for="(interest,index) in interests" :key="index">
        <div class="row q-mx-xl q-mt-lg">
          <p class="sports-title" style="font-size:18px">
            <b>{{interest.sport}}</b>
          </p>
        </div>
        <div class="row">
          <div class="col">
            <div>
              <q-btn-toggle
                v-model="skills[index]"
                toggle-color="primary"
                :options="[
                   {label: 'Beginner', value: 'beginner'},
                    {label: 'Intermediate', value: 'intermediate'},
                    {label: 'Advanced', value: 'advanced'}
                ]"
              />
            </div>
          </div>
        </div>
      </div>
   </q-scroll-area>

      <div
        v-if="skills.length == interests.length"
        class="absolute-bottom row"
        style="padding-bottom:5rem"
      >
        <div class="col">
          <q-btn
            flat
            style="color: #70B096"
            size="lg"
            label="TAP TO CONTINUE"
            @click="onBoardingComplete"
            to="/home"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "SelectSkillLevelOB",
  mounted() {
    this.interests = this.userInterests;
    console.log(this.interests)
  },
  data: function () {
    return {
      skills: [],

      interests: [],
    };
  },
  methods: {
    ...mapActions("navigationData", ["resetOnBoardingPageToStart"]),
    ...mapActions("userData", [
      "setOnBoardingToComplete",
      "setSkillLevelForInterests",
    ]),
    onBoardingComplete: function () {
      this.setOnBoardingToComplete();
      this.resetOnBoardingPageToStart();
      this.setSkillLevelForInterests(this.skills);
    },
  },
  computed: {
    ...mapGetters("userData", ["userInterests"]),
  },
};
</script>
<style scoped>
h5 {
  color: rgb(169, 169, 169);
}
.sports-title {
  color: #70b096;
}
</style> 
 