<template>
 
  <q-page  class="row items-stretch">
    <div style="width:100%">
      
       <q-google-map :center="getUserLocation"
                      :zoom="zoom"
                      style="width:100%;height: 100%;" 
                      :options="mapOptions"
                      @click="handleEventClick(null)"
>
<q-google-map-marker v-for="(m,index) in eventMapMarkers" :key="index" :position="m.position" :icon="m.icon"
            :clickable="true" :draggable="false" @click="handleEventClick(m)">
      </q-google-map-marker>
      </q-google-map>
      </div>
 
  
      <div class="col">
        
     <q-btn class="absolute-top-right q-mt-xl q-mr-md"  color="black"  flat round icon="menu" size="lg" @click="updateDrawerState" />
      </div>
      <div class="col">
         <q-avatar size="80px" class="fixed-left q-mt-xl q-ml-md">
      <img src="https://semantic-ui.com/images/avatar2/large/matthew.png">
      
    </q-avatar>
       

      <div class="fixed-right q-mt-xl q-mx-md stats-grid">
        <div class="stat-icon">
          <q-icon name="link" color="black" size="sm" class="q-mx-sm" />
          25 
        </div>
        <div class="stat-icon">
          <q-icon color="black" name="sentiment_satisfied_alt" class="q-mx-sm" size="sm" /> 
          8
        </div>
        <div class="stat-icon">
        <q-icon name="star" color="black" size="sm" class="q-mx-sm" /> 
        3
        </div>
      </div>
    </div>
      <q-btn   @click="userEventsPressed=!userEventsPressed" class="btn-fixed-width  absolute-top-left" style='margin-top:140px;margin-left:35px'  color="primary" round text-color="white"    size='15px' icon="event" />

  <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <div>
    <div class="col fixed-bottom-right" v-if="!linkMePressed || !addEventPressed" style="margin-bottom:175px;margin-right:10px">
    <q-btn   class="btn-fixed-width" color="primary" round text-color="white"  @click="linkMePressed = !linkMePressed" size='xl' icon="person_search" />
    </div>
    <div class="col fixed-bottom-right" style="margin-bottom:85px;margin-right:10px"  >
    <q-btn   class="btn-fixed-width" color="primary"  @click="addEventPressed = !addEventPressed" round text-color="white"  size='xl' icon="add" />
    </div>
    </div>
     
  
  </transition>

    <transition
      v-if="showEvent"
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <event class="modal-event" @click="handleEventClick(null)"/>
    </transition>
    <transition
      appear-
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <div>
     <div v-if="linkMePressed" class="col fixed-center" style="margin-top:20rem;width:100%;">
       <event-container></event-container>
       <!-- <event-details></event-details> -->
    </div>
       <div v-if="getEventCreated" class="col fixed-center" style="margin-top:20rem;width:100%;">
       <!-- <event-container></event-container> -->
       <event-details :eventData="getRecentlyAddedEvent"></event-details>
    </div>
  <div v-if="addEventPressed" class="col fixed-center" style="margin-top:20rem; width:100%">
      <add-event-form />
    </div>
      <div v-if="userEventsPressed" class="col fixed-center" style="margin-top:20rem; width:100%">
      <user-events/>
    </div>
    </div>
    </transition>

  </q-page>
 
</template>

<script>
import Event from 'components/HomeModals/Event'
import {mapActions, mapGetters} from 'vuex'
import EventContainer from 'components/HomeModals/EventContainer'
import EventDetails from 'components/HomeModals/EventDetails'
import AddEventForm from 'components/HomeModals/AddEventForm'
import UserEvents from 'components/HomeModals/UserEvents'
import { retroMapOptions, darkMapOptions, defaultMapOptions, blueMapOptions } from './mapOptions'

export default {
  name: 'HomePage',
  created(){
     this.$root.$on('closeEventContainer', this.closeEventContainer)
      this.$root.$on('closeEventForm', this.closeEventForm)
     this.$root.$on('closeUserEvents', this.closeUserEvents)
     this.$root.$on('closeEventPopup', this.handleEventClick)
      
      this.$root.$on('closeEventDetailsContainer', this.closeEventDetailsContainer)

  },
  components:{
    eventContainer:EventContainer,
    addEventForm:AddEventForm,
    eventDetails:EventDetails,
    userEvents:UserEvents,
    event:Event
  },
  mounted(){
    console.log(this.getEventCreated)
     
  },
  data(){
    return{
      eventCreated:false,
      linkMePressed:false,
      addEventPressed:false,
      userEventsPressed:false,
      right:false,
      showEvent: false,
      windowPop: null,
      // center: { lat: 43.631548, lng: -79.762421},
      zoom: 12,
      mapOptions: { styles: retroMapOptions, disableDefaultUI: true } 
    }
  },
  methods:{
    ...mapActions('navigationData',['updateDrawerState']),
    ...mapActions('userData',['setEventCreated']),
    closeEventContainer(){
      this.linkMePressed = !this.linkMePressed;
    },
    handleEventClick(marker){
      if (marker){
        this.showEvent=true
      }
      else
        this.showEvent=false
    },
    closeEventForm(){
      this.addEventPressed = !this.addEventPressed;
    },
     closeUserEvents(){
      this.userEventsPressed = !this.userEventsPressed;
    },
    closeEventDetailsContainer(){
      this.setEventCreated(false);
      
    }
    
  },
  computed:{
      ...mapGetters('userData',['getEventCreated','getRecentlyAddedEvent','eventMapMarkers', 'getUserLocation'])
  }
}
</script>
<style scoped>
.stats-grid{
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  height: 180px;
  width: 35px;
  background: #70B096;
  border-radius: 4em;
  top: 4.5em;
  right: 0.85em;
  justify-content: center;
  align-items: center;
}
.stat-icon{
  text-align: center;
  display: block;
}
</style>













