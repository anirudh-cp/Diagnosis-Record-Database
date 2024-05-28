import useIdentStore from "./../../storages/IdentStore";
import { useState, useEffect } from "react";
import Unauthorized from "./Unauthorized";


export default function RequireAuth({ children, clearence }) {

    const { getGroup } = useIdentStore();
    const [status, setStatus] = useState(null);

    useEffect(() => {
        async function check() {
            let group = await getGroup();
            if (group === clearence) { setStatus(true); }
            else { setStatus(false) }

        }
        check()
    }, [])


    return (
        status !== null ? (
            status === true ?
                children :
                <Unauthorized text={"Only can login in to the website. Use app if not admin."} />
        ) :
            <></>
    )
}