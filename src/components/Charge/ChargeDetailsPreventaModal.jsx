import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';

import { customStyles } from '../../helpers/styleModal';
import { TbCircleX } from 'react-icons/tb';
import { SetOpenModalDetailsPreventaCharge } from '../../actions/ChargeAction';
import { ChargeDetailsPreventaTableModal } from './ChargeDetailsPreventaTableModal';
import { ChargeTiqueteCaja } from './ChargeTiqueteCaja';

Modal.setAppElement('#root');

export const ChargeDetailsPreventaModal = () => {

    let tipoFactura;
    let cedula;
    let cliente;
    let fecha;
    let moneda;
    let impVenta;
    let descuento;
    let subTotal;
    let total
    let detalle;
    const dispatch = useDispatch();
    const { isOpenModalDetailsPreventa, preventa } = useSelector(state => state.charge);

    if (preventa.length > 0) {
        tipoFactura = preventa[0].tipoFactura;
        cedula = preventa[0].cedula;
        cliente = preventa[0].cliente;
        fecha = preventa[0].fecha;
        moneda = preventa[0].moneda;
        impVenta = preventa[0].impVenta;
        descuento = preventa[0].descuento;
        subTotal = preventa[0].subTotal;
        detalle = preventa[0].detalle;
        total = preventa[0].total;
    }

    const columns = [
        {
            Header: "Cod. Articulo",
            accessor: "codArticulo",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        },
        {
            Header: "Cantidad",
            accessor: "cantidad",
        },
        {
            Header: "Impuesto",
            accessor: "impuesto",
        },
        {
            Header: "SubTotal",
            accessor: "subTotal",
        },
        {
            Header: "Total",
            accessor: "total",
        }
    ];

    const closeModal = (e) => {

        e.preventDefault();

        // Cerrar el modal
        dispatch(SetOpenModalDetailsPreventaCharge(false));

    }

    return (
        <>
            {/* <div className="modal fade" id="modalBuscaFactCompra">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-center" >
                                <div className="col-md-12 mb-2">
                                    <ChargeTiqueteCaja data={tiquete} />
                                </div>
                            </div>
                        </div>
                        <div className='modal-footer'>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cerrar <TbCircleX className='iconSize' /> </button>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}
