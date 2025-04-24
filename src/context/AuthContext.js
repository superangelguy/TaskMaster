import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved auth state in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing saved user data:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Ensure profile picture data is properly handled
    const userToSave = {
      ...userData,
      profilePicture: userData.profilePicture || null,
      lastUpdated: new Date().toISOString()
    };

    try {
      // Store in localStorage
      localStorage.setItem('user', JSON.stringify(userToSave));
      // Update state
      setUser(userToSave);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error saving user data:', error);
      // If storing with profile picture fails, try without it
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        const userWithoutPicture = {
          ...userToSave,
          profilePicture: null
        };
        localStorage.setItem('user', JSON.stringify(userWithoutPicture));
        setUser(userWithoutPicture);
        setIsAuthenticated(true);
      }
    }
  };

  const updateUser = (updates) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...updates,
      lastUpdated: new Date().toISOString()
    };

    try {
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating user data:', error);
      // If storing with profile picture fails, try without it
      if (error.name === 'QuotaExceededError' || error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
        const updatedUserWithoutPicture = {
          ...updatedUser,
          profilePicture: null
        };
        localStorage.setItem('user', JSON.stringify(updatedUserWithoutPicture));
        setUser(updatedUserWithoutPicture);
      }
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      loading, 
      login, 
      logout,
      updateUser 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 