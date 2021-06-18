import { StrictMode } from 'react';
import { render } from 'react-dom';
import AppRouter from './pages/Router';
import './index.css';

render(
	<StrictMode>
		<AppRouter />
	</StrictMode>,
	document.querySelector('#root')
);
