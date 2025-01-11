import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import loadingImage from '../../assets/loading_snipiner.gif';

import { RiDeleteBin2Fill } from 'react-icons/ri';
import { MdNoteAdd } from 'react-icons/md';
import { FaFloppyDisk, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaWindowClose } from 'react-icons/fa';
import { DeleteTab } from '../../actions/tabs';

import {
    SetActiveButtonNewCompany,
    SetActiveButtonSaveCompany,
    SetCleanCompany,
    SetDisableInputsCompany,
    SetStartOpeningCompany,
    startGetAllBancosCompany,
    startGetAllMonedasCompany,
    startSaveCompany
} from '../../actions/CompanyAction';
import { startGetAllProvincias } from '../../actions/ProvinciasAction';
import { startGetAllTiposIdentificacionBranch } from '../../actions/TiposIdentificacionAction';


export const CompanyIcons = () => {

    const dispatch = useDispatch();

    const { currentTab } = useSelector(state => state.tabs);
    const { empresa } = useSelector(state => state.company);

    const {
        id,
        tipoIdentificacion,
        identificacion,
        nombre,
        correo,
        telefono,
        sucursal,
        provincia,
        canton,
        distrito,
        otrasSeñas,
        usuario,
        clave,
        certificado,
        numeroResolucion,
        fechaResolucion,
        venceCertificado,
        contrasenaCertificado,
        actividades,
        cuentasBancarias
    } = empresa;

    const {
        activeButtonNewCompany,
        activeButtonSaveCompany,
        activeButtonSearchCompany,
        activeButtonRemoveCompany,
        startOpeningCompany,
        bancos,
        monedas
    } = useSelector(state => state.company);

    const { provincias } = useSelector(state => state.provincias);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const handleNewCompany = async (e) => {

        if (activeButtonNewCompany) {

            e.preventDefault();

            await loadCatalogos();

            dispatch(SetDisableInputsCompany(false));
            dispatch(SetActiveButtonSaveCompany(true));
            dispatch(SetActiveButtonNewCompany(false));
            dispatch(SetStartOpeningCompany(true));
        }

    }

    const handleSaveCompany = (e) => {

        if (activeButtonSaveCompany) {

            e.preventDefault();

            const newCompany = {
                id,
                tipoIdentificacion,
                identificacion,
                nombre,
                correo,
                telefono,
                sucursal,
                distrito,
                otrasSeñas,
                usuario,
                clave,
                certificado,
                numeroResolucion,
                fechaResolucion,
                venceCertificado,
                contrasenaCertificado,
                actividades: actividades.map(actividad => {
                    return {
                        codigo: actividad.codigo,
                        descripcion: actividad.descripcion,
                        activo: actividad.estado,
                        principal: actividad.tipo,
                        idEmisor: 0
                    }
                }),
                cuentaBancarias: cuentasBancarias.map(cuenta => {
                    return {
                        numero: cuenta.numero,
                        banco: cuenta.nameBanco,
                        idBanco: cuenta.idBanco,
                        moneda: cuenta.nameMoneda,
                        idMoneda: cuenta.idMoneda
                    }
                })
            }

            dispatch(startSaveCompany(newCompany));
        }
    }

    const handleCloseWindowUser = (e) => {

        if (startOpeningCompany) {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea cancelar la creacion de empresa?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Mantener',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isDenied) {

                    e.preventDefault();

                    dispatch(SetCleanCompany());
                }

            });

        } else {

            e.preventDefault();

            dispatch(DeleteTab(currentTab.name, currentTab.routePage));
            dispatch(SetCleanCompany());

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

        if (provincias.length === 0) {
            await dispatch(startGetAllProvincias());
        }

        if (tiposIdentificacion.length === 0) {
            await dispatch(startGetAllTiposIdentificacionBranch());
        }

        if (bancos.length === 0) {
            await dispatch(startGetAllBancosCompany());
        }

        if (monedas.length === 0) {
            await dispatch(startGetAllMonedasCompany());
        }

        //Quitar el loading
        Swal.close();
    }

    return (

        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonNewCompany) ? 'btn btn-success espacio' : 'btn btn-success espacio disabled'}
                        onClick={handleNewCompany}
                    >
                        Nuevo <MdNoteAdd className="iconSizeBtn" />
                    </button>
                </div>
                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonSearchCompany) ? 'btn btn-primary espacio' : 'btn btn-primary espacio disabled'}
                    // onClick={ handleSearchUser }
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={activeButtonSaveCompany ? 'btn btn-dark espacio' : 'btn btn-dark espacio disabled'}
                        onClick={handleSaveCompany}
                    >
                        Registrar <FaFloppyDisk className="iconSize" />
                    </button>
                </div>

                <div className="btn-group mb-2">
                    <button
                        className={(activeButtonRemoveCompany) ? 'btn btn-danger espacio' : 'btn btn-danger espacio disabled'}
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
                        {(startOpeningCompany) ? 'Cancelar' : 'Cerrar'} <FaWindowClose className="iconSize" />
                    </button>
                </div>
            </div>
        </>

    )
}
