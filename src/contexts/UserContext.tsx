import { createContext } from "react";

interface UserContextProps {
    firstName: string;
    lastName: string;
    email: string;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export default UserContext;