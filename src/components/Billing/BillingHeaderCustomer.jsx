import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SiHappycow } from 'react-icons/si';
import { AiFillFileAdd, AiFillEdit } from 'react-icons/ai';
import { RiFileEditFill, RiMailAddFill } from 'react-icons/ri';
import { FaEnvelope, FaSearch, FaUser, FaStoreAlt } from 'react-icons/fa';
import { FaBuilding, FaI, FaIdCard, FaLocationDot, FaMapLocationDot, FaPhone } from "react-icons/fa6";
import { Container, Row, Col, Card, Form, Badge, Button, InputGroup } from 'react-bootstrap';

import {
    OpenAddCorreosModalBilling,
    OpenModalAddCustomer,
    SetIdTipoClienteClienteFacturacionBilling,
    OpenModalEditCustomer,
    OpenModalEditCartaExoneracion,
    startSearchCartaExoneracion,
    OpenModalMAGCustomer,
    OpenSearchCustomerBilling,
    SetCedulaBuscarBilling,
    SetCedulaUsuarioBilling,
    SetCorreoComprobantesBilling,
    SetDireccionBilling,
    SetIdTipoClienteBilling,
    SetNombreClienteBilling,
    SetObservacionesBilling,
    SetTelefonoBilling,
    startGetCorreosComprobanteFacturacion,
    startSearchCustomerFacturacion,
    startSearchCustomerMAG,
    SetEmpresaBilling,
    SetDatoFacturacionBilling
} from '../../actions/billing';

import { BillingAddCustomerModal } from './BillingAddCustomerModal';
import { BillingEditCustomerModal } from './BillingEditCustomerModal';
import { BillingEditCartaExoneracionModal } from './BillingEditCartaExoneracionModal';
import { BillingMAGCustomerModal } from './BillingMAGCustomerModal';
import { CustomerSearchModal } from '../customers/CustomerSearchModal';
import { OpenSearchModalCustomers } from '../../actions/customers';
import { BillingAddCorreosModal } from './BillingAddCorreosModal';
import { TbListNumbers, TbNotes } from 'react-icons/tb';

