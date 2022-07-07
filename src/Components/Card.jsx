import { Component } from 'react'
import '../css/Card.css'


export const Card = ({ workorderID,assignee,woGroup, summary, status }) => {

        return <div className="card">
            <div className='icon'>
                
            </div>
            <div className='data'>
                <div className='user'>
                <p>{workorderID}</p>
                <p>{assignee}</p>
                <p>{woGroup}</p>
                </div>
                <h3>Summary: </h3>
                <p>{summary}</p>
            </div>
        </div>
}
