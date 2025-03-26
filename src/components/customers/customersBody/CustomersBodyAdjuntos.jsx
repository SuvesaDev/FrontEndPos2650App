import Swal from 'sweetalert2';
import { createRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FaSave } from 'react-icons/fa';

import { CustomersBodyAdjuntosTable } from './CustomersBodyAdjuntosTable';

import { SetAddAdjuntoCustomers, startSaveFilesCustomer } from '../../../actions/customers';

export const CustomersBodyAdjuntos = () => {

    const inputFile = createRef(null);
    const dispatch = useDispatch();

    const { adjuntos, disableInputs, customer } = useSelector((state) => state.customers);
    const { identificacion } = customer;

    const columns = [
        {
          Header: "Codigo",
          accessor: "codigo",
        },
        {
          Header: "Nombre",
          accessor: "nombre",
        },
        {
            Header: "Acciones",
            accessor: "icon"
        },
    ];

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

        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file); // Convierte el archivo a Base64
        
        if (inputFile.current) {
            inputFile.current.value = "";
        }
        fileReader.onload = () => {

            if( valideImageExists(fileReader.result) ) {

                Swal.fire({
                    icon: 'warning',
                    title: 'Advertencia',
                    text: 'Archivo ya se encuentra cargado. Por favor agregar un distinto archivo.'
                });
                return;

            }

            const newFile = {
                codigo: 0,
                nombre: file.name,
                base64: fileReader.result
            }

            dispatch( SetAddAdjuntoCustomers( newFile ) );
            
        }

        fileReader.onerror = () => {

            // Se muestra mensaje
            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Ocurrio un error cargando el archivo, por favor intentelo de nuevo.'
            });
        }
    }

    const hasExtension = (fileName, exts) => {
        return (new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$')).test(fileName);
    }  

    const handleSaveFiles = () => {

        if( adjuntos.length == 0 ) {

            Swal.fire({
                icon: 'warning',
                title: 'Advertencia',
                text: 'Debe adjuntar al menos un archivo para guardar.'
            });

            return;
        }

        const newFiles = adjuntos.map( adjunto => {
            return {
                id: adjunto.codigo,
                idCliente: identificacion,
                archivo: adjunto.base64,
                tipo: obtenerExtension(adjunto.nombre),
                extencion: adjunto.nombre
            }
        })

        dispatch( startSaveFilesCustomer(newFiles, identificacion) );

    }

    const obtenerExtension = (nameFile) => {
        return nameFile.slice((nameFile.lastIndexOf(".") - 1 >>> 0) + 2);
    }

    const valideImageExists = (newImage) => {
        
        const existsImage = adjuntos.find( adjunto => adjunto.base64 === newImage );
        return existsImage != null
    }
    
    return (
        <>
            <div className="card">
                <div className="card-body">

                    <div className="row mb-3">

                        <div className="col-md-3 mb-3 ms-3">
                            <h5 className='text-start'>Por seleccione un archivo a cargar</h5>
                            <div className="input-group">

                                <label 
                                    for="txtFile" 
                                    class="btn btn-primary"
                                >
                                    Seleccionar archivo
                                </label>
                                <input
                                    type="file"
                                    id='txtFile'
                                    onChange={handleUploadFile}
                                    ref={inputFile}
                                    className='d-none'
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
                                onClick={ handleSaveFiles }
                                >
                                <FaSave className="iconSize" /> Guardar Documentos
                            </button>
                        </div>

                    </div>

                    <div className='row mb-0'>

                        <div className="col-md-12 mb-3">
                            <CustomersBodyAdjuntosTable 
                                columns={columns}
                                data={adjuntos}
                            />
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
