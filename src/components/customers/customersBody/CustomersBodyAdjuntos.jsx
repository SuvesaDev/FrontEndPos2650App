import Swal from 'sweetalert2';
import { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaFile, FaSave } from 'react-icons/fa';

export const CustomersBodyAdjuntos = () => {

    // var inputFile = createRef(null);

    const dispatch = useDispatch();

    const handleUploadFile = (e) => {
        
        if (!hasExtension(e.target.files[0].name, ['pdf', 'docx', 'doc', 'jpg', 'jpeg', 'png', 'gif', 'webp'])) {
            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Archivo no tiene una extencion Valida. Por favor intentelo de nuevo con archivos con extensiones: (pdf, docx, doc, jpg, jpeg, png, gif, webp).'
            });
            return;
        }

        // // StartReadingXML en true
        // dispatch(SetStartReadingXMLCompras(false));

        // // Se limpia los campos actuales
        // dispatch(CleanFacturaCompras());

        // // Se establece el hasChargeFactura
        // dispatch(SetHasChargeFacturaCompras(false));

        // // Se establece el catalogo interno en false
        // dispatch(SetHasCatalogosInternos(false));

        // // Establecer el nombre del archivo
        // dispatch(SetNameFileReadXMLCompras(e.target.files[0].name));

        // // Read XML
        // const file = e.target.files[0];
        // const fileReader = new FileReader();

        // fileReader.readAsText(file);

        // fileReader.onload = () => {

        //     // Se parse el XML
        //     const xmlreaded = parseXML(new XMLParser().parseFromString(fileReader.result));
        //     console.log(xmlreaded)
        //     // Se establece en state
        //     dispatch(SetBillingImportXMLCompras(xmlreaded));

        //     // StartReadingXML en true
        //     dispatch(SetStartReadingXMLCompras(true));
        // }

        // fileReader.onerror = () => {

        //     // Se muestra mensaje
        //     Swal.fire({
        //         icon: 'warning',
        //         title: 'Advertencia',
        //         text: 'Ocurrio un error cargando el archivo XML, por favor intentelo de nuevo.'
        //     });

        //     // Se limpia el nombre del archivo
        //     dispatch(SetNameFileReadXMLCompras(''));

        //     // StartReadingXML en false
        //     dispatch(SetStartReadingXMLCompras(false));
        // }
    }

    const hasExtension = (fileName, exts) => {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }


    const { 
        disableInputs
    } = useSelector( state => state.customers );
    
    return (
        <>
            <div className="card">
                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-10 mb-3">
                            <h5 className='text-start'>Por seleccione un archivo a cargar</h5>
                            <div className="input-group">

                                <span className="input-group-text">
                                    <FaFile className="iconSize" />
                                </span>
                                <input
                                    type="file"
                                    id='txtFile'
                                    // ref={inputFile}
                                    onChange={handleUploadFile}
                                    className='form-control'
                                    disabled={disableInputs}
                                />

                            </div>
                        </div>

                        <div className="col-md-2 mb-3">
                            <div className="w-100 pt-4"></div>
                            <button
                                className={
                                    disableInputs ? "btn btn-success disabled" : "btn btn-success"
                                }
                                disabled={disableInputs}
                                // onClick={ handleConvertirCantidadDisponibles }
                                >
                                Guardar Documentos<FaSave className="iconSize" />
                            </button>
                        </div>

                    </div>

                    <div className='row mb-0'>

                        <div className="col-md-12 mb-3">
                            <p>Table</p>
                        </div>

                    </div>
                </div>
            </div>
    </>

    )
}

