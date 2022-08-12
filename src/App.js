import React, {Component} from 'react';
import 'react-edit-text/dist/index.css';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import _ from 'lodash';
import {Board} from './Components/Board';
import {workorders} from './Data/WO';
// import SearchInput from './Components/Search';
import Search from './Components/Search';
import FormReasons from './Components/FormReasons';
import NewWOForm from './Components/NewWOForm';
import NWO from './Components/NewWO';


let _columnId = 0;
let _cardId = 0;

// initial cards not need here for visual representationr
const initialCards = [];

const initialColumns = ['Assigned','Planning','In Progress', 'Pending' ,'Completed', 'Cancelled'].map((title, i) => ({
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
    filteredCards: initialCards
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
    // console.log(cards)
    this.setState(state => ({
      cards: cards,
      filteredCards: cards,
      columns: state.columns.map(
        column =>
           ({...column, 
            cardIds: [
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
    // let card = this.state.cards.find(card => card.id == cardId);
    // // card = { ...card, Status: this.state.columns[destColumnId].title }
    // console.log(card)
    
    this.setState(state => ({
      cards: state.cards.map((card) => {
        if(card.id == cardId){
          card.Status = state.columns[destColumnId].title
          card.statusReason = state.columns[destColumnId].title
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

  filterCards = (value = "") => {
    let cards = this.state.cards.filter((card)=> {
      //filter by search terms
      let isMatched = false;
      let assignee = card["Request Assignee"];
      if(assignee) {
        //fuzzy search: If search has "Jay" and the cards assignee is "Jaye Johnson", it will match. 
        let match = assignee.match(new RegExp(value, 'mi'));
        isMatched = !!match || isMatched
      } 
      
      let wog = card["ASGRP"]
      if(wog) {
        //fuzzy search: If search has "DOI" and the cards assignee is "Jaye Johnson", it will match. 
        let match = wog.match(new RegExp(value, 'mi'));
        isMatched = !!match || isMatched
      } 
      

      return isMatched
    });
    this.setState({
      filteredCards: cards,
      columns: this.state.columns.map(column => ({
        ...column,
        cardIds: cards.filter(card => card.Status == column.title ).map(card => card.id )
      }))
    })

      
  }

  setCard = (cardId, destColumnId, index) => {
    console.log(cardId, destColumnId, index)
    let card = this.state.cards.find(card => card.id == cardId)
    let body = {
      data: {
        Status: this.state.columns[destColumnId].title
      },
      requestId: card["Request ID"]
    }
    fetch('/modify', {
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    }).then((res)=> {
      return res.json()
    }).then((json) => {
      if(!json.status) {
        //handle error
        // this.moveCard(cardId)
      }
      console.log(json)
    }).catch(()=>{
      console.log("didnt work")
    })
  }
updateCard = (updatedCard) => {
  let card = this.state.card.update((card) => {
      //update card summary and status reason fields
        if(card.id == updatedCard.id) {
          return {...card, ...updatedCard}
        }
        return card;
  })
  }
  render() {
    return (
      <div className='slider'>
        <div style={{ width: "100%", height: '100vh', display: 'flex', flexDirection: 'column'}}>
          <Search filterCards={this.filterCards} />
          <NWO/>
          <div className='scroll-box'>
            <Board
            cards={this.state.filteredCards}
            columns={this.state.columns}
            moveCard={this.moveCard}
            addCard={this.addCard}
            addColumn={this.addColumn}
            addCards={this.addCards}
            setCard={this.setCard}
            />
          </div>
          
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
