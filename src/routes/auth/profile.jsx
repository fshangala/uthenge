import { useContext, useRef } from "react"
import { UserContext } from "../../contexts/user_context"
import useIsAuthenticated from "./hooks/is_authenticated"
import {Card} from 'primereact/card'
import {Button} from 'primereact/button'
import { Menu } from "primereact/menu"
import { useNavigate } from "react-router-dom"

export default function Profile() {
  const user = useContext(UserContext)
  const isAuthenticated = useIsAuthenticated()
  const profileMenuRef = useRef(null)
  const navigate = useNavigate()

  const menuItems = [
    {
      label:"Manage Stores",
      icon:"pi pi-shop",
      command: function() {
        navigate("/profile/stores/")
      }
    }
  ]

  function titleSection() {
    const profileMenuItems = [
      {
        label:"Update Profile"
      }
    ]
    return (
      <div style={{display:"flex",alignItems:"center"}}>
        <div style={{flexGrow:1}}>
          {user.session.user.email}
        </div>
        <div style={{display:"flex",justifyContent:"end"}}>
          <Button label="i" onClick={function(e){
            profileMenuRef.current.toggle(e)
          }} aria-controls="profile-popup-menu" aria-haspopup />
          <Menu model={profileMenuItems} ref={profileMenuRef} id="profile-popup-menu" popupAlignment="right" popup />
        </div>
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div>
        <Card title={titleSection()} style={{maxWidth:"700px",margin:"auto"}}>
          <div>
            <Menu model={menuItems} style={{width:"100%"}} />
          </div>
        </Card>
      </div>
    )
  } else {
    return null
  }
}