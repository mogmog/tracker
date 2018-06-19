import React, {Component} from 'react';

import CountryInfoCard      from './../Cards/CountryInfoCard/CountryInfoCard';
import NarrativeSummaryCard from './../Cards/NarrativeSummaryCard/NarrativeSummaryCard';
import NarrativeCard from './../Cards/NarrativeCard/NarrativeCard';

export default class extends Component {

  constructor(props) {
    super();
  }

  render() {

    /*must update this every time you add a new card*/
    const mappings = {
      'CountryInfoCard' : CountryInfoCard,
      'NarrativeSummaryCard' : NarrativeSummaryCard,
      'NarrativeCard' : NarrativeCard

    }

    const Card = mappings[this.props.card.component];

    if (!Card) return null;

    return (
      <div>
        <Card data={this.props.card.data }/>
      </div>
    );
  }
}

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
