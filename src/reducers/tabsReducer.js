import { types } from "../types/types";

// const initialState = {
//     tabs: [
//         { name: "Inicio", routePage: '/' }
//     ],
//     currentTab: { name: "Inicio", routePage: '/' }
// }

const initialState = JSON.parse(localStorage.getItem('tabs')) || {
    tabs: [],
    currentTab: { name: 'Nada', routePage: '/nothing' },
    lastVentas: 0
};

export const tabsReducer = (state = initialState, action ) => {

    switch ( action.type ) {

        case types.AddTab:

            const listTab = state.tabs.find(tab => tab.name == action.payload.name || tab.name.includes(action.payload.name));
            
            if(listTab === undefined) {

                const newTab = {
                    name: (action.payload.name === 'Venta') ? action.payload.name + ' # 1' : action.payload.name,
                    routePage: (action.payload.name === 'Venta') ? action.payload.routePage + '/1' : action.payload.routePage,
                };

                localStorage.setItem('tabs', JSON.stringify({
                    tabs: [... state.tabs, newTab],
                    currentTab: newTab
                }));
    
                return {
                    ...state,
                    tabs: [... state.tabs, newTab],
                    currentTab: newTab,
                    lastVentas: (action.payload.name === 'Venta') ? 1 : state.lastVentas
                }
                
            } else if(listTab.name.includes("Clientes")) {
                
                const isCustomers = state.tabs.find(tab => tab.name == action.payload.name ||tab.name.includes(action.payload.name));

                if(isCustomers === undefined) {

                    const newTab = {
                        name: action.payload.name,
                        routePage: action.payload.routePage
                    };
    
                    localStorage.setItem('tabs', JSON.stringify({
                        tabs: [... state.tabs, newTab],
                        currentTab: newTab
                    }));
        
                    return {
                        ...state,
                        tabs: [...state.tabs, newTab],
                        currentTab: newTab
                    }
                }
                
            } else if(listTab.name.includes("Venta")){

                const newTab = {
                    name: action.payload.name + ` # ${ state.lastVentas + 1 }`,
                    routePage: action.payload.routePage + `/${ state.lastVentas + 1 }`
                };
                
                // const size = state.tabs.filter(tab => tab.name.includes("Venta")).length;
                // const exist = state.tabs.filter(tab => tab.name.includes(`Venta # ${ size + 1 }`)).length;
                
                // if( exist > 0 ) {
                //     const lastIndex = state.tabs[size - 1].routePage.split('/')[3];
                //     newTab = {
                //         name: action.payload.name + ` # ${ parseInt(lastIndex) + 1 }`,
                //         routePage: action.payload.routePage + `/${ parseInt(lastIndex) + 1 }`
                //     };
                // } else {
                //     newTab = {
                //         name: action.payload.name + ` # ${ size + 1 }`,
                //         routePage: action.payload.routePage + `/${ size + 1 }`
                //     };
                // }

                localStorage.setItem('tabs', JSON.stringify({
                    tabs: [... state.tabs, newTab],
                    currentTab: newTab
                }));

                return {
                    ...state,
                    tabs: [... state.tabs, newTab],
                    currentTab: newTab,
                    lastVentas: state.lastVentas + 1
                }

            } else {
                return {
                    ...state,
                    currentTab : {
                        ...action.payload
                    },
                }
            }
            
        case types.SelectTab:

            localStorage.setItem('tabs', JSON.stringify({
                ...state,
                currentTab : {
                    ...action.payload
                },
            }));

            return {
                ...state,
                currentTab : {
                    ...action.payload
                },
            }

        case types.DeleteTab:

            if(state.tabs.length === 1) {

                localStorage.setItem('tabs', JSON.stringify({
                    tabs: [],
                    currentTab : { name: 'Nada', routePage: '/nothing' }
                }));
                
                return {
                    ...state,
                    tabs: [],
                    currentTab : { name: 'Nada', routePage: '/nothing' }
                }

            } else {

                if(action.payload.name.includes("Clientes")) {
                    
                    const indexTab = state.tabs.findIndex( tab => tab.name === action.payload.name);
                    
                    const newState = {
                        ...state,
                        tabs: (action.payload.name === "Clientes Frecuentes")
                                ? state.tabs.filter(tab => !tab.name.trim().includes(action.payload.name.trim()))
                                : state.tabs.filter(tab => !tab.name.trim().endsWith(action.payload.name.trim())),
                        currentTab : (state.currentTab.name === action.payload.name)
                                    ? {
                                        name: state.tabs[(indexTab === 0) ? 1 : indexTab - 1].name,
                                        routePage: state.tabs[(indexTab === 0) ? 1 : indexTab - 1].routePage, 
                                    }
                                    : state.currentTab
                    }

                    localStorage.setItem('tabs', JSON.stringify(newState));

                    return newState;

                } else {

                    const indexTab = state.tabs.findIndex( tab => tab.name.includes(action.payload.name));
                
                    const newState = {
                        ...state,
                        tabs: state.tabs.filter(tab => !tab.name.includes(action.payload.name)),
                        currentTab : (state.currentTab.name === action.payload.name)
                                    ? {
                                        name: state.tabs[(indexTab === 0) ? 1 : indexTab - 1].name,
                                        routePage: state.tabs[(indexTab === 0) ? 1 : indexTab - 1].routePage, 
                                    }
                                    : state.currentTab
                    }

                    localStorage.setItem('tabs', JSON.stringify(newState));

                    return newState;

                }

            }

        case types.DeleteAllTabs:
            
            localStorage.setItem('tabs', JSON.stringify({
                tabs: [],
                currentTab : { name: 'Nada', routePage: '/nothing' }
            }));
            
            return {
                ...state,
                tabs: [],
                currentTab : { name: 'Nada', routePage: '/nothing' }
            }

        default:
            return state;
    }

}