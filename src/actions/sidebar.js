import { types } from '../types/types';

export const ShowSidebar = () => ({
    type: types.ShowSidebar,
    payload: {
        sidebar: true,
    }
});

export const HideSidebar = () => ({
    type: types.HideSidebar,
    payload: {
        sidebar: false,
    }
});

export const ShowSidebarUser = () => ({
    type: types.ShowSidebarUser,
    payload: {
        sidebarUser: true,
    }
});

export const HideSidebarUser = () => ({
    type: types.HideSidebarUser,
    payload: {
        sidebarUser: false,
    }
});

export const DollarSidebar = (dollar) => ({
    type: types.DollarSidebar,
    payload: dollar
});