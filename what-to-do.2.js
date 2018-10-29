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

console.log(Stage1);


////
MyReact.render(Stage1, root)

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



setTimeout(() => {
  alert("this is stage 2")
  MyReact.render(Stage2, root);
}, 3000);




