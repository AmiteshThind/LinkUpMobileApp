import {firebaseDb, GeoPoint} from 'boot/firebase'


const state = {
 userInfo:{
     userId:'',
     firstName:'',
     email:'',
     location:{
         city:'',
         state:'',
         latlng:[]
     },
     gender:'',
     ageGroup:'',
     interests:[],//object array where each interests has skill level associted with it,
     onBoardingComplete:true,
     avatarImgUrl:'',
     friends:[],
     challengesCompleted:0,
     totalLinkUps:0,
     events:[]
 }
}

const mutations = {
// updating states
setOnBoardingTo(state,value){
	state.userInfo.onBoardingComplete = value
},
setUserLocation(state,payload){
       Object.assign(state.userInfo.location,payload)
       console.log(state.userInfo,location)
   },
setUserAgeGroup(state,payload){
       state.userInfo.ageGroup = payload;
   },
setUserGender(state,payload){
       state.userInfo.gender = payload;
   },
setUserInterests(state,payload){
    state.userInfo.interests = [];
    for(let i =0;i<payload.length;i++){
       state.userInfo.interests[i] = payload[i];
    }
   },
setSkillLevelForInterests(state,payload){
       for(let i =0;i<state.userInfo.interests.length;i++ ){
            state.userInfo.interests[i].skill = payload[i];
       }
       console.log(state.userInfo)
   },
setUserNameAndEmail(state,payload){
  state.userInfo.firstName = payload.firstName;
  state.userInfo.email = payload.email;
},
setUser(state,payload){
  state.userInfo = {...state.userInfo, ...payload}
},




}

const actions = {
// calls mutaitons and handles backend calls
 completeOnBoarding({commit, dispatch}){
	dispatch('setOnBoardingToComplete', null)
  console.warn("Attempting to complete on boarding", state.userInfo)
  let userInfo = {...state.userInfo, latlng: new GeoPoint(state.userInfo.location.latlng[0], state.userInfo.location.latlng[1])}
	firebaseDb.collection("users").doc(state.userInfo.userId).update(userInfo)
  .then(() => {
		dispatch('navigationData/resetOnBoardingPageToStart', null, {root:true})
  })
  .catch(() => {
		dispatch('setOnBoardingIncomplete', null)
    console.log("error")
  })
 },
setOnBoardingToComplete({commit}){
  commit('setOnBoardingTo',true)
},
setOnBoardingIncomplete({commit}){
  commit('setOnBoardingTo',false)
},
setUserLocation({commit},payload){
    commit('setUserLocation',payload)
},
setUserAgeGroup({commit},payload){
    commit('setUserAgeGroup',payload)
},
setUserGender({commit},payload){
    commit('setUserGender',payload)
},
setUserInterests({commit},payload){
    commit('setUserInterests',payload)
},
setSkillLevelForInterests({commit},payload){
     commit('setSkillLevelForInterests',payload)
},
setUserNameAndEmail({commit},payload){
    commit('setUserNameAndEmail',payload)
},
setUser({commit},payload){
    commit('setUser',payload)
},
fbReadData({commit}){
    //read data from firebase when user logins in

},
addEvent({commit},payload){
   // commit('addEvent',payload)
   let eventFormData = payload; 
    let userId = firebaseAuth.currentUser.uid;
    eventFormData.createdBy = userId; 

     firebasedB.collections('events').add({eventFormData})


}



}

const getters = {
// retrieving data
onBoardingCompleteState:(state)=>{
    return state.userInfo.onBoardingComplete;
},

userLocation:(state)=>{
    return state.userInfo.location
},

userAgeGroup:(state)=>{
    return state.userInfo.ageGroup
},
userGender:(state)=>{
    return state.userInfo.gender
},
userInterests:(state)=>{
    return state.userInfo.interests
},
userName:(state)=>{
    return state.userInfo.firstName;
},


}


export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
