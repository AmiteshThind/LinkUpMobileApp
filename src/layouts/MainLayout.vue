<template>
  <q-layout view="hHh lpR fFr">
    
    <q-drawer show-if-above :value="drawerOpen" side="left" bordered>
      
      <q-list>
        <q-item-label header style="font-size:18px" class="text-grey-8">LinkUp</q-item-label>
        <EssentialLink v-for="link in essentialLinks" :key="link.title" v-bind="link" />
      </q-list>
      <q-btn  class="absolute-bottom" flat @click="logoutUser">
            <q-item
        class="q-ma-lg"
        clickable
        tag="a"
        target="_blank"
         
      >
        <q-item-section
           
          avatar
        >
          <q-icon size="md" color="primary" name="power_settings_new" />
        </q-item-section>

        <q-item-section>
          <q-item-label><b>Logout</b></q-item-label>
          
        </q-item-section>
      </q-item>
      </q-btn>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>




<script>
import EssentialLink from "components/EssentialLink.vue";
import { mapGetters } from "vuex";
import {mapActions} from 'vuex';

const linksData = [
  {
    title: "HOME",
    caption: "quasar.dev",
    icon: "home",
    link: "/home",
  },
  {
    title: "MESSAGES",
    caption: "github.com/quasarframework",
    icon: "chat_bubble",
    link: "/messages",
  },
  {
    title: "CHALLENGES",
    caption: "chat.quasar.dev",
    icon: "star",
    link: "/challenges",
  },

    {
    title: "FRIENDS",
    caption: "forum.quasar.dev",
    icon: "sentiment_satisfied_alt",
    link: "/OB",
  },
 
     {
    title: "PROFILE",
    caption: "forum.quasar.dev",
    icon: "person",
    link: "/OB",
  },
   
];

export default {
  name: "MainLayout",
  components: { EssentialLink },
  data() {
    return {
      essentialLinks: linksData,
      right: false,
    };
  },
  computed: {
    ...mapGetters('navigationData', ['drawerOpen']),

  },
  methods:{
    ...mapActions('authData',['logoutUser'])
  }
};
</script>
