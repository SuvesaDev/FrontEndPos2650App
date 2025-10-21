import Swal from 'sweetalert2';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import { FaStickyNote } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

import { SettingsBodyTiposBonificacionesTable } from "./SettingsBodyTiposBonificacionesTable";

import { 
    SetActivoTipoBonificacionSettings,
    SetDescripcionTipoBonificacionSettings, 
    SetIsEditTipoBonificacionSettings, 
    SetNombreTipoBonificacionSettings, 
    startAddNewTipoBonificacion,
    startEditTipoBonificaciones,
    startGetAllTipoBonificacion
} from "../../../actions/settings";

export const SettingsBodyTiposBonificaciones = () => {

    useEffect(() => {
        dispatch( startGetAllTipoBonificacion() );
        return () => {}
    }, []);
    
    const columns = [
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion"
        },
        {
            Header: "Estado",
            accessor: "activo"
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    const dispatch = useDispatch();

    const { 
        tipoBonificacion, 
        tiposBonificaciones, 
        isEditTipoBonificacion,
        indexTipoBonificacion
    } = useSelector(state => state.settings);
    const { nombre, descripcion, activo } = tipoBonificacion;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleInputChangeWithDispatchCheck = ({ target }, action) => {
        dispatch(action(target.checked));
    };

    const handleAddNewTipoBonificacion = () => {

        if( nombre == '' || descripcion == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });
            return;
        }

        const newTipoBonificacion = {
            nombre,
            descripcion,
            activo
        }

        dispatch( startAddNewTipoBonificacion(newTipoBonificacion) );
    }

    const handleEditTipoBonificacion = () => {
        
        if( nombre == '' || descripcion == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Favor completar todos los datos.'
            });
            return;
        }

        const editTipoBonificacion = {
            index : indexTipoBonificacion,
            nombre,
            descripcion,
            activo
        }

        dispatch( startEditTipoBonificaciones(editTipoBonificacion) );
    }

    const handleCancelEditTipoBonificacion = () => {
    
        dispatch( SetNombreTipoBonificacionSettings('') );
        dispatch( SetDescripcionTipoBonificacionSettings('') );
        dispatch( SetActivoTipoBonificacionSettings(false) );

        dispatch( SetIsEditTipoBonificacionSettings( false ) );
    }

    return (
        <>
            <div className="row mb-3 text-center">

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaStickyNote className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Nombre"
                            value={nombre}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetNombreTipoBonificacionSettings)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Descripcion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaStickyNote className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Descripcion"
                            value={descripcion}
                            onChange={(e) =>
                                handleInputChangeWithDispatch(e, SetDescripcionTipoBonificacionSettings)
                            }
                        />
                    </div>
                </div>

                <div className="col-md-1 mb-1">
                    
                    <div className="form-check form-switch mt-5">
                        <input 
                            className="form-check-input checkbox-grande" 
                            type="checkbox" 
                            id="activoTipoBonificacion" 
                            checked={ activo }
                            onChange={(e) =>
                                handleInputChangeWithDispatchCheck(e, SetActivoTipoBonificacionSettings)
                            }
                        />
                        <label 
                            className="form-check-label fs-5" 
                            for="activoTipoBonificacion"
                        >
                            Activo
                        </label>
                    </div>

                </div>

                <div className="col-md-1 mb-3">
                    <div className="w-100 pt-4"></div>
                    <button
                        className={(isEditTipoBonificacion) ? 'btn btn-warning' : 'btn btn-success'}
                        onClick={ (isEditTipoBonificacion) ? handleEditTipoBonificacion :  handleAddNewTipoBonificacion}
                    >
                        { (isEditTipoBonificacion) ? 'Editar' : 'Agregar' } <IoIosAddCircle className="iconSize" />
                    </button>
                </div>

                <div className={ (isEditTipoBonificacion) ? 'col-md-1 mb-3' : 'col-md-1 mb-3 d-none' }>
                    <div style={{ height: "20px" }}></div>
                    <button 
                        className='btn btn-danger'
                        onClick={handleCancelEditTipoBonificacion}
                    >
                       Cancelar
                    </button>
                </div>

            </div>

            <div className="row mb-3 text-center">
                
                <div className="col-md-12 mb-3">
                    <SettingsBodyTiposBonificacionesTable columns={columns} data={tiposBonificaciones}/>
                </div>

            </div>

        </>

    )
}
