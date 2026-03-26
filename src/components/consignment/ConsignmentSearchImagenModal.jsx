import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Form, Card, Row, Col, Badge, InputGroup, Container } from 'react-bootstrap';

import { FaCamera } from 'react-icons/fa';
import { TbCircleX } from 'react-icons/tb';

import { 
    SetCancelarProductsImagenBilling,
    SetCantidadProductsImagenBilling, 
    SetCheckProductsImagenBilling, 
    SetDecrementarProductsImagenBilling, 
    SetIncrementarProductsImagenBilling, 
    SetSelecionarTodosProductsImagenBilling,
    startGetProductsByImagen
} from '../../actions/billing';

import { 
    SetCancelarProductsImagenConsignment,
    SetCantidadProductsImagenConsignment,
    SetCheckProductsImagenConsignment, 
    SetDecrementarProductsImagenConsignment, 
    SetIncrementarProductsImagenConsignment, 
    SetSelecionarTodosProductsImagenConsignment,
    startGetProductsByImagenConsignment
} from '../../actions/ConsignmentAction';

export const ConsignmentSearchImagenModal = () => {

    const dispatch = useDispatch();
    const btnClose = useRef(null);
    
    const { productsImagen } = useSelector(state => state.consignment);

    let selectedProducts = [];
    let totalItems = 0;
    let totalPrice = 0;
     
    // Manejar cambio de checkbox individual
    const handleCheckboxChange = (id) => {
        dispatch(SetCheckProductsImagenConsignment({value: id}));
    };
    
    // Manejar cambio de cantidad
    const handleQuantityChange = (id, newQuantity) => {
        const quantity = Math.max(1, parseInt(newQuantity) || 1);
        dispatch(SetCantidadProductsImagenConsignment({ 
            value: {
                id,
                quantity
            }
        }));
    };
    
    // Incrementar cantidad
    const incrementQuantity = (id) => {
        dispatch(SetIncrementarProductsImagenConsignment({ value: id }));
    };
    
    // Decrementar cantidad
    const decrementQuantity = (id) => {
        dispatch(SetDecrementarProductsImagenConsignment({ value: id }));
    };
    
    // Seleccionar todos
    const handleSelectAll = () => {
        const allSelected = productsImagen.every(p => p.selected);
        dispatch(SetSelecionarTodosProductsImagenConsignment({ 
            value: !allSelected
        }));
    };

    selectedProducts = productsImagen.filter(p => p.selected);
    totalItems = selectedProducts.reduce((sum, p) => sum + p.quantity, 0);
    totalPrice = selectedProducts.reduce((sum, p) => sum + (p.price * p.quantity), 0);
       
    // Confirmar selección
    const handleConfirmSelection = () => {

        if(selectedProducts.length > 0) {

            const products = selectedProducts.map(produc => {
                return {
                    idInventario: produc.idInventario,
                    cantidad: produc.quantity
                }
            });

            dispatch(startGetProductsByImagenConsignment(products));
            dispatch(SetCancelarProductsImagenConsignment());
            btnClose.current.click();
        }

    };
    
    // Cancelar selección
    const handleCancelSelection = () => {
        dispatch(SetCancelarProductsImagenConsignment());
    };

    return (

        <>
            <div className="modal fade" id="modalBuscarArticuloImagenConsignment">
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
                                onClick={handleCancelSelection}
                            ></button>
                        </div>

                        <div className="modal-body">
                            <Container fluid className="py-3">
                                
                                <div className="d-flex justify-content-between align-items-center mb-3 px-2">
                                    <Form.Check
                                        type="checkbox"
                                        label={`Seleccionar todos (${productsImagen.length})`}
                                        checked={(productsImagen.length > 0 && productsImagen.every(p => p.selected))}
                                        onChange={handleSelectAll}
                                        className="fs-6"
                                    />
                                    {totalItems > 0 && (
                                        <div className="selected-info">
                                        <Badge bg="primary" className="me-2">
                                            {totalItems} artículo{totalItems !== 1 ? 's' : ''}
                                        </Badge>
                                        <span className="total-price text-primary">
                                            <strong>₡{totalPrice.toFixed(2)}</strong>
                                        </span>
                                        </div>
                                    )}
                                </div>
                    
                                <div className="products-scroll-container">
                                    <Row className="g-3">
                                        {
                                            productsImagen.map((product) => (
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
                                                        ₡{product.price.toFixed(2)}
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
                                        }
                                    </Row>
                                </div>
                            </Container>
                        </div>

                        <div className='modal-footer'>
                            <Button 
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                ref={btnClose}
                                onClick={handleCancelSelection}
                            >
                                Cancelar
                            </Button>
                            <Button 
                                variant="primary" 
                                onClick={handleConfirmSelection}
                                disabled={selectedProducts.length === 0}
                            >
                                Confirmar Selección ({totalItems} items - ₡{totalPrice.toFixed(2)})
                            </Button>
                        </div>

                    </div>
                </div>
            </div >
        </>

    )
}
