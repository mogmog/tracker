import React, { Component } from "react";
import shortid from "shortid";

import NullView from "./../Cards/NullView/NullView";

class CardLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loadedComponents: [],
      components: <NullView key={shortid.generate()} />
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
          component: <NullView key={shortid.generate()} />
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
