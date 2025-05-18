import { FaCoins, FaHashtag } from "react-icons/fa"
import { FaCartShopping } from "react-icons/fa6"
import { BonusesTable } from "./BonusesTable"

export const BonusesBody = () => {

    const columns = [
        {
            Header: "Cantidad Requerida",
            accessor: "cantidadRequerida",
        },
        {
            Header: "Bonificaciones",
            accessor: "bonificaciones"
        },
        {
            Header: "Codigo Articulo",
            accessor: "codigoArticulo"
        },
        {
            Header: "Descripcion",
            accessor: "descripcion"
        },
        {
            Header: "Acciones",
            accessor: "icon"
        }
    ];

    return (
        <>
            <div className="row mb-3 text-center">

                <div className="col-md-3 mb-3">
                    <h5>Cantidad Requerida</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaHashtag className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Cantidad Requerida"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Bonificacion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCoins className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Bonificacion"
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Articulo</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaCartShopping className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className='form-control'
                            placeholder="Articulo"
                        />
                    </div>
                </div>

                <div className="col-md-1 mb-3">
                    <div style={{ height: "20px" }}></div>
                    <button className="btn btn-success">
                        Agregar
                    </button>
                </div>

            </div>

            <div className="row mb-0 text-center" style={{ height: "300px" }} >
                <BonusesTable columns={columns} data={[]} />
            </div>
        </>

    )
}
