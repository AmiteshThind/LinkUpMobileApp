const state = {
drawerOpen:false,
onBoardingPageActive:0
}

const mutations = {
// updating states
updateDrawerState(state){
    state.drawerOpen = !state.drawerOpen
       console.log('wowe')

},

nextOnBoardingPageActive(state){
   
    state.onBoardingPageActive+=1;
   
    
},

resetOnBoardingPageToStart(state){
     state.onBoardingPageActive=0;
}

}

const actions = {
// calls mutaitons and handles backend calls

updateDrawerState({commit}){
    commit("updateDrawerState")
  
},

nextOnBoardingPageActive({commit}){
    commit("nextOnBoardingPageActive");
},
resetOnBoardingPageToStart({commit}){
    commit("resetOnBoardingPageToStart");
}

}

const getters = {
// retrieving data 
    drawerOpen : (state)=>{
        return state.drawerOpen;
    },
    onBoardingPageActive:(state)=>{
        return state.onBoardingPageActive;
    }
}


export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}
