import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => setIsEditMode(prev => !prev);

    return (
        <AppContext.Provider value={{ isEditMode, toggleEditMode }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
