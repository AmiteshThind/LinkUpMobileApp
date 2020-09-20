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
          @click="$root.$emit('closeEventContainer')"
        />
        <p style="font-size:35px" class="q-my-md text-primary">
          <b>Events Found</b>
        </p>
        <q-scroll-area style="width: 100%; height: 425px;">
            <event v-for="(event,index) in getLinkUps"  :eventData="event" :key='index' />
        </q-scroll-area>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Event from "components/HomeModals/Event";
export default {
  components: {
    event: Event
  },
  data() {
    return {};
  },
  methods: {
    scrolled(position) {
       
    }
  },
  computed: {
    ...mapGetters("userData", ["getLinkUps"])
  }
};
</script>
