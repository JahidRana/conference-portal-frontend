import React, { createContext, useContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, onAuthStateChanged, signOut } from 'firebase/auth';
import app from '../../../Pages/Login/firebase.config';
import AdminServices from '../../../Services/makeAdmin';
import ReviewerServices from '../../../Services/reviewerServices';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [loggedUser, setLoggedUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [admin, setAdmin] = useState(false);
    const [reviewer, setReviewer] = useState(false);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const checkAdmin = async (currentUser) => {
        if (currentUser) {
            try {
                const response = await AdminServices.getByEmail({ email: currentUser.email });
                // console.log("Admin check response:", response.data); // Debug log
                const isAdmin = response.data.some(item => item.email === currentUser.email);
                setAdmin(isAdmin);
            } catch (error) {
                console.error("Failed to check admin status:", error);
            }
        }
    }

    const checkReviewer = async (currentUser) => {
        if (currentUser) {
            try {
                const response = await ReviewerServices.getReviewerByEmail({ email: currentUser.email });
                // console.log("Reviewer check response:", response.data); // Debug log
                const isReviewer = response.data.some(item => item.email === currentUser.email);
                setReviewer(isReviewer);
            } catch (error) {
                console.error("Failed to check reviewer status:", error);
            }
        }
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // console.log("Auth state changed:", currentUser); // Debug log
            setLoggedUser(currentUser);
            if (currentUser) {
                await checkAdmin(currentUser);
                await checkReviewer(currentUser);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleSignIn = (provider) => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = {
        loggedUser,
        loading,
        createUser,
        signIn,
        googleSignIn,
        logOut,
        admin,
        reviewer
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
