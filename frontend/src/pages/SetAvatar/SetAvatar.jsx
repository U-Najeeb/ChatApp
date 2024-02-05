// import { useNavigate } from "react-router-dom";
// import styled from "styled-components";
// import SnackBarContext from "../../context/SnackBarContext";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { setAvatarRoute } from "../../utils/apiRoutes";

// const SetAvatar = () => {
//   const api = "https://api.multiavatar.com/45648946";
//   const navigate = useNavigate();

//   const [avatars, setAvatars] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedAvatar, setSelectedAvatar] = useState(undefined);


//   const setProfilePicture = async () => {};
//   useEffect(() => {

//     const fetchImages = async () =>{
//         const data = [];
//         for (let i = 0; i < 4; i++) {
//           const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}`);
//           data.push(image);
//         }
//         setAvatars(data)
//         setIsLoading(false)
//     }
//     fetchImages()
//   }, []);
//   const encodeSVG = (svgString) => `data:image/svg+xml;base64,${svgString}`;

//   return (
//     <>
//       <Container>
//       <div className="title--container">
//         <h1>Pick an avatar for your profile</h1>
//       </div>
//       <div className="avatars">
//         {avatars.map((avatar, index) => (
//           <div key={index}>
//             <img src={encodeSVG(avatar)} alt={`Avatar ${index}`} width={"2rem"} />
//           </div>
//         ))}
//       </div>
//       </Container>
//     </>
//   );
// };
// const Container = styled.div``;

// export default SetAvatar;
