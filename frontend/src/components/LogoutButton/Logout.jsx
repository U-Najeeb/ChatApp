import { useNavigate } from 'react-router-dom'
import "./Logout.scss"

const Logout = () => {
  const navigate = useNavigate()
  const handleLogOut = () => {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <div>
      <button onClick={handleLogOut} className='logout--button'>Logout</button>
    </div>
  )
}

export default Logout