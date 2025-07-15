import React, { Children, use, useEffect } from 'react'
import {Button} from '@/components/ui/button'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Auth from "./pages/auth";
import Chat from "./pages/chat";
import Profile  from "./pages/profile";
import apiClient from '@/lib/api-client';
import useAppStore from './store';
import { GET_USER_INFO } from '@/utils/constants';
import { useState } from 'react';

const PrivateRoute = ({children}) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo?.email;
  return isAuthenticated ? children : <Navigate to="/auth" />;
}

const AuthRoute = ({children}) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo?.email;
  return isAuthenticated ? <Navigate to="/chat" />:children ;
}

const App = () => {
  const {userInfo, setUserInfo} = useAppStore();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
   const getUserData = async () => {
     try{
      const response = await apiClient.get("/api/auth/user-info",{withCredentials: true});
      if(response.status === 200 && response.data.userData) {
        setUserInfo(response.data.userData);
      }
      else {
        setUserInfo(null);
      }
      console.log(response.data.userData);
      setUserInfo(response.data.userData);
     }catch(error){
       console.log({error});
       setUserInfo(null);
     } finally {
      setLoading(false); 
    }
   }
     getUserData();
  }, []);

  if (loading) {
  return <div>Loading...</div>;
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={
          <AuthRoute>
            <Auth />
          </AuthRoute>} />
        <Route path="/chat" element={
          <PrivateRoute>
            <Chat />
          </PrivateRoute>} />
        <Route path="/profile" element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>} />

        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App