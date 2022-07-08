import React from 'react';
import {Column} from './Column';
import {DraggableCard} from './Card';
import {TextForm} from './TextForm';
import "../css/Board.css";


export function Board({cards, columns, moveCard, addCard, addColumn}) {
  return (
    <div className="Board">
      {columns.map(column => (
        <Column
          key={column.id}
          title={column.title}
          addCard={addCard.bind(null, column.id)}
          count={column.cardIds.length}
        >
          {column.cardIds
            .map(cardId => cards.find(card => card.id === cardId))
            .map((card) => {
              card.status = column.title;
              return card;
            })
            .map((card, index) => (
              <DraggableCard
                key={card.id}
                id={card.id}
                columnId={column.id}
                columnIndex={index}
                title={card.title}
                {...card}
                moveCard={moveCard}
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
