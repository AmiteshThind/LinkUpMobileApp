<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <q-icon
          class="fixed-right q-mt-lg q-mr-sm"
          color="red-4"
          size="md"
          name="cancel"
          clickable
          @click="$root.$emit('closeEventDetailsContainer')"
        />
        <p style="font-size:35px" class="q-my-md text-primary"><b></b></p>
        <q-chip size="md" color="secondary">{{eventData.activity}}</q-chip>
        <div class="row">
          <p style="font-size:40px" class=" q-mt-sm q-ml-sm text-primary">
            <b>{{eventData.name}}</b>
          </p>
        </div>
        <div>
          <q-btn flat color="black" no-caps size="15px" icon="group"
            >
            <span v-if="getEventCreated" class="q-ml-sm ">0</span>
            <span v-else class="q-ml-sm ">{{eventMembers}}</span>

            </q-btn
          >
          <div>
            <q-btn flat color="black" size="15px" icon="event"
              ><span class="q-ml-sm">{{date}}</span></q-btn
            >
            <q-btn
                v-if="!getEventCreated"
              rounded
              color="primary"
              class="q-ml-xl"
               
              no-caps
              size="16px"
              ><span>+ Invite</span></q-btn
            >
          </div>
          <q-btn flat color="black" no-caps size="15px" icon="location_on"
            ><span class="q-ml-sm ">{{eventData.locationString}} </span></q-btn
          >
        </div>
        <q-separator class="q-mt-sm" inset />
        <div  v-if="!getEventCreated">
        <q-scroll-area  style="width: 100%; height: 525px;">
        <div class="q-pa-md row justify-center" style="margin-top:450px">
          <div >
            <div
              style="width: 100%; max-width: 400px;"
              class="absolute-bottom q-mr-md"
            >
            <q-chat-message
                name="Jane"
                avatar="https://semantic-ui.com/images/avatar2/large/kristy.png"
                :text="['Hi Everyone, super excited to play and make new friends!']"
              />
              <q-chat-message
                v-for="(message,index) in messages"
                name="me"
                avatar="https://semantic-ui.com/images/avatar2/large/matthew.png"
                :text="[message]"
                sent
                :key='index'
              />
            
               
            </div>
            
          </div>
        </div>
        </q-scroll-area>
        <q-input  class=" absolute-bottom q-ma-md q-mb-xl bg-grey-2" style="margin-bottom:2px"   outlined v-model="chatMessage" >
        <template v-slot:append>
          <q-icon clickable @click="sendPressed" name='send'>
            
          </q-icon>
        </template>
      </q-input>
        </div>

        <div class="row text-center justify-center" v-else>
            <h4><b>No one here.<br>Invite a friend?</b></h4>
          
            <div class="row justify-center">
                   
            <q-btn
              rounded
              color="primary"
              
              
              
              no-caps
              size="20px"
              ><span>+ Invite</span></q-btn
            >
            </div>

            </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {date} from 'quasar'
import Event from "components/HomeModals/Event";
export default {
    mounted(){
          
    },
  components: {
    event: Event
  },
  data() {
    return {
         
        chatMessage:'',
        messages:[],
        eventHasMembers:false
    };
  },
  methods: {
      sendPressed(){
          this.messages.push(this.chatMessage)
          this.chatMessage = ''
      },
         
  
  },
  computed:{
    ...mapGetters('userData',['getEventCreated']),
      date(){
        let timeStamp = this.eventData.datetime;
        let formattedTime = date.formatDate(timeStamp.toDate() , 'hh:mm a');
        let formattedDate = date.formatDate(timeStamp.toDate() , 'MMM:D');
        return formattedDate +' @ '+ formattedTime
    
  }
  },
  props:['eventData','eventMembers'],
};
</script>

<style scoped>
.my-card {
  width: 100%;
  height: 98rem;
}
</style>
