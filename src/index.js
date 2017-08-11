import React,{Component} from "react";
import ReactDOM from "react-dom";
import './css/index.css';
import HeadModel from './components/header';
import LiModel from './components/Li';

class App extends Component{
  constructor(){
    super();
  
    this.state = {
      val:'',
      data:[
      	{
      		txt:'今天天气还不错，局部地区有大风大雨',
      		checked:true,
      		id:0
      	},
      	{
      		txt:'今天天气还不错，局部地区有大风大雨',
      		checked:true,
      		id:1
      	}
      ]
    }
  }
  changeVal = (newVal) => {
    this.setState({
      val:newVal
    })
  }
  changeData = (newData) => {
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.unshift(newData)
    this.setState({
    	val:'',
      data:data2
    })
  }
  pchangeChicked = (id) =>{
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.forEach(e=>{
  		if(e.id===id){
  			e.checked=!e.checked;
  		}
  	})
  	this.setState({
  		data:data2
  	})
  }
  //删除
  remove = (id) =>{
  	let {data} = this.state;
  	let data2 = null;
  	data2 = data.filter((e,i)=>{
  		return e.id!== id;
  	})
  	this.setState({
  		data:data2
  	})
  }
  //全选
  allChange = (ev) =>{
  	let {data} = this.state;
  	let {checked} = ev.target;
  	let data2 = Object.assign(data);
  	data2.forEach((e)=>{
  		e.checked = checked;
  	})
		this.setState({
			data:data2
		})
  }
  //替换数据
  changeText = (newData) =>{
  	let {data} = this.state;
  	let data2 = Object.assign(data)
  	data2.forEach((e,i)=>{
  		if(e.id===newData.id){
  			data2.splice(i,1,newData)
  		}
  	})
  	this.setState({
  		data:data2
  	})
  }
  render(){
  	let {data} = this.state;
		let data2 = null;
		let all = false;
		data2 = data.map((e,i)=>{
			let data ={
				key:e.id,
				checked:e.checked,
				txt:e.txt,
				id:e.id,
				pchangeChicked:this.pchangeChicked,
				remove:this.remove,
				changeText:this.changeText
			}
			return <LiModel {...data}/>
		})
		
		all = data.every(e=>e.checked);
		
		
    return (
      <div>
        <HeadModel 
	        val={this.state.val} 
	        changeVal={this.changeVal} 
	        data={this.state.data} 
	        changeData ={this.changeData}
        />
        <section className="main">
            <input
              className="toggle-all"
              type="checkbox"
              checked={all} 
              onChange={this.allChange}
            />
            <ul className="todo-list">
							{data2}
            </ul>
        </section>
      </div>
    )
  }
}

ReactDOM.render(<App />,document.getElementById('app'))

if (module.hot) {
  module.hot.accept();
}
