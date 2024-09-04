import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import {FloatLabel} from "primereact/floatlabel";
import { Button } from "primereact/button";
import useIsUnauthenticated from './hooks/is_unauthenticated';

export default function Login() {
  const unauthenticated = useIsUnauthenticated()
  return (
    <>
    <br/>
    <Card style={{maxWidth:"500px", margin:"auto"}} title={(<div style={{textAlign:"center"}}>Login</div>)}>
      <div style={{display:"flex",flexDirection:"column",gap:"24px",alignItems:"center",margin:"16px 0"}}>
        <FloatLabel>
          <InputText id="email" type="email" keyfilter="email" placeholder="E-mail" />
          <label htmlFor="email">E-mail</label>
        </FloatLabel>
        <FloatLabel>
          <Password id="password" placeholder="Password" />
          <label htmlFor="passowrd">Password</label>
        </FloatLabel>
        <Button label="Login" icon="pi pi-lock" />
      </div>
    </Card>
    </>
  )
}