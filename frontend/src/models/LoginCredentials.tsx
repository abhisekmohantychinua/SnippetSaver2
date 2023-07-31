import React from "react";

export interface LoginCredentials {
    token: string,
    setToken: React.Dispatch<React.SetStateAction<string>>,
    loggedIn: boolean,
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}