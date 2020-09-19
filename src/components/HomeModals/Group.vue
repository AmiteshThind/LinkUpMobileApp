<template>
  <q-card class=" bg-accent text-white q-my-md">
      <q-card-section>
        <div class="text-h6 text-black" >RocketMuckers</div>
        <div >
            <div class="col q-mt-sm">
                  <q-btn flat color="black" size='15px' icon="group" ><span class='q-ml-sm'>35</span></q-btn>
                     <q-btn flat color="black" no-caps size="15px" icon="history" ><span class='q-ml-sm'>25 Days</span></q-btn>
                      <q-btn  rounded color="primary" no-caps size="15px" style='margin-left:15px' class="q-px-md" label="Join"></q-btn>
            </div>
            
           </div>
              
      </q-card-section>

      <q-card-actions>
         <q-chip color="secondary" >Basketball</q-chip>
         <q-chip color="secondary">Soccer</q-chip>
      </q-card-actions>
    </q-card>
</template>

<script>
export default {
name:'Group'
}
</script>

<style>

</style>