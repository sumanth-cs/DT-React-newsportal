// import { createContext, useContext, useState, useEffect } from "react";

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const signIn = async (userData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const res = await fetch("/api/auth/signin", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(userData),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.message || "Sign in failed");
//         setLoading(false);
//         return false;
//       }

//       setCurrentUser(data);
//       localStorage.setItem("user", JSON.stringify(data)); // Store in local storage
//       setLoading(false);
//       return true;
//     } catch (err) {
//       setError("Something went wrong");
//       setLoading(false);
//       return false;
//     }
//   };

//   const signUp = async (values, navigate, toast) => {
//     try {
//       setLoading(true);
//       setErrorMessage(null);

//       const res = await fetch("/api/auth/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(values),
//       });

//       const data = await res.json();

//       if (data.success === false) {
//         setLoading(false);
//         toast({ title: "Sign up failed! Please try again." });
//         return setErrorMessage(data.message);
//       }

//       // Save user to localStorage and update state
//       localStorage.setItem("user", JSON.stringify(data.user));
//       setCurrentUser(data.user);
//       setLoading(false);

//       toast({ title: "Sign up Successful!" });
//       navigate("/dashboard"); // Redirect to dashboard after signup
//     } catch (error) {
//       setErrorMessage(error.message);
//       setLoading(false);
//       toast({ title: "Something went wrong!" });
//     }
//   };

//   const signOut = () => {
//     setCurrentUser(null);
//     localStorage.removeItem("user");
//   };

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setCurrentUser(JSON.parse(savedUser));
//     }
//   }, []);

//   return (
//     <UserContext.Provider
//       value={{ currentUser, loading, error, signIn, signOut }}
//     >
//       {children}
//     </UserContext.Provider>
//   );
// };

// // Custom hook to use user context
// export const useUser = () => useContext(UserContext);

import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on initial load
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) setCurrentUser(JSON.parse(user));
    setLoading(false);
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Sign in
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log("Backend Response:", data); // Debugging: Check the response

      if (data.success === false) {
        throw new Error(data.message);
      }

      setCurrentUser(data);
      setLoading(false);
      return data;
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error;
    }
  };

  // Sign up
  const signUp = async (username, email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (data.success === false) {
        throw new Error(data.message);
      }

      setLoading(false);
      return data; // Return success response
    } catch (error) {
      setError(error.message);
      setLoading(false);
      throw error; // Throw error
    }
  };

  // Sign out
  const signOut = () => {
    setCurrentUser(null);
  };

  return (
    <UserContext.Provider
      value={{ currentUser, loading, error, signIn, signOut, signUp }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);