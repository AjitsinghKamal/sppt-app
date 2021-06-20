import { StrictMode } from 'react';
import { render } from 'react-dom';

import AppRouter from './router/Router';

import './styles/reset.css';
import './styles/index.css';

render(
	<StrictMode>
		<AppRouter />
	</StrictMode>,
	document.querySelector('#root')
);
