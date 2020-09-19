<template>
<div >
    
<q-card class="my-card">
    
      <q-card-section>
              <q-icon class="fixed-right q-ma-md" color="red-4" size="sm" name="cancel" clickable @click="$root.$emit('closeEventContainer')" />
          <p style="font-size:35px" class="q-my-md text-primary" ><b>Events Found</b></p>
       <q-scroll-area style="width: 100%; height: 425px;" >
        <event/>
         <event/>
          <event/>
           <event/>
           <event/>
       </q-scroll-area>
        
        
        
      </q-card-section>
    </q-card>
    
</div>
</template>

<script>
import Event from 'components/HomeModals/Event'
export default {
    components:{
        event:Event
    },
data(){
    return{
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
    }
},
methods:{
    scrolled (position) {
      // when this method is invoked then it means user
      // has scrolled the page to `position`
      //
      // `position` is an Integer designating the current
      // scroll position in pixels.
    }
}
}
</script>

<style scoped>
.my-card{
  width: 100%;
  height:50rem;
}
</style>