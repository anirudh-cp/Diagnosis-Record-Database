import { useState } from "react";
import API from "./../API/Auth"
import GeneriAPI from './../API/GenericAPI';
import localforage from "localforage";


export default function useAuth() {

    const [loading, setLoading] = useState(false);
    const [authStatus, setAuthStatus] = useState(false);
    
    const apiObject = new API();
    const genericAPIObject = new GeneriAPI();

    return {

        loading, authStatus, 

        async login(phone, password) {
            setLoading(true);
            const response = await apiObject.login(phone, password)
            setLoading(false);

            if (response['code'] === 200) {
                setAuthStatus(true);
                console.log(response.data)
                 await localforage.setItem('access_token', response.data.access);
				 await localforage.setItem('refresh_token', response.data.refresh);
            }

            return response
        },

        async logout() {
            setLoading(true);
            const refresh = await localforage.getItem('refresh_token');
            const response = await genericAPIObject.post('/user/logout', {"refresh": refresh})
            await localforage.clear()
            setLoading(false);
            return response
        },


       
    }
}