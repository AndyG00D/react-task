import React from 'react';
import axios from 'axios';
import './ItemList.css';
import Item from '../Item/Item';

export default class ItemList extends React.Component {
  constructor() {
    super();


    this.state = {
      itemsData: [],
      altView: false,
      currentId: null
    };
  }

  componentDidMount(){
    // this.itemsData = loadData.data;
    // https://cors-anywhere.herokuapp.com/
    axios('http://api.deezer.com/search/track/?q=metallica&index=0&limit=12',
      { mode: 'Access-Control-Allow-Origin'})
  .then(res => {
        // let data = res.data;
      this.state.itemsData.push(...res.data.data);
    })
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
    const items = this.state.itemsData.map(
      ({id, name, artist, picture_medium, link, duration, title_short}, i) => {
        let isCheck = (this.state.currentId == id);
        console.log(i + " "+isCheck);
        return (
          <Item  i = {i}
                id={id.toString()}
                // key = {id}
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

