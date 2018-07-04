import React, {Component} from 'react';

const DEMO_STOCKS = ['AMD', 'AAPL', 'TWTR', 'TSLA', 'BTC'];


const Stock = (props) => {
  const { entityKey, contentState } = props;
  const data = contentState.getEntity(entityKey).getData();

  return React.createElement('a', {
    role: 'button',
    onMouseUp: () => {
      window.open(`https://finance.yahoo.com/quote/${data.stock}`);
    },
  }, props.children);
};

export default Stock;
