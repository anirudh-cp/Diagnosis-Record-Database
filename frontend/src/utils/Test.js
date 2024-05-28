import { useState } from "react";
import GeneriAPI from '../API/GenericAPI';
import localforage from "localforage";


export default function useTest() {

    const [loading, setLoading] = useState(false);
    
    const apiObject = new GeneriAPI();

    return {

        loading, 

        async testFunc() {
            setLoading(true);
            const response = await apiObject.get('/api/recipe')
            setLoading(false);

            return response
        },
       
    }
}