import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../main";
import { useNavigate } from "react-router-dom";

/**
 * Hook to check authentication status and redirect if not authenticated properly
 * @param authRequired Is authentication required to access this page
 * @param redirectToDashboard Will this page redirect to dashboard - requires a user to be logged in
 * @param callback Function executes after authentication checks if no redirection
 */
function useRequireAuth(authRequired: boolean = false, redirectToDashboard: boolean = false, callback?: () => (void | (() => void))) {
    const navigate = useNavigate();
    useEffect(() => {
        // redirects to different pages depending on auth status

        let unsubfunction: void | (() => (void));

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // authentication is required but user is not authenticated
            if (authRequired && !user) {
                navigate("/login");
                return;
            }

            // if the page wants to redirect to the dashboard if a user is logged in
            // ie. the login page redirects if the user is alread logged in
            if (redirectToDashboard && user) {
                navigate("/dashboard")
                return;
            }

            // if there is a callback function, execute it
            if (callback) {
                unsubfunction = callback();
            }
        })


        return () => { 
            if (unsubfunction) {
                unsubfunction();
            }
            unsubscribe() }
    }, [])
}

// TODO: test this as well
export default useRequireAuth;