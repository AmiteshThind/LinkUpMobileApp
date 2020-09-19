import {firebaseDb} from 'boot/firebase'


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
setOnBoardingToComplete(state,value){
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
}
   

 
}

const actions = {
// calls mutaitons and handles backend calls

 setOnBoardingToComplete({commit}){
    commit('setOnBoardingToComplete',true)
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
fbReadData({commit}){
    //read data from firebase when user logins in 

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
}
    
}


export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
