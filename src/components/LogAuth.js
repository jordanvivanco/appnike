import React, { useState } from "react";
import { getAuth, signOut, signInWithPopup } from "firebase/auth";
import { Button, Avatar } from '@mui/material';
import { google } from "../firebase";
import Links from "./Links";
import TopBar from "./TopBar";
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';

const LogAuth = () => {
const auth = getAuth();
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");
  const [displayname, setDisplayName] = useState("");
  const logingoogle = () => {
    signInWithPopup(auth, google)
    .then(respuesta => {
      console.log(respuesta.user);
      const user = respuesta.user;
      setEmail(user.email);
      setPhoto(user.photoURL);
      setDisplayName(user.displayName);
    }).catch(err => {
      console.log(err);
    })
  }
  const logoutgoogle = () => {
      signOut(auth).then(() => {
        setEmail("");
        setPhoto("");
        setDisplayName("");
      }).catch((error) => {
        // An error happened.
      });
  }
  

  return (
      <div>
        
        {
          email ? 
          (
            <div>
              <Avatar alt={displayname} src={photo} />
              {displayname}
              <br />
              {email}
              <br />
              <Button variant="outlined" onClick={logoutgoogle}>cerrar session</Button>

              <TopBar/>
              <Links/>
            </div>
            
          ) : (
            <center>
        <Typography variant="h4" gutterBottom>
        INICIAR SESION
        </Typography>
        <Button variant="contained" onClick={logingoogle}>iniciar session con google
          <GoogleIcon/>
        </Button>
        <br/>
        <p></p>
        </center>
          )
        }
      </div>
    )
}

export default LogAuth;