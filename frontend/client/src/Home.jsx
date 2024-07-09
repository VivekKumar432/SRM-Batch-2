import React, { useEffect } from "react";
import { useFetcher } from "react-router-dom";
import axios from 'axios'

function Home() {
    useEffect(() => {
        axios.get('http://localhost:3001/home')
        .then(result => {console.log(result)
            if(result.data !== "Success") {
                // navigator('/login')
            }
        })
        .catch(err => console.log(err))
    }, [])
    return(
        <h2>WELCOME TO THE HOME</h2>
    )
}

export default Home;