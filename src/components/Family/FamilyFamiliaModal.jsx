import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';

import { TbNumbers } from "react-icons/tb";
import { MdInventory, MdCancel } from "react-icons/md";
import { RxLetterCaseUppercase } from "react-icons/rx";
import { IoMdAddCircle } from "react-icons/io";

import { 
    CleanFamiliaFamiliasFamily,
    SetCodigoFamiliaFamiliasFamily, 
    SetDescripcionFamiliaFamiliasFamily,
    SetObservacionesFamiliaFamiliasFamily,
    startEditFamilias,
    startSaveFamilias
} from '../../actions/FamiliasAction';
import { useEffect } from 'react';

Modal.setAppElement('#root');

export const FamilyFamiliaModal = () => {

    const dispatch = useDispatch();

    const { auth } = useSelector(state => state.login);

    const { familia, closingModalFamilia, isCreateFamilia } = useSelector((state) => state.familias);
    const { codigo, descripcion, observaciones } = familia;

    useEffect(() => {
        
        if( closingModalFamilia ) {
            const btnCloseModal = document.getElementById('btnCloseModal');
            btnCloseModal.click();
        }
            
        return () => {}

    }, [ closingModalFamilia ])
    

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch( action(target.value) );
    };

    const closeModal = () => {
        dispatch( CleanFamiliaFamiliasFamily() );
    }

    const handleSaveFamily = async () => {

        if( descripcion == '' || observaciones == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });

            return;
        }

        const newFamily = {
            descripcion,
            observaciones,
            cuentaGra: '',
            descripcionGra: '',
            cuentaExe: '',
            descripcionExe: '',
            cuentaCosto: '',
            descripcionCosto: '',
            estado: true,
            idUsuarioCreacion: auth.username
        }
        
        await dispatch( startSaveFamilias(newFamily) );
        

    }

    const handleEditFamily = async () => {

        if( descripcion == '' || observaciones == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });

            return;
        }

        const editFamily = {
            codigo,
            descripcion,
            observaciones,
            cuentaGra: '',
            descripcionGra: '',
            cuentaExe: '',
            descripcionExe: '',
            cuentaCosto: '',
            descripcionCosto: '',
            estado: true,
            idUsuarioCreacion: auth.username
        }
        
        await dispatch( startEditFamilias(editFamily) );
        

    }
    
    return (
        <>
            <div className="modal fade" id="modalFamilia" tabindex="-1">

                <div className="modal-dialog modal-lg modal-dialog">

                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">
                                Familia <MdInventory className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                            <button
                                type="button"
                                id='btnCloseModal'
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
                                            disabled={true}
                                            value={ codigo }
                                            onChange={ e => handleInputChangeWithDispatch(e, SetCodigoFamiliaFamiliasFamily) }
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
                                            onChange={ e => handleInputChangeWithDispatch(e, SetDescripcionFamiliaFamiliasFamily) }
                                        />
                                        
                                    </div>
                                </div>

                                <div className="col-md-4 mb-3">
                                    <hr />
                                    
                                    <div className="row mb-3 text-center">

                                        <div className='col-md-6'>
                                            <button 
                                                className={ isCreateFamilia ? 'btn btn-success' : 'btn btn-warning' }
                                                onClick={ isCreateFamilia ? handleSaveFamily : handleEditFamily}
                                            >
                                               <IoMdAddCircle className='iconSize' /> { isCreateFamilia ? 'Guardar' : 'Editar' }
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
                                            onChange={ e => handleInputChangeWithDispatch(e, SetObservacionesFamiliaFamiliasFamily) }
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
