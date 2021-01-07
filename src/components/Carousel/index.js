import React, { Component } from "react";
import './styles.less'
export default class Carousel extends Component {
  constructor() { 
    this.state = {
      
    }
  }
  wrapMouseDown = (e) => { 
    // let wrap = this.refs.wrap;
    // let diatance = {
    //   x: e.pageX,
    //   y:e.pageY 
    // }
    // console.log(diatance)
  }
  wrapMouseMove = (e) => {
    let wrap = this.refs.wrap;
    let diatance = {
      x: e.pageX,
      y:e.pageY 
    }
    // console.log(diatance)
  }
  wrapMouseUp = (e) => { 

  }
	render() {
		return (
			<div
				className='wrap'
				ref='wrap'
				onMouseDown={this.wrapMouseDown}
				onMouseMove={this.wrapMouseMove}
				onMouseUp={this.wrapMouseUp}>
				<ul className='list' ref='list'>
					<li className='item'><img src="https://img1.mukewang.com/5fe0020c0001615317920764.jpg" alt=""/></li>
					<li className='item'><img src="https://img1.mukewang.com/5fdd6e2e00010d1718720764.jpg" alt=""/></li>
					<li className='item'><img src="https://img2.mukewang.com/5fbb1c720001b5a317920764.jpg" alt=""/></li>
				</ul>
			</div>
		);
	}
}
