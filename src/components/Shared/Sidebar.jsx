import React from 'react';
import { useSelector } from 'react-redux';

import { SidebarData } from './SidebarData';
import { SidebarItem } from './SidebarItem';
import { SidebarDataCostaPets } from './SidebarDataCostaPets';

export const Sidebar = () => {

    const { auth } = useSelector( state => state.login );

    const { 
      costaPets,
      administrador,
      agenteCostaPets 
    } = auth;

    return (
       
          (costaPets) 
            ? <SidebarDataCostaPets></SidebarDataCostaPets>
            : SidebarData.map((item, index) => (
              <SidebarItem key={index} index={index} item={item} class/>
            ))
      
    ) 
}
