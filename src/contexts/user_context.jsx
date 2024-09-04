import { createClient } from "@supabase/supabase-js";
import { createContext, useEffect, useReducer } from "react";
import { ProgressSpinner } from 'primereact/progressspinner';

export const UserContext = createContext(null)
export const UserDispatch = createContext(null)
export const SupabaseClient = createContext(null)

function userReducer(state,action) {
  switch (action.type) {
    case 'set-session':
      return {
        ...state,
        session:action.session,
        authentication_loading:false,
      }
  
    default:
      break;
  }
}

export default function UserProvider({children}) {
  const [userState,dispatch] = useReducer(userReducer,{
    session:null,
    authentication_loading:true,
  })
  const supabase = createClient('https://pdpsjfzdzajvdlioooct.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBkcHNqZnpkemFqdmRsaW9vb2N0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTE2NTcwMjYsImV4cCI6MjAyNzIzMzAyNn0.21vFao5IQUpi09FbLkmeO-zlQo0lD4NX5sB-VMKbZr8')

  useEffect(function(){
    supabase.auth.getSession().then(function({data:{session}}){
      dispatch({
        type:"set-session",
        session:session,
      })
    })

    const {data:{subscription}} = supabase.auth.onAuthStateChange(function(_event,session){
      dispatch({
        type:"set-session",
        session:session,
      })
    })

    return function(){
      subscription.unsubscribe()
    }
  },[])

  return (
    <SupabaseClient.Provider value={supabase}>
      <UserContext.Provider value={userState}>
        <UserDispatch.Provider value={dispatch}>
          {userState.authentication_loading?(
          <div style={{textAlign:"center"}}>
            <ProgressSpinner />
          </div>
          ):children}
        </UserDispatch.Provider>
      </UserContext.Provider>
    </SupabaseClient.Provider>
  )
}