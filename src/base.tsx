import {useState,useEffect} from "react";


function Base(){
    const [data,storedata]=useState("");
    let name:string="chaithanya"
    async function fetchapi(){
        try {
            const response=await fetch("https://api.artic.edu/api/v1/artworks?page=1");
            const data=await response.json()
            storedata(data)
            console.log(data.data)
        
        }
         catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchapi()
    },[])
    return(
        <>
        <p>{name}</p>
        </>
    )
}
export default Base