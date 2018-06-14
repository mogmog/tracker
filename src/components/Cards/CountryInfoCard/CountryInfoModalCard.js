import React, {Component} from 'react';

import numeral from 'numeral';

import {
  ChartCard,
  Field,
} from '../../Charts/index';

import GeoJSONThumbnail from '../../Maps/GeoJSONThumbnail';

class CountryInfoModalCard extends Component {
  constructor(props) {
    super(props);

    this.state = {  };
  }

  render() {
    return (<iframe src="https://en.wikipedia.org/w/index.php?title=Estonia&printable=yes" frameborder="none" width="100%" height="100%"></iframe>);
  }
}

export default CountryInfoModalCard;
