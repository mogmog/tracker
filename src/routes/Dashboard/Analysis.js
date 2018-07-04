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

    const problemset = window.parseInt(this.props.match.params.id);

    this.props.dispatch({
      type: 'cardpositions/fetchcardpositions',
      payload : {userId : 1, problemset : problemset}
    });

  }

  render() {

    return (<ClassicDashboard {...this.props}/>)

    /*TODO make this dynamic maybe*/

    if (this.props.user.currentUser && this.props.user.currentUser.layout  && this.props.user.currentUser.layout.name === 'ClassicDashboard')   return (<ClassicDashboard {...this.props}/>)
    if (this.props.user.currentUser && this.props.user.currentUser.layout  && this.props.user.currentUser.layout.name === 'ScrollingNarrative') return (<ScrollingNarrartive {...this.props}/>)

    return (<div>NO DASHBOARD DEFINED</div>)
  }
}
