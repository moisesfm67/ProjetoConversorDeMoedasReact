//import { render, screen } from '@testing-library/react';
import React from 'react';
import ReactDOM from'react-dom';
import ConversorMoedas from './conversor-moedas';
import {render, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axiosMock from 'axios';


/*test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});*/

describe('Teste do componente de conversão de moedas', () =>{

it('deve renderizar o componente sem erros', () =>{
 const div = document.createElement('div');
 ReactDOM.render(<ConversorMoedas />, div);
 ReactDOM.unmountComponentAtNode(div);
});

it('deve simular uma conversão de moedas',  async () =>{

  const {findByTestId, getByTestId} = render(<ConversorMoedas />);
  axiosMock.get.mockResolvedValueOnce({
    data: {success: true, rates:{ BRL: 6.39298, USD:1.196136}}
  });

  fireEvent.click(getByTestId('btn-converter'));
  const modal = await findByTestId('modal');
  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(modal).toHaveTextContent('1 BRL = 0.19 USD');

});

});
