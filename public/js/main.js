const deleteBtn = document.querySelectorAll('.del')
const todoItem = document.querySelectorAll('span.not')
const todoComplete = document.querySelectorAll('span.completed')
const startBtn = document.querySelectorAll('.start')

Array.from(deleteBtn).forEach((el)=>{
    el.addEventListener('click', deleteTodo)
})

Array.from(startBtn).forEach((el)=>{
    el.addEventListener('click', startTodo)
})

Array.from(todoItem).forEach((el)=>{
    el.addEventListener('click', markComplete)
})

Array.from(todoComplete).forEach((el)=>{
    el.addEventListener('click', markIncomplete)
})

async function deleteTodo(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
let timerRef = document.querySelector('.timerDisplay');
let init = null;

// TODO: Output to the user the start time that is 0
// send to database current time that is now
// to the user we output the completed time
function startUserTimer() {
    if(init!==null){
        clearInterval(init);
    }
    init = setInterval(displayTimer,10);
}
async function startTodo(){
    const todoId = this.parentNode.dataset.id
    const initTime = Date.now();

    // startUserTimer()
    try{
        const response = await fetch('todos/startTodo', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'startTime': initTime,
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markComplete(){
    const todoId = this.parentNode.dataset.id
    const completed = Date.now()
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'completedTime': completed
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function markIncomplete(){
    const todoId = this.parentNode.dataset.id
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

// const startBtn = document.querySelectorAll('.start')

// Array.from(startBtn).forEach((el)=>{
//     el.addEventListener('click', startTodo)
// })

// let [milliseconds,seconds,minutes,hours] = [0,0,0,0];
// let timerRef = document.querySelector('.timerDisplay');
// let initTime = null;

// async function startTodo(){
//     const todoId = this.parentNode.dataset.id
//     if(initTime!==null){
//         clearInterval(initTime);
//     }
//     // initTime = 0;
//     console.log("HEREEEEEEEEEEEEEEEEEE", initTime);
//     initTime = setInterval(displayTimer,10);
//     try{
//         const response = await fetch('todos/startTodo', {
//             method: 'put',
//             headers: {'Content-type': 'application/json'},
//             body: JSON.stringify({
//                 'todoIdFromJSFile': todoId,
//                 'startTime': initTime,
//             })
//         })
//         const data = await response.json()
//         console.log(data)
//         location.reload()
//     }catch(err){
//         console.log(err)
//     }
// }

// document.getElementById('button-start').addEventListener('click', ()=>{
//     if(initTime!==null){
//         clearInterval(initTime);
//     }
//     initTime = setInterval(displayTimer,10);
// });

// document.getElementById('button-stop').addEventListener('click', ()=>{
//     clearInterval(initTime);
// });

// document.getElementById('button-reset').addEventListener('click', ()=>{
//     clearInterval(initTime);
//     [milliseconds,seconds,minutes,hours] = [0,0,0,0];
//     timerRef.innerHTML = '00 : 00 : 00 : 000 ';
// });

function displayTimer(){
    milliseconds+=10;
    if(milliseconds == 1000){
        milliseconds = 0;
        seconds++;
        if(seconds == 60){
            seconds = 0;
            minutes++;
            if(minutes == 60){
                minutes = 0;
                hours++;
            }
        }
    }

 let h = hours < 10 ? "0" + hours : hours;
 let m = minutes < 10 ? "0" + minutes : minutes;
 let s = seconds < 10 ? "0" + seconds : seconds;
 let ms = milliseconds < 10 ? "00" + milliseconds : milliseconds < 100 ? "0" + milliseconds : milliseconds;

 timerRef.innerHTML = ` ${h} : ${m} : ${s} : ${ms}`;
}