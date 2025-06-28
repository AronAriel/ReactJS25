declare module 'redux-mock-store' {
  import { AnyAction, Store, Middleware } from 'redux';

  export default function configureStore<S = any, A extends AnyAction = AnyAction>(
    middlewares?: Middleware[]
  ): (initialState: S) => Store<S, A> & { getActions: () => A[] };
}
