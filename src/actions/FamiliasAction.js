import Swal from 'sweetalert2';

import { suvesaApi } from '../api';

import { types } from "../types/types";

import loadingImage from '../assets/loading_snipiner.gif';

// API Actions
export const startGetAllFamilias = () => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const { data } = await suvesaApi.get('/Familias/getFamilias');
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();

            if (status === 0) {

                // Se ingresa nuevo banco a la tabla
                dispatch( SetAllFamiliasFamily( responses ) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });

            }

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startSaveFamilias = ( familia ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea agregar un nueva familia?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post('/Familias/CreateFamilia', familia);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        // Se ingresa nuevo banco a la tabla
                        dispatch( startGetAllFamilias() );
                        dispatch( SetClosingModalFamiliasFamily(true) );
                        dispatch( CleanFamiliaFamiliasFamily() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startEditFamilias = ( familia ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea editar la familia?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Editar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.put('/Familias/EditFamilia', familia);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        // Se ingresa nuevo banco a la tabla
                        dispatch( startGetAllFamilias() );
                        dispatch( SetClosingModalFamiliasFamily(true) );
                        dispatch( CleanFamiliaFamiliasFamily() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startDeleteFamilias = ( idFamilia, descripcion ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea eliminar la familia ${descripcion}?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.delete(`/Familias/deleteFamilia?idFamilia=${idFamilia}`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        // Se ingresa nuevo banco a la tabla
                        dispatch( startGetAllFamilias() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startGetSubFamiliasByFamilia = ( idFamilia ) => {

    return async (dispatch) => {

        try {

            //Mostrar el loading
            Swal.fire({
                title: 'Por favor, espere',
                allowEscapeKey: false,
                allowOutsideClick: false,
                showConfirmButton: false,
                imageUrl: loadingImage,
                customClass: 'alert-class-login',
                imageHeight: 100,
            });
            
            //Call end-point 
            const { data } = await suvesaApi.get(`/subFamilias/getSubFamiliasToFamilias?familiaId=${idFamilia}`);
            const { status, responses } = data;
            
            //Quitar el loading
            Swal.close();
            
            if (status === 0) {
                
                if( responses.length == 0 ) {
                    Swal.fire({
                        icon: 'warning',
                        title: 'Advertencia',
                        text: 'No existen Sub Familias.'
                    });
                }
                
                dispatch( SetSubFamiliasFamiliasFamily(responses) );
                dispatch( SetIsSeletedFamiliasFamily(true) );
                dispatch( SetCodigoSeletedFamiliasFamily(idFamilia) );

            } else {

                //Caso contrario respuesta incorrecto mostrar mensaje de error
                const { currentException } = data;
                const msj = currentException.split(',');

                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: (currentException.includes(',')) ? msj[3] : currentException,
                });

            }                

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startSaveSubFamilias = ( Subfamilia, idFamilia ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: '¿Desea agregar un nueva Subfamilia?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Guardar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.post('/subFamilias/postCreateSubFamilia', Subfamilia);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        dispatch( startGetSubFamiliasByFamilia(idFamilia) );
                        dispatch( SetClosingModalSubFamiliasFamily(true) );
                        dispatch( CleanSubFamiliaFamiliasFamily() );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startEditSubFamilias = ( Subfamilia, idFamilia) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea editar la Subfamilia?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Editar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.put('/subFamilias/putSubFamilia', Subfamilia);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        // Se ingresa nuevo banco a la tabla
                        dispatch( startGetSubFamiliasByFamilia(idFamilia) );
                        dispatch( SetClosingModalSubFamiliasFamily(true) );
                        dispatch( CleanSubFamiliaFamiliasFamily() );
                        dispatch( SetIdSubFamiliasSeletedFamily(0) );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

export const startDeleteSubFamilias = ( idSubFamilia, descripcion, idFamilia ) => {

    return async (dispatch) => {

        try {

            //Mostrar un mensaje de confirmacion
            Swal.fire({
                title: `¿Desea eliminar la Subfamilia ${descripcion}?`,
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Eliminar',
                denyButtonText: `Cancelar`,
            }).then(async (result) => {

                if (result.isConfirmed) {

                    //Mostrar el loading
                    Swal.fire({
                        title: 'Por favor, espere',
                        allowEscapeKey: false,
                        allowOutsideClick: false,
                        showConfirmButton: false,
                        imageUrl: loadingImage,
                        customClass: 'alert-class-login',
                        imageHeight: 100,
                    });
                    
                    //Call end-point 
                    const { data } = await suvesaApi.delete(`/subFamilias/deleteSubFamilia?idSubFamilia=${idSubFamilia}`);
                    const { status } = data;
                    
                    //Quitar el loading
                    Swal.close();
                    
                    if (status === 0) {
                        
                        // Se ingresa nuevo banco a la tabla
                        dispatch( startGetSubFamiliasByFamilia(idFamilia) );

                    } else {

                        //Caso contrario respuesta incorrecto mostrar mensaje de error
                        const { currentException } = data;
                        const msj = currentException.split(',');

                        Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: (currentException.includes(',')) ? msj[3] : currentException,
                        });

                    }

                }

            });

        } catch (error) {

            Swal.close();
            console.log(error);
            if (error.message === 'Request failed with status code 401') {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Usuario no valido',
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrio un problema a la guardar el banco',
                });
            }
        }
    };
}

// Normal Actions
export const SetAllFamiliasFamily = (value) => ({
    type: types.SetAllFamiliasFamily,
    payload: value
})

export const CleanFamiliasFamily = () => ({
    type: types.CleanFamiliasFamily
})

export const SetCodigoFamiliaFamiliasFamily = (value) => ({
    type: types.SetCodigoFamiliaFamiliasFamily,
    payload: value
})

export const SetDescripcionFamiliaFamiliasFamily = (value) => ({
    type: types.SetDescripcionFamiliaFamiliasFamily,
    payload: value
})

export const SetObservacionesFamiliaFamiliasFamily = (value) => ({
    type: types.SetObservacionesFamiliaFamiliasFamily,
    payload: value
})

export const CleanFamiliaFamiliasFamily = () => ({
    type: types.CleanFamiliaFamiliasFamily
})

export const SetIsCreateFamiliasFamily = (value) => ({
    type: types.SetIsCreateFamiliasFamily,
    payload: value
})

export const SetClosingModalFamiliasFamily = (value) => ({
    type: types.SetClosingModalFamiliasFamily,
    payload: value
})

export const SetSubFamiliasFamiliasFamily = (value) => ({
    type: types.SetSubFamiliasFamiliasFamily,
    payload: value
})

export const SetIsSeletedFamiliasFamily = (value) => ({
    type: types.SetIsSeletedFamiliasFamily,
    payload: value
})

export const SetCodigoSeletedFamiliasFamily = (value) => ({
    type: types.SetCodigoSeletedFamiliasFamily,
    payload: value
})

export const SetCodigoSubFamiliaFamiliasFamily = (value) => ({
    type: types.SetCodigoSubFamiliaFamiliasFamily,
    payload: value
})

export const SetDescripcionSubFamiliaFamiliasFamily = (value) => ({
    type: types.SetDescripcionSubFamiliaFamiliasFamily,
    payload: value
})

export const SetObservacionesSubFamiliaFamiliasFamily = (value) => ({
    type: types.SetObservacionesSubFamiliaFamiliasFamily,
    payload: value
})

export const SetIsCreateSubFamiliasFamily = (value) => ({
    type: types.SetIsCreateSubFamiliasFamily,
    payload: value
})

export const SetClosingModalSubFamiliasFamily = (value) => ({
    type: types.SetClosingModalSubFamiliasFamily,
    payload: value
})

export const CleanSubFamiliaFamiliasFamily = () => ({
    type: types.CleanSubFamiliaFamiliasFamily
})

export const SetIdSubFamiliasSeletedFamily = (value) => ({
    type: types.SetIdSubFamiliasSeletedFamily,
    payload: value
})