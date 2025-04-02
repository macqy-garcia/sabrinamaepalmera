import { createContext, useState, useContext } from 'react';

const NavigationContext = createContext();

export function NavigationProvider({ children }) {
  const [activeSection, setActiveSection] = useState('INDEX');
  
  return (
    <NavigationContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
