import { useContext } from "react"
import { UserContext } from "../../contexts/user_context"
import useIsAuthenticated from "./hooks/is_authenticated"

export default function Profile() {
  const user = useContext(UserContext)
  const isAuthenticated = useIsAuthenticated()

  if (isAuthenticated) {
    return (
      <>
      {user.session.user.email}
      </>
    )
  } else {
    return null
  }
}