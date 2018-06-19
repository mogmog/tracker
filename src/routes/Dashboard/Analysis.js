import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import ClassicDashboard from "../../layouts/CardLayouts/ClassicDashboard";
import ScrollingNarrartive from "../../layouts/CardLayouts/ScrollingNarrative";

@connect(({ chart, loading, cardpositions, card, user }) => ({
  chart,
  cardpositions,
  card,
  user,
}))

export default class Analysis extends Component {
  state = { };

  componentDidMount() {

    const {dispatch} = this.props;

    dispatch({
      type: 'card/fetchquestioncards',
      payload: {'type': 'question', 'id': 1}
    });
  }

  render() {

    /*TODO make this dynamic maybe*/

    if (this.props.user.currentUser.layout.name === 'ClassicDashboard')   return (<ClassicDashboard {...this.props}/>)
    if (this.props.user.currentUser.layout.name === 'ScrollingNarrative') return (<ScrollingNarrartive {...this.props}/>)

    return (<div>NO DASHBOARD DEFINED</div>)
  }
}
