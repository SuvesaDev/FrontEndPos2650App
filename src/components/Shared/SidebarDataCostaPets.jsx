import { SidebarItem } from './SidebarItem';
import { useSelector } from 'react-redux';

import { BsFillPeopleFill, BsFillFileEarmarkTextFill, BsFileCheckFill, BsFillPersonBadgeFill, BsCartCheckFill, BsFileEarmarkBinaryFill, BsFileEarmarkFontFill, BsFileDiffFill } from 'react-icons/bs';
import { CgPill } from 'react-icons/cg';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { HiPresentationChartBar } from 'react-icons/hi';
import { AiFillHome, AiFillSetting, AiOutlineShoppingCart, AiFillBank } from 'react-icons/ai';
import { FaFileInvoiceDollar, FaHandshake, FaCashRegister, FaCoins, FaMoneyBillAlt, FaMoneyCheckAlt, FaTools, FaUserCircle, FaGift, FaRegRegistered, FaCalendarAlt} from 'react-icons/fa';
import { GiPayMoney, GiTakeMyMoney, GiFamilyTree } from 'react-icons/gi';
import { IoDocuments } from 'react-icons/io5';
import { IoIosCash } from 'react-icons/io';
import { RiArrowDownSFill, RiArrowUpSFill, RiUserSettingsFill, RiMoneyDollarBoxFill, RiFilePaper2Fill } from 'react-icons/ri';
import { MdOutlineAttachMoney, MdOutlineMoneyOffCsred, MdAssignmentReturned, MdCategory, MdSdStorage, MdAssignmentReturn, MdFormatListNumbered } from 'react-icons/md';
import { TbReportSearch, TbZoomMoney  } from "react-icons/tb";
import { MdOutlineProductionQuantityLimits, MdSpatialTracking } from "react-icons/md";
import { BiSolidReport } from "react-icons/bi";

export const SidebarDataCostaPets = () => {

    const { auth } = useSelector( state => state.login );
    const { administrador, agenteCostaPets } = auth;

    return (
        
        ( administrador == true && agenteCostaPets == false ) 
            ?   IteamsAdmin.map((item, index) => (
                    <SidebarItem key={index} index={index} item={item} class/>
                ))
            : ( administrador == false && agenteCostaPets == true )
                ?   IteamsAgente.map((item, index) => (
                        <SidebarItem key={index} index={index} item={item} class/>
                    ))
                : <></>
       
    )

} 

