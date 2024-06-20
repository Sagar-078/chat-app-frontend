import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  // console.log("token at open route =>>", token);

  if (token === null || token === undefined) {
    return children
  } else {
    return <Navigate to="/dashboard" />
  }
}

export default OpenRoute