import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./App.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Pokemon from "./Pokemon";
// import { dividerClasses } from "@mui/material";

function App() {
  
  const [detail, setDetail] = useState({
    title: "",
    imgsrc: "",
  });
  const names = useRef([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    // alert("hi");
    async function getdata() {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0`
      );

      console.log(res.data.results);

      const namearr = await res.data.results.map((arrEle, index) => {
        const obj = arrEle;
        // console.log(obj);
        // console.log(obj.name);
        return obj.name;
        // console.log(obj.name);
      });
      console.log("namearr", namearr);
      names.current.value = namearr;
      setOptions(namearr);
      //  return namearr;
      // console.log('names.current.value', names.current.value);
    }

    getdata();
  }, []);

  const HandleChange = (event, newname) => {
    console.log(event.target.value);
    console.log(newname);
    // const title = event.target.value;

    // setName((prevdata)=>{
    //   return {}
    // });
    setDetail((prevdata) => {
      return { ...prevdata, title: newname };
    });
  };

  return (
    <>
      <div className="centerdiv">
        <h1>This is {detail.title}</h1>
        <Autocomplete
          value={detail.title}
          onChange={HandleChange}
          disablePortal
          id="combo-box-demo"
          options={options}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Pokemon" />}
        />
        <div className="pokemon">
          <Pokemon title={detail.title} />
        </div>
        {/* <select onChange={HandleChange} value={name}>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="25">25</option>
      </select> */}
      </div>
    </>
  );
}

export default App;
