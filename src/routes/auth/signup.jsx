import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import {FloatLabel} from "primereact/floatlabel";
import { Button } from "primereact/button";
import { useContext, useRef, useState } from "react";
import { SupabaseClient, UserDispatch } from "../../contexts/user_context";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";
import { BlockUI } from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";

export default function SignUp() {
  const [credentials,setCredentials] = useState({
    email:'',
    password:'',
    loading:false,
  })
  const supabase = useContext(SupabaseClient)
  const userDispatch = useContext(UserDispatch)
  const toastRef = useRef(null)
  const navigate = useNavigate()

  async function signup() {
    setCredentials({...credentials,loading:true})
    const {data,error} = await supabase.auth.signUp({
      email:credentials.email,
      password:credentials.password
    })
    if(data) {
      if (data.user) {
        toastRef.current.show({severity:'success',summary:'Sign up success',detail:`User ${data.user.email} successfully created! enjoy shopping.`})
      }
      if (data.session) {
        userDispatch({
          type:'set-session',
          session:data.session
        })
        navigate("/")
      }
    }
    if(error) {
      toastRef.current.show({severity:'error',summary:error.code,detail:error.message})
      console.log(error.message)
    }
    setCredentials({...credentials,loading:false})
  }

  return (
    <>
    <BlockUI blocked={credentials.loading} template={(<ProgressSpinner />)}>
      <br/>
      <Card style={{maxWidth:"500px", margin:"auto"}} title={(<div style={{textAlign:"center"}}>Sign Up</div>)}>
        <div style={{display:"flex",flexDirection:"column",gap:"24px",alignItems:"center",margin:"16px 0"}}>
          <FloatLabel>
            <InputText id="email" type="email" keyfilter="email" placeholder="E-mail" 
            value={credentials.email} 
            onChange={function(e){
              setCredentials({
                ...credentials,
                email:e.target.value
              })
            }} />
            <label htmlFor="email">E-mail</label>
          </FloatLabel>
          <FloatLabel>
            <Password id="password" placeholder="Password" 
            value={credentials.password}
            onChange={function(e){
              setCredentials({
                ...credentials,
                password:e.target.value
              })
            }}/>
            <label htmlFor="passowrd">Password</label>
          </FloatLabel>
          <Button label="Sign Up" icon="pi pi-user-plus" 
          onClick={signup}/>
        </div>
      </Card>
    </BlockUI>
    <Toast ref={toastRef} />
    </>
  )
}