import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from'./ContactCreate';

//받은 update는 함수 형태고 첫번째 인자는 처리해야할 객체(배열) ,두번째 인자는 처리명령을 지니고있는 객체
export default class Contact extends React.Component {

    constructor(props) {   //생성자 메소드 클래스에서는 constructor 라는 메소드를 하나씩 가질수있다. * constructor는 생성자
        super(props);      //super를 통해 상위 클래스의 생성자 메소드를 호출할수있다.
        this.state = {    //컴포넌트에서 유동적인 데이터를 다룰 때 state를 사용
          selectedKey: -1,   //props는 변동되지 않는 데이터 , 부모 컴포넌트에서 자식 컴포넌트로 데이터를
          keyword: '',        //전달할때 props가 사용된다.
          contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };
        console.log('a');  //리액트 핫 로더 컴포넌트가 수정되어서 리로드 될때
                          //스테이트를 파괴시키지 않고 유지 한다.
                          // 그부작용으로 리액트 컨포넌트가 리로드 될 때 컨스트럭트를 수정하지 않는다
                          // 컨스트럭터가 수정되면 새로고침을 해야 된다.

        this.handleChange=this.handleChange.bind(this);
        this.handleClick=this.handleClick.bind(this);

        this.handleCreate=this.handleCreate.bind(this); //데이터를 추가시켜줄 함수
        this.handleRemove=this.handleRemove.bind(this);
        this.handleEdit=this.handleEdit.bind(this);
    }



handleChange(e)
{//핸들체인지가 this가 뭔지 모른다. this와 바인딩을 해줘야한다.
  //임의 함수를 만들때는 꼭 this와 바인딩을 해줘야한다.
  this.setState({
    keyword:e.target.value
  });
}
handleClick(key)
{
  this.setState({
    selectedKey:key
  });
  console.log(key,'is selected');
}
handleCreate(contact)
{
  this.setState(
    {
      contactData: update(this.state.contactData,{$push: [contact]})

  });
}

handleRemove()
{
  if(this.state.selectedKey<0){
    return;
  }

  this.setState({
      contactData:update(this.state.contactData,
        {$splice:[[this.state.selectedKey,1]]}
      ),
      selectedKey: -1
    });
}

handleEdit(name,phone)
{
  this.setState({
    contactData:update(this.state.contactData,
      {
        [this.state.selectedKey]:{
          name:{$set:name},
          phone:{$set:phone}
        }
      }
    )
  });
}


    render() {                    //render()메소드 내 HTML과 자바스크립트를 같이 사용해 컴포넌트의 결과값을 출력
        const mapToComponents = (data) => {         //mapToComponents 라는 함수를 에로우 함수로 생성
          data.sort();

          data=data.filter(
            (contact)=>{
              return contact.name.toLowerCase()
              .indexOf(this.state.keyword) >-1;

            }
          )
            return data.map((contact, i) => {
                return (<ContactInfo
                   contact={contact} key={i}
                   onClick={() => this.handleClick(i)}  //에로우메소드??
                   />);
            });
        };

        return (
            <div>
                <h1>Contacts</h1>
                <input
                name="keyword"
                placeholder="Search"
                value={this.state.keyword}
                onChange={this.handleChange}

                />
                <div>{mapToComponents(this.state.contactData)}</div>
                <ContactDetails isSelected={this.state.selectedKey != -1}
                 contact={this.state.contactData[this.state.selectedKey]}
                 onRemove={this.handleRemove}         //함수 사용시 () 가 안붙었다 ()가 붙으면 페이지 로드 떄, 클릭때
                 onEdit={this.handleEdit}             //실행되기 때문에?
                />
                <ContactCreate
                onCreate={this.handleCreate}//onCreate 라는 props 를 전달
                />
            </div>
        );
    }
}
