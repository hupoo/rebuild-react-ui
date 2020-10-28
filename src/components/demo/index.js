import React, { Component } from "react";
import { InlineMath, BlockMath } from 'react-katex';
import "./styles.less";

function _debounce(fn, delay = 500) {
  var timer;
  return function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  };
}

export class Demo extends Component {
  handle = () => {
    console.log("handle");
  };
  handleClick = (arg) => {
    console.log(arg);
  };
  // 防抖函数  当函数有参数的写法
  handleDB = _debounce(this.handleClick, 300);
  boxMousemove = (e) => {
    let box = this.refs.box;
    let mask = this.refs.mask;
    let enlarge = this.refs.enlarge;
    let rect = box.getBoundingClientRect();
    //求遮罩层mask相对父元素box移动的距离
    //鼠标的坐标（e.pageX,e.pageY）
    let y = e.pageY - mask.offsetHeight / 2 - rect.top;
    let x = e.pageX - mask.offsetWidth / 2 - rect.left;
    // 150 为放大后显示的盒子尺寸与背景图尺寸的差值的 1/2
    //处理左右边界
    if (x <= 0) {
      x = 0;
    } else if (x >= 150) {
      x = 150;
    }
    if (y <= 0) {
      y = 0;
    } else if (y >= 150) {
      y = 150;
    }
    //让遮罩层移动left和top
    mask.style.left = x + "px";
    mask.style.top = y + "px";
    //按比例放大缩小图片
    enlarge.style.backgroundPosition = `${-2 * x}px ${-2 * y}px`;
  };
  // 当鼠标进入时
  boxMouseenter = () => {
    console.log("鼠标进入时");
    let mask = this.refs.mask;
    let enlarge = this.refs.enlarge;
    mask.style.display = "block";
    enlarge.style.display = "block";
  };
  // 当鼠标离开时
  boxMouseleave = () => {
    let mask = this.refs.mask;
    let enlarge = this.refs.enlarge;
    mask.style.display = "none";
    enlarge.style.display = "none";
  };
  
  componentDidMount() {
    let linkcss = document.createElement('link');
    linkcss.rel = 'stylesheet';
    linkcss.href = '//cdnjs.cloudflare.com/ajax/libs/KaTeX/0.9.0/katex.min.css'
    // document.getElementsByTagName("head")[0].appendChild(linkcss);
  }
  
  render() {
   
    return (
      <div>
        <div>
         
         
          <InlineMath>\int_0^\infty x^2 dx</InlineMath>
          <BlockMath math={"\\lim \\limits_{x\\to0}x^2 \\quad"}/>
          <BlockMath math={"\\prod_{i=1}^n\\quad"}/>
         
          <BlockMath>\int_0^\infty x^2 dx</BlockMath>

         <BlockMath  math={'x=\\frac{-b\\pm\\sqrt{b^2-4ac}}{2a}+\\text{汉字} '}/>
          <BlockMath math={"f(x)=\\int_{-\\infty}^\\infty\\widehat f\\xi\,e^{2\\pi i\\xi x}\,d\\xi"}/>
              <BlockMath math={"\\text{实验课教学工作量}=\\sum\\frac{a*b*c}{2} "} />
         
        </div>
{/* 
        <button onClick={_debounce(this.handle, 300)}>button1</button>
        <button
          onClick={() => {
            this.handleDB("hupoo wang");
          }}
        >
          button2
        </button> */}
        {/* <div
          className="box"
          ref="box"
          onMouseMove={this.boxMousemove}
          onMouseEnter={this.boxMouseenter}
          onMouseLeave={this.boxMouseleave}
        >
          <img
            src="https://img.alicdn.com/bao/uploaded/i3/725677994/O1CN01LoqRLK28vIlvbW2mX_!!725677994.jpg"
            alt=""
          />

          <div className="mask" ref="mask"></div>
          <div className="enlarge" ref="enlarge"></div> */}
        {/* </div> */}
      </div>
    );
  }
}

export default Demo;
