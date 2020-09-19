<template>
  <q-page class="window-height window-width row text-center justify-center">
    <div>
      <div class="row q-ml-lg q-mr-lg q-mt-md" style="padding-top:10rem">
        <div class="col">
          <p
            style="font-size:27px"
          >What are your favourite sports/recreational activities?</p>
        </div>
      </div>

      <div>
        <div class="row q-pl-xl">
          <div class="col-6">
            <q-option-group
              class="text-left"
              size="xl"
              v-model="interests"
              :options="options.slice(0,7)"
              color="primary"
              type="checkbox"
            />
          </div>
           <div class="col-6">
            <q-option-group
              class="text-left"
              size="xl"
              v-model="interests"
              :options="options.slice(7,13)"
              color="primary"
              type="checkbox"
            />
          </div>
        </div>
      </div>

      <div v-if="interests.length" class="absolute-bottom row" style="padding-bottom:5rem">
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
  name: "SelectInterestsOB",
  mounted(){
             
  },
  data: function () {
    return {
      interests: [],
      options: [
        {
          label: "Soccer",
          value: {sport:"Soccer"}
            },
        ,
        {
          label: "Basketball",
          value: {sport:'Basketball'},
        },
        {
          label: "Tennis",
          value: {sport:'Tennis'},
        },
        {
          label: "Badminton",
          value: {sport:'Badminton'},
        },
        {
          label: "Football",
          value: {sport:'Football'},
        },
        {
          label: "Baseball",
          value: {sport:'Baseball'},
        },
        {
          label: "Mountain Biking",
          value: {sport:'Mountain Biking'},
        },
        {
          label: "Yoga",
          value: {sport:'Yoga'},
        },
        {
          label: "Rock Climbing",
          value: {sport:'Rock Climbing'},
        },
        {
          label: "Volleyball",
          value:{sport:'Volleyball'},
        },
        {
          label: "Cricket",
          value: {sport:'Cricket'},
        },
        {
          label: "Cycling",
          value: {sport:'Cycling'},
        }
        
        
      ],
    };
  },
  computed:{
       ...mapGetters('userData',['userInterests'])
  },
  methods:{
       ...mapActions('navigationData',['nextOnBoardingPageActive']),
        ...mapActions('userData',['setUserInterests']),
       nextPage(){
           this.nextOnBoardingPageActive();
           this.setUserInterests(this.interests);
           console.log(this.interests+'check')
       }
  }
};
</script>
<style scoped>
h5 {
  color: rgb(169, 169, 169);
}
</style> 
 