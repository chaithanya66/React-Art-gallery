import React from 'react';
import ReactDOM from 'react-dom/client';
import Structure from './struct.tsx';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Structure />
  </React.StrictMode>
);