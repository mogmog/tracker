import React, { Component } from "react";
import shortid from "shortid";

import NullCard from "../Cards/NullCard/NullCard";

class CardLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedComponents: [],
      components: <NullCard key={shortid.generate()} />
    };
  }

  componentDidMount() {
    const component = this.props.component || 'TableView';
    this.addView(component);
  }

  addView = viewName => {

    import(`./../Cards/${viewName}/${viewName}.js`)
      .then(Component => {
        this.setState({
          component: <Component.default key={shortid.generate()} data={this.props.data} />
        });
      })
      .catch(error => {
        this.setState({
          component: <NullCard key={shortid.generate()} />
        });
      });
  };

  render() {

    const { component } = this.state;

    return (
      <div className="CardLoader">
          {component}
      </div>
    );
  }
}

export default CardLoader;
