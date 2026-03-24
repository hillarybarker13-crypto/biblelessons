
import React, { useState, useEffect } from "react";

const verses = {
  "Psalm 46:10": "Be still, and know that I am God.",
  "Jeremiah 29:11": "For I know the plans I have for you, declares the Lord..."
};

export default function App(){
  const [name,setName]=useState("");
  const [age,setAge]=useState(10);
  const [step,setStep]=useState("name");

  const [streak,setStreak]=useState(1);
  const [completed,setCompleted]=useState([]);
  const [prayers,setPrayers]=useState([]);
  const [input,setInput]=useState("");

  const [showMood,setShowMood]=useState(false);
  const [openVerse,setOpenVerse]=useState(null);

  const kids = age <= 10;

  const palette = kids
    ? {bg:"#B5D5C8",header:"#EBBEC6",verse:"#54B7AF",card:"#FFF7EF"}
    : {bg:"#EEDECD",header:"#A6B2B8",verse:"#80917B",card:"#FFFFFF"};

  const card=(bg,color="inherit")=>({
    background:bg,
    color,
    borderRadius:30,
    padding:28,
    boxShadow:"0 10px 30px rgba(0,0,0,0.1)"
  });

  useEffect(()=>{
    const d=JSON.parse(localStorage.getItem("v2")||"{}");
    if(d.name){setName(d.name);setStep("app");}
    if(d.age)setAge(d.age);
    if(d.streak)setStreak(d.streak);
    if(d.completed)setCompleted(d.completed);
    if(d.prayers)setPrayers(d.prayers);
  },[]);

  useEffect(()=>{
    localStorage.setItem("v2",JSON.stringify({name,age,streak,completed,prayers}));
  },[name,age,streak,completed,prayers]);

  const completeDay=()=>{
    if(!completed.includes(completed.length+1)){
      setCompleted([...completed,completed.length+1]);
      setStreak(streak+1);
      setShowMood(true);
    }
  };

  const addPrayer=()=>{
    if(!input)return;
    setPrayers([...prayers,{
      id:Date.now(),
      text:input,
      done:false,
      x:Math.random()*65,
      y:Math.random()*65
    }]);
    setInput("");
  };

  const togglePrayer=id=>{
    setPrayers(prayers.map(p=>p.id===id?{...p,done:!p.done}:p));
  };

  if(step==="name"){
    return (
      <div style={{padding:30}}>
        <h2>Welcome 🤍</h2>
        <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your name"/>
        <button onClick={()=>name && setStep("age")}>Continue</button>
      </div>
    );
  }

  if(step==="age"){
    return (
      <div style={{padding:30}}>
        <h2>Hello {name}, how old are you?</h2>
        <input type="range" min="2" max="100" value={age} onChange={e=>setAge(e.target.value)}/>
        <button onClick={()=>setStep("app")}>Start</button>
      </div>
    );
  }

  return (
    <div style={{minHeight:"100vh",background:palette.bg,padding:30}}>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:24}}>
        <div style={card(palette.header)}>
          <h1>Hi {name} 🤍</h1>
          <p>🔥 {streak} day streak</p>
        </div>

        <div style={card(palette.verse,"white")}>
          <h2 onClick={()=>setOpenVerse("Psalm 46:10")} style={{cursor:"pointer"}}>
            Psalm 46:10
          </h2>
          <p>{verses["Psalm 46:10"]}</p>
        </div>
      </div>

      <div
        onClick={()=>window.open("https://open.spotify.com/playlist/4DWhRQyU3vH4QVc7YEb79B","_blank")}
        style={{...card(palette.verse,"white"),marginTop:24,cursor:"pointer"}}
      >
        <h2>{kids?"🎶 Worship Time ✨":"🎧 Worship Time"}</h2>
      </div>

      <div style={{...card(palette.card),marginTop:24}}>
        <h3>Progress</h3>
        <button onClick={completeDay}>Mark Today Complete</button>
      </div>

      <div style={{...card(palette.card),marginTop:24,position:"relative",height:420}}>
        <h3>Prayer Board</h3>
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Write prayer"/>
        <button onClick={addPrayer}>Add</button>

        {prayers.map(p=>(
          <div key={p.id}
            onClick={()=>togglePrayer(p.id)}
            style={{
              position:"absolute",
              left:p.x+"%",
              top:p.y+"%",
              background:"#fff8b5",
              padding:12,
              borderRadius:8,
              transform:"rotate(-2deg)",
              textDecoration:p.done?"line-through":"none",
              cursor:"pointer"
            }}>
            {p.text} {p.done && "✔️"}
          </div>
        ))}
      </div>

      {openVerse && (
        <div onClick={()=>setOpenVerse(null)} style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",
          display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <div style={{background:"white",padding:24,borderRadius:24}}>
            <h3>{openVerse}</h3>
            <p>{verses[openVerse]}</p>
          </div>
        </div>
      )}

      {showMood && (
        <div style={{
          position:"fixed",inset:0,background:"rgba(0,0,0,0.4)",
          display:"flex",alignItems:"center",justifyContent:"center"
        }}>
          <div style={{background:"white",padding:24,borderRadius:24,textAlign:"center"}}>
            <h3>How do you feel today?</h3>
            <div style={{fontSize:28}}>
              <span onClick={()=>setShowMood(false)} style={{margin:10,cursor:"pointer"}}>😄</span>
              <span onClick={()=>setShowMood(false)} style={{margin:10,cursor:"pointer"}}>🙂</span>
              <span onClick={()=>setShowMood(false)} style={{margin:10,cursor:"pointer"}}>😐</span>
              <span onClick={()=>setShowMood(false)} style={{margin:10,cursor:"pointer"}}>😔</span>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
