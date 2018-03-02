import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component{
  constructor(props)
  {
    super(props);
    this.state={
      name:'',
      phone:''
    };
      this.handleChange=this.handleChange.bind(this);
      this.handleClick=this.handleClick.bind(this);
      this.handleKeyPress = this.handleKeyPress.bind(this); //추가할 때 마우스 클릭말고
                                                            //엔터키로도 추가 되게 하는 함수
  }

  handleChange(e)
  {
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }
  handleClick()
  {
    const contact={
      name: this.state.name,
      phone: this.state.phone
    };
    this.props.onCreate(contact);
    this.setState({
      name:'',
      phone:''
    });
  }
  handleKeyPress(e)//이벤트 객체 자바 스크립트 개념?
  {
    if(e.charCode===13)//13이면 엔터라는 뜻
    {
      this.handleClick();
    }
  }

  render()
  {
    return (
      <div>
        <h2>Create Contact</h2>
        <p>
        <input type="text"
        name="name"
        placeholder="name"
        value={this.state.name}
        onChange={this.handleChange}
        />
        <input type="text"
        name="phone"
        placeholder="phone"
        value={this.state.phone}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
        />
        </p>
        <button onClick={this.handleClick}>Create</button>
      </div>

    )
  }

}
/*
ContactCreate.propTypes={
  onCreate: React.PropTypes.func
};
ContactCreate.defaultProps={
  onCreate:()=>{console.error('onCreate not defined'); }
}
*/
