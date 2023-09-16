import Vue from 'vue'
import Vuex from 'vuex'
import { supabase } from '@/clients/supabase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    localLogin: false,
    userEmail: ''
  },
  mutations: {
    setLocalLogin(state, email) {
      state.localLogin = true
      state.userEmail = email
    },
    clearLocalLogin(state) {
      state.localLogin = false
      state.userEmail = ''
    },
    // setLoggedIn: (state, value) => {
    //   state.localLogin = value;
    //   localStorage.setItem("localLogin_Item", value); // Save to local storage
    // },
  },
  actions: {
    async login({ commit }, { email, password, router }) {
      // Perform the login action here, e.g. by calling a Supabase login function
      // alert('Action Coming---------------->')
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
      })
      if (error) {
        console.log(error)
        // console.log('login 20230602 --- error',error.message)
        alert('Email or password not correct')
      }
      else {
        console.log(data)
        // console.log('from Action----->')
        commit('setLocalLogin', data.session.user.email)
        // localUser.data.session.user.email
        // router.push('/contacts')
        const currentRoute = router.currentRoute;
        if (currentRoute.path !== "/contacts") {
          router.push("/contacts"); // Navigate to the login page
        }

      }
    },

    async logout({ commit }, { router }) {
      // Perform the logout action here, e.g. by calling a Supabase logout function
      const error = await supabase.auth.signOut();
      // console.log(error)
      if (error.error === null) {
        // console.log('logout ok')
        commit('clearLocalLogin')
        // router.push('/login')
        const currentRoute = router.currentRoute;
        if (currentRoute.path !== "/login") {
          router.push("/login"); // Navigate to the login page
        }
      }
      else {
        console.log(error)
      }
    },

    async loadStateFromLocalStorage({ commit }) {
      const { data, error } = await supabase.auth.getSession();
      // localUser = await supabase.auth.getSession();
      // console.log('Get or not????????????????')
      // if (localUser.data.session) {
      //   console.log('it is OK?')
      //   commit('setLocalLogin');
      // } else {
      //   console.log('not signin')
      //   commit('clearLocalLogin')
      // }
      if (error) {
        // console.log('error------------->')
        console.log(error)
      } else {
        // console.log('NO error------------->')
        // console.log(data.session)
        // console.log(localUser)
        if (data.session) {
          // commit('setLocalLogin')
          commit('setLocalLogin', data.session.user.email)
        } else {
          commit('clearLocalLogin')
        }
      }
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.localLogin
    },
    whichUser(state) {
      return state.userEmail
    }
  }
})