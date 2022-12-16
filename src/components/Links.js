import React, { useEffect, useState } from "react";
import { db } from "../firebase"
import LinksForm from "./LinksForm";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
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
            <center>
                <LinksForm {...{currentId, links}}/>
            </center>
        </div>

        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 750 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Url</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        { links.map(link => (
            <TableRow key={link.id}>
                <TableCell component="th" scope="row">{link.id}</TableCell>
                <TableCell>{link.name}</TableCell>
                <TableCell>{link.url}</TableCell>
                <TableCell>{link.description}</TableCell>
                <TableCell>
                    <IconButton onClickCapture={() => onDeleteLink(link.id)} aria-label="delete" size="small">
                        <Delete fontSize="small" />
                    </IconButton>
                    <IconButton onClickCapture={() => setCurrentId(link.id)} aria-label="edit" size="small">
                        <Edit fontSize="small" />
                    </IconButton>
                </TableCell>
            </TableRow>
        ))}
        </TableBody>
        </Table>
        </TableContainer>
    </div>
    )
}

export default Links;