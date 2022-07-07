import '../css/Column.css'
import {Card} from "./Card";

export const Column=({ status,cards}) => {
    let count = cards.length;

    return <div className='Column'>
        <div className="Column__title">{status} [{count}]</div>
        <div className='Column_cards'>
        {
            cards.map((value) => {
                return <Card {...value}/>
            })
        }
        </div>
    </div>
  
}