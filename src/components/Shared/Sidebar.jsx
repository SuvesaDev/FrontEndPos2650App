import React from 'react';

import { SidebarData } from './SidebarData';
import { SidebarItem } from './SidebarItem';

export const Sidebar = () => {
    return (

        //TODO: Es validar aqui si el usuario es modulo agente

        SidebarData.map((item, index) => (
          <SidebarItem key={index} index={index} item={item} class/>
        ))

        //SidebarDataAgentes
      
    ) 
}
