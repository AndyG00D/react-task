import React from 'react';
import './ItemList.css';
import Item from '../Item/Item';
import * as loadData from '../../assets/data'

export default class ItemList extends React.Component {
  itemsData;

  constructor() {
    super();
    this.itemsData = loadData.data;
    this.state = {

      altView: false,
      currentId: null
    };
  }

  changeView = () => {
    this.setState({altView: !this.state.altView});
  };

  getId = (id) => {
    this.setState({currentId: id});
    // this.itemsData.map( item => item.isCheck = (this.state.currentId === item.id));
    console.log(id);
  };

  render() {
    const items = this.itemsData.map(
      ({id, name, artist, picture_medium, link, duration, title_short}, i) => {
        let isCheck = (this.state.currentId == id);
        console.log(i + " "+isCheck);
        return (
          <Item id={id.toString()}
                key = {id}
                i = {i}
                artist = {artist.name}
                link={link}
                title_short = {title_short}
                duration = {duration}
                isCheck = {isCheck}
                onClickHandler = {this.getId}
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

