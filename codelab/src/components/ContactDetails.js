import React from 'react';
import CT from './Contact';


export default class ContactDetails extends React.Component{
constructor(props)
{
  super(props);
  this.state={
    isEdit: false,
    name:'',
    phone:''
  };
  this.handleToggle=this.handleToggle.bind(this);
  this.handleChange=this.handleChange.bind(this);
  this.handleEdit=this.handleEdit.bind(this);
  this.handleKeyPress=this.handleKeyPress.bind(this);
}


  handleToggle()
  {
    if(!this.state.isEdit)
    {
      this.setState({
        name:this.props.contact.name,
        phone:this.props.contact.phone

      });
    }else {
      this.handleEdit();
    }
      this.setState(
        {
          isEdit: !this.state.isEdit
        }
      );
      console.log(this.state.isEdit);
      //setState는 비동기라서 처음 눌럿을때 log에 true가 찍힘
  }
  handleChange(e)
  {
    let nextState={};
    nextState[e.target.name]=e.target.value;
    this.setState(nextState);
  }
  handleEdit()
  {
    this.props.onEdit(this.state.name,this.state.phone);
  }
  handleKeyPress(e)//이벤트 객체 자바 스크립트 개념?
  {
    if(e.charCode===13)//13이면 엔터라는 뜻
    {
      this.handleToggle();
    }
  }

  render()
  {

    const details=(
      <div>
      <p>{this.props.contact.name}</p>
      <p>{this.props.contact.phone}</p>
      </div>
    );

    const edit=(
      <div>
      <p>
      <input
        type="text"
        name="name"
        placeholder="name"
        value={this.state.name}
        onChange={this.handleChange}
        onKeyPress={this.handleKeyPress}
      />
      </p>
      <p>
      <input
        type="text"
        name="phone"
        placeholder="phone"
        value={this.state.phone}
        onChange={this.handleChange}
      />
      </p>
      </div>
    );
    const view=this.state.isEdit ? edit : details;

    const blank=(<div>Not Selected</div>);

    return (
      <div>
        <h2>Details</h2>
        {this.props.isSelected ? view : blank}
        <p>
        <button onClick={this.handleToggle}>
        {this.state.isEdit ? 'OK' : 'Edit'}
        </button>
        <button onClick={this.props.onRemove}>Remove</button>
        </p>
      </div>
    );
  }
}

ContactDetails.defaultProps={
contact:
{
  name:'',
  phone:''
},
onRemove:()=>{console.error('onRemove not defined');}

};
