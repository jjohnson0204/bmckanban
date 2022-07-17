import React, {Component} from 'react';
import 'react-edit-text/dist/index.css';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from './Components/Board';
import {workorders} from './Data/WO';
// import SearchInput from './Components/Search';
import Search from './Components/Search';



let _columnId = 0;
let _cardId = 0;

// initial cards not need here for visual representationr
const initialCards = [];

const initialColumns = ['Assigned', 'Pending', 'In Process','Planning','Completed', 'Canceled'].map((title, i) => ({
  id: _columnId++,
  title,
  cardIds: []
  // initialCards.filter((card) => {
  //   return card.status == title;
  // }).map((card) => {
  //     card.id = card["Work Order ID"]
  //     return card.id;
  // })
}));

class App extends Component {
  state = {
    cards: initialCards,
    columns: initialColumns,
  };

  addColumn = _title => {
    const title = _title.trim();
    if (!title) return;

    const newColumn = {
      id: ++_columnId,
      title,
      cardIds: [],
    };
    this.setState(state => ({
      columns: [...state.columns, newColumn],
    }));
  };

  addCards = (cards) => {
    console.log(cards)
    this.setState(state => ({
      cards: cards,
      columns: state.columns.map(
        column =>
           ({...column, cardIds: [
              ...column.cardIds, 
              ...cards
              .filter(card => card.Status == column.title )
              .map(card => card.id)]
          })
            
      ),
    }));
  }

  addCard = (columnId, newCard) => {
    console.log("adding cards")
    this.setState(state => ({
      cards: [...state.cards, newCard],
      columns: state.columns.map(
        column =>
          column.id === columnId
            ? {...column, cardIds: [...column.cardIds, newCard.id]}
            : column
      ),
    }));
  };

  moveCard = (cardId, destColumnId, index) => {
    console.log(cardId, destColumnId, index)
    this.setState(state => ({
      cards: state.cards.map((card) => {
        if(card.id == cardId){
          card.Status = state.columns[destColumnId].title
        }
        return card;
      }),
      columns: state.columns.map(column => ({
        ...column,
        
        cardIds: _.flowRight(
          // 2) If this is the destination column, insert the cardId.
          ids =>
            column.id === destColumnId
              ? [...ids.slice(0, index), cardId, ...ids.slice(index)]
              : ids,
          // 1) Remove the cardId for all columns
          ids => ids.filter(id => id !== cardId)
        )(column.cardIds),
      })),
    }));
  };

  render() {
    return (
      <><Search /><Board
        columns={this.state.columns}
        moveCard={this.moveCard}
        addCard={this.addCard}
        addColumn={this.addColumn}
        addCards={this.addCards} /></>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
