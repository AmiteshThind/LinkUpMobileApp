import {
  firebaseDb,
  GeoPoint,
  firebaseAuth
} from 'boot/firebase'
import { Loading } from 'quasar'


const state = {
  userInfo: {
    userId: '',
    firstName: '',
    email: '',
    location: {
      city: '',
      state: '',
      latlng: []
    },
    gender: '',
    ageGroup: '',
    interests: [], //object array where each interests has skill level associted with it,
    onBoardingComplete: true,
    avatarImgUrl: '',
    friends: [],
    challengesCompleted: 0,
    totalLinkUps: 0,
    events: []
  },
  events: [],
  allEvents: [],
  recentlyAddedEvent:{},
  eventCreated:false
}

const mutations = {
  // updating states
  setOnBoardingTo(state, value) {
    state.userInfo.onBoardingComplete = value
  },
  setUserLocation(state, payload) {
    Object.assign(state.userInfo.location, payload)
    console.log(state.userInfo, location)
  },
  setUserAgeGroup(state, payload) {
    state.userInfo.ageGroup = payload;
  },
  setUserGender(state, payload) {
    state.userInfo.gender = payload;
  },
  setUserInterests(state, payload) {
    state.userInfo.interests = [];
    for (let i = 0; i < payload.length; i++) {
      state.userInfo.interests[i] = payload[i];
    }
  },
  setSkillLevelForInterests(state, payload) {
    for (let i = 0; i < state.userInfo.interests.length; i++) {
      state.userInfo.interests[i].skill = payload[i];
    }
    console.log(state.userInfo)
  },
  setUserNameAndEmail(state, payload) {
    state.userInfo.firstName = payload.firstName;
    state.userInfo.email = payload.email;
  },
  setAllEvents(state, payload) {
    state.allEvents = payload;
  },
  setUser(state, payload) {
    console.log('payload', payload)
    state.userInfo.location = payload.location
    state.userInfo.gender = payload.gender
    state.userInfo.ageGroup = payload.ageGroup
    state.userInfo.interests = payload.interests //object array where each interests has skill level associted with it,
    state.userInfo.onBoardingComplete = payload.onBoardingComplete
    // state.userInfo.avatarImgUrl: '',
    state.userInfo.friends = payload.friends
    state.userInfo.challengesCompleted = payload.challengesCompleted
    state.userInfo.totalLinkUps = payload.totalLinkUps
    state.userInfo.events = payload.events
    state.userInfo.latlng = payload.latlng

  },
  setEvents(state, payload){
    state.events = payload
  },
  setRecentlyAddedEvent(state,payload){
      state.recentlyAddedEvent = payload; 
  },
setEventCreated(state,payload){
    state.eventCreated = payload; 
  }
}

