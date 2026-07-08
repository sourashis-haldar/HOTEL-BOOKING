import React from 'react'
import { useAppContext } from '../context/AppContext';
import { useAuth } from "@clerk/clerk-react";
import { Navigate } from 'react-router-dom';
function Dashboard_protect({children}) {
const { isSignedIn }=useAuth();
const { isowner } = useAppContext();
if(!isSignedIn){
 return <Navigate to={'/'} replace/>
}
if(!isowner){
   return <Navigate to={'/'} replace/>
}

  return children;
}

export default Dashboard_protect;