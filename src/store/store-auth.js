import Vue from 'vue'
 import {firebaseAuth, firebaseDb} from 'boot/firebase'
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
    .then(userAuth  => {
      return Promise.all([userAuth, userAuth.user.updateProfile({displayName: payload.firstName})])
    })
    .then(userDetails => {
      let userAuth = userDetails[0]
      console.log("User Auth:", userAuth)
      var user = userAuth.user
      // create user profile in firestor
      dispatch('userData/setUser', {userId: user.uid, email: user.email, firstName: user.displayName} , {root: true}) // trigger action in different vuex module
      var userRef = firebaseDb.collection("users").doc(user.uid)
      return userRef.set({
        email: user.email,
        firstName: user.displayName,
        onBoardingComplete: false
      })
    })
    .catch(error=>{
      showErrorMessage(error.message)
    })
    .finally(() => {
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
handleAuthStateChange({commit,dispatch,getters}){

    firebaseAuth.onAuthStateChanged(user =>{

      Loading.hide()
      if (user){
        firebaseDb.collection("users").doc(user.uid).get()
        .then(userDoc => {
          console.log('Auth State Change, got User =>', userDoc.data())
          dispatch('userData/setUser', {...userDoc.data()} , {root: true}) // trigger action in different vuex module
          if (userDoc){
            let onBoardingComplete = userDoc.data().onBoardingComplete
              console.log(onBoardingComplete)
              if(!onBoardingComplete){
                  //user signed in
                  let user = userDoc.data()
                  commit('setLoggedIn',true);
                  this.$router.push('/OB') //change to /ob
                  // dispatch('tasks/fbReadData',null,{root:true}) // trigger action in different vuex module
              }
              else if(onBoardingComplete){
                  commit('setLoggedIn',true);
                  this.$router.push('/home')
                  dispatch('userData/fbReadData',null,{root:true})// allows to triggers action in different store
              }
            }
          })
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
