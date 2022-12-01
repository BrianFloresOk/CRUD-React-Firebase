import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, getDoc, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

function Show() {
    // 1 - Config Hooks
    const [ products, setProducts ] = useState( [] )

    // 2 - Referenciamos a la DB de Firestore
    const productsCollection = collection(db, "Products")
                            //Conexion a base de datos - nombre de la coleccion
                            
    // 3 - Funcions para mostrar todos los docs
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        /* console.log(data.docs); */
        setProducts(
            data.docs.map((doc) => ( {...doc.data(), id: doc.id } ))
        )
        console.log(products);
    }

    // 4 - Funcion para elimiar docs
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "Products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    // 5 - Funcion de condirmacion para sweet alert 2
    const confirmDelete = (id) => {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: 'btn btn-success',
              cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
          })
          
          swalWithBootstrapButtons.fire({
            title: '¿Estás seguro de elminar este producto?',
            text: "No podrás recuperar este producto",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Continuar',
            cancelButtonText: 'Cancelar',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
/*               swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              ) */
                deleteProduct(id)
            }
          })
    }

    // 6 - usamos useEffect
    useEffect(() => {
        getProducts()
    }, [])

    // 7 - devolvemos vista de muestra de componentes
    return ( 
        <>
            <h2>Hola mundo Firebase</h2>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className='d-grid gap-2'>
                            <Link to="/create" className="btn btn-secondary mt-2 mb-2">Crear</Link>
                        </div>
                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Descripcion</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                { products.map((product) => (
                                    <tr key={product.id}>
                                        <td>{product.description}</td>
                                        <td>{product.stock}</td>
                                        <td>
                                            <Link to={`/edit/${product.id}`} className="btn btn-light"><i className="fa-solid fa-pen-to-square"></i></Link>
                                            <button onClick={() => confirmDelete(product.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )) }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
     );
}

export default Show;