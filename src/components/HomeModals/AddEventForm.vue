<template>
<div >
    
<q-card class="my-card">
    
      <q-card-section>
              <q-icon class="fixed-right q-ma-md" color="red-4" size="sm" name="cancel" clickable @click="$root.$emit('closeEventForm')" />
          <p style="font-size:35px" class="q-my-md text-primary" ><b>Create Event</b></p>
       
        <form>
            <q-input outlined v-model="text" label="Outlined" />
        </form>
        
        
      </q-card-section>
    </q-card>
    
</div>
</template>

<script>
 
export default {
    components:{
       
    },
data(){
    return{
      text:''
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