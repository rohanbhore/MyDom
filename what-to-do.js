/** @jsx MyReact.createElement */

/*** Step 1,2,3,4 - createElement */

const root = document.getElementById("root");

let Stage1 = (
  <div>
    <h1 className="header">Hello Rohan</h1>
    <h2>(why i'm in brackets)</h2>
    <div>nested 1<div>nested1.1</div></div>
    <h3>(OBSERVE: I will be Changed)</h3>
    {2 == 1 && <div> Render this if 2==1</div>}
    {2 == 2 && <div>{2}</div>}
    <span>This is a text</span>
    <button onClick={() => alert("hi")}>Remember!</button>
    <h3>This will be deleted</h3>
    2,3
    </div>
);

// console.log(Stage1);


////
// MyReact.render(Stage1, root)

var Stage2 = (
  <div>
    <h1 className="header">Hello Rohan! welcome in Stage 2</h1>
    <h2>(Brackets are like boundary )</h2>
    <div>nested 1<div>nested 1.1</div></div>
    <h3 style="background-color:yellow">(OBSERVE: I said it!!)</h3>
    {2 == 1 && <div>Render this if 2==1</div>}
    {2 == 2 && <div>{2}</div>}
    <span>This Was Text</span>
    <button onClick={() => alert("Now you are in stage 2!")}>Remember!</button>
  </div>
);



// setTimeout(() => {
//   alert("this is stage 2")
//   MyReact.render(Stage2, root);
// }, 3000);


// functional component


const Heart = (props) => <span style={props.style}>&hearts;</span>

// function Heart(){
//   return(
//     <span>&hearts;</span>
//   )
// }


// MyReact.render(<Heart style="color:red"/>,root);



const Button = (props) => <button onClick={props.onClick}>{props.children}</button>;

const Greeting = function (props) {
  return (
    <div className="greeting">
      <h2>Greetings Rohan {props.message}</h2>
      <Button onClick={() => alert("greeting Alert by React")}>I <Heart /> Coding</Button>
    </div>
  );
}


// setTimeout(()=>{
//   alert("DEV Team");
//   MyReact.render(<Greeting message="By React DEV Team" />,root);
// },(3000));

// MyReact.render(<Greeting message="By React Team" />,root);
// TinyReact.render(<Greeting message="Good day!" />, root);

class Alert extends MyReact.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="alert-container">
        <h2>You are in Alert class</h2>
        <div>{this.props.message}</div>
      </div>
    );
  }
}

MyReact.render(<Alert message="Are you sure?" />, root);