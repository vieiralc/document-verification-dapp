import React, { Component } from 'react'
import { Card, Icon } from 'semantic-ui-react'

export default class BlockContent extends Component {
  
    render() {
    
        const timestamp = this.props.timestamp
        const fulldate = new Date(timestamp * 1000)
        const date = {
            year:  fulldate.getFullYear(),
            month: fulldate.getMonth(),
            day:   fulldate.getDate(),
            hours: fulldate.getHours(),
            min:   fulldate.getMinutes(),
            sec:   fulldate.getSeconds()
        } 

        return (
            <Card id='card'>
                <Card.Content header={`Block Number: ${this.props.blockNumber}`} />
                <span className='item-box'> 
                    <span className='item-title'> Block Hash: </span> 
                    <a href='/' className='item'> {this.props.blockHash.substring(0,20)}... </a>
                </span> <hr/>
                
                <span className='item-box'> 
                    <span className='item-title'> Parent Hash: </span>
                    <a href='/' className='item'> {this.props.parentHash.substring(0,20)}... </a>
                </span> <hr/>
                
                <span className='item-box'> 
                    <span className='item-title'> TX Hash: </span>
                    <a href='/' className='item'> {this.props.txHash.substring(0,20)}... </a>
                </span> <hr/>

                <span className='item-box'> 
                    <span className='item-title'> Gas Limit: </span>
                    <span className='item'>{this.props.gasLimit} </span>
                </span> <hr/>
                
                <span className='item-box'> 
                    <span className='item-title'> Gas Used: </span>
                    <span className='item'>{this.props.gasUsed}</span>
                </span>  <br/>

                <Card.Content extra>
                    <Icon name='calendar outline' />
                    <span className='item'> {date.month}/{date.day}/{date.year}  {date.hours}:{date.min}:{date.sec} </span> 
                </Card.Content>
            </Card>
        )
    }
}
