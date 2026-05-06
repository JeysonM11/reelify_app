/* eslint-disable react-refresh/only-export-components */
import { useApp } from "./AppContext";

export const UserProvider = ({ children }) => children;

export const useUser = () => useApp();
