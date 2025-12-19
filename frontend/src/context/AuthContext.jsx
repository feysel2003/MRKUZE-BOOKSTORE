import {  createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import { 
    createUserWithEmailAndPassword, 
    GoogleAuthProvider, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    signOut,
    sendPasswordResetEmail // 1. IMPORT THIS
} from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

const googleProvider = new GoogleAuthProvider();

// authProvider
export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // register a user
    const registerUser = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    // login the user
    const loginUser = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password)
    }

    // sign up with google
    const signInWithGoogle = async () => {
        return await signInWithPopup(auth, googleProvider)
    }

    // logout the user
    const logout = () => {
        localStorage.removeItem('token'); // Clear Admin Token
        localStorage.removeItem('role');  // Clear Admin Role
        return signOut(auth);             // Sign out from Firebase
    }

    // 2. ADD RESET PASSWORD FUNCTION
    const resetPassword = async (email) => {
        return await sendPasswordResetEmail(auth, email);
    }

    // manage user
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
            
            // Removed unused 'userData' block here for cleaner code
        })
        return () => unsubscribe();
    }, [])

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logout,
        resetPassword // 3. EXPORT IT HERE
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}