/*
export default function ({ isServer, store, req }) {
   // If nuxt generate, pass this middleware
  if (isServer && !req) return

    try {
//        if(!isServer && !!window) {
        if(!process.server && !!window) {
//            const token = window.localStorage.getItem("jwt-token")
//            if(token)
//                store.commit('user/setLoggedUserJWT', token)
//            store.commit('user/incCounter')
        }
    }
    catch(e) {
        console.log(e);
    }

}
*/
