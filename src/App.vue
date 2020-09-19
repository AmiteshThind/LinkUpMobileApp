<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>

import {mapActions} from 'vuex'
export default {
  name: 'App',
  methods:{
    ...mapActions('authData',['handleAuthStateChange', 'getAllEvents']),
    ...mapActions('userData',['getAllEvents'])
  },
  mounted(){
    this.handleAuthStateChange();
    this.getAllEvents();
  }
}
</script>
