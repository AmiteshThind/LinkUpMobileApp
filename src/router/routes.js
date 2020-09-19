
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/home', component: () => import('pages/HomePage.vue')} ,
       { path: '/challenges', component: () => import('pages/ChallengesPage.vue')} ,
        {path: '/messages', component: () => import('pages/MessagesPage.vue')} ,
        {path: '/profile', component: () => import('pages/ProfilePage.vue')} ,
         {path: '/', component: () => import('pages/LoginPage.vue')},
           {path: '/OB', component: () => import('pages/OnBoardingPage.vue')},
             {path: '/SignUp', component: () => import('pages/SignUpPage.vue')} 
    
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
