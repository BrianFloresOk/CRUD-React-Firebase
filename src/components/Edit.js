import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDoc, updateDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

function Edit() {
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState(0);
    const navigate = useNavigate();
    const { id } = useParams();

    const update = async (e) => {
        e.preventDefault();
        const product = doc(db, "Products", id);
        const data = {
            description: description,
            stock: stock
        };
        await updateDoc(product, data)
        navigate('/')
    }

    const getProductById = async (id) => {
        const productId = await getDoc(doc(db, "Products", id))
        if (productId.exists()) {
            setDescription(productId.data().description)
            setStock(productId.data().stock)
        } else {
            alert("El producto no existe");
        }
    };


    useEffect(() => {
        getProductById(id)
    }, [])

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h2>Editar</h2>
                        <form onSubmit={update}>
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
                            <button type='submit' className='btn btn-primary'>Editar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Edit;