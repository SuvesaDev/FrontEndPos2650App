import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BuysHeader } from './BuysHeader';
import { BuysArticulos } from './BuysArticulos';
import { BuysIcons } from './BuysIcons';

import {
    SetCodigoProvCompras,
    SetcedulaProveedorAddCompras,
    SetdireccionProveedorAddCompras,
    SetemailProveedorAddCompras,
    Setfax1ProveedorAddCompras,
    SetnombreProveedorAddCompras,
    Settelefono1ProveedorAddCompras,
    isOpenModalAddProveedorCompras
} from '../../actions/ComprasAction';

export const BuysPage = () => {

    const dispatch = useDispatch();

    const {
        existProveedor,
        isOpenImportarXMLModal,
        billingImportXML,
        filterProveedorInventory,
        compras
    } = useSelector(state => state.compras);

    const { CedulaProveedor } = compras.encabezado;

    useEffect(() => {

        if (!existProveedor && !isOpenImportarXMLModal) {
            console.log(existProveedor);//TODO: EMPEZAR AQUI A REVISAR
            const {
                identificacion,
                nombre,
                telefono,
                fax,
                correoElectronico,
                ubicacion
            } = billingImportXML.emisor;

            // Se inserta la cedula del proveedor
            dispatch(SetcedulaProveedorAddCompras(identificacion.numero));

            // Se inserta el nombre del proveedor
            dispatch(SetnombreProveedorAddCompras(nombre));

            // Se inserta Telefono1 del proveedor
            dispatch(Settelefono1ProveedorAddCompras(telefono.numTelefono));

            // Se inserta fax1 del proveedor
            dispatch(Setfax1ProveedorAddCompras(fax.numTelefono));

            // Se inserta email del proveedor
            dispatch(SetemailProveedorAddCompras(correoElectronico));

            // Se inserta ubicacion del proveedor
            dispatch(SetdireccionProveedorAddCompras(ubicacion.otrasSenas));

            dispatch(isOpenModalAddProveedorCompras(true));
        } else {

            if (CedulaProveedor !== '') {

                // Se busca el codigo del proveedor 
                const proveedor = filterProveedorInventory.find(prov => prov.cedula === CedulaProveedor);

                dispatch(SetCodigoProvCompras(proveedor.codigo));
            }

        }

    }, [existProveedor, isOpenImportarXMLModal]);

    return (
        <>
            <div className="container-fluid mt-2">
                <div className="card">
                    <div className="card-header cartaMods">
                        <h3>Registro de Compras</h3>
                    </div>
                    <div className="card-body">
                        <div className="row mb-0 text-center" >
                            <div className="col-md-12 mb-0">
                                <BuysHeader />
                                <BuysArticulos />
                            </div>
                        </div>
                    </div>
                    <div className="card-footer cartaP">
                        <BuysIcons />
                    </div>
                </div>
            </div>
            <br />
        </>
    )
}
