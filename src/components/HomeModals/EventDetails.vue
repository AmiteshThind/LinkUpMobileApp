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
          @click="$root.$emit('closeEventContainer')"
        />
        <p style="font-size:35px" class="q-my-md text-primary"><b></b></p>
        <q-chip size="md" color="secondary">Basketball</q-chip>
        <div class="row">
          <p style="font-size:40px" class=" q-mt-sm q-ml-sm text-primary">
            <b>RocketMuckers</b>
          </p>
        </div>
        <div>
          <q-btn flat color="black" no-caps size="15px" icon="group"
            ><span class="q-ml-sm ">23 </span></q-btn
          >
          <div>
            <q-btn flat color="black" size="15px" icon="event"
              ><span class="q-ml-sm">05/23 @ 2:23 pm</span></q-btn
            >
            <q-btn
              rounded
              color="primary"
              class="q-ml-xl"
              style="margin-left:100px"
              no-caps
              size="16px"
              ><span>+ Invite</span></q-btn
            >
          </div>
          <q-btn flat color="black" no-caps size="15px" icon="location_on"
            ><span class="q-ml-sm ">112 Bramalea Rd, Brampton </span></q-btn
          >
        </div>
        <q-separator class="q-mt-sm" inset />
        <q-scroll-area  style="width: 100%; height: 525px;">
        <div class="q-pa-md row justify-center" style="margin-top:500px">
          <div>
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
        <q-input  class="q-ma-md bg-grey-2"   outlined v-model="chatMessage" >
        <template v-slot:append>
          <q-icon clickable @click="sendPressed" name='send'>
            
          </q-icon>
        </template>
      </q-input>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Event from "components/HomeModals/Event";
export default {
  components: {
    event: Event
  },
  data() {
    return {
        chatMessage:'',
        messages:[]
    };
  },
  methods: {
      sendPressed(){
          this.messages.push(this.chatMessage)
          this.chatMessage = ''
      }
  }
};
</script>

<style scoped>
.my-card {
  width: 100%;
  height: 98rem;
}
</style>
