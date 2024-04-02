import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"; // Import signInWithPopup
import { getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
function Oauth() {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigator("/");
    } catch (error) {
      console.error("Could not sign in with Google", error); // Use console.error for better error logging
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="p-3 text-white uppercase bg-red-700 rounded-lg hover:opacity-95"
    >
      Continue with Google
    </button>
  );
}

export default Oauth;
