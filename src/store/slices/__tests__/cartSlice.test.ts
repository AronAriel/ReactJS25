import cartReducer, { addToCart, clearCart, CartItem } from '../cartSlice';

describe('cartSlice reducer', () => {
  const sampleItem: CartItem = {
    id: 'item1',
    name: 'Pizza',
    price: 10,
  };

  it('должен вернуть начальное состояние', () => {
    expect(cartReducer(undefined, { type: '@@INIT' })).toEqual({
      cartItems: [],
    });
  });

  it('добавляет 1 товар в корзину', () => {
    const nextState = cartReducer(
      { cartItems: [] },
      addToCart({ item: sampleItem, quantity: 1 })
    );

    expect(nextState.cartItems).toHaveLength(1);
    expect(nextState.cartItems[0]).toEqual(sampleItem);
  });

  it('добавляет несколько копий товара в корзину', () => {
    const nextState = cartReducer(
      { cartItems: [] },
      addToCart({ item: sampleItem, quantity: 3 })
    );

    expect(nextState.cartItems).toHaveLength(3);
    nextState.cartItems.forEach((item) => {
      expect(item).toEqual(sampleItem);
    });
  });

  it('не затирает старые элементы при добавлении новых', () => {
    const stateWithOne = {
      cartItems: [sampleItem],
    };

    const newItem: CartItem = {
      id: 'item2',
      name: 'Burger',
      price: 12,
    };

    const nextState = cartReducer(
      stateWithOne,
      addToCart({ item: newItem, quantity: 2 })
    );

    expect(nextState.cartItems).toHaveLength(3);
    expect(nextState.cartItems[0]).toEqual(sampleItem);
    expect(nextState.cartItems[1]).toEqual(newItem);
    expect(nextState.cartItems[2]).toEqual(newItem);
  });

  it('очищает корзину', () => {
    const state = {
      cartItems: [sampleItem, sampleItem],
    };

    const nextState = cartReducer(state, clearCart());
    expect(nextState.cartItems).toEqual([]);
  });
});
