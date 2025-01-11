import { useDispatch, useSelector } from 'react-redux';

import iconImage from '../../assets/IconImage.jpeg';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

import {
    removeErrorCentro, 
    removeErrorPassword, 
    removeErrorUserName, 
    setErrorCentro, 
    setErrorPassword, 
    setErrorUserName,
    startLogin 
} from '../../actions/login';
import { Auth } from '../../models';
import { useState } from 'react';

export const LoginPage = () => {

    const initialStateLogin = {
        userName : '',
        password: ''
    }

    const [ valuesLogin, setValuesLogin ] = useState(initialStateLogin);
    const [ visiblePassword, setVisablePassword ] = useState(false);

    const { userName, password } =valuesLogin;

    const dispatch = useDispatch();
    const {
        msgErrors, 
        loading, 
    } = useSelector( state => state.login );

    const handleInputChangeWithDispatch = ({ target }) => {
        setValuesLogin({
            ...valuesLogin,
            [ target.name ] : target.value
        });
    };

    const handleLogin = (e) => {
        
        e.preventDefault();
        if( isFormValid() ){
            dispatch( startLogin( new Auth( '', userName, password ) ) );
        } 
    }

    const handleVisibleClave = (e) => {
        
        dispatch( setVisablePassword( !visiblePassword ) );
    }

    const isFormValid = () => {
                
        // Validations username
        if( userName.trim().length === 0 ) {
            dispatch( setErrorUserName('El usuario es obligatorio'));
            return false;
        } 
        // } else if( !validator.isEmail( email )) {
        //     dispatch( setError('Email is not valid'));
        //     return false;
        
        // Validations password
        if( password.trim().length === 0 ) {
            dispatch( setErrorPassword('Contraseña es obligatoria'));
            return false;
        } else if( password.length < 5) {
            dispatch( setErrorPassword('La contraseña debe tener al menos 5 caracteres'));
            return false;
        }
    
        dispatch( removeErrorCentro() );
        dispatch( removeErrorUserName() );
        dispatch( removeErrorPassword() );

        return true;
    } 
  
    return (

        <div className='login-page-background'>

            <div className='login-page'>

                <div className='login_form-content-left'>
                    <img 
                        // src='/public/assets/NothingImage.png' 
                        src={ iconImage }
                        alt='logo' 
                        className='login-form-img' 
                    />
                </div>                

                <div className='login_form-content-right'>

                    <div className='login-form'>

                        <h1 className='login-form-title'>2650 POS</h1>

                        <div className='login-form-inputs'>
                            <label className='login-form-label'>
                                Usuario
                            </label>
                            <input
                                key="txtUserNameLoginPage"
                                id='userName'
                                name='userName'
                                type='text'
                                className='login-form-input'
                                placeholder='Usuario'
                                value={ userName }
                                onChange={ e => handleInputChangeWithDispatch( e ) }
                            />
                            { msgErrors.userName && <p className='login-form-error'>{ msgErrors.userName }</p> }
                        </div>

                        <div className='login-form-inputs'>
                            <label className='login-form-label'>
                                Contraseña
                            </label>
                            <div className='password-container'>
                                <input
                                    key="txtPasswordLoginPage"
                                    id='password'
                                    name='password'
                                    type={ (visiblePassword) ? 'text' : 'password' }
                                    className='login-form-input'
                                    placeholder='Contraseña'
                                    value={ password }
                                    onChange={ e => handleInputChangeWithDispatch( e ) }
                                />
                                {
                                    (visiblePassword)
                                        ?   <AiFillEyeInvisible
                                                className='iconEyePasswordLoginPage'
                                                onClick={ handleVisibleClave }
                                            />
                                        :   <AiFillEye  
                                                className='iconEyePasswordLoginPage'
                                                onClick={ handleVisibleClave }
                                            />
                                }
                            </div>
                            { msgErrors.password && <p className='login-form-error'>{ msgErrors.password }</p> }
                        </div>

                        <button className='login-form-button-login' type='submit' disabled={loading} onClick={handleLogin}>
                            Ingresar
                        </button>

                        <span className='login-form-label-span'>
                            SUPER VETERINARIA DE LIBERIA - 2023
                        </span>

                    </div>

                </div>

            </div>

        </div>

    )
}
