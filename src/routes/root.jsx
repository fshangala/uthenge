import { Button } from "primereact/button"
import { Menu } from "primereact/menu"
import { Menubar } from "primereact/menubar"
import { useContext, useReducer, useRef } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { SupabaseClient, UserContext } from "../contexts/user_context"
import { Toast } from "primereact/toast"
import { BlockUI } from "primereact/blockui"
import { ProgressSpinner } from "primereact/progressspinner"

function rootReducer(state,action) {
  switch (action.type) {
    case 'set-loading':
      return {
        ...state,
        loading:action.loading,
      }
  
    default:
      break;
  }
}

export default function Root() {
  const user = useContext(UserContext)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()
  const supabase = useContext(SupabaseClient)
  const toastRef = useRef(null)
  const [componentState,dispatch] = useReducer(rootReducer,{
    loading:false,
  })

  async function signout() {
    dispatch({type:'set-loading',loading:true})
    const {error} = await supabase.auth.signOut()
    if(error) {
      toastRef.current.show({severity:'error',summary:error.code,detail:error.message})
      console.log(error.message)
    }
    dispatch({type:'set-loading',loading:false})
  }

  const menuItems = [
    {
      label:"Products",
      icon:"pi pi-cart-arrow-down"
    },
    {
      label:"Stores",
      icon:"pi pi-shop"
    }
  ]

  const popupMenuItems = [
    {
      label:"Login",
      icon:"pi pi-lock",
      command: function(){
        navigate("/login/")
      }
    },
    {
      label:"Signup",
      icon:"pi pi-user-plus",
      command: function(){
        navigate("/signup/")
      }
    }
  ]
  const authenticatedPopupMenuItems = [
    {
      label:"Profile",
      icon:"pi pi-user",
      command: function(){
        navigate("/profile/")
      }
    },
    {
      label:"Logout",
      icon:"pi pi-sign-out",
      command: function() {
        signout()
      }
    }
  ]

  const menuEnd = (
    <div>
      <Button style={{background:"none",border:"none",color:"white"}} icon="pi pi-user" label={user.session?user.session.user.email:'Guest'} onClick={function(e){
        userMenuRef.current.toggle(e)
      }} aria-controls="user-popup-menu" aria-haspopup />
      <Menu model={user.session?authenticatedPopupMenuItems:popupMenuItems} popup ref={userMenuRef} id="user-popup-menu" popupAlignment="right" />
    </div>
  )

  return (
    <>
    <BlockUI blocked={componentState.loading} template={(<ProgressSpinner />)}>
      <Menubar model={menuItems} end={menuEnd} />
      <main>
        <Outlet />
      </main>
    </BlockUI>
    <Toast ref={toastRef} />
    </>
  )
}