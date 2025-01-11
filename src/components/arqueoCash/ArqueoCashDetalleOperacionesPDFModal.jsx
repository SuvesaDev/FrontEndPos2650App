import Modal from 'react-modal';
import { useSelector, useDispatch } from 'react-redux';
import { PDFViewer } from "@react-pdf/renderer";

import { customStyles } from '../../helpers/styleModal';

import { DocDetalleOperacionesArqueoCash } from './DocDetalleOperacionesArqueoCash';
import { SetIsOpenModalPDFDetalleOperacionesArqueoCash } from '../../actions/arqueocashAction';
import { FaFilePdf } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';

Modal.setAppElement('#root');

export const ArqueoCashDetalleOperacionesPDFModal = () => {

    let detalle = null;

    const dispatch = useDispatch();
    const { isOpenModalPDFDetalleOperaciones } = useSelector(state => state.ArqueCash);

    const data = [
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        },
        {
            Factura: 'test',
            Tipo: 'test',
            Moneda: 'test',
            FormaPago: 'test',
            Pago: 'test',
            Equivalencia: 'test',
        }
    ];

    const tableData = {
        "column": [
            "Factura",
            "Tipo",
            "Moneda",
            "FormaPago",
            "Pago",
            "Equivalencia"
        ],
        "data": data
    }

    const closeModal = (e) => {

        e.preventDefault();

        // Cerrar el modal
        dispatch(SetIsOpenModalPDFDetalleOperacionesArqueoCash(false));

    }

    return (
        <>

            <div className="modal fade" id="modaldetallePDF">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Detalle de Operaciones <FaFilePdf className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row mb-2 text-md-center">
                                <div className='col-md-12 mb-2'>
                                    <PDFViewer
                                        style={{ width: "100%", height: "60vh" }}
                                    >
                                        <DocDetalleOperacionesArqueoCash tableData={tableData} />
                                    </PDFViewer>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Cerrar <IoIosCloseCircle className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
