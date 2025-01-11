import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    CleanValorFiltroProveedorCompras,
    SetDefaultProveedorFilterCompras,
    SetDefaultUbicacionFilterCompras,
    SetOpenModalSearchProveedorCompras,
    SetSearchProveedorFilterCompras,
    SetValorFiltroProveedorCompras
} from '../../actions/ComprasAction';

import { InventorySearchProveedorTable } from '../Inventory/InventorySeachProveedorTable';
import { FaTruckFast } from 'react-icons/fa6';
import { IoIosCloseCircle } from "react-icons/io";


export const BuysSearchProveedorModal = () => {

    const dispatch = useDispatch();
    const { proveedoresInventory } = useSelector(state => state.proveedores); //Ojo
    const {
        filterProveedorInventory,
        valorfiltroProveedor,
        isOpenModalSearchProveedor
    } = useSelector(state => state.compras);

    useEffect(() => {
        if (proveedoresInventory != null) {
            dispatch(SetDefaultProveedorFilterCompras(proveedoresInventory))
        }
    }, [proveedoresInventory])

    const columns = [
        {
            Header: "Cédula",
            accessor: "cedula",
        },
        {
            Header: "Descripcion",
            accessor: "descripcion",
        }
    ];

    const handleInputChangeWithDispatch = ({ target }, action) => {
        dispatch(action(target.value));
    };

    const handleSearch = async (e) => {

        e.preventDefault();

        console.log(valorfiltroProveedor)

        if (valorfiltroProveedor === '') {
            dispatch(SetDefaultUbicacionFilterCompras(proveedoresInventory))
        } else {
            dispatch(SetSearchProveedorFilterCompras({ valorfiltroProveedor, proveedoresInventory }));
        }
    }

    const closeModal = () => {

        // Cerrar el modal
        dispatch(SetOpenModalSearchProveedorCompras(false));

        //Clean el state de busqueda de presentaciones
        dispatch(CleanValorFiltroProveedorCompras());

        //Set default filter
        if (proveedoresInventory !== null) {
            dispatch(SetDefaultProveedorFilterCompras(proveedoresInventory));
        }

    }

    return (
        <>
            <div className="modal fade" id="modalProveedorCompra">
                <div className="modal-dialog modal-lg modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">
                                Buscar Proveedor <FaTruckFast className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                            ></button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <InventorySearchProveedorTable columns={columns} data={filterProveedorInventory} />
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
