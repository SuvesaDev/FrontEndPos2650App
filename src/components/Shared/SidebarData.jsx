import { BsFillPeopleFill, BsFillFileEarmarkTextFill, BsFileCheckFill, BsFillPersonBadgeFill, BsCartCheckFill, BsFileEarmarkBinaryFill, BsFileEarmarkFontFill, BsFileDiffFill, BsFillUnlockFill } from 'react-icons/bs';
import { CgPill } from 'react-icons/cg';
import { SiHomeassistantcommunitystore } from 'react-icons/si';
import { HiDocumentReport, HiPresentationChartBar, HiLocationMarker, HiDocumentDuplicate } from 'react-icons/hi';
import { AiFillHome, AiFillSetting, AiOutlineShoppingCart, AiFillProfile, AiFillInteraction, AiFillTag, AiFillBank } from 'react-icons/ai';
import { FaFileInvoiceDollar, FaHandshake, FaCashRegister, FaCoins, FaMoneyBillAlt, FaMoneyCheckAlt, FaReadme, FaTicketAlt, FaTools, FaSitemap, FaUserCircle } from 'react-icons/fa';
import { GiReceiveMoney, GiPayMoney, GiTakeMyMoney, GiFamilyTree, GiPowderBag, GiLockedChest } from 'react-icons/gi';
import { ImTable2 } from 'react-icons/im';
import { IoDocuments, IoBusinessSharp } from 'react-icons/io5';
import { IoIosCash } from 'react-icons/io';
import { RiArrowDownSFill, RiArrowUpSFill, RiUserSettingsFill, RiMoneyDollarBoxFill, RiFilePaper2Fill, RiBarcodeBoxFill, RiFileTransferFill } from 'react-icons/ri';
import { MdPayments, MdOutlineAttachMoney, MdOutlineMoneyOffCsred, MdAssignmentReturned, MdCategory, MdSdStorage, MdAssignmentReturn, MdFormatListNumbered, MdOutlineScreenShare, MdAddBusiness } from 'react-icons/md';
import { TbReportSearch, TbZoomMoney  } from "react-icons/tb";
import { FaPrescriptionBottleMedical } from 'react-icons/fa6';
import { FcDebt } from "react-icons/fc";
export const SidebarData = [
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
                title: 'Entrega a Cuenta',
                path: '/initial/downPayment',
                icon: <MdPayments />,
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
                title: 'Consulta Albaranes',
                path: '/initial/consultAlbaranes',
                icon: <HiDocumentDuplicate />,
                cName: 'vet_nav-text'
            },
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
                title: 'Pedidos',
                path: '/buys/orders/warehouseorders',
                icon: <FaMoneyCheckAlt />,
                iconClosed: <RiArrowDownSFill />,
                iconOpened: <RiArrowUpSFill />,
                cName: 'vet_nav-text',
                subNavIteams: [
                    {
                        title: 'Pedidos a Bodega',
                        path: '/buys/orders/warehouseorders',
                        icon: <BsFillFileEarmarkTextFill />,
                    },
                    {
                        title: 'Consultar Pedidos',
                        path: '/buys/orders/checkorders',
                        icon: <BsFileCheckFill />,
                    },
                ]
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
            },
            {
                title: 'Prestamos',
                path: '/buys/loans',
                icon: <GiReceiveMoney />,
                cName: 'vet_nav-text'
            },
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
                title: 'Rifa',
                path: '/utilities/raffle',
                icon: <FaTicketAlt />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Etiquetador',
                path: '/utilities/tagger',
                icon: <AiFillTag />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Unificar codigos',
                path: '/utilities/unifycodes',
                icon: <RiBarcodeBoxFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Lista articulos MAG',
                path: '/utilities/magitemslist',
                icon: <FaSitemap />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Asignar Codigo Cabys',
                path: '/utilities/assigncabyscode',
                icon: <MdFormatListNumbered />,
                cName: 'vet_nav-text'
            },
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
                title: 'Empresas',
                path: '/parameters/company',
                icon: <IoBusinessSharp />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Surcursales',
                path: '/parameters/branch',
                icon: <MdAddBusiness />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bancos',
                path: '/parameters/bank',
                icon: <AiFillBank />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Clientes Frecuentes',
                path: '/parameters/usualcustomers',
                icon: <BsFillPeopleFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Asignar Ficha Por Usuarios',
                path: '/parameters/assigntab',
                icon: <ImTable2 />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Tarifas',
                path: '/parameters/rates',
                icon: <FaMoneyBillAlt />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Ubicaciones',
                path: '/parameters/locations',
                icon: <HiLocationMarker />,
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
                title: 'Denominación monedas',
                path: '/parameters/denominationcoins',
                icon: <FaCoins />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bodegas',
                path: '/parameters/wineries',
                icon: <SiHomeassistantcommunitystore />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Areas',
                path: '/parameters/areas',
                icon: <FaReadme />,
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
                title: 'Registro de pantalla',
                path: '/parameters/screenregister',
                icon: <MdOutlineScreenShare />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bloquea/Desbloquea bodega',
                path: '/parameters/lockunlockwarehouse',
                icon: <BsFillUnlockFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Bloquea/desbloquea X Casa Comercial',
                path: '/parameters/lock/unlockcommercialhouse',
                icon: <GiLockedChest />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Translado entre puntos de venta',
                path: '/parameters/lock/transferpointssale',
                icon: <RiFileTransferFill />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Convertir Saco por Kilos',
                path: '/parameters/bagskilos',
                icon: <GiPowderBag />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Categoría de acción',
                path: '/parameters/actions',
                icon: <AiFillInteraction />,
                cName: 'vet_nav-text'
            },
            {
                title: 'Condicciones de Uso Firmado Contado',
                path: '/parameters/terms',
                icon: <AiFillProfile />,
                cName: 'vet_nav-text'
            },
        ]
    },
    {
        title: 'Módulo Inventario',
        path: '/moduloInventario',
        icon: <HiDocumentReport />,
        cName: 'vet_nav-text'
    },
    {
        title: 'Módulo Reportes',
        path: '/moduloReportes',
        icon: <TbReportSearch />,
        cName: 'vet_nav-text'
    },
    {
        title: 'Módulo Farmacia',
        path: '/moduloFarmacia',
        icon: <FaPrescriptionBottleMedical />,
        cName: 'vet_nav-text'
    },
];