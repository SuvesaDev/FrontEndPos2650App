import { useSelector, useDispatch } from "react-redux";
import { OpenModalAddUnityCode } from "../../actions/unityCode";
import { UnifyCodeAddModal } from "./UnifyCodeAddModal"
import { FaCirclePlus } from "react-icons/fa6";

export const UnifyCodeBody = () => {

    const dispatch = useDispatch();

    const openModal = () => {
        dispatch(OpenModalAddUnityCode());
    }

    return (
        <>
            <div className="row mb-2 text-center">

                <div className="card">
                    <div className="card-header">
                        <button className="btn btn-success" data-bs-toggle="modal"
                            data-bs-target="#modalVincularPuntos">Agregar <FaCirclePlus className="iconSize" /> </button>
                    </div>
                    <div className="card-body">
                        <div className="row mb-2 text-center" >
                            <div className="col-md-12 mb-2">
                                <div className="table-responsive-md tablaP">
                                    <table
                                        className="table table-dark table-hover table-bordered text-md-center">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Punto de Venta 1</th>
                                                <th>Código</th>
                                                <th>Descripción</th>
                                                <th>Punto de Venta 2</th>
                                                <th>Código</th>
                                                <th>Descripción</th>
                                            </tr>
                                        </thead>
                                        <tbody className="table-secondary">
                                            <tr>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                                <td>Test</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UnifyCodeAddModal />
        </>

    )
}
