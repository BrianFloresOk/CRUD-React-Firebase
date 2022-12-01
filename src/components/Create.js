import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig/firebase';


function Create() {
    const [ description, setDescription ] = useState('')
    const [ stock, setStock ] = useState(0)
    const navigate = useNavigate()

    const productCollection = collection(db, "Products");

    const store = async (e) => {
        e.preventDefault()
        await addDoc(productCollection, { 
            description: description,
            stock: stock
        })
        navigate('/')
    }

    return ( 
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h2>Crear</h2>
                        <form onSubmit={store}>
                            <div className='mb-3'>
                                <label className='form-label'>Descripcion</label>
                                <input 
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    type="text"
                                    className='form-control'
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Stock</label>
                                <input 
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    type="number"
                                    className='form-control'
                                />
                            </div>
                            <button type='submit' className='btn btn-primary'>Crear</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Create;