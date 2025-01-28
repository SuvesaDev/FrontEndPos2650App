import { types } from '../types/types';

const initialState = {
    auth: JSON.parse(localStorage.getItem('auth')) || {
        centro: null,
        username: null,
        token: null,
        isAutenticated: false,
        costaPets: null,
        administrador: null,
        agenteCostaPets: null
    },
    loading: false,
    msgErrors: {
        centro: null,
        userName: null,
        password: null
    },
    idSurcursal: 0,
    usersActive: [],
    surcursales: []
}

export const loginReducer = ( state = initialState, action ) => {

    switch (action.type) {

        case types.login:

            return {
                ...state,
                auth :{
                    centro: action.payload.centro,
                    username: action.payload.username,
                    token: action.payload.token,
                    isAutenticated : true,
                    costaPets: action.payload.costaPets,
                    administrador: action.payload.administrador,
                    agenteCostaPets: action.payload.agenteCostaPets
                }
            }

        case types.logout:
            return {
                ...state,
                auth : {
                    centro: null,
                    username: null,
                    token: null,
                    isAutenticated : false,
                    costaPets: null,
                    administrador: null,
                    agenteCostaPets: null
                },
                msgErrors: {
                    centro: null,
                    userName: null,
                    password: null
                },
                usersActive: []
            }

        case types.loginSetErrorCentro:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    centro: action.payload
                }
            }

        case types.loginRemoveErrorCentro:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    centro: null
                }
            }

        case types.loginSetErrorUserName:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    userName: action.payload
                }
            }

        case types.loginRemoveErrorUserName:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    userName: null
                }
            }

        case types.loginSetErrorPassword:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    password: action.payload
                }
            }

        case types.loginRemoveErrorPassword:
            return {
                ...state,
                msgErrors :{
                    ...state.msgErrors,
                    password: null
                }
            }

        case types.loginStartLoading:
            return {
                ...state,
                loading: true
            }
        
        case types.loginFinishLoading:
            return {
                ...state,
                loading: false
            }

        case types.SetUserActiveLogin:
            return {
                ...state,
                usersActive: action.payload
            }

        case types.SetSurcursalesLogin:
            return {
                ...state,
                surcursales: action.payload
            }

        case types.SetIdSurcursalLogin:
            return {
                ...state,
                idSurcursal: action.payload
            }
    
        default:
            return state;
    }

}