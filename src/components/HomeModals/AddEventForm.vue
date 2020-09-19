<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <q-icon
          class="fixed-right q-ma-md"
          color="red-4"
          size="sm"
          name="cancel"
          clickable
          @click="$root.$emit('closeEventForm')"
        />
        <p style="font-size:35px" class="q-my-md text-primary">
          <b>Create Event</b>
        </p>

        <form class="row justify-center">
          <div>
            <q-input
              outlined
              v-model="eventFormData.eventName"
              class="row q-mt-sm"
              label="Event Name"
              style="width:270px"
            />
          </div>

          <div>
            <q-input outlined class="q-mt-md" v-model="eventFormData.datetime">
              <template v-slot:prepend>
                <q-icon name="event" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-date v-model="eventFormData.datetime" mask="YYYY-MM-DD hh:mm a">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-date>
                  </q-popup-proxy>
                </q-icon>
              </template>

              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time v-model="eventFormData.datetime" mask="YYYY-MM-DD hh:mm a">
                      <div class="row items-center justify-end">
                        <q-btn v-close-popup label="Close" color="primary" flat />
                      </div>
                    </q-time>
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>

          <div class="row">
            <q-select
              style="width:275px"
              class="q-mt-md"
              outlined
              v-model="eventFormData.activity"
              :options="options"
              label="Activity"
            />
          </div>
          <div class="row">
            <q-input
              outlined
              v-model="eventFormData.location.address"
              style="width:275px"
              class="q-mt-md"
            >
              <template v-slot:prepend>
                <q-icon name="location_on" color="primary" />
              </template>
            </q-input>
          </div>

          <div class="row fixed-center q-mt-xl">
            <q-btn
              color="primary"
              rounded
              text-color="white"
              size="18px"
              @click="submitEventForm"
              label="Create"
            />
          </div>
        </form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
const opencage = require("opencage-api-client");
export default {
  components: {},
  data() {
    return {
      eventFormData: {
        eventName: "",
        datetime: "",
        activity: "",
        location: {
          lat: 0,
          lng: 0,
          address: "",
        },
      },
      options: [
        "Soccer",
        "Basketball",
        "Tennis",
        "Badminton",
        "Football",
        "Baseball",
        "Mountain Biking",
        "Yoga",
        "Rock Climbing",
        "Volleyball",
        "Cricket",
        "Cycling",
      ],
    };
  },
  methods: {
    scrolled(position) {
      // when this method is invoked then it means user
      // has scrolled the page to `position`
      //
      // `position` is an Integer designating the current
      // scroll position in pixels.
    },
    submitEventForm() {
      //find location

      var apikey = "78c298a5b92147e094a67c9115a62e98";
      var latitude = "51.0";
      var longitude = "7.0";
      var api_url = "https://api.opencagedata.com/geocode/v1/json";

      var request_url =
        api_url +
        "?" +
        "key=" +
        apikey +
        "&q=" +
        encodeURIComponent(this.eventFormData.location.address) +
        "&pretty=1" +
        "&no_annotations=1";

      // see full list of required and optional parameters:
      // https://opencagedata.com/api#forward

      var request = new XMLHttpRequest();
      request.open("GET", request_url, true);

      request.onload =  () => {

        if (request.status == 200) {
          // Success!
          let data = JSON.parse(request.responseText);
          this.eventFormData.location.lat = data.results[0].geometry.lat;
          this.eventFormData.location.lng = data.results[0].geometry.lng;
          console.log(this.eventFormData)

        } else if (request.status <= 500) {
          console.log("unable to geocode! Response code: " + request.status);
        } else {
          console.log("server error");
        }
      };

      request.onerror = function () {
        console.log("unable to connect to server");
      };

      request.send(); // make the request
    },
  },
};
</script>

<style scoped>
.my-card {
  width: 100%;
  height: 50rem;
}
</style>