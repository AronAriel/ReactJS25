import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, CartContext } from '../CartContext';

const TestComponent = () => {
  const context = useContext(CartContext);
  if (!context) return null;

  const { cartItems, addToCart, getCartCount } = context;

  return (
    <div>
      <p data-testid="count">{getCartCount()}</p>
      <button
        onClick={() => addToCart({ id: '1', name: 'Test Item', price: 10 }, 2)}
      >
        Add
      </button>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

describe('CartContext', () => {
  it('adds items to cart and updates count', () => {
    render(
      <CartProvider>
        <TestComponent />
      </CartProvider>
    );

    expect(screen.getByTestId('count').textContent).toBe('0');

    fireEvent.click(screen.getByText('Add'));

    expect(screen.getByTestId('count').textContent).toBe('2');
    expect(screen.getAllByText('Test Item')).toHaveLength(2);
  });
});
