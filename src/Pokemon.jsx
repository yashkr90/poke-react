import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import pokeball from "./pokeball.svg"

const Pokemon=(props)=>{

    const [imgsrc,setimgsrc]= useState(pokeball);

    useEffect(()=>{
        async function getimage(){

            const res=await axios.get(`https://pokeapi.co/api/v2/pokemon/${props.title}`);

            let img=res.data.sprites.other.dream_world.front_default;
            console.log(img);
            setimgsrc(img);
        }


        getimage();
    })

    return (<>
        <img src={imgsrc} alt="mypic" width={"200"} />
    </>)
}

export default Pokemon;