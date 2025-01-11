
export const SettingsBodyTarifas = () => {
    return (
        <div className='settings_body-tarifas-main'>

            <p id='lblTitleTarifas'>Tarifas</p>
            
            <div className='settings_body-tarifas-inputs'>
                
                <div className='settings_body-tarifas-inputs-tarifa'>
                    <p id='lblTarifaSettingB'>Tarifa</p>
                    <input type='text' id='txtTarifaSettingB' name='tarifaSettingB' />
                </div>

                <div className='settings_body-tarifas-inputs-descrip'>
                    <p id='lblDescripSettingB'>Descripción</p>
                    <input type='text' id='txtDescripSettingB' name='descripSettingB' />
                </div>

                <div className='settings_body-tarifas-inputs-moneda'>
                    <p id='lblMonedaSettingB'>Moneda</p>
                    <select id='cboMonedaSettingB' name='monedaSettingB'>
                        <option value='COLON'>COLON</option>
                        <option value='DOLAR'>DOLAR</option>
                    </select>
                </div>

                <div className='settings_body-tarifas-inputs-btn'>
                    <button id='btnAddTarifaSettingB'>Agregar</button>
                </div>

            </div>

            <div className='settings_body-tarifas-table'>
                <table className='settings_body-tarifas-table-main'>
                    <thead>
                        <tr>
                            <th className='settings_body-tarifas-table-header-tarifa'>Tarifa</th>
                            <th className='settings_body-tarifas-table-header-descrip'>Descripción</th>
                            <th className='settings_body-tarifas-table-header-moneda'>Moneda</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='settings_body-tarifas-table-tarifa'>test</td>
                            <td className='settings_body-tarifas-table-descrip'>test</td>
                            <td className='settings_body-tarifas-table-moneda'>test</td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}
