import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';

import { HiDocumentAdd } from 'react-icons/hi';
import { FaRegSave, FaSearch, FaWindowClose } from 'react-icons/fa';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ImCancelCircle } from 'react-icons/im';
import { MdNoteAdd, MdUpdate } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';

import { DeleteTab } from '../../actions/tabs';

import {
    SetActiveButtonNewBranch,
    SetActiveButtonSaveBranch,
    SetCleanBranch,
    SetDisableInputsBranch,
    SetStartOpeningBranch,
    startSaveBranch
} from '../../actions/BranchAction';
import { startGetAllTiposIdentificacionBranch } from '../../actions/TiposIdentificacionAction';

export const BranchIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const {
        activeButtonNewBranch,
        activeButtonSaveBranch,
        activeButtonSearchBranch,
        activeButtonRemoveBranch,
        startOpening,
        surcursal
    } = useSelector(state => state.branch);

    const {
        id,
        nombreComercial,
        nombreFiscal,
        tipoDocumento,
        numeroDocumento,
        alias,
        telefono,
        email
    } = surcursal;

    const handleNewBranch = async (e) => {

        if (activeButtonNewBranch) {

            e.preventDefault();

            dispatch(SetDisableInputsBranch(false));
            dispatch(SetActiveButtonSaveBranch(true));
            dispatch(SetActiveButtonNewBranch(false));
            dispatch(SetStartOpeningBranch(true));

            await loadCatalogos();
        }

    }

    const handleSaveBranch = (e) => {

        if (activeButtonSaveBranch) {

            e.preventDefault();

            const newBranch = {
                id,
                nombreComercial,
                nombreFiscal,
                tipoDocumento,
                numeroDocumento,
                alias,
                telefono,
                email
            }

            dispatch(startSaveBranch(newBranch));
        }
    }

    const handleCloseWindowUser = (e) => {

        if (startOpening) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la creacion de surcursal?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(SetCleanBranch());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetCleanBranch());

        }

    }

    const loadCatalogos = async (e) => {

        //Mostrar el loading
        Swal.fire({
            title: 'Por favor, espere cargando catalogos',
            allowEscapeKey: false,
            allowOutsideClick: false,
            showConfirmButton: false,
            imageUrl: loadingImage,
            customClass: 'alert-class-login',
            imageHeight: 100,
        });

        if (tiposIdentificacion.length === 0) {
            dispatch(startGetAllTiposIdentificacionBranch());
        }

        //Quitar el loading
        Swal.close();
    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonNewBranch) ? 'btn btn-success espacio' : 'btn btn-success espacio disabled'}
                        onClick={handleNewBranch}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSearchBranch) ? 'btn btn-primary espacio' : 'btn btn-primary espacio disabled'}
                    // onClick={ handleSearchUser }
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={activeButtonSaveBranch ? 'btn btn-dark espacio' : 'btn btn-dark espacio disabled'}
                        onClick={handleSaveBranch}
                    >
                        Registrar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonRemoveBranch) ? 'btn btn-danger espacio' : 'btn btn-danger espacio disabled'}
                    // onClick={ handleDisableUser }
                    >
                        Anular <RiDeleteBin2Fill className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                        onClick={handleCloseWindowUser}
                    >
                        {(startOpening) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSize" />
                    </button>
                </div>
            </div>
        </>
    )
}
