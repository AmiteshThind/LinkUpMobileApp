<template>
  <q-page class="window-height window-width row text-center justify-center">
    <div>
      <div class="row q-ml-lg q-mr-lg q-mt-md" style="padding-top:10rem">
        <div class="col">
          <p style="font-size:27px">Where are you located?</p>
        </div>
      </div>

      <div v-if="!location.city">
        <div class="row q-ma-lg " style="padding-top:5rem">
          <div class="col">
            <q-input placeholder="Search" class="b" elevated v-model="model">
              <template v-slot:prepend>
                <q-icon name="location_on" color="primary" />
              </template>
              <template v-slot:append>
                <q-btn @click="getLocation" round dense flat icon="search" />
              </template>
            </q-input>
          </div>
        </div>

        <div class="row q-mt-lg">
          <div class="col">
            <h5>OR</h5>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <q-btn
            @click="getLocation"
              color="primary"
              icon="gps_fixed"
              flat
              style="border-radius:1rem"
              size="24px"
              label=" FIND MY LOCATION"
            />
          </div>
        </div>
      </div>

      <div
        v-else
        class=" justify-center items-center row "
        style="padding-top:10rem"
      >
        <div class="col">
          <h5>{{this.location.city}}, {{this.location.state}}</h5>
        </div>
        <div class="absolute-bottom row " style="padding-bottom:5rem">
          <div class="col">
            <q-btn
              flat
              style="color: #70B096"
              @click="nextOnBoardingPageActive"
              size="lg"
              label="TAP TO CONTINUE"
            />
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "GetLocationOB",
  mounted(){
      Object.assign(this.location,this.userLocation)
      
  },
  data: function() {
    return {
        model:'',
      location: {
          city:'',
          state:'',
          lat:null,
          long:null,
          suburb:''
      },
      apiKey:'78c298a5b92147e094a67c9115a62e98',
      apiUrl:'https://api.opencagedata.com/geocode/v1/json'
       
    };
  },
  methods: {
    ...mapActions("navigationData", ["nextOnBoardingPageActive"]),
    ...mapActions("userData", ["setUserLocation"]),
    getLocation(){
        navigator.geolocation.getCurrentPosition(position=>{
            this.location.lat = position.coords.latitude;
            this.location.long = position.coords.longitude;
            this.getLocationByCoords();
        })
    },
    getLocationByCoords(){
        let request = new XMLHttpRequest();
        request.open('GET',this.apiUrl+'?'+'key='+this.apiKey+'&q='+encodeURIComponent(this.location.lat+','+this.location.long)+'&pretty=1'+'&no_annotations=1',true)
            request.onload = ()=> {
            

                if (request.status == 200){ 
                // Success!
                var data = JSON.parse(request.responseText);
                //alert(data.results[0].components.city+"WPWPWPWPW");
                console.log(data)
                this.location.city = data.results[0].components.city;
                this.location.state = data.results[0].components.state;
                this.location.suburb = data.results[0].components.suburb;

                this.setUserLocation(this.location);


                } else if (request.status <= 500){ 
                // We reached our target server, but it returned an error
                                    
                console.log("unable to geocode! Response code: " + request.status);
                var data = JSON.parse(request.responseText);
                console.log(data.status.message);
                } else {
                console.log("server error");
                }
        };

        request.send()
    }
  },
  computed:{
      ...mapGetters("userData",['userLocation'])
  }
};
</script>
<style scoped>
h5 {
  color: rgb(169, 169, 169);
}
.b {
  outline-color: aqua;
}
</style>
