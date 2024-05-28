import create  from 'zustand'
import { Buffer } from 'buffer';

import localforage from "localforage";


const useIdentStore = create(set => ({
    hideUserOptions: true,

    setHideUserOptions: (hideUserOptions_) => set(state => ({ hideUserOptions: hideUserOptions_ })),

    getGroup: async () => {
        try {
            let token = await localforage.getItem('access_token')
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64'))['group']
        } catch (e) { }
        return ""
    },


    getUUID: async () => {
        try {
            let token = await localforage.getItem('access_token')
            return JSON.parse(Buffer.from(token.split('.')[1], 'base64'))['user_id']
        } catch (e) { }
        return ""
    },

}))

export default useIdentStore;