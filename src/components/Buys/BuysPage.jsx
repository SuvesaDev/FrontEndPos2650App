import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BuysHeader } from './BuysHeader';
import { BuysArticulos } from './BuysArticulos';
import { BuysIcons } from './BuysIcons';

import {
    SetCodigoProvCompras,
    SetOpenModalSearchProveedorCompras,
    SetcedulaProveedorAddCompras,
    SetdireccionProveedorAddCompras,
    SetemailProveedorAddCompras,
    Setfax1ProveedorAddCompras,
    SetnombreProveedorAddCompras,
    Settelefono1ProveedorAddCompras,
    isOpenModalAddProveedorCompras
} from '../../actions/ComprasAction';

export const BuysPage = () => {

    const botonRef = useRef(null);

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
            if(fax != undefined || fax != null) {
                dispatch(Setfax1ProveedorAddCompras(fax.numTelefono));
            }

            // Se inserta email del proveedor
            dispatch(SetemailProveedorAddCompras(correoElectronico));

            // Se inserta ubicacion del proveedor
            dispatch(SetdireccionProveedorAddCompras(ubicacion.otrasSenas));

            dispatch(isOpenModalAddProveedorCompras(true));
        } else {
            
            if (CedulaProveedor !== '') {

                // Se busca el codigo del proveedor 
                const proveedor = filterProveedorInventory.find(prov => prov.cedula === CedulaProveedor);

                if(proveedor != undefined) {
                    dispatch(SetCodigoProvCompras(proveedor.codigo));
                } else {

                    if (botonRef.current) {
                        botonRef.current.click(); // Simula un clic en el botón con data-bs-toggle
                        dispatch(SetOpenModalSearchProveedorCompras(true));
                    }

                }
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


                <button
                    ref={botonRef}
                    className="d-none"
                    data-bs-toggle="modal"
                    data-bs-target="#modalCrearProveedor"
                ></button>
            </div>
            <br />
        </>
    )
}
