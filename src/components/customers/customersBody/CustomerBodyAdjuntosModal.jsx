import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { FaFile } from "react-icons/fa";
import { SetSeletedAdjuntoCustomers } from '../../../actions/customers';
import { useEffect, useState } from 'react';


Modal.setAppElement('#root');

export const CustomerBodyAdjuntosModal = () => {
   
    const [seconds, setSeconds] = useState(10); // Iniciar en 10 segundos

    const dispatch = useDispatch();

    const { selectedAdjunto } = useSelector(state => state.customers);
    const { nombre, type, base64 } = selectedAdjunto;

    useEffect(() => {
      
        if( type == 'word' ) {

            setTimeout(() => {
                const btnModal = document.getElementById('btnCloseModal');
                btnModal.click();
            }, 3000); 

        }
    
    }, [selectedAdjunto])

    const closeModal = () => {
        
        dispatch( SetSeletedAdjuntoCustomers( {
            nombre: '',
            type: '',
            base64: ''
        } ) );

    }

    return (
        <>
            <div className="modal fade" id="modalVerAdjuntoCliente" tabindex="-1">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                <FaFile className="iconSizeBtn" /> Adjuntos de Cliente {nombre}
                            </h4>
                            <button
                                id='btnCloseModal'
                                type="button"
                                onClick={closeModal}
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>

                        <div className="modal-body">
                            
                        {
                            (type === "image") ? (
                                <img src={base64} alt="Preview" className="max-w-full h-auto" />
                            ) : (type === "pdf") ? (
                                <iframe src={base64} className="w-100" 
                                style={{ height: "80vh" }}  title="PDF Viewer"></iframe>
                            ) : <>
                                <h5 className='text-center' >Este archivo es documento word descargo automaticamente.</h5>
                                <h5 className='text-center' >Este modal se va a cerrar automaticamente </h5>
                                <iframe src={base64} className="d-none" title="PDF Viewer"></iframe>
                            </>
                        }

                        </div>

                    </div>
                </div>
            </div>


        </>

    )
}
