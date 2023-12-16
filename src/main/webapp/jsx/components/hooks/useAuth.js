 import { useState, useEffect } from 'react';
 import axios from 'axios';
 import { token, url } from "../../../api";

 const useAuth = () => {
   const [userDetails, setUserDetails] = useState(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);

   useEffect(() => {
     const fetchUserDetails = async () => {
       try {

         const response = await axios.get(`${url}account`, {
           headers: { Authorization: `Bearer ${token}` },
         });

         setUserDetails(response.data);
       } catch (error) {
         setError(error);
       } finally {
         setLoading(false);
       }
     };

     fetchUserDetails();
   }, []);

   return { userDetails, loading, error };
 };

 export default useAuth;
