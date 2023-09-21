import { useState,useEffect ,useRef} from 'react';
import Questions from './components/Qusestions';
import './App.css'
import { nanoid } from 'nanoid';
import blobDark from './assets/blobanimation.svg'
import blobLg from './assets/blobanimation-lg.svg'




function App() {
 const[started,setStarted]=useState(false);
 const[IsCorrect,setIsCorrect]=useState(0);
 const[IsChecked,setIsChecked]=useState(false);
 const[questions,setQuestions]=useState([]);
 const count=useRef(0);
 const shuffleArr=(arr)=>arr.sort(()=>Math.random()-0.5);
  useEffect(()=>{
      (async  ()=> {
        const res= await fetch('https://opentdb.com/api.php?amount=6');
        const data=await res.json();
        const q=[];
        data.results.forEach(question=>q.push({
          id:nanoid(),
          question:question.question,
          answers:shuffleArr([...question.incorrect_answers,question.correct_answer]), 
          checked:false,
          selected:null,
          correct:question.correct_answer,
        }
        ))
        setQuestions(q)
      })(); 
    },[count.current]);

    function handleClicks (answer,id){
    setQuestions(questions=>questions.map(q=>{
    if (id===q.id) {
      return {...q,selected:answer };}
      else return q;
    }
      ))
    }
   
  
   function Check( ) 
      {   setIsChecked(true); 
          let correct=0
          questions.forEach(q=>{
          if (q.selected===null) return})
          setQuestions(questions=>questions.map(q=>{return{...q,checked:true}}))  
          questions.forEach(q=>{
          if (q.correct===q.selected) {
          ;
          correct+=1;
         
           
      } 
      else  return q
    }
      ) 
      setIsCorrect(correct);
   }

   function tryAgain() {
    if (IsChecked) {
      setIsCorrect(0)
      setIsChecked(false)
      ++count.current;
    }
   }

 const questionEl=questions.map(question=>{
 return(<Questions 
      started={started} 
      key={question.id}  
      id={question.id}
      question={question}
      handleClicks={handleClicks} 
      />) 
    }) 
   return (
      <>
       <main className='container' >
          <div className="blob ">
            <img src={blobDark} alt="blob-animation" className='blob-dark'/>
           <img src={blobLg} alt="blob-animation" className='blob-lg' /> 
           </div>
        {!started ?
        <section  className="started" aria-label='Started'>
          <h1 className='title'>Quizzical</h1> 
          <button className='btn' onClick={()=>setStarted(!started)}>Start</button>
        </section>
          :
           <section className="col">
            {questionEl}
            <br />
            <div className="container">
            {IsChecked?`correct answer ${IsCorrect}/${questions.length}`:""}
            </div>
            <br />
           <button className='btn' onClick={IsChecked?tryAgain:Check} >{IsChecked?'Try Again':'Check'}</button>
           </section>   }
           
           </main>
          
      </>
      ) 
    }
export default App

