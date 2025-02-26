import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";

import { FaListOl } from "react-icons/fa";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { IoAddCircle } from "react-icons/io5";

import { PresentationsTable } from "./PresentationsTable";

import { 
    SetNombrePresentacionPresentations, 
    startSavePresentacion 
} from "../../actions/PresentacionesAction";

export const PresentationsBody = () => {

    const dispatch = useDispatch();

    const {
        nombrePresentacion,
        presentaciones
    } = useSelector((state) => state.presentaciones);

    const { auth } = useSelector(state => state.login);

    const columns = [
        {
            Header: "Codigo",
            accessor: "codigo",
        },
        {
            Header: "Nombre",
            accessor: "nombre",
        },
        {
            Header: "Estado",
            accessor: "estado",
        },
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSavePresentacion = () => {

        if( nombrePresentacion == '' ) {
            Swal.fire({
                icon: 'warning',
                title: 'Presentaciones',
                text: 'Favor ingresar un nombre de la presentacion.',
            });
        }

        const presentations = {
            presentaciones: nombrePresentacion,
            mh: nombrePresentacion,
            estado: true,
            idUsuarioCreacion: auth.username,
            fechaCreacion: new Date().toISOString(),
            idUsuarioModificacion: null,
            fechaModificacion: null
        }

        dispatch( startSavePresentacion(presentations) );

    }

    return (
        <>
            <div className="container-fluid mt-2">

                <div className="row mb-3 text-center">
                    <div className="col-md-3 mb-3"></div>

                    <div className="col-md-4 mb-3">
                        <h5>Presentación</h5>
                        <div className="input-group">
                            <span className="input-group-text">
                                <FaListOl className="iconSize" />
                            </span>
                            <input
                                name="presentacion"
                                type="text"
                                className="form-control"
                                placeholder="Nombre Presentacion"
                                onChange={(e) => {
                                    handleInputChangeWithDispatch(e, SetNombrePresentacionPresentations)
                                }}
                                value={ nombrePresentacion }
                            />
                        </div>
                    </div>

                    <div className="col-md-2 mb-3">
                        <h5>Opciones</h5>
                        <div className="inline-container">
                            <button
                                className="btn btn-success"
                                onClick={handleSavePresentacion}
                            >
                                Agregar <IoAddCircle className="iconSize" />
                            </button>
            
                            <button
                                className="btn btn-danger"
                                // onClick={handleRemoveRelatedArticle}
                                type="button"
                            >
                                <RiDeleteBin2Fill className="iconSize" />
                            </button>
                        </div>
                        <hr />
                    </div>

                    <div className="col-md-3 mb-3"></div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-3 mb-3"></div>
                    <div className="col-md-6 mb-2">
                    <PresentationsTable
                        columns={columns}
                        data={presentaciones}
                    />
                    </div>
                    <div className="col-md-3 mb-3"></div>
                </div>

            </div>
            
        </>

    )
}
