import { createContext, useState } from "react";

export const AppContext = createContext(null);


function Context({ children }) {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
  
    return (
      <AppContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        {children}
      </AppContext.Provider>
    );
  }


  export default Context