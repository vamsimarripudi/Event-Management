import toast from "react-hot-toast";

const apiRequest = async( url,options= {},customMessages={}) => {
    const {loading = "Loading...." , success ="success"} = customMessages

    const toastId = toast.loading(loading);
    const token = localStorage.getItem("token")
    try{
        const response = await fetch(url,{
                ...options,
            headers: {
                "Content-Type": "application/json",
                Authorization:token ? `Bearer ${token}` : "",
                ...(options.headers || {}),
            },
        });
        let data = {}

        try{
            data = await response.json()

      
        }catch{
            data = {}
        }
        if(!response.ok){
            const errorMessage =  data.message || "Something went wrong";

            toast.error(errorMessage,{
                id:toastId,
            })
            throw new Error(errorMessage)
        }
        toast.success(success,{
            id:toastId
        });

       return data;
    }catch(err){
            toast.error(err.message || "Network Error",{
                id:toastId,
            })
            throw err;
    };

}

export default apiRequest