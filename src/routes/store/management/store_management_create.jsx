import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { SupabaseClient, UserContext } from "../../../contexts/user_context";
import { useContext, useState } from "react";
import SDK from "../../../api_sdk/sdk";

export default function StoreManagementCreate() {
  const auth = useContext(UserContext)
  const supabase = useContext(SupabaseClient)
  const [storeName,setStoreName] = useState('')
  const sdk = new SDK(SupabaseClient)

  function createStore() {
    if(storeName) {
      sdk.storeManagementCreate(auth.session.user.id,storeName).then(function(response){
        console.log(response)
      }).catch(function(reason){
        console.log(reason)
      })
    }
  }

  return (
    <>
    <div>
      <Card title="Create Store" style={{maxWidth:"700px",margin:"auto"}}>
        <div style={{display:"flex",flexDirection:"column",gap:"24px",alignItems:"center",margin:"16px 0"}}>
          <FloatLabel>
            <InputText id="name" type="text" placeholder="Store Name" />
            <label htmlFor="name">Store Name</label>
          </FloatLabel>
          <Button label="Create" onClick={createStore} />
        </div>
      </Card>
    </div>
    </>
  )
}