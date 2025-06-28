import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CartPage from '../CartPage';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

window.alert = jest.fn();

const mockStore = configureStore([]);

describe('CartPage', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должна показывать сообщение, если корзина пустая', () => {
    const store = mockStore({ cart: { cartItems: [] } });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
  });

  it('должна отображать товары в корзине', () => {
    const store = mockStore({
      cart: {
        cartItems: [
          { id: '1', name: 'Pizza', price: 10, img: 'pizza.jpg' },
          { id: '1', name: 'Pizza', price: 10, img: 'pizza.jpg' }, 
        ],
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    expect(screen.getByText(/pizza/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /x/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('2')).toBeInTheDocument();
  });

  it('должна удалять товар при клике на X', () => {
    const store = mockStore({
      cart: {
        cartItems: [
          { id: '1', name: 'Pizza', price: 10, img: 'pizza.jpg' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    const removeButton = screen.getByRole('button', { name: /x/i });
    fireEvent.click(removeButton);

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'cart/clearCart' });
  });

  it('должна оформлять заказ и очищать корзину', () => {
    const store = mockStore({
      cart: {
        cartItems: [
          { id: '1', name: 'Pizza', price: 10, img: 'pizza.jpg' },
        ],
      },
    });

    render(
      <Provider store={store}>
        <CartPage />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/street/i), { target: { value: 'Main St' } });
    fireEvent.change(screen.getByLabelText(/house/i), { target: { value: '123' } });

    const orderButton = screen.getByRole('button', { name: /order/i });
    fireEvent.click(orderButton);

    const actions = store.getActions();
    expect(actions).toContainEqual({ type: 'cart/clearCart' });
    expect(window.alert).toHaveBeenCalledWith('Order placed!');
  });
});
