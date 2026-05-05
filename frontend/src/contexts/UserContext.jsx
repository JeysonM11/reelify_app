import { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [usuarioId] = useState("69fa61fe3f945f2e2545929a");
  const [usuario, setUsuario] = useState(null);

  return (
    <UserContext.Provider value={{ usuarioId, usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de UserProvider");
  }
  return context;
};
