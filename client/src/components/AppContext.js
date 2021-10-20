import { createContext } from "react";

// to create a context and check if user is connected and has a token 
// so do not have to ask for token at every request
export const UidContext = createContext();