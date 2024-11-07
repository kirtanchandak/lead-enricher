import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../../lib/firebase";
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/lead");
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold text-gray-800">LeadEnrich</span>
          </div>
          <div className="flex items-center">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="flex gap-2 items-center text-sm text-gray-700">
                  <img
                    className="w-8 rounded-full"
                    src={user.photoURL ?? ""}
                    alt="user-img"
                  />
                  {user.displayName}
                </span>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </div>
            ) : (
              <button onClick={handleGoogleLogin} className="hover:underline">
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
