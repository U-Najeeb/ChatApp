/* eslint-disable react/prop-types */
import "./Welcome.scss"
const Welcome = ({currentUser}) => {
  return (
    <div className="welcome--container">
        <div className="welcome--wrapper">
            <div className="welcome--box">
                Welcome <span className="username">{currentUser.username}!👋</span>
            </div>
            <div className="sub--heading-box">
                <p className="sub--heading">Select A Contact To Start A Chat</p>
            </div>
        </div>
    </div>
  )
}

export default Welcome