const actions = {
  // calls mutaitons and handles backend calls
  completeOnBoarding({
    commit,
    dispatch
  }) {
    dispatch('setOnBoardingToComplete', null)
    console.warn("Attempting to complete on boarding", state.userInfo)
    let userInfo = {
      ...state.userInfo,
      latlng: new GeoPoint(state.userInfo.location.latlng[0], state.userInfo.location.latlng[1])
		}
		let userId = firebaseAuth.currentUser.uid;
    firebaseDb.collection("users").doc(userId).update(userInfo)
      .then(() => {
        dispatch('navigationData/resetOnBoardingPageToStart', null, {
          root: true
        })
      })
      .catch(() => {
        dispatch('setOnBoardingIncomplete', null)
        console.log("error")
      })
  },
  setOnBoardingToComplete({
    commit
  }) {
    commit('setOnBoardingTo', true)
  },
  setOnBoardingIncomplete({
    commit
  }) {
    commit('setOnBoardingTo', false)
  },
  setUserLocation({
    commit
  }, payload) {
    commit('setUserLocation', payload)
  },
  setUserAgeGroup({
    commit
  }, payload) {
    commit('setUserAgeGroup', payload)
  },
  setUserGender({
    commit
  }, payload) {
    commit('setUserGender', payload)
  },
  setUserInterests({
    commit
  }, payload) {
    commit('setUserInterests', payload)
  },
  setSkillLevelForInterests({
    commit
  }, payload) {
    commit('setSkillLevelForInterests', payload)
  },
  setUserNameAndEmail({
    commit
  }, payload) {
    commit('setUserNameAndEmail', payload)
  },
  setUser({
    commit
  }, payload) {
    commit('setUser', payload)
  },
  fbReadData({
    dispatch
  }) {
    //read data from firebase when user logins in
    dispatch('updateEvents', null)
  },
  updateEvents({
    commit
  }) {
    //read data from firebase when user logins in
    console.warn('Fetching Events', state.userInfo.events)
    if (state.userInfo.events.length > 0) {
			var eventsPromise = state.userInfo.events.map(eventId => firebaseDb.collection('events').doc(eventId).get())
			Promise.all(eventsPromise)
				.then(events => {
          let eventsData = events.map(event => event.data())
          commit('setEvents', eventsData);
				})
    }
  },
  addEvent({
    commit,
    dispatch
  }, payload) {
    // commit('addEvent',payload)
    let eventFormData = payload;
    let userId = firebaseAuth.currentUser.uid;

    var eventAdd = firebaseDb.collection('events').add({
      ...eventFormData,
      createdBy: userId
    })
    let userData = firebaseDb.collection('users').doc(userId).get()
    Promise.all([eventAdd, userData]).then(ref => {
        let user = ref[1].data()
        let eventId = ref[0].id
        return firebaseDb.collection('users').doc(userId).update({
          events: [...user.events, eventId]
        })
      })
      .then(() => {
        dispatch('updateEvents', null)
      })
      .catch(err => {
        console.error('Bruh, you bugging =>', err)
      })
  },
  getAllEvents({
    commit,
    dispatch
  }, payload){
    firebaseDb.collection('events').get()
      .then(allEvents => {
        let allEventData = allEvents.docs.map(eventDoc => {
          return {
            id: eventDoc.id, 
            ...eventDoc.data()
            }
        })
        commit('setAllEvents', allEventData)
        console.log('Events => ', allEventData)
      })
  },

  setRecentlyAddedEvent({commit},payload){
    commit('setRecentlyAddedEvent',payload)
  },
  setEventCreated({commit},payload){
    commit('setEventCreated',payload)
  }

 



}
const getIconBasedOnActivity = (activity) => {
  switch (activity) {
    case "Soccer":
      return "icons/icons8-soccer-50.png"
    case "Basketball":
      return "icons/icons8-basketball-player-50.png"
    case "Tennis":
      return "icons/icons8-tennis-player-50.png"
    case "Badminton":
      return "icons/icons8-badminton-50.png"
    case "Football":
      return "icons/icons8-american-football-50.png"
    case "Baseball":
      return "icons/icons8-baseball-player-50.png" 
    case "Mountain Biking":
      return  "icons/icons8-cycling-mountain-bike-50.png" 
    case "Yoga":
      return "icons/icons8-floating-guru-50.png"     
    case "Rock Climbing":
      return "icons/icons8-climbing-50.png"       
    case "Volleyball":
      return "icons/icons8-volleyball-player-50.png"  
    case "Cricket":
      return "icons/icons8-cricket-50.png"       
    case "Cycling":
      return "icons/icons8-cycling-50.png"
    default:
      break;
  }
}
const getters = {
  // retrieving data
  onBoardingCompleteState: (state) => {
    return state.userInfo.onBoardingComplete;
  },

  userLocation: (state) => {
    return state.userInfo.location
  },

  userAgeGroup: (state) => {
    return state.userInfo.ageGroup
  },
  userGender: (state) => {
    return state.userInfo.gender
  },
  userInterests: (state) => {
    return state.userInfo.interests
  },
  userName: (state) => {
    return state.userInfo.firstName;
  },
  userEvents: (state) => {
    let userId = firebaseAuth.currentUser.uid;
    return state.events.filter(event => event.createdBy === userId);
  },
  joinedEvents: (state) => {
    let userId = firebaseAuth.currentUser.uid;
    return state.events.filter(event => event.createdBy !== userId);
  },
  getRecentlyAddedEvent:(state)=>{
      return state.recentlyAddedEvent; 
  },
   getEventCreated:(state)=>{
      return state.eventCreated; 
  },
   
 
  eventMapMarkers: (state) => {
    return state.allEvents.map(event => {
      return {
        position: {
          lat: event.location.latitude,
          lng: event.location.longitude
        },
        icon: getIconBasedOnActivity(event.activity)
      }
    }) 
    // [{
    //   position: {
    //     lat: 43.6531548,
    //     lng: -79.722421
    //   }},
    //   {position: {
    //     lat: 43.531548,
    //     lng: -79.7562421
    //   }},
    //   {position: {
    //     lat: 43.731548,
    //     lng: -79.762421
    //   }},
    //   {position: {
    //     lat: 43.621548,
    //     lng: -79.762421
    //   }
    // }]
  },
  getUserLocation: (state) => {
    // console.log(state.userInfo)
    return { lat: state.userInfo.location.latlng[0], lng: state.userInfo.location.latlng[1] }
  }



}


export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
