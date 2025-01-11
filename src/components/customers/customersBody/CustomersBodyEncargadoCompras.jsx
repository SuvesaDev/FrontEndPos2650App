
export const CustomersBodyEncargadoCompras = () => {
    return (
      
        <div className='customers_body-encargadoCompras-main'>

            <div className='customers_body-encargadoCompras-cbo'>
                <p id='lblIdentificacionEncargadoCompras'>Identificacion:</p>
                <select id='cbodentificacionEncargadoCompras' name='identificacionEncargadoCompras'>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <button id='btnAgregarEncargadoCompras'>Agregar</button>
            </div>

            <div className='customers_body-encargadoCompras-table'>

                <table className='customers_body-encargadoCompras-table-main'>
                    <thead>
                        <tr>
                            <th className='customers_body-encargadoCompras-table-header-iden'>Identificacion</th>
                            <th className='customers_body-encargadoCompras-table-header-nombre'>Nombre</th>
                            <th className='customers_body-encargadoCompras-table-header-telefono'>Telefono</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='customers_body-encargadoCompras-table-iden'>test</td>
                            <td className='customers_body-encargadoCompras-table-nombre'>test</td>
                            <td className='customers_body-encargadoCompras-table-telefono'>test</td>
                        </tr>
                    </tbody>
                </table>

            </div>
        </div>

    )
}
