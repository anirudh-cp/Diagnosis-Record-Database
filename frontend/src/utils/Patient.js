import { useState } from "react";
import GeneriAPI from '../API/GenericAPI';
import { useNavigate } from "react-router-dom";


export default function usePatient() {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const apiObject = new GeneriAPI();

    return {

        loading,

        async get(page, page_size) {

            setLoading(true);
            const response = await apiObject.get('/api/patient', { 'page': page, 'page_size': page_size })
            setLoading(false);

            if (response.code === -2) {
                navigate("/");
            }

            return response
        },


        async remove(uuid) {

            setLoading(true);
            const response = await apiObject.delete('/api/patient/' + uuid);
            setLoading(false);

            if (response.code === -2) {
                navigate("/");
            }

            return response
        },

    }
}