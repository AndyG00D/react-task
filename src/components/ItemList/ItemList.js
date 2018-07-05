import React from 'react';
import './ItemList.css';
import Item from './Item';
import data from '../../assets/artistsData'

export default class ItemList extends React.Component {
  constructor() {
    super();
    this.state = {
      itemsData: data.data,
      altView: false,
    };
  }

  changeView = () => {
    this.setState({altView: !this.state.altView});
  };

  render() {
    const items = this.state.itemsData.map(
      ({id, name, picture_medium, link}) => {
        return (
          <Item key={id.toString()}
                altView={this.state.altView}
                image={picture_medium}
                title={name}
                link={link}
          />
        )
      }
    );

    return (
      <div>
        <button className="item-list__button" type="button" onClick={this.changeView}>
          Change View
        </button>
        <div className={`item-list__area`}>
          {items}
        </div>
      </div>
    );
  }
}
