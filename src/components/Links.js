import React, { useEffect, useState } from "react";
import { db } from "../firebase"
import LinksForm from "./LinksForm";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";

const Links = (props) => {

    const [ links, setLinks ] = useState([]);
    const [ currentId, setCurrentId ] = useState("");

    const getLinks = async () => {
        onSnapshot(collection(db, 'links'), (snapshot) => {
            const docs = []
            snapshot.forEach(doc => {
                docs.push({...doc.data(), id:doc.id});
            });
            setLinks(docs);
        });
    };
    
    useEffect(() => {
        getLinks();
    }, []);

    const onDeleteLink = async (id) => {
            await deleteDoc(doc(db, "links", id));
    }

    return (
    <div> 
        <div>
            <LinksForm {...{currentId, links}}/>
        </div>
        { links.map(link => (
            <div key={link.id}>
                <label>{link.id}</label><h1>{link.name}</h1>
                <h4>{link.url}</h4>
                <h4>{link.description}</h4>
                <button onClickCapture={() => onDeleteLink(link.id)}>Delete</button>
                <button onClickCapture={() => setCurrentId(link.id)}>Edit</button>
            </div>
        ))}
    </div>
    )
}

export default Links;