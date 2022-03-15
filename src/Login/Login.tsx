import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { authentication } from "../Firebase/Firebase";

function SignIn() {
  const navigate = useNavigate();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(authentication, provider)
      .then((re: any) => {
        if (re) {
          navigate("/");
        }
        document.cookie = "name=harsh; max-age = 86400";
      })
      .catch((err: any) => {
        console.log(err);
      });
  };

  return (
    <div className="mainContainer">
      <h2>Sign In with Google</h2>
      <button onClick={signInWithGoogle}>Google Sign In</button>
    </div>
  );
}

export default SignIn;
