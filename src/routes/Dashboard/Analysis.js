import React, { Component, Fragment } from 'react';
import { connect } from 'dva';

import ClassicDashboard from "../../layouts/CardLayouts/ClassicDashboard";
import ColumnDashboard from "../../layouts/CardLayouts/ColumnDashboard";
import ScrollingNarrartive from "../../layouts/CardLayouts/ScrollingNarrative";

@connect(({ chart, loading, cardpositions, card, user }) => ({
  chart,
  cardpositions,
  card,
  user,
}))

export default class Analysis extends Component {

  state = { };
  problemset = 0;

  componentDidMount() {

    const {dispatch} = this.props;

    this.problemset = window.parseInt(this.props.match.params.id);

    this.props.dispatch({
      type: 'cardpositions/fetchcardpositions',
      payload : {userId : 1, problemset : this.problemset}
    });

  }

  render() {


    if (this.problemset === 2) return (<ColumnDashboard {...this.props}/>)

    return (<ClassicDashboard {...this.props}/>)

    if (this.props.user.currentUser && this.props.user.currentUser.layout  && this.props.user.currentUser.layout.name === 'ClassicDashboard')   return (<ClassicDashboard {...this.props}/>)
    if (this.props.user.currentUser && this.props.user.currentUser.layout  && this.props.user.currentUser.layout.name === 'ScrollingNarrative') return (<ScrollingNarrartive {...this.props}/>)

    return (<div>NO DASHBOARD DEFINED</div>)
  }
}
