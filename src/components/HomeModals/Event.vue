<template>
  <q-card class=" bg-accent text-white q-my-md">
      <q-card-section class="row">
        <div class="text-h6 text-black q-mt-sm" >RocketMuckers</div>
         <q-card-actions>
         <q-chip color="secondary" >Basketball</q-chip>
         <q-chip color="secondary">Soccer</q-chip>
      </q-card-actions>
        <div >
            <div class="col q-mt-sm">
                  <q-btn flat color="black" size='15px' icon="group" ><span class='q-ml-sm'>35</span></q-btn>
                     <q-btn flat color="black" no-caps size="15px" icon="history" ><span class='q-ml-sm'>25 Days</span></q-btn>
                      <q-btn  rounded color="primary" no-caps size="17px" style='margin-left:35px' class="q-px-md" label="Join"></q-btn>
            </div>
              <q-btn flat color="black" no-caps size='15px' icon="location_on" ><span  class='q-ml-sm '>112 Bramalea Rd, Brampton </span></q-btn>
           </div>
              
      </q-card-section>
      
    </q-card>
</template>

<script>
export default {
name:'Event'
}
</script>

<style>

</style>