// components/ClientProvider.js
'use client';

import { Provider } from 'react-redux';
import { store } from '../../server/store';

export default function ClientProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
