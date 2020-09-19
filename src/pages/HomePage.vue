<template>
 
  <q-page  class="row items-stretch">
    <div style="width:100%">
      
       <q-google-map :center="center"
                      :zoom="zoom"
                      style="width:100%;height: 100%;" 
                       :options='{disableDefaultUI: true}'
>
<q-google-map-marker v-for="(m,index) in markers" :key="index" :position="m.position"
            :clickable="true" :draggable="false">
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
       

      <q-chip size="18px"  color="primary" text-color="white" class="fixed-left q-mt-xl q-mx-md" style="margin-left:7rem;margin-top:4.5rem">
        <q-icon name="link" color="black" size="sm" class="q-mx-sm" />25 
        <q-icon color="black" name="sentiment_satisfied_alt" class="q-mx-sm" size="sm" /> 8
        <q-icon name="star" color="black" size="sm" class="q-mx-sm" /> 3
      </q-chip>
    </div>
      <q-btn   @click="userEventsPressed=!userEventsPressed" class="btn-fixed-width absolute-top" style='margin-top:140px;margin-left:35px'  color="primary" round text-color="white"    size='15px' icon="event" />

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
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
    <div>
     <div v-if="linkMePressed" class="col fixed-center" style="margin-top:20rem;width:100%;">
       <!-- <event-container></event-container> -->
       <event-details></event-details>
    </div>
  <div v-if="addEventPressed" class="col fixed-center" style="margin-top:20rem; width:100%">
      <add-event-form/>
    </div>
      <div v-if="userEventsPressed" class="col fixed-center" style="margin-top:20rem; width:100%">
      <user-events/>
    </div>
    </div>
    </transition>

  </q-page>
 
</template>

<script>

import {mapActions} from 'vuex'
import EventContainer from 'components/HomeModals/EventContainer'
import EventDetails from 'components/HomeModals/EventDetails'
import AddEventForm from 'components/HomeModals/AddEventForm'
import UserEvents from 'components/HomeModals/UserEvents'

export default {
  name: 'HomePage',
  created(){
     this.$root.$on('closeEventContainer', this.closeEventContainer)
      this.$root.$on('closeEventForm', this.closeEventForm)
     this.$root.$on('closeUserEvents', this.closeUserEvents)

  },
  components:{
    eventContainer:EventContainer,
    addEventForm:AddEventForm,
    eventDetails :EventDetails,
    userEvents:UserEvents

  },
  data(){
    return{
      linkMePressed:false,
      addEventPressed:false,
      userEventsPressed:false,
      right:false,
       center: { lat: 43.631548, lng: -79.762421},
                  zoom: 12,
                  markers: [{
                    position: {
                      lat: 43.6531548,
                      lng: -79.722421
                    }},
                    {position: {
                      lat: 43.531548,
                      lng: -79.7562421
                    }},
                    {position: {
                      lat: 43.731548,
                      lng: -79.762421
                    }},
                    {position: {
                      lat: 43.621548,
                      lng: -79.762421
                    }
                  }]
    }
  },
  methods:{
    ...mapActions('navigationData',['updateDrawerState']),
    closeEventContainer(){
      this.linkMePressed = !this.linkMePressed;
    },
    closeEventForm(){
      this.addEventPressed = !this.addEventPressed;
    },
     closeUserEvents(){
      this.userEventsPressed = !this.userEventsPressed;
    }
    
  }
}
</script>
