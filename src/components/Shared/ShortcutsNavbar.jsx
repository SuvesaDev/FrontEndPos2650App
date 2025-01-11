import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FaMoneyCheckDollar, FaFileInvoiceDollar, FaCashRegister, FaPills } from "react-icons/fa6";
import { PiUsersFill } from "react-icons/pi";
import { addTab } from '../../actions/tabs';

export const ShortcutsNavbar = () => {

    const dispatch = useDispatch();
    
    const handleAddTab = (title, path) => {
        dispatch( addTab(title, path) );
    }

    return (
        <>
            <Link to='/initial/billing' >
                <FaFileInvoiceDollar onClick={ (e) => handleAddTab('Venta','/initial/billing') } id='iconVenta'/>
            </Link>

            <Link to='/initial/cash/opencash' >
                <FaCashRegister onClick={ (e) => handleAddTab('Apertura Caja','/initial/cash/opencash') } id='iconCaja'/>
            </Link>

            <Link to='/initial/billing' >
                <FaMoneyCheckDollar onClick={ (e) => handleAddTab('Proformas o Cotización','/sales/budgets/proforma') } id='iconProforma'/>
            </Link>
        
            <Link to='/initial/customers' >
                <PiUsersFill onClick={ (e) => handleAddTab('Clientes','/initial/customers') } id='iconCliente'/>
            </Link>

            <Link to='/initial/inventory' >
                <FaPills onClick={ (e) => handleAddTab('Inventarios','/initial/inventory') } id='iconInventario'/>
            </Link>
        </>
       
    )
}
