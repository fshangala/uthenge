import { Button } from "primereact/button"
import { Menu } from "primereact/menu"
import { Menubar } from "primereact/menubar"
import { useContext, useRef } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/user_context"

export default function Root() {
  const user = useContext(UserContext)
  const userMenuRef = useRef(null)
  const navigate = useNavigate()

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
      icon:"pi pi-sign-out"
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
    <Menubar model={menuItems} end={menuEnd} />
    <main>
      <Outlet />
    </main>
    </>
  )
}