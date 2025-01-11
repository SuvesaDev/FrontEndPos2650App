import React from 'react'
import { useSelector, useDispatch } from 'react-redux';

import { FaSearch, FaWindowClose } from 'react-icons/fa';
import { ImCancelCircle } from 'react-icons/im';
import { startSearchFacturasDocumentsEmited } from '../../actions/documentsEmitedAction';
import { FaMagnifyingGlass } from 'react-icons/fa6';

export const DocumentsEmitedFooter = () => {

    const dispatch = useDispatch();
    const { searchData } = useSelector(state => state.documentsEmited);

    const {
        codCliente,
        desde,
        hasta,
        monto,
        documento
    } = searchData;

    const handleClickSearchFacturas = (e) => {
        e.preventDefault();

        dispatch(startSearchFacturasDocumentsEmited(
            codCliente,
            desde,
            hasta,
            monto,
            documento
        )
        );
    }

    return (
        <>
            <div className="btn-toolbar" role="toolbar">
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-primary espacio"
                        onClick={handleClickSearchFacturas}
                    >
                        Buscar <FaMagnifyingGlass className="iconSize" />
                    </button>
                </div>
                <div className="btn-group mb-2">
                    <button
                        className="btn btn-warning espacio"
                    >
                        Cerrar <FaWindowClose className="iconSizeBtn" />
                    </button>
                </div>
            </div>
        </>

    )
}
