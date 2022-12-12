import React, { useState, useEffect } from "react";
import { db } from "../firebase"
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
        <form onSubmit={handleSubmit}>
            <div>
                <input 
                type="text" 
                placeholder="https//someurl.com" 
                name="url"
                value={values.url}
                onChange={handleInputChange}/>
            </div>
            <div>
                <input 
                type="text" 
                placeholder="some name" 
                name="name"
                value={values.name}
                onChange={handleInputChange}/>
            </div>
            <div>
                <textarea 
                name="description" 
                cols="30" 
                rows="10" 
                placeholder="write description"
                onChange={handleInputChange}
                value={values.description}>
                </textarea>
            </div>
            <button>{currentstateId === "" ? "save": "update"}</button>

        </form>
    )
}

export default LinksForm;