import { useDispatch, useSelector } from 'react-redux';

import { ArqueoCashDetalleOperacionesTable } from './ArqueoCashDetalleOperacionesTable';
import {
    SetDepositantePreDepositoArqueoCash,
    SetIsOpenModalAddPreDepositoArqueoCash,
    SetIsOpenModalPDFDetalleOperacionesArqueoCash,
    startGetAllCajerosArqueoCash
} from '../../actions/arqueocashAction';
import { FaFilePdf } from 'react-icons/fa6';
import { RiLuggageDepositFill } from 'react-icons/ri';

export const ArqueoCashBodyDetalleOperaciones = () => {

    const dispatch = useDispatch();
    const {
        detalleOperaciones,
        disableInputs,
        arqueo,
        cajeros
    } = useSelector(state => state.ArqueCash);

    const { Cajero } = arqueo.encabezado;

    const columns = [
        {
            Header: "Factura",
            accessor: "factura",
        },
        {
            Header: "Tipo",
            accessor: "tipo",
        },
        {
            Header: "Moneda",
            accessor: "moneda",
        },
        {
            Header: "Forma Pago",
            accessor: "formaPago",
        },
        {
            Header: "Pago",
            accessor: "pago",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        },
        {
            Header: "Equivalencia",
            accessor: "equivalencia",
            Cell: ({ value }) => new Intl.NumberFormat('es-CR', { style: 'currency', currency: 'CRC' }).format(value),
        }
    ];

    const handleClickImprimir = (e) => {

        if (!disableInputs) {
            e.preventDefault();
            dispatch(SetIsOpenModalPDFDetalleOperacionesArqueoCash(true));
        }
    }

    const handleClickPreDeposito = async (e) => {

        if (!disableInputs) {

            e.preventDefault();

            // Se levanta el modal de agregar pre deposito
            dispatch(SetIsOpenModalAddPreDepositoArqueoCash(true));

            // Se inserta el depositante
            dispatch(SetDepositantePreDepositoArqueoCash(Cajero));

            if (cajeros.length === 0) {
                // Se traen todos los cajeros
                dispatch(await startGetAllCajerosArqueoCash());
            }
        }
    }

    return (

        <>
            <div className="card">
                <div className="card-header bg-primary cartaHMod2">
                    <div className="row">
                        <div className='col-md-4 mb-0'>
                            <h3>Detalle Operaciones</h3>
                        </div>

                        <div className='col-md-4 mb-0'>
                            <button
                                className={
                                    (disableInputs)
                                        ? 'btn btn-success disabled'
                                        : 'btn btn-success'
                                }
                                onClick={ handleClickPreDeposito }
                                data-bs-toggle="modal"
                                data-bs-target="#modalAgregarPreDeposito"
                            >
                                Pre Depósito <RiLuggageDepositFill className='iconSize' />
                            </button>
                        </div>

                        <div className='col-md-4 mb-0'>
                            <button
                                className={
                                    (disableInputs)
                                        ? 'btn btn-danger disabled'
                                        : 'btn btn-danger'
                                }
                                onClick={handleClickImprimir}
                                data-bs-toggle="modal"
                                data-bs-target="#modaldetallePDF"
                            >
                                Imprimir <FaFilePdf className='iconSize' />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <div className="row mb-0 text-center" >
                        <div className="col-md-12 mb-0">
                            <ArqueoCashDetalleOperacionesTable columns={columns} data={detalleOperaciones} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
