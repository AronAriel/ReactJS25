import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from '../MenuItem'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MenuItemType } from '../../../types/MenuItemType';

const mockStore = configureStore();

const sampleItem: MenuItemType = {
  id: 1,
  meal: 'Pizza',
  price: 10,
  img: 'pizza.jpg',
  instructions: 'Cheesy and delicious',
};

describe('MenuItem', () => {
  it('renders item data', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MenuItem item={sampleItem} />
      </Provider>
    );

    expect(screen.getByText('Pizza')).toBeInTheDocument();
    expect(screen.getByText('$10.00 USD')).toBeInTheDocument();
    expect(screen.getByText('Cheesy and delicious')).toBeInTheDocument();
    expect(screen.getByAltText('Pizza')).toHaveAttribute('src', 'pizza.jpg');
  });

  it('has default quantity of 1', () => {
    const store = mockStore({});
    render(
      <Provider store={store}>
        <MenuItem item={sampleItem} />
      </Provider>
    );

    const quantityInput = screen.getByRole('spinbutton'); 
    expect(quantityInput).toHaveValue(1);
  });

  it('dispatches addToCart with correct quantity', () => {
    const store = mockStore({});
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <MenuItem item={sampleItem} />
      </Provider>
    );

    const quantityInput = screen.getByRole('spinbutton');
    fireEvent.change(quantityInput, { target: { value: '3' } });

    const button = screen.getByRole('button', { name: /add to cart/i });
    fireEvent.click(button);

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith({
      type: 'cart/addToCart',
      payload: {
        item: {
          id: '1',
          name: 'Pizza',
          price: 10,
          img: 'pizza.jpg',
          instructions: 'Cheesy and delicious',
        },
        quantity: 3,
      },
    });
  });
});
