import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import ClassicDashboard from "../../layouts/CardLayouts/ClassicDashboard";
import ScrollingNarrartive from "../../layouts/CardLayouts/ScrollingNarrative";

@connect(({ chart, loading, cardpositions, user }) => ({
  chart,
  cardpositions,
  user,
  loading: loading.effects['chart/fetch'],
}))

export default class Analysis extends Component {
  state = { };

  render() {

    /*TODO make this dynamic maybe*/

    if (this.props.user.currentUser.layout.name === 'ClassicDashboard')   return (<ClassicDashboard {...this.props}/>)
    if (this.props.user.currentUser.layout.name === 'ScrollingNarrative') return (<ScrollingNarrartive {...this.props}/>)

    return (<div>NO DASHBOARD DEFINED</div>)
  }
}
