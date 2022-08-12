import React, { useEffect } from 'react';
import {Column} from './Column';
import {DraggableCard} from './Card';
import {TextForm} from './TextForm';
import "../CSS/Board.css";
import { useLogin } from '../Hooks/useLogin';
import { useEntries } from '../Hooks/useEntries';


export function Board({ cards, columns, moveCard, addCards, addCard, addColumn, setCard, seachinput}) {
  const tokenIsSet = useLogin();
  const entries = useEntries(tokenIsSet);
  useEffect(()=>{
    addCards(entries);
  }, [entries])
  console.log(cards)
  // columns.forEach((column) => {

  //   cards.map((card) => {
  //     if(column.title == card.Status)
  //       addCard(column.id, card)
  //   })
  // })
  
  return (
    <div className="Board">
      {columns.map(column => (
        // console.log(columns),
        <Column
          key={column.id}
          title={column.title}
          addCard={addCard.bind(null, column.id)}
          count={column.cardIds.length}
        >
          {column.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            // .map((card) => {
            //   card.Status = column.title;
            //   return card;
            // })
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                details = { card["z1d_Details"]}
                requestID = { card["Request ID"] }
                workOrderId = { card["Work Order ID"] }
                workOrderGroup = {card["ASGRP"]} 
                assignee = { card["Request Assignee"] }
                summary = { card.Summary }
                status = { card.Status }
                statusReason = { card["Status Reason"]}
                moveCard={moveCard}
                setCard={setCard}
              />
            ))}
          {column.cardIds.length === 0 && (
            <DraggableCard
              isSpacer
              moveCard={cardId => moveCard(cardId, column.id, 0)}
            />
          )}
        </Column>
      ))}
      <div className="Column">
        <TextForm onSubmit={addColumn} placeholder="Add Column..." />
      </div>
    </div>
  );
}