const IteamsAdmin = [
    {
        title: 'Inicio',
        path: '/initial',
        icon: <AiFillHome />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Clientes',
                path: '/initial/customers',
                icon: <BsFillPeopleFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Inventarios',
                path: '/initial/inventory',
                icon: <CgPill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Caja',
                path: '/initial/cash/closecash',
                icon: <FaCashRegister />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Apertura Caja',
                        path: '/initial/cash/opencash',
                        icon: <MdOutlineAttachMoney />,
                    },
                    {
                        title: 'Arqueo Caja',
                        path: '/initial/cash/arqueocash',
                        icon: <MdOutlineMoneyOffCsred />,
                    },
                    {
                        title: 'Cierre Caja',
                        path: '/initial/cash/closecash',
                        icon: <MdOutlineMoneyOffCsred />,
                    },
                    {
                        title: 'Depósitos',
                        path: '/initial/cash/deposits',
                        icon: <GiTakeMyMoney />,
                        iconClosed: <RiArrowDownSFill />,
                        iconOpened: <RiArrowUpSFill />,
                        cName: 'vet_nav-text',
                        subNavSubIteams: [
                            {
                                title: 'Pre Depósito',
                                path: '/initial/cash/deposits/predeposits',
                                icon: <FaMoneyCheckAlt />,
                            },
                            {
                                title: 'Generar Depósito',
                                path: '/initial/cash/deposits/generatedeposits',
                                icon: <FaMoneyCheckAlt />,
                            },
                            {
                                title: 'Consulta Depósitos',
                                path: '/initial/cash/deposits/consultdeposits',
                                icon: <FaMoneyCheckAlt />,
                            }
                        ]
                    }
                ]
            },
            {
                title: 'Facturación',
                path: '/initial/billing',
                icon: <FaFileInvoiceDollar />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Cobrar',
                path: '/initial/charge',
                icon: <IoIosCash />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Documentos Emitidos',
                path: '/initial/documents',
                icon: <IoDocuments />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Devoluciones',
                path: '/initial/repayment',
                icon: <MdAssignmentReturned />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Consignacion',
                path: '/buys/consignment',
                icon: <MdOutlineProductionQuantityLimits />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Registro',
                        path: '/buys/consignment/register',
                        icon: <FaRegRegistered />,
                    },
                    {
                        title: 'Seguimiento',
                        path: '/buys/consignment/following',
                        icon: <MdSpatialTracking />,
                    },
                    {
                        title: 'Facturacion',
                        path: '/buys/consignment/billing',
                        icon: <FaMoneyBillAlt />,
                    },
                    {
                        title: 'Reportes',
                        path: '/buys/consignment/reports',
                        icon: <BiSolidReport />,
                    }
                ]
            }
        ]
    },
    {
        title: 'Compras',
        path: '/buys',
        icon: <AiOutlineShoppingCart />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Compra',
                path: '/buys/buy',
                icon: <AiOutlineShoppingCart />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Proveedores',
                path: '/buys/providers',
                icon: <FaHandshake />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Cuentas por pagar',
                path: '/buys/countswihoutpay',
                icon: <TbZoomMoney  />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bodegas',
                path: '/buys/orders/wineryadjustment',
                icon: <FaMoneyCheckAlt />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Ajuste Bodega',
                        path: '/buys/wineryadjustment',
                        icon: <SiHomeassistantcommunitystore />,
                    },
                    {
                        title: 'Solicitud Bodega',
                        path: '/buys/requestWinery',
                        icon: <MdSdStorage />,
                    },
                ]
            },
            {
                title: 'Toma',
                path: '/buys/pretake',
                icon: <FaMoneyCheckAlt />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Toma',
                        path: '/buys/take',
                        icon: <BsFileEarmarkFontFill />,
                    },
                    {
                        title: 'Pretoma',
                        path: '/buys/pretake',
                        icon: <BsFileEarmarkBinaryFill />,
                    },
                    {
                        title: 'Pretoma Fisica General',
                        path: '/buys/taxclaim',
                        icon: <BsFileDiffFill />,
                    },
                ]
            },
            {
                title: 'Movimientos de articulos',
                path: '/buys/movementitems',
                icon: <BsCartCheckFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Orden de compra manual',
                path: '/buys/purchaseorder',
                icon: <RiFilePaper2Fill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Devoluciones compra',
                path: '/buys/purchasereturns',
                icon: <MdAssignmentReturn />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Gastos',
                path: '/buys/bills',
                icon: <FaMoneyBillAlt />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Ajuste Inventario',
                path: '/buys/inventoryadjustment',
                icon: <CgPill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Abono Pagar',
                path: '/buys/pay',
                icon: <GiPayMoney />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Ajuste Pagar',
                path: '/buys/payadjustment',
                icon: <GiPayMoney />,
                cName: 'vet_nav-text'
            }
        ]
    },
    {
        title: 'Ventas',
        path: '/sales',
        icon: <RiMoneyDollarBoxFill />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Facturación',
                path: '/sales/billing',
                icon: <FaFileInvoiceDollar />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Presupuestos',
                path: '/sales/budgets/proforma',
                icon: <FaMoneyCheckAlt />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Proformas o Cotización',
                        path: '/sales/budgets/proforma',
                        icon: <BsFillFileEarmarkTextFill />,
                    },
                    {
                        title: 'Seguimiento Cotizaciones',
                        path: '/sales/budgets/seguimiento',
                        icon: <BsFileCheckFill />,
                    },
                ]
            },
            {
                title: 'Agente de ventas',
                path: '/sales/salesagent',
                icon: <BsFillPersonBadgeFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Abono Cobrar',
                path: '/sales/collect',
                icon: <GiTakeMyMoney />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Ajuste Cobrar',
                path: '/sales/adjustmentcollect',
                icon: <GiTakeMyMoney />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Devoluciones',
                path: '/sales/repayment',
                icon: <MdAssignmentReturned />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bonificaciones',
                path: '/sales/bonuses',
                icon: <FaGift />,
                cName: 'vet_nav-text'
            },
        ]
    },
    {
        title: 'Utilidades',
        path: '/utilities',
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        icon: <FaTools />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Asignar Codigo Cabys',
                path: '/utilities/assigncabyscode',
                icon: <MdFormatListNumbered />,
                cName: 'vet_nav-text'
            }
        ]
    },
    {
        title: 'Parametros',
        path: '/parameters',
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        icon: <RiUserSettingsFill />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Configuración',
                path: '/parameters/settings',
                icon: <AiFillSetting />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Usuarios',
                path: '/parameters/users',
                icon: <FaUserCircle />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bancos',
                path: '/parameters/bank',
                icon: <AiFillBank />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Presentaciones',
                path: '/parameters/presentations',
                icon: <HiPresentationChartBar />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Monedas',
                path: '/parameters/coins',
                icon: <FaCoins />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Familias',
                path: '/parameters/family',
                icon: <GiFamilyTree />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Categorias',
                path: '/parameters/category',
                icon: <MdCategory />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Plazos',
                path: '/parameters/deadlines',
                icon: <FaCalendarAlt />,
                cName: 'vet_nav-text'
            }
        ]
    },
    {
        title: 'Módulo Reportes',
        path: '/moduloReportes',
        icon: <TbReportSearch />,
        cName: 'vet_nav-text'
    }
];

const IteamsAgente = [
    {
        title: 'Inicio',
        path: '/initial',
        icon: <AiFillHome />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        cName: 'vet_nav-text',
        subNav: [
            {
                title: 'Facturación',
                path: '/initial/billing',
                icon: <FaFileInvoiceDollar />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Cobrar',
                path: '/initial/charge',
                icon: <IoIosCash />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Depósitos',
                path: '/initial/cash/deposits',
                icon: <GiTakeMyMoney />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavSubIteams: [
                    {
                        title: 'Pre Depósito',
                        path: '/initial/cash/deposits/predeposits',
                        icon: <FaMoneyCheckAlt />,
                    },
                    {
                        title: 'Generar Depósito',
                        path: '/initial/cash/deposits/generatedeposits',
                        icon: <FaMoneyCheckAlt />,
                    }
                ]
            },
            
        ]
    }
];