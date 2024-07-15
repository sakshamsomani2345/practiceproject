import React from 'react'
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
function OAuth() {
    const auth = getAuth(app)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleGoogleClick = async () =>{
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        try {
            const resultsFromGoogle = await signInWithPopup(auth, provider)
            const res = await fetch('http://localhost:4000/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: resultsFromGoogle.user.displayName,
                    email: resultsFromGoogle.user.email,
                    googlePhotoUrl: resultsFromGoogle.user.photoURL,
                }),
                })
            const data = await res.json()
            if (res.ok){
                dispatch(signInSuccess(data))
                navigate('/')
            }
            console.log(resultsFromGoogle);
        } catch (error) {
            console.log(error);
        }
    } 
  return (
    <div>
      <button
              style={{
                marginLeft: "20px",
                marginBottom:"10px",
                borderRadius: "10px",
                fontWeight: "bold",
                fontSize: "15px",
                color: "black",
                paddingLeft:"30px",
                padding:"10px",
                backgroundColor:"white",
                border: "1px solid red",
                width:"300px"
              }}
            //   className="signinbutton"
              type="submit"
            //   disabled={loading}
            >Continue with google</button>
    </div>
  )
}

export default OAuth
