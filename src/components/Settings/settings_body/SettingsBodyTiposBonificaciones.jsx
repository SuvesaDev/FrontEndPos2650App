
import { FaStickyNote } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";

import { useDispatch, useSelector } from "react-redux";
import { SettingsBodyTiposBonificacionesTable } from "./SettingsBodyTiposBonificacionesTable";

export const SettingsBodyTiposBonificaciones = () => {

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

    const state = useSelector(state => state.settings);
    const { porcentajeProntoPago } = state;

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };


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
                            // value={porcentajeProntoPago}
                            // onChange={(e) =>
                            //     handleInputChangeWithDispatch(e, SetPorcentajeProntoPagoSettings)
                            // }
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
                            // value={porcentajeProntoPago}
                            // onChange={(e) =>
                            //     handleInputChangeWithDispatch(e, SetPorcentajeProntoPagoSettings)
                            // }
                        />
                    </div>
                </div>

                <div className="col-md-1 mb-1">
                    
                    <div className="form-check form-switch mt-5">
                        <input className="form-check-input checkbox-grande" type="checkbox" id="flexSwitchCheckDefault" />
                        <label className="form-check-label fs-5" for="flexSwitchCheckDefault">Activo</label>
                    </div>
                </div>

                <div className="col-md-1 mb-3">
                    <div className="w-100 pt-4"></div>
                    <button
                        className="btn btn-success"
                        // onClick={ handleActualizarPorcentaje }
                    >
                        Agregar <IoIosAddCircle className="iconSize" />
                    </button>
                </div>

            </div>

            <div className="row mb-3 text-center">
                
                <div className="col-md-12 mb-3">
                    <SettingsBodyTiposBonificacionesTable columns={columns} data={[
                        {
                            nombre : 'test',
                            descripcion : 'test',
                            activo : true,
                        },
                        {
                            nombre : 'test',
                            descripcion : 'test',
                            activo : false,
                        }
                    ]}/>
                </div>

            </div>

        </>

    )
}
