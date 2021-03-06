import React, {Component} from 'react';

import CountryInfoCard      from './../Cards/CountryInfoCard/CountryInfoCard';
import NarrativeSummaryCard from './../Cards/NarrativeSummaryCard/NarrativeSummaryCard';
import NarrativeCard from './../Cards/NarrativeCard/NarrativeCard';
import InfluencerListCard from './../Cards/InfluencerListCard/InfluencerListCard';
import VideoChartCard from './../Cards/VideoChartCard/VideoChartCard';
import HDObservationCard from './../Cards/HDObservationCard/HDObservationCard'
import HDRecommendationCard from './../Cards/HDRecommendationCard/HDRecommendationCard';

import SocialMediaReachCard from './../Cards/SocialMediaReachCard/SocialMediaReachCard';

const mappings = {
  'CountryInfoCard' : CountryInfoCard,
  'NarrativeSummaryCard' : NarrativeSummaryCard,
  'NarrativeCard' : NarrativeCard,
  'InfluencerListCard' : InfluencerListCard,
  'VideoChartCard' : VideoChartCard,
  'HDObservationCard' : HDObservationCard,
  'HDRecommendationCard' : HDRecommendationCard,
  'SocialMediaReachCard' : SocialMediaReachCard

}

class CardLoader extends Component {

  constructor(props) {
    super();
    this.mappings = mappings;
  }

  render() {

    const Card = mappings[this.props.card.component];
    const extra = this.props.extra;
    const clickevents = this.props.clickevents;

    if (!Card) return <span>No card defined in card loader</span>;

    return (
      <div>
        <Card clickevents={clickevents} extra={extra} data={this.props.card.data }/>
      </div>
    );
  }
}

export function getMappings() {
  return mappings;
}

export default CardLoader;

//TODO this was an earlier attempt to make this a bit more dynamic as it doesnt require keeping a mapping object

// import React, { Component } from "react";
// import shortid from "shortid";
//
// import NullCard from "../Cards/NullCard/NullCard";
//
// class CardLoader extends Component {
//   constructor(props) {
//     super(props);
//
//     this.state = {
//       loadedComponents: [],
//       components: <NullCard key={shortid.generate()} />
//     };
//   }
//
//   componentDidMount() {
//     const component = this.props.component || 'NullCard';
//     this.addView(component);
//   }
//
//   addView = viewName => {
//
//     import(`./../Cards/${viewName}/${viewName}.js`)
//       .then(Component => {
//         this.setState({
//           component: <Component.default key={shortid.generate()} country={this.props.country} data={this.props.data} />
//         });
//       })
//       .catch(error => {
//
//         alert(`Error loading card ${viewName}`);
//         console.log(error);
//
//         this.setState({
//           component: <NullCard key={shortid.generate()} />
//         });
//       });
//   };
//
//   render() {
//
//     const { component } = this.state;
//
//     return (
//       <div className="CardLoader">
//           {component}
//       </div>
//     );
//   }
// }
//
// export default CardLoader;
