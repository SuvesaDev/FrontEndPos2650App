import { useState } from 'react';

export const SettingsBodyEmpresas = () => {

    const [image, setImage] = useState();

    const handleUploadPicture = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const objectUrl = URL.createObjectURL(file)
        setImage( objectUrl );
    }

    return (
        <div className='settings_body-empresas-main'>
            
            <div className='settings_body-empresas-firstLine'>
                
                <div className='settings_body-empresas-firstLine-title'>
                    <p>Empresa</p>
                </div>

                <div className='settings_body-empresas-firstLine-input'>
                    <input type='text' name='nameEmpresaSettings' id='txtNameEmpresaSettings' />
                </div>

            </div>

            <div className='settings_body-empresas-secondLine'>
                
                <div className='settings_body-empresas-secondLine-cedula'>
                    <div className='settings_body-empresas-secondLine-cedula-title'>
                        <p>Cédula Juridíca</p>
                    </div>

                    <div className='settings_body-empresas-secondLine-cedula-input'>
                        <input type='text' name='cedulaSettings' id='txtcedulaSettings' />
                    </div>
                </div>

                <div className='settings_body-empresas-secondLine-telefono'>
                    <div className='settings_body-empresas-secondLine-telefono-title'>
                        <p>Teléfono (s)</p>
                    </div>

                    <div className='settings_body-empresas-secondLine-telefono-input'>
                        <input type='text' name='telefonoSettings' id='txttelefonoSettings' />
                    </div>
                </div>

            </div>

            <div className='settings_body-empresas-thirdLine'>
                
                <div className='settings_body-empresas-thirdLine-frase'>
                    <div className='settings_body-empresas-thirdLine-frase-title'>
                        <p>Frase Publicitaria</p>
                    </div>

                    <div className='settings_body-empresas-thirdLine-frase-input'>
                        <input type='text' name='fraseSettings' id='txtFraseSettings' />
                    </div>
                </div>

                <div className='settings_body-empresas-thirdLine-fax'>
                    <div className='settings_body-empresas-thirdLine-fax-title'>
                        <p>Fax (es)</p>
                    </div>

                    <div className='settings_body-empresas-thirdLine-fax-input'>
                        <input type='text' name='faxSettings' id='txtfaxSettings' />
                    </div>
                </div>

            </div>

            <div className='settings_body-empresas-fourthLine'>

                <div className='settings_body-empresas-fourthLine-title'>
                    <p>Dirección</p>
                </div>

                <div className='settings_body-empresas-fourthLine-input'>
                    <input type='text' name='dirreccionSettings' id='txtdirreccionSettings' />
                </div>

            </div>

            <div className='settings_body-empresas-fifthLine'>

                <div className='settings_body-empresas-fifthLine-btn'>

                    <input 
                        id="fileSelector"
                        type="file"
                        name="file"
                        onChange={ handleFileChange }
                    />

                    <button 
                        id="btnSubirLogo"
                        onClick={ handleUploadPicture }    
                    >
                        Subir Logo
                    </button>
                    
                </div>

                <div className='settings_body-empresas-fifthLine-image'>
                    
                    <div
                        className="settings_body-empresas-fifthLine-image-logo"
                        style={{
                            backgroundSize: 'cover',
                            backgroundImage: `url(${ image })`
                        }}
                    ></div>

                </div>

            </div>

        </div>
    )
}
