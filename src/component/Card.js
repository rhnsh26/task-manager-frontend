import React, { Component } from 'react';
import  './Card.scss';

const Month=['Jan','Feb','May','Jun','July','Aug','Sept','Oct','Nov','Dec'];
class Card extends Component{
    constructor(props){
        super(props);
            this.state={
                hover:false
            }
            this.handleDate=this.handleDate.bind(this);
        }
    handleDate(timestamp){
        const createDate=new Date(+timestamp);
        return  `${createDate.getDate()} ${Month[createDate.getMonth()-1]} ${+(''+createDate.getYear()).substr(1,2)} `;
    }
    handleHoverEnter(){
        this.setState({hover:true});
    }
    handleHoverLeave(){
        this.setState({hover:false})
    }
    render(){
        const { i , data , colors ,action} = this.props;
        const defaultColor=colors[Math.floor(i%7)].value;
        let bgColor=(data.color!=='')?data.color:defaultColor;
        const hoverColor=parseInt((''+bgColor).substr(1,6))
        let hoverCardStyle=(this.state.hover)&&(`0px 3px 30px -1.5px ${bgColor}`); 
        return (
            <div 
                className="Single-card"
                onMouseEnter={this.handleHoverEnter.bind(this)}
                onMouseLeave={this.handleHoverLeave.bind(this)}
                style={{backgroundColor:bgColor,boxShadow:hoverCardStyle}} >
                <div className="Card-top">
                    <div className="Card-title">{data.title}</div>
                    <div onClick={action.bind(this,i)}className="Delete-button">X</div>
                </div>
                <h3 className="Card-date" >Created on {this.handleDate(data.date)}</h3>
                <p className="Card-discription" >{data.description}</p>
                </div>
        );
    }
}

export default Card;