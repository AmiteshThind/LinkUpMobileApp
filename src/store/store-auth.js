import Vue from 'vue'
import {
  firebaseAuth,
  firebaseDb
} from 'boot/firebase'
import {
  Loading
} from 'quasar'


const state = {
  loggedIn: false,

}

const mutations = {
  // updating states

  setLoggedIn(state, value) {
    state.loggedIn = value
  },


}

const actions = {
  // calls mutaitons and handles backend calls
  registerUser({
    dispatch,
    commit
  }, payload) {
    Loading.show()
    console.log(payload)
    firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
      .then(userAuth => {
        return Promise.all([userAuth, userAuth.user.updateProfile({
          displayName: payload.firstName
        })])
      })
      .then(userDetails => {
        let userAuth = userDetails[0]
        console.log("User Auth:", userAuth)
        var user = userAuth.user
        // create user profile in firestor
        dispatch('userData/setUserNameAndEmail', {
          email: user.email,
          firstName: user.displayName
        }, {
          root: true
        }) // trigger action in different vuex module
        var userRef = firebaseDb.collection("users").doc(user.uid)
        return userRef.set({
          email: user.email,
          firstName: user.displayName,
          onBoardingComplete: false,
          userId: user.uid
        })
      })
      .then(() => {
        commit('setLoggedIn', true);
        this.$router.push('/OB')
      })
      .catch(error => {
        console.error(error.message)
      })
      .finally(() => {
        Loading.hide()
      })
  },
  loginUser({}, payload) {
    Loading.show()
    firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log(response)
        Loading.hide()
      })
      .catch(error => {
        console.error(error.message)
        Loading.hide()
      })
  },
  logoutUser() {
    firebaseAuth.signOut()
  },
  handleAuthStateChange({
    commit,
    dispatch,
    getters
  }) {

    firebaseAuth.onAuthStateChanged(user => {

      Loading.hide()
      if (user) {
        firebaseDb.collection("users").doc(user.uid).get()
          .then(userDoc => {
            console.log('Auth State Change, got User =>', userDoc.data())
            var userData = userDoc.data()
            if (userData) {
              dispatch('userData/setUser', userData, {root:true}) // trigger action in different vuex module
              let onBoardingComplete = userData.onBoardingComplete
              console.log(onBoardingComplete)
              if (!onBoardingComplete) {
                //user signed in
                commit('setLoggedIn', true);
                this.$router.push('/OB') //change to /ob
                // dispatch('tasks/fbReadData',null,{root:true}) // trigger action in different vuex module
              } else if (onBoardingComplete) {
                commit('setLoggedIn', true);
                this.$router.push('/home')
                dispatch('userData/fbReadData', null, {
                  root: true
                }) // allows to triggers action in different store
              }
            }
          })
      } else {

        // commit('tasks/setTasksDownloaded',false,{root:true})
        // commit('tasks/clearData',null,{root:true})
        // LocalStorage.set('loggedIn',false)
        commit('setLoggedIn', false);
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
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
