import { createContext, useState, useEffect, useContext } from "react";

export const CurrentUserContext = createContext(); // Changed to CurrentUserContext

function CurrentUserProvider({ children }){

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const getLoggedInUser = async () => {
            try {
                let response = await fetch('http://localhost:5001/authentication/profile', {
                    // headers: {
                    //     'Authorization': `Bearer ${localStorage.getItem('token')}`
                    // },
                    credentials: 'include'
                });
                if (response.ok) {
                    let user = await response.json();
                    setCurrentUser(user);
                } else {
                    console.error('Failed to fetch user');
                    setCurrentUser(null);
                }
            } catch (error) {
                console.error('Error fetching user:', error);
                setCurrentUser(null);
            }
        };
        getLoggedInUser();
    }, []);

    console.log('Context state: ', currentUser);

    return (
        <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </CurrentUserContext.Provider>
    );
}

export default CurrentUserProvider;

export const useCurrentUser = () => {
    return useContext(CurrentUserContext);
};
