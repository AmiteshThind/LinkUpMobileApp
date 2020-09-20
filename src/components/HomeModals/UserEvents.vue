<template>
<div >
    
<q-card class="my-card">
    
      <q-card-section>
              <q-icon class="fixed-right q-ma-md" color="red-4" size="sm" name="cancel" clickable @click="$root.$emit('closeUserEvents')" />
          <p style="font-size:35px" class="q-my-md text-primary" ><b>Events</b></p>
     
     <q-tabs
        v-model="tab"
        align="justify"
        narrow-indicator
        class="q-mb-lg"
      >
        <q-tab class="text-primary"   name="MyEvents" label="My Events" />
        <q-tab class="text-primary" name="UpcomingEvents" label="Upcoming Events" />
       
      </q-tabs>
     
        <q-scroll-area style="width: 100%; height: 425px;" >
            <div v-if="tab=='MyEvents'">

        <event v-for="(event,index) in userEvents" :key='index' :eventData='event'/>
                    </div>
           <div v-if="tab=='UpcomingEvents'">
           <event v-for="(event,index) in userEvents" :key='index' :eventData='event'/>
         
           </div>
       </q-scroll-area>
        
        
        
      </q-card-section>
    </q-card>
    
</div>
</template>

<script>
 import Event from 'components/HomeModals/Event'
 import {mapActions,mapGetters} from 'vuex'

export default {
    components:{
        event:Event
    },
data(){
    return{
        tab:'MyEvents'
     }
},
computed:{
    ...mapGetters('userData',['joinedEvents','userEvents'])
} 
}
</script>

<style scoped>
.my-card{
  width: 100%;
  height:60rem;
}
</style>