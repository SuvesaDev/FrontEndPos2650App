import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TbNumbers } from "react-icons/tb";
import { MdInventory, MdCancel } from "react-icons/md";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";

import { 
    CleanSubFamiliaFamiliasFamily,
    SetCodigoSubFamiliaFamiliasFamily, 
    SetDescripcionSubFamiliaFamiliasFamily,
    SetObservacionesSubFamiliaFamiliasFamily,
    startSaveSubFamilias
} from '../../actions/FamiliasAction';

Modal.setAppElement('#root');

export const SubFamilyFamiliaModal = () => {

    const dispatch = useDispatch();

    const { auth } = useSelector(state => state.login);

    const { subfamilia, closingModalSubFamilia, isCreateSubFamilia, codigoFamiliasSeleted } = useSelector((state) => state.familias);
    const { codigo, descripcion, observaciones } = subfamilia;

    useEffect(() => {
        debugger;
        if( closingModalSubFamilia ) {
            const btnCloseModal = document.getElementById('btnCloseModalSubFamilia');
            btnCloseModal.click();
        }
            
        return () => {}

    }, [ closingModalSubFamilia ])
    

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const closeModal = () => {
        dispatch( CleanSubFamiliaFamiliasFamily() );
    }

    const handleSaveSubFamily = async () => {

        if(  codigo == ''|| descripcion == '' || observaciones == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });

            return;
        }

        const newSubFamily = {
            codigoFamilia: codigoFamiliasSeleted,
            subCodigo: codigo,
            descripcion,
            observaciones,
            estado: true,
            idUsuarioCreacion: auth.username,
        }
        
        await dispatch( startSaveSubFamilias(newSubFamily, codigoFamiliasSeleted) );
        

    }

    const handleEditFamily = async () => {

        // if( descripcion == '' || observaciones == '' ) {
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Advertencia',
        //         text: 'Favor completar todos los datos.'
        //     });

        //     return;
        // }

        // const editFamily = {
        //     codigo,
        //     descripcion,
        //     observaciones,
        //     cuentaGra: '',
        //     descripcionGra: '',
        //     cuentaExe: '',
        //     descripcionExe: '',
        //     cuentaCosto: '',
        //     descripcionCosto: '',
        //     estado: true,
        //     idUsuarioCreacion: auth.username
        // }
        
        // await dispatch( startEditFamilias(editFamily) );
        

    }
    
    return (
        <>
            <div className="modal fade" id="modalSubFamilia" tabindex="-1">

                <div className="modal-dialog modal-lg modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Sub Familia <MdInventory className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                            <button
                                type="button"
                                id='btnCloseModalSubFamilia'
                                className="d-none"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                        </div>

                        <div className="modal-body">
                            
                            <div className="row mb-3 text-center">

                                <div className="col-md-4 mb-3">
                                    <h5>Codigo</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <TbNumbers className="iconSize" />
                                        </span>
                                        <input 
                                            type='text' 
                                            name='codigo'
                                            className='form-control'
                                            placeholder='Codigo'
                                            value={ codigo }
                                            onChange={ e => handleInputChangeWithDispatch(e, SetCodigoSubFamiliaFamiliasFamily) }
                                        />
                                        
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <h5>Descripcion</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <RxLetterCaseUppercase className="iconSize" />
                                        </span>
                                        <input 
                                            type='text' 
                                            name='Descripcion'
                                            className='form-control'
                                            placeholder='Descripcion'
                                            value={ descripcion }
                                            onChange={ e => handleInputChangeWithDispatch(e, SetDescripcionSubFamiliaFamiliasFamily) }
                                        />
                                        
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <hr />
                                    
                                    <div className="row mb-3 text-center">

                                        <div className='col-md-6'>
                                            <button 
                                                className={ isCreateSubFamilia ? 'btn btn-success' : 'btn btn-warning' }
                                                onClick={ isCreateSubFamilia ? handleSaveSubFamily : handleEditFamily}
                                            >
                                               <IoMdAddCircle className='iconSize' /> { isCreateSubFamilia ? 'Guardar' : 'Editar' }
                                            </button>
                                        </div>

                                        <div className='col-md-6'>
                                            <button 
                                                className='btn btn-danger'
                                                data-bs-dismiss="modal"
                                                onClick={closeModal}
                                            >
                                                <MdCancel className='iconSize' /> Cancelar
                                            </button>
                                        </div>
                                        
                                    </div>
                                    
                                </div>

                            </div>

                            <div className="row mb-3 text-center">

                                <div className="col-md-12 mb-3">
                                    <h5>Observaciones</h5>
                                    <div className="input-group">
                                        <span className="input-group-text">
                                            <RxLetterCaseUppercase className="iconSize" />
                                        </span>
                                        <input 
                                            type='text' 
                                            name='numeroDocumento'
                                            className='form-control'
                                            placeholder='Observaciones'
                                            value={ observaciones }
                                            onChange={ e => handleInputChangeWithDispatch(e, SetObservacionesSubFamiliaFamiliasFamily) }
                                        />
                                        
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}
