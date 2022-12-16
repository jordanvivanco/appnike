import React, { useState, useEffect } from "react";
import { db } from "../firebase"
import { Button, FormControl, Grid, TextField } from '@mui/material';
import { addDoc, collection, doc, updateDoc, onSnapshot } from "firebase/firestore";

const LinksForm = (props) => {

    const [ currentstateId, setCurrentstateId ] = useState("");

    const valuesinitial = {
        url:"",
        name:"",
        description:""
    };

    const [values, setValues] = useState(valuesinitial);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
    }

    const getLinkById = async (id) => {
        onSnapshot(doc(db, "links", props.currentId), (doc) => {
            setValues(doc.data());
        });
    }

    useEffect(() => {
        try {
            if (props.currentId === "") {
                setValues({...valuesinitial});
            } else {
                setCurrentstateId(props.currentId);
                getLinkById(currentstateId);
            }
        } catch (error) {
        }
        
    }, [props.currentId]);

    const handleSubmit = e => {
        e.preventDefault();
        addLinks();
    }

    const addLinks = async () => {
        if (currentstateId === ""){
            await addDoc(collection(db, "links"), {
                url: values.url,
                name: values.name,
                description: values.description}
            );
            setValues({...valuesinitial});
        } else {
            const doclink = doc(db, "links", props.currentId);
            await updateDoc(doclink, {
                url: values.url,
                name: values.name,
                description: values.description
            });
            setCurrentstateId("");
            setValues({...valuesinitial});
        }
        
    }

    return (
        <FormControl>
            <Grid>
                <TextField 
                type="text" 
                id="standard-helperText"
                label="Url"
                helperText="Write Url"
                variant="standard"
                placeholder="https//someurl.com" 
                name="url"
                value={values.url}
                onChange={handleInputChange}/>
            </Grid>
            <Grid>
                <TextField 
                type="text" 
                id="standard-helperText"
                label="Name"
                helperText="Write Name"
                variant="standard"
                placeholder="some name" 
                name="name"
                value={values.name}
                onChange={handleInputChange}/>
            </Grid>
            <Grid>
                <TextField 
                name="description"

                multiline 
                placeholder="write description"
                onChange={handleInputChange}
                value={values.description}/>
            </Grid>
            <Button variant="contained" onClick={handleSubmit}>{currentstateId === "" ? "save": "update"}</Button>

        </FormControl>
    )
}

export default LinksForm;