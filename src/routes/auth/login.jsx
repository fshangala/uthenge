import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import {FloatLabel} from "primereact/floatlabel";
import { Button } from "primereact/button";
import useIsUnauthenticated from './hooks/is_unauthenticated';
import { useContext, useRef, useState } from "react";
import { SupabaseClient, UserDispatch } from "../../contexts/user_context";
import { Toast } from "primereact/toast";
import {BlockUI} from "primereact/blockui";
import { ProgressSpinner } from "primereact/progressspinner";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [credentials,setCredentials] = useState({
    email:'',
    password:'',
    loading:false,
  })
  const unauthenticated = useIsUnauthenticated()
  const supabase = useContext(SupabaseClient)
  const userDispatch = useContext(UserDispatch)
  const toastRef = useRef(null)
  const navigate = useNavigate()

  async function signin() {
    setCredentials({...credentials,loading:true})
    const {data,error} = await supabase.auth.signInWithPassword({
      email:credentials.email,
      password:credentials.password,
    })
    if(data){
      if(data.session){
        toastRef.current.show({severity:'success',summary:'Login success'})
        if (data.session) {
          userDispatch({
            type:'set-session',
            session:data.session
          })
          navigate("/")
        }
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
      <Card style={{maxWidth:"500px", margin:"auto"}} title={(<div style={{textAlign:"center"}}>Login</div>)}>
        <div style={{display:"flex",flexDirection:"column",gap:"24px",alignItems:"center",margin:"16px 0"}}>
          <FloatLabel>
            <InputText id="email" type="email" keyfilter="email" placeholder="E-mail"
            value={credentials.email}
            onChange={function(e){
              setCredentials({
                ...credentials,
                email:e.target.value,
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
                password:e.target.value,
              })
            }} />
            <label htmlFor="passowrd">Password</label>
          </FloatLabel>
          <Button label="Login" icon="pi pi-lock"
          onClick={signin} />
        </div>
      </Card>
    </BlockUI>
    <Toast ref={toastRef} />
    </>
  )
}