// Display respaldo
    // <div className='customers_body-carta-main'>
            
    //     <div className='customers_body-carta-first-box'>

    //         <div className='customers_body-carta-first-box-cliente'>
        
    //             <div className='customers_body-carta-first-box-cliente-labelsInputs'>
    //                 <p id='lblCECliente'>Cliente</p>
    //                 <div className='customers_body-carta-first-box-cliente-labelsInputs-inputs'>
    //                     <input type='text' name='CEidCliente' id="txtCEidCliente"/>
    //                     <input type='text' name='CENombreCliente' id="txtCENombreCliente"/>
    //                 </div>
    //             </div>

    //             <div className='customers_body-carta-first-box-cliente-buttons'>
    //                 <button id='btnCEBuscarCliente'>Buscar Cliente</button>
    //             </div>

    //         </div>

    //         <div className='customers_body-carta-first-box-data'>
                
    //             <div className='customers_body-carta-first-box-data-firstLine'>
                    
    //                 <div className='customers_body-carta-first-box-data-firstLine-motivo'>
    //                     <p id='lblCEMotivo'>Motivo Exoneracion</p>
    //                     <select id='cboCEMotivo'>
    //                         <option value='0'>Compras Autorizadas</option>
    //                     </select>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-numeroDocumento'>
    //                     <p id='lblCEnumeroDocumento'>Numero Documento</p>
    //                     <div className='customers_body-carta-first-box-data-firstLine-numeroDocumento-inputs'>
    //                         <input type='text' name='CENumeroDocumento' id="txtCENumeroDocumento"/>
    //                         <BsFillCheckCircleFill id='btnCECheckDocumento'/>
    //                     </div>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-fechaEmision'>
    //                     <p id='lblCEfechaEmision'>Fecha Emision</p>
    //                     <input type="date" id="txtCEfechaEmision" name="fechaEmision"
    //                         min="01-01-2022" max="12-31-2022" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-fechaVence'>
    //                     <p id='lblCEfechaVence'>Fecha Vence</p>
    //                     <input type="date" id="txtCEfechaVence" name="fechaVence"
    //                         min="01-01-2022" max="12-31-2022" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-firstLine-exoneracion'>
    //                     <p id='lblCEexoneracion'>Exoneracion</p>
    //                     <div className='customers_body-carta-first-box-data-firstLine-exoneracion-inputs'>
    //                         <p id='lblCEexoneracionPorcentaje'>%</p>
    //                         <input type='text' name='CEExoneracion' id="txtCEExoneracion"/>
    //                     </div>
    //                 </div>

    //             </div>

    //             <div className='customers_body-carta-first-box-data-secondLine'>

    //                 <div className='customers_body-carta-first-box-data-secondLine-IV'>
    //                     <p id='lblCEIV'>% IV</p>
    //                     <input type="text" id="txtCEIV" name="CEIV" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-descripcion'>
    //                     <p id='lblCEDescripcion'>Breve descripcion de para que productos se debe aplicar</p>
    //                     <input type="text" id="txtCEDescripcion" name="CEDescripcion" />
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-btnAgregarCarta'>
    //                     <button id='btnCEAgregarCarta'>Agregar Carta</button>
    //                 </div>

    //                 <div className='customers_body-carta-first-box-data-secondLine-btnEliminarCarta'>
    //                     <button id='btnCEEliminarCarta'>Eliminar Carta</button>
    //                 </div>

    //             </div>

    //         </div>

    //     </div>

    //     <div className='customers_body-carta-second-box'>
            
    //         <table className='customers_body-carta-second-box-table-main'>
    //             <thead>
    //                 <tr>
    //                     <th className='customers_body-carta-second-box-table-header-tipo'>Tipo Exoneracion</th>
    //                     <th className='customers_body-carta-second-box-table-header-numeroDocumento'>Numero Documento</th>
    //                     <th className='customers_body-carta-second-box-table-header-fechaEmision'>Fecha Emision</th>
    //                     <th className='customers_body-carta-second-box-table-header-fechaVence'>Fecha Vence</th>
    //                     <th className='customers_body-carta-second-box-table-header-porcentaje'>Porcentaje Compra</th>
    //                     <th className='customers_body-carta-second-box-table-header-impuesto'>Impuesto</th>
    //                     <th className='customers_body-carta-second-box-table-header-nota'>Nota</th>
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 <tr>
    //                     <td className='customers_body-carta-second-box-table-tipo'>test</td>
    //                     <td className='customers_body-carta-second-box-table-numeroDocumento'>test</td>
    //                     <td className='customers_body-carta-second-box-table-fechaEmision'>test</td>
    //                     <td className='customers_body-carta-second-box-table-fechaVence'>test</td>
    //                     <td className='customers_body-carta-second-box-table-porcentaje'>test</td>
    //                     <td className='customers_body-carta-second-box-table-impuesto'>test</td>
    //                     <td className='customers_body-carta-second-box-table-nota'>test</td>
    //                 </tr>
    //             </tbody>
    //         </table>

    //     </div>

    // </div>
