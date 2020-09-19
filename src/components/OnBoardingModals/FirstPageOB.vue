<template>
  <q-page class="window-height window-width row text-center justify-center items-center">
    <div>
      <div class="row">
        <div class="col">
          <p caps style="font-size:25px" class="title-color text-capitalize">Hi {{userName}},</p>
        </div>
      </div>
      <div class="row q-ml-lg q-mr-lg q-mt-md">
        <div class="col">
          <p
            v-if="!onBoardingCompleteState"
            style="font-size:27px"
          >Answer a few questions to find friends that match your interests.</p>

          <p v-else style="font-size:27px">Update your info so you can find friends near you.</p>
        </div>
      </div>
      <div class="absolute-bottom row" style="padding-bottom:5rem">
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
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "FirstPageOnBoarding",
  methods: {
    ...mapActions("navigationData", ["nextOnBoardingPageActive"]),
  },
  computed: {
    ...mapGetters("userData", ["onBoardingCompleteState","userName"]),
  },
};
</script>
<style scoped>
.title-color {
  color: rgb(155, 155, 155);
}
</style> 
 