export const BillingHeaderCustomer = () => {

    const dispatch = useDispatch();

    const [numberScreen, setnumberScreen] = useState(null);

    const { currentTab } = useSelector(state => state.tabs);
    const { tiposIdentificacion } = useSelector(state => state.tiposIdentificacion);

    const {
        empresas,
        billings
    } = useSelector(state => state.billing);

    const [selected, setSelected] = useState([]);

    const images = [
        { id: 1, url: "https://picsum.photos/id/1015/600/400", name: "0001 - Test - 2500" },
        { id: 2, url: "https://picsum.photos/id/1016/600/400", name: "Bosque" },
        { id: 3, url: "https://picsum.photos/id/1018/600/400", name: "Lago" },
        { id: 4, url: "https://picsum.photos/id/1020/600/400", name: "Playa" }
    ];

    const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    },
    {
      id: 2,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    },
    {
      id: 3,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    },
    {
      id: 4,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    },
    {
      id: 5,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    },
    {
      id: 6,
      name: 'Crab Pool Security',
      price: 30.00,
      image: 'https://picsum.photos/id/1015/600/400',
      selected: false,
      quantity: 1
    }
  ]);

      // Manejar cambio de checkbox individual
  const handleCheckboxChange = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, selected: !product.selected } : product
    ));
  };

  // Manejar cambio de cantidad
  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Math.max(1, parseInt(newQuantity) || 1); // Mínimo 1
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity } : product
    ));
  };

  // Incrementar cantidad
  const incrementQuantity = (id) => {
    setProducts(products.map(product => 
      product.id === id ? { ...product, quantity: product.quantity + 1 } : product
    ));
  };

  // Decrementar cantidad
  const decrementQuantity = (id) => {
    setProducts(products.map(product => 
      product.id === id && product.quantity > 1 
        ? { ...product, quantity: product.quantity - 1 } 
        : product
    ));
  };

  // Seleccionar todos
  const handleSelectAll = () => {
    const allSelected = products.every(p => p.selected);
    setProducts(products.map(product => ({ ...product, selected: !allSelected })));
  };

  // Obtener productos seleccionados
  const selectedProducts = products.filter(p => p.selected);
  const totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
  const totalPrice = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);


  
    useEffect(() => {

        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);

    const handleAddUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (!billings[numberScreen].hasCustomerBilling) {
            dispatch(SetIdTipoClienteClienteFacturacionBilling({ value: 2, number: numberScreen }))
            dispatch(OpenModalAddCustomer({ number: numberScreen }));
        }

    }

    const handleEditCartaExoneracionClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(startSearchCartaExoneracion(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
            dispatch(OpenModalEditCartaExoneracion({ number: numberScreen }));
        }
    }

    const handleEditUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(OpenModalEditCustomer({ number: numberScreen }));
        }
    }

    const handleMAGUserClick = () => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {
            dispatch(OpenModalMAGCustomer({ number: numberScreen }));
            dispatch(startSearchCustomerMAG(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen));
        }
    }

    const handleSearchClientBilling = (e) => {

        if (billings[numberScreen] === undefined) return;

        if ((billings[numberScreen].factura.encabezado.cedula_Usuario !== '')) {

            e.preventDefault();

            dispatch(SetCedulaBuscarBilling({ value: billings[numberScreen].factura.encabezado.cedula_Usuario, number: numberScreen }));
            dispatch(startSearchCustomerFacturacion(billings[numberScreen].factura.encabezado.cedula_Usuario, numberScreen, (billings[numberScreen].factura.encabezado.Cod_Moneda != '') ? true : false));
        }else{
            dispatch( OpenSearchCustomerBilling( { value: true, number : numberScreen } ));

        }

    }

    const handleClickDown = (e) => {

        if (billings[numberScreen] === undefined) return;

        if (e.key === 'Enter') {
            dispatch(SetCedulaBuscarBilling({ value: e.target.value, number: numberScreen }));
            dispatch(startSearchCustomerFacturacion(e.target.value, numberScreen, (billings[numberScreen].factura.encabezado.Cod_Moneda != '') ? true : false));
        }
    }

    const handleAddCorreosClick = (e) => {

        if (billings[numberScreen] === undefined) return;

        if (billings[numberScreen].hasCustomerBilling) {

            e.preventDefault();
            dispatch(OpenAddCorreosModalBilling({ value: true, number: numberScreen }));
            dispatch(startGetCorreosComprobanteFacturacion(billings[numberScreen].factura.encabezado.cod_Cliente, numberScreen));

        }
    }

    const handleInputChangeWithDispatch = ({ target }, action) => {

        if (billings[numberScreen] === undefined) return;

        dispatch(action({ value: target.value, number: numberScreen }));
    };

    return (

        <>
            <div className="row mb-2">
                <div className="col-md-3 mb-3">
                    <h5>Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaIdCard className="iconSize" />
                        </span>
                        <input
                            name="cedula_Usuario"
                            type='number'
                            min="0"
                            className='form-control'
                            placeholder='Cédula del Cliente'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.cedula_Usuario
                                    : ''
                            }
                            onKeyDown={handleClickDown}
                            onChange={e => handleInputChangeWithDispatch(e, SetCedulaUsuarioBilling)}

                        />
                        <button
                            type="button"
                            className={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].disableInputsHeader)
                                        ? 'btn btn-primary disabled'
                                        : 'btn btn-primary'
                                    : 'btn btn-primary disabled'
                            }
                            onClick={handleSearchClientBilling}
                            data-bs-toggle={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].factura.encabezado.cedula_Usuario === '')
                                        ? "modal"
                                        : ''
                                    : ''
                            }
                            data-bs-target={
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].factura.encabezado.cedula_Usuario === '')
                                        ? "#modalBuscarClientes"
                                        : ''
                                    : ''
                            }
                        >
                            <FaSearch className="iconSize" />
                        </button>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Tipo Cédula</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbListNumbers className="iconSize" />
                        </span>
                        <select
                            name="idTipoCliente"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.idTipoCliente
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetIdTipoClienteBilling)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (tiposIdentificacion != null)
                                    ? (tiposIdentificacion.length === 0)
                                        ? <option value=''></option>
                                        : tiposIdentificacion.map(tipoD => {
                                            return <option key={tipoD.codigoFe} value={tipoD.codigoFe}> {tipoD.descripcion} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <h5>Nombre</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaUser className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Nombre del Cliente"
                            name="nombre_Cliente"
                            autoComplete="off"
                            disabled={true}
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.nombre_Cliente
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetNombreClienteBilling)}
                            readOnly
                        />
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <hr />
                    <div className="inline-container" role="toolbar">
                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalEditarCliente"

                            >
                                <AiFillEdit className="iconSize" />
                            </button>
                        </div>

                        <div className="btn-group mb-2">
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalConsultaMAG"

                            >
                                <SiHappycow className="iconSize" />
                            </button>
                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling)
                                            ? 'btn btn-dark disabled'
                                            : (!billings[numberScreen].disableInputsHeader)
                                                ? 'btn btn-dark'
                                                : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalAgregarCliente"
                            >
                                <AiFillFileAdd className="iconSize" />
                            </button>


                        </div>

                        <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "btn-group mb-2 d-none" : "btn-group mb-2" :  "btn-group mb-2"}>
                            <button
                                className={
                                    (billings[numberScreen] !== undefined)
                                        ? (billings[numberScreen].hasCustomerBilling) ? 'btn btn-dark' : 'btn btn-dark disabled'
                                        : 'btn btn-dark disabled'
                                }
                                data-bs-toggle="modal"
                                data-bs-target="#modalCartaExoneracion"

                            >
                                <RiMailAddFill className="iconSize" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "row mb-2 d-none" : "row mb-2" :  "row mb-2"}>
                <div className="col-md-4 mb-3">
                    <h5>Teléfono</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaPhone className="iconSize" />
                        </span>
                        <input
                            className="form-control"
                            placeholder="Teléfono del Cliente"
                            name='telefono'
                            autoComplete='off'
                            type='number'
                            min="0"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.telefono
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetTelefonoBilling)}
                        />
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <h5>Empresa</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaBuilding className="iconSize" />
                        </span>
                        <select
                            name="empresa"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.empresa
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetEmpresaBilling)}
                        >
                            <option value={''} selected disabled hidden> Seleccione... </option>
                            {
                                (empresas != null)
                                    ? (empresas.length === 0)
                                        ? <option value=''></option>
                                        : empresas.map(empresa => {
                                            return <option key={empresa.id} value={empresa.id}> {empresa.nombre} </option>
                                        })
                                    : <option value=''></option>
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-4 mb-3">
                    <hr />
                    <button
                        className={
                            (billings[numberScreen] !== undefined)
                                ? (billings[numberScreen].hasCustomerBilling)
                                    ? 'btn btn-primary'
                                    : 'btn btn-primary disabled'
                                : 'btn btn-primary disabled'
                        }
                        data-bs-toggle="modal"
                        data-bs-target="#modalAgregaCorreos"
                    >
                        Correos  <FaEnvelope className="iconSize" />
                    </button>
                </div>
            </div>

            <div className="row mb-2">
                <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-6 mb-3 d-none" : "col-md-6 mb-3" :  "col-md-6 mb-3"}>
                    <h5>Dirección</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaMapLocationDot className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Dirección del Cliente"
                            name='direccion'
                            autoComplete='off'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.direccion
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetDireccionBilling)}
                        />
                    </div>
                </div>

                <div className={ (billings[numberScreen] !== undefined) ? (billings[numberScreen].isCostaPets) ? "col-md-4 mb-3" : "col-md-4 mb-3 d-none" :  "col-md-4 mb-3 d-none"}>
                    <h5>Datos Facturacion</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <FaStoreAlt className="iconSize" />
                        </span>
                        <select
                            name="idDatosFacturacion"
                            className="form-select"
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.idDatoFacturacion
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetDatoFacturacionBilling)}
                        >
                            <option value={0} selected disabled hidden> Seleccione... </option>
                            {
                                (billings[numberScreen] !== undefined)
                                    ? (billings[numberScreen].datosFacturacionByCliente != null)
                                        ? (billings[numberScreen].datosFacturacionByCliente.length === 0)
                                            ? <option value=''></option>
                                            : billings[numberScreen].datosFacturacionByCliente.map(datoFacturacion => {
                                                return <option key={datoFacturacion.id} value={datoFacturacion.id}> {datoFacturacion.sucursal} - {datoFacturacion.nombreComercial} </option>
                                            })
                                        : <option value=''></option>
                                    : <option value=''></option>
                                
                            }
                        </select>
                    </div>
                </div>

                <div className="col-md-6 mb-3">
                    <h5>Observaciones</h5>
                    <div className="input-group">
                        <span className="input-group-text">
                            <TbNotes className="iconSize" />
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Observaciones Extra"
                            name='observaciones'
                            autoComplete='off'
                            disabled={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].disableInputsHeader
                                    : true
                            }
                            value={
                                (billings[numberScreen] !== undefined)
                                    ? billings[numberScreen].factura.encabezado.observaciones
                                    : ''
                            }
                            onChange={e => handleInputChangeWithDispatch(e, SetObservacionesBilling)}

                        />
                    </div>
                </div>
            </div>

            {/* <div className="container mt-4">
                <div className="row g-4">
                    {images.map((img) => (
                    <div key={img.id} className="col-6 col-md-4 col-lg-3">
                        <div
                        className={`card h-100 shadow-lg border-0 rounded-4 ${
                            selected.includes(img.id)
                            ? "border border-primary"
                            : "bg-light"
                        }`}
                        style={{ transition: "all 0.3s ease" }}
                        >
                        <img
                            src={img.url}
                            className="card-img-top rounded-top-4 p-2 bg-white"
                            alt={img.name}
                            style={{
                                height: "200px",
                                objectFit: "cover",
                                border: "3px solid #dee2e6"
                            }}
                        />

                        <div className="card-body text-center">

                            <div className="form-check d-flex justify-content-center mb-2">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selected.includes(img.id)}
                                onChange={() => handleSelect(img.id)}
                            />
                            </div>

                            <h6 className="fw-bold mb-0">
                            {img.name}
                            </h6>

                        </div>
                        </div>
                    </div>
                    ))}
                </div>
            </div> */}

            {/* <Container className="py-5">
                
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                    type="checkbox"
                    label={`Seleccionar todos (${products.length})`}
                    checked={products.length > 0 && products.every(p => p.selected)}
                    onChange={handleSelectAll}
                    className="fs-5"
                    />
                    {totalItems > 0 && (
                    <div className="selected-info">
                        <Badge bg="primary" className="me-2">
                        {totalItems} artículo{totalItems !== 1 ? 's' : ''}
                        </Badge>
                        <span className="total-price">
                        Total: <strong>${totalPrice.toFixed(2)}</strong>
                        </span>
                    </div>
                    )}
                </div>

                
                <Row className="g-4">
                    {products.map((product) => (
                    <Col key={product.id} xs={12} md={6} lg={4}>
                        <Card 
                        className={`product-card h-100 border-0 shadow-sm ${product.selected ? 'selected' : ''}`}
                        >
                        <div className="product-image-wrapper">
                            <Card.Img 
                            variant="top" 
                            src={product.image}
                            alt={product.name}
                            className="product-image"
                            />
                            <div className="checkbox-overlay">
                            <Form.Check
                                type="checkbox"
                                checked={product.selected}
                                onChange={() => handleCheckboxChange(product.id)}
                                id={`product-${product.id}`}
                            />
                            </div>
                        </div>
                        <Card.Body className="text-center">
                            <Card.Title className="product-title">
                            {product.name}
                            </Card.Title>
                            <Card.Text className="product-price">
                            ${product.price.toFixed(2)}
                            </Card.Text>
                            
                            {product.selected && (
                            <div className="quantity-control mt-3">
                                <label className="form-label small text-muted mb-2">
                                Cantidad:
                                </label>
                                <InputGroup className="quantity-input-group">
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => decrementQuantity(product.id)}
                                    disabled={product.quantity <= 1}
                                    className="quantity-btn"
                                >
                                    −
                                </Button>
                                <Form.Control
                                    type="number"
                                    value={product.quantity}
                                    onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                                    min="1"
                                    className="quantity-input text-center"
                                />
                                <Button 
                                    variant="outline-secondary" 
                                    onClick={() => incrementQuantity(product.id)}
                                    className="quantity-btn"
                                >
                                    +
                                </Button>
                                </InputGroup>
                                <div className="subtotal mt-2">
                                <small className="text-muted">
                                    Subtotal: <strong className="text-primary">
                                    ${(product.price * product.quantity).toFixed(2)}
                                    </strong>
                                </small>
                                </div>
                            </div>
                            )}
                        </Card.Body>
                        </Card>
                    </Col>
                    ))}
                </Row>

                
                {totalItems > 0 && (
                    <div className="action-bar fixed-bottom bg-white border-top p-3 shadow">
                    <Container>
                        <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <span className="fs-5">
                            <strong>{totalItems}</strong> artículo{totalItems !== 1 ? 's' : ''} seleccionado{totalItems !== 1 ? 's' : ''}
                            </span>
                            <div className="text-muted small">
                            Total: <strong className="text-dark fs-5">${totalPrice.toFixed(2)}</strong>
                            </div>
                        </div>
                        <div>
                            <button 
                            className="btn btn-outline-secondary me-2"
                            onClick={() => setProducts(products.map(p => ({ ...p, selected: false, quantity: 1 })))}
                            >
                            Cancelar
                            </button>
                            <button 
                            className="btn btn-primary btn-lg"
                            onClick={() => {
                                console.log('Productos seleccionados:', selectedProducts);
                                console.log('Total de items:', totalItems);
                                console.log('Total a pagar:', totalPrice);
                                alert(`Resumen de compra:\n\n${selectedProducts.map(p => 
                                `${p.name}\nCantidad: ${p.quantity}\nSubtotal: $${(p.price * p.quantity).toFixed(2)}`
                                ).join('\n\n')}\n\nTotal: $${totalPrice.toFixed(2)}`);
                            }}
                            >
                            Continuar (${totalPrice.toFixed(2)})
                            </button>
                        </div>
                        </div>
                    </Container>
                    </div>
                )}
            </Container> */}

            <BillingAddCustomerModal />

            <BillingEditCustomerModal />

            <BillingEditCartaExoneracionModal />

            <BillingMAGCustomerModal />

            <CustomerSearchModal />

            <BillingAddCorreosModal />
        </>
    )
}