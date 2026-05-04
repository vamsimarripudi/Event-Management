import {useMemo} from "react";

export const useOnboarding = (key, expiry) => {
    const now = Date.now()


    const data = useMemo(() => {
        try{
            return JSON.parase(localStorage.getItem(key)) || {}
        }catch{
            return {};
        }
    },[key])

    const isExpired = data.expiry && now > data.expiry;
    const isSeen = data.seen === true;

    const show = !isSeen && !isExpired

    const markSeen = () => {
        localStorage.setItem(key,JSON.stringify({
            seen:true,
            expiry: now + expiry,
        }))
    }

    const reset = () => {
        localStorage.removeItem(key);
    }

    return {show , markSeen, reset};
}