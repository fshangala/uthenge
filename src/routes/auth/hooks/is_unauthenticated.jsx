import { useContext, useEffect } from "react";
import { UserContext } from "../../../contexts/user_context";
import { useNavigate } from "react-router-dom";

export default function useIsUnauthenticated() {
  const user = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(function(){
    if(user.session) {
      navigate("/")
    }
  })

  return user.session === null
}