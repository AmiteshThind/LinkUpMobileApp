import Vue from 'vue'
 import {firebaseAuth} from 'boot/firebase'
 import {Loading} from 'quasar'


const state = {
 loggedIn:false,
 
}

const mutations = {
// updating states

setLoggedIn(state,value){
       state.loggedIn = value
   },
 
 
}

const actions = {
// calls mutaitons and handles backend calls
registerUser({},payload){
   Loading.show()
    console.log(payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email,payload.password)
    .then(response => {
        console.log(response)
        Loading.hide()
            })
    .catch(error=>{
       showErrorMessage(error.message)
       Loading.hide()
    })
},
 loginUser({},payload){
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email,payload.password)
      .then(response => {
        console.log(response)
         Loading.hide()
    })
    .catch(error=>{
       showErrorMessage(error.message)
       Loading.hide()
    })
},
logoutUser(){
    firebaseAuth.signOut()
},
handleAuthStateChange({commit,getters}){
    
    firebaseAuth.onAuthStateChanged(user =>{
     Loading.hide()
     let onBoardingComplete = getters.onBoardingCompleteState
        console.log(onBoardingComplete)
        if(user && !onBoardingComplete){
            //user signed in
             
            commit('setLoggedIn',true);
            this.$router.push('/OB') //change to /ob
           // dispatch('tasks/fbReadData',null,{root:true}) // trigger action in different vuex module 
            
        }
        else if(user && onBoardingComplete){
              commit('setLoggedIn',true);
            this.$router.push('/home')
        }
        else{

           // commit('tasks/setTasksDownloaded',false,{root:true})
           // commit('tasks/clearData',null,{root:true})
            // LocalStorage.set('loggedIn',false)
           commit('setLoggedIn',false);
           this.$router.replace('/')
        }
    })
},
 

}

const getters = {
// retrieving data 
onBoardingCompleteState(state, getters, rootState, rootGetters) {
  return rootGetters['userData/onBoardingCompleteState']
}

    
}


export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
