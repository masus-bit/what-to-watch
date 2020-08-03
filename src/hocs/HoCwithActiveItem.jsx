import React, { PureComponent } from "react";
const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: null,
        playerActive: false,
      };
      this._onChangeActiveItem = this._onChangeActiveItem.bind(this);
      this._onPlayClick = this._onPlayClick.bind(this);
      this._onAnyClick = this._onAnyClick.bind(this);
    }
    _onChangeActiveItem(item) {
      this.setState({
        activeItem: item,
      });
    }
    _onPlayClick() {
      this.setState({
        playerActive: true,
      });
    }
    _onAnyClick() {
      this.setState({
        playerActive: false,
      });
    }
    render() {
      return (
        <Component
          {...this.props}
          playerActive={this.state.playerActive}
          activeItem={this.state.activeItem}
          onChangeActiveItem={this._onChangeActiveItem}
          onPlayClick={this._onPlayClick}
          onAnyClick={this._onAnyClick}
        />
      );
    }
  }
  return WithActiveItem;
};
export default withActiveItem;
