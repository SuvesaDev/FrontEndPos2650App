import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Modal, Button, Form, Card, Row, Col, Badge, InputGroup, Container } from 'react-bootstrap';

import { FaCamera } from 'react-icons/fa';
import { TbCircleX } from 'react-icons/tb';

import {
    ActiveButtonNewInventory,
    ActiveButtonRemoveInventory,
    ActiveButtonSaveInventory,
    ActiveButtonSearchInventory,
    CleanOptionsSearchModalInventory,
    CleanSearchInventory,
    CloseSearchModalInventory,
    DisableInputsInventory
} from '../../actions/inventory';

export const InventorySearchModalImagen = () => {

    const dispatch = useDispatch();
    const [numberScreen, setnumberScreen] = useState(null);
    
    const { billings } = useSelector(state => state.billing);
    const { currentTab } = useSelector(state => state.tabs);
    
    const [products, setProducts] = useState([
        {
          id: 1,
          name: 'Crab Pool Security',
          price: 30.00,
          image: 'https://via.placeholder.com/300x300/f8f9fa/666?text=Meat',
          selected: false,
          quantity: 1
        }
    ]);

    useEffect(() => {
    
        if (currentTab.name.includes("Venta")) {
            setnumberScreen(currentTab.routePage.split('/')[3] - 1);
        }

    }, [billings]);
    
    // Manejar cambio de checkbox individual
    const handleCheckboxChange = (id) => {
        setProducts(products.map(product => 
          product.id === id ? { ...product, selected: !product.selected } : product
        ));
    };
    
    // Manejar cambio de cantidad
    const handleQuantityChange = (id, newQuantity) => {
        const quantity = Math.max(1, parseInt(newQuantity) || 1);
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
    
    // Confirmar selección
    const handleConfirmSelection = () => {
        if (handleConfirm) {
          handleConfirm(selectedProducts, totalPrice, totalItems);
        }
        handleClose();
        // Resetear selección al cerrar
        setProducts(products.map(p => ({ ...p, selected: false, quantity: 1 })));
    };
    
    // Cancelar selección
    const handleCancelSelection = () => {
        setProducts(products.map(p => ({ ...p, selected: false, quantity: 1 })));
        handleClose();
    };

    const closeModal = () => {

        dispatch(CleanSearchInventory());
        dispatch(CleanOptionsSearchModalInventory());
        dispatch(CloseSearchModalInventory());
        dispatch(ActiveButtonNewInventory(true));
        dispatch(ActiveButtonSearchInventory(true));
        dispatch(ActiveButtonSaveInventory(false));
        dispatch(ActiveButtonRemoveInventory(false));
        dispatch(DisableInputsInventory(true));

    }

    return (

        <>
            <div className="modal fade" id="modalBuscarArticuloImagen">
                <div className="modal-dialog modal-xl modal-dialog">
                    <div className="modal-content">
                        
                        <div className="modal-header">
                            <h4 className="modal-title text-center">
                                Buscar Artículo por Imagen <FaCamera className="iconSizeBtn" />
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                onClick={closeModal}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <Container fluid className="py-3">
                                {/* Header con seleccionar todos */}
                                <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                                    <Form.Check
                                        type="checkbox"
                                        label={`Seleccionar todos (${products.length})`}
                                        checked={products.length > 0 && products.every(p => p.selected)}
                                        onChange={handleSelectAll}
                                        className="fs-6"
                                    />
                                    {totalItems > 0 && (
                                        <div className="selected-info">
                                        <Badge bg="primary" className="me-2">
                                            {totalItems} artículo{totalItems !== 1 ? 's' : ''}
                                        </Badge>
                                        <span className="total-price text-primary">
                                            <strong>${totalPrice.toFixed(2)}</strong>
                                        </span>
                                        </div>
                                    )}
                                </div>
                    
                                {/* Grid de productos - scrollable */}
                                <div className="products-scroll-container">
                                    <Row className="g-3">
                                        {
                                            (billings[numberScreen] !== undefined)
                                                    ? billings[numberScreen].productsImagen.map((product) => (
                                                        <Col key={product.id} xs={12} sm={6} md={4}>
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
                                                            <Card.Body className="text-center p-3">
                                                                <Card.Title className="product-title mb-2">
                                                                {product.name}
                                                                </Card.Title>
                                                                <Card.Text className="product-price mb-2">
                                                                ${product.price.toFixed(2)}
                                                                </Card.Text>
                                                                
                                                                {product.selected && (
                                                                <div className="quantity-control mt-2">
                                                                    <label className="form-label small text-muted mb-1 d-block">
                                                                    Cantidad:
                                                                    </label>
                                                                    <InputGroup className="quantity-input-group">
                                                                    <Button 
                                                                        variant="outline-secondary" 
                                                                        size="sm"
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
                                                                        size="sm"
                                                                    />
                                                                    <Button 
                                                                        variant="outline-secondary" 
                                                                        size="sm"
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
                                                    ))
                                                : null
                                            
                                        }
                                    </Row>
                                </div>
                            </Container>
                        </div>

                        <div className='modal-footer'>
                            {/* <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={closeModal}>Cerrar <TbCircleX className='iconSize' /> </button> */}
                            <Button 
                                variant="outline-secondary" 
                                onClick={handleCancelSelection}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleConfirmSelection}
                                disabled={selectedProducts.length === 0}
                            >
                                Confirmar Selección ({totalItems} items - ${totalPrice.toFixed(2)})
                            </Button>
                        </div>

                    </div>
                </div>
            </div >
        </>

    )
}
