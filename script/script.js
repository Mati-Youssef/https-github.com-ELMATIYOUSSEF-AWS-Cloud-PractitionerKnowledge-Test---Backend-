let card = document.getElementById('card');
let btnGo = document.getElementById('go');
let Name = document.getElementById('name');
let cardbody = document.querySelector('.card-body');
let new_div = document.querySelector('.new-div');

//for stop function setinterval
let idtimer;
let idForgetname;
let faint = false;

function faintTest() {
    window.addEventListener('blur', () => {
        faint = true;
    })
}




function startSound() {
    document.querySelector("#audio").innerHTML += `<audio controls autoplay style="display : none">
 <source src="assets/img/start.mp3" type="audio/ogg">
Your browser does not support the audio element.
 </audio>`;
    setTimeout(() => {
        document.querySelector("#go").click();
    }, 3000);
}


// fetch file json
let url = 'Quiz.json';

// fetching URl 
axios.get(url)
    .then((res) => afficheEllement(res.data)
    )
    .catch((error) => console.log(error))



// affiche data in index page areas
let array = [];
function afficheEllement(res) {
    array = res;
    array.sort(() => Math.random() - 0.5)
};

let nameusr;
//sweet alert
function timer() {
    clearInterval(idForgetname);
    nameusr = Name.value;
    if (nameusr == '') {
        var div = document.createElement('div');
        div.className = 'new-div';
        cardbody.appendChild(div);
        timediv(3)
    }
    if (nameusr != '') {
        Swal.fire('<h1 id="conter">5</h1>');
        document.querySelector('.swal2-confirm').style.display = 'none';
        timeOfStar(1);
    }
}





//full Table Questions

// function createData(qst,option1, option2, option3, option4) {
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("good");
//         } else {
//         console.log("Bad");
//         }
//         console.log(xhr.readyState, xhr.status);
//     };
//     xhr.open("POST", "../script.php");
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(
//     "qst=" +qst + "&option1=" + option1 + "&option2=" + option2 + "&option3=" + option3 + "&option4=" + option4  );
//   }
  
//   function add(){
    
//     array.forEach(e => {
//       console.log('add');
//     createData(e.Qst, e.choices[0],e.choices[1],e.choices[2],e.choices[3])
//   });
//   }

// full table Correctanswer

// function createData(answ, exp) {

//     console.log('Form funnction'+exp);
//     var xhr = new XMLHttpRequest();
//     xhr.onload = function () {
//         if (this.readyState == 4 && this.status == 200) {
//             console.log("good");
//         } else {
//         console.log("Bad");
//         }
//         console.log(xhr.readyState, xhr.status);
//     };
//     xhr.open("POST", "../script.php");
//     xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//     xhr.send(
//     "ansr=" +answ + "&exp="+ exp );
//   }
  
  
//   function add(){
    
//     array.forEach(e => {
//       console.log('add');
//       console.log(e.correctanswer.Exp)
//     createData(e.correctanswer.index,e.correctanswer.Exp)
//   });
//   }


// information of usr 

function createData(name, scor) {

    console.log("name :"+name + "scor :"+scor);
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
        } else {
        console.error();
        }
        console.log(xhr.readyState, xhr.status);
    };
    xhr.open("POST", "../script.php");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("name=" +name + "&scor="+ scor );
  }
 
  
 
   










// timestar
function timeOfStar(secend) {
    id = setInterval(() => {
        if (secend == 0) {
            document.getElementById('conter').innerText = 'Go';
            document.querySelector('.swal2-confirm').click();
            card.innerHTML = ` <div class="card col-6  ">
            <div class="card-header w-100">
                <h5 class="text-center">Information about Quiz</h5>
            </div>
            <div class="card-body">
                <h5 class="card-title">Some rules for this Quiz:</h5>
                <p class="">1-you will have <span>15 seconds </span>foreach question</p>
                <p class="">2-You can't selectany option once time goes off .</p>
                <p class="">3-you can't exit from the Quiz while you're playing</p>
                <p class="">4-you will get points</p>
            </div>
            <div class="card-footer  d-flex justify-content-end">
                <button class="btn btn-primary" onclick="Star()" id="go">start</button></div>
        </div>`;
            clearInterval(id);
        }
        else {
            document.getElementById('conter').innerText = secend;
        }
        secend--;
    }, 1000);
}





// timer for div 
function timediv(secend) {
    idForgetname = setInterval(() => {
        document.querySelector('.new-div').innerText = 'You Forget Your Name';
        if (secend == 0) {
            document.querySelector('.new-div').innerText = '';
            clearInterval(idForgetname);
        }
        secend--;
    }, 1000);
}


//function  getRandom number 
function getRandomInt(lengthArry) {
    return Math.floor(Math.random() * lengthArry);
}

// function start
function Star() {
    clearInterval(idtimer);
    maxclick = array.length;
    maxclick + 1;
    maxclickforPorgres = array.length;
    console.log(maxclickforPorgres);
    //add();
    afficheQst();
    faintTest();
}

//function affeche Question
let maxclick;
let indeX = 0;
let pro = 0;
function afficheQst() {
    if (!faint) {
        clearInterval(idtimer);
        let proNum = 100 / maxclickforPorgres;
        pro += proNum;
        maxclick--;
        // let index = getRandomInt(array.length)
        timeOfQst(14, maxclick);
        document.getElementById('timer').style.display = 'block';
        card.innerHTML = `<div class="card col-6  ">
        <div class="card-header w-100">
            <h5 class="text-center" id="qst">${array[indeX].Qst}</h5>
        </div>
        <div class="card-body">
        <label id="idQtion" style="display:none">${array[indeX].Qstid}</label> 
        <div class="time_Pogres" id="time_Pogress"></div>`
        let iQ = 0;
        array[indeX].choices.forEach(chois => {
            document.querySelector('.card-body').innerHTML += ` 
        <label class="infoA labelBtn"  for="${iQ}">
        <input type="checkbox"  class="infoQ" id="${iQ}" > ${chois}
        </label> 
        </br>`;
            iQ++;
        });
        document.querySelector('.card-body').innerHTML += ` </div>
        <div class="  d-flex justify-content-end">
        <div class ="btnShow">
        <button class="btn btn-primary" id="showScor"  style="display : none"  onclick="showScor()">Score</button>
        <button class="btn btn-primary" id="show"  data-toggle="modal" style="display : none" data-target="#exampleModal" onclick="showResult()">Show Correct Answer</button> </div>
            <button class="btn btn-primary" onclick="next(${array[indeX].correctanswer.index})" id="next">Next</button></div>
    </div>
    `;
        indeX++
        document.getElementById("time_Pogress").style.width = pro + "%";

    }
    else {
        clearInterval(idtimer);
        Swal.fire('<img src="../assets/img/fail-test.jpg" style="width:300px"=alt="Fail" srcset="">')

    }

}



// onclick="textchoises('${array[index].correctanswer.index}')"
// function textchoises(chois) {
//     console.log(chois);
//     let checks = document.querySelectorAll('input:checked');
//     checks.forEach(check => {
//         localStorage.setItem(check.id, chois);
//     });
// }




let correct = [];
let incorrect = [];
let numberofCorrect = 0;
let numberofInCorrect = 0;
// -------------------------------------------function next 
function next(crctanswer) {
    console.log(maxclick + "Qst");
    if (maxclick >= 0) {
        // let checkbox0 = document.getElementById('0').checked;
        // let checkbox1 = document.getElementById('1').checked;
        // let checkbox2 = document.getElementById('2').checked;
        // let checkbox3 = document.getElementById('3').checked;
        let idqst = document.querySelector('#idQtion').innerText;
        array.forEach(element => {

            if (element.Qstid == idqst) {

                let checks = document.querySelectorAll('input:checked');
                let checksid = [];

                checks.forEach((e) => { console.log(e.id); checksid.push(parseInt(e.id)) })
                console.log(checksid + "array")
                let checksidinccorect = '';

                if (checksid.length > 1) {
                    checksid.forEach((el) => { checksidinccorect = checksidinccorect + checksid[el] })
                    let incorrectanswer = { "Q": "incorrect", "Qstid": idqst, "checksid0": (checksid[0]) ? checksid[0] : '', "checksid1": (checksid[1]) ? checksid[1] : '', "checksid2": (checksid[2]) ? checksid[2] : '', "checksid3": (checksid[3]) ? checksid[3] : '' }
                    incorrect.push(incorrectanswer);
                    numberofInCorrect++
                    afficheQst()
                    console.log('incorrectanswer : ' + incorrectanswer)
                    console.log('incorrect : ' + incorrect)
                }
                if (checksid.length == 0) {
                    checksid.forEach((e) => { checksidinccorect = checksidinccorect + checksid[e] })
                    let incorrectanswer = { "Q": "incorrect", "Qstid": idqst, "checksidinccorect": "vide" }
                    incorrect.push(incorrectanswer);
                    numberofInCorrect++
                    afficheQst()
                }

                if (checksid.length == 1) {
                    if (checksid[0] === element.correctanswer.index) {
                        let timePassed = document.getElementById('timer').innerText;
                        let correctanswer = { "Q": "correct", "Qstid": idqst, "anser": element.choices[checksid[0]], "time": parseInt(timePassed) }
                        incorrect.push(correctanswer);
                        afficheQst()
                    }
                    else {
                        let incorrectanswer = { "Q": "incorrect", "Qstid": idqst, "checksidinccorect": checksid[0] }
                        incorrect.push(incorrectanswer);
                        numberofInCorrect++
                        afficheQst()
                    }

                }

                // if (checkbox0) {
                //     // let id0 = document.querySelector('label[for="0"]').id
                //     if (crctanswer == 0 && !checkbox1 && !checkbox2 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[0], timePassed }]
                //         correct.push(correctanswer);
                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[0] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++;

                //     }
                // }
                // if (checkbox1) {
                //     //  let id1 =  document.querySelector('label[for="1"]').id
                //     if (crctanswer == 1 && !checkbox0 && !checkbox2 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[1], timePassed }]
                //         correct.push(correctanswer);

                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[1] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++

                //     }
                // }
                // if (checkbox2) {
                //     //    let id2 =  document.querySelector('label[for="2"]').id
                //     if (crctanswer == 2 && !checkbox1 && !checkbox0 && !checkbox3) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[2], timePassed }]
                //         correct.push(correctanswer);

                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[2] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++

                //     }
                // }
                // if (checkbox3) {
                //     //    let id3 =  document.querySelector('label[for="3"]').id
                //     if (crctanswer == 3 && !checkbox1 && !checkbox2 && !checkbox0) {
                //         numberofCorrect++;
                //         let timePassed = document.getElementById('timer').innerText;
                //         let correctanswer = [{ "Qstid": idqst, "anser": element.choices[3], timePassed }]
                //         correct.push(correctanswer);

                //     }
                //     else {
                //         let incorrectanswer = [{ "Qstid": idqst, "anser": element.choices[3] }]
                //         incorrect.push(incorrectanswer);
                //         numberofInCorrect++

                //     }
                // }
                // if (numberofInCorrect > 0 && !checkbox0 && !checkbox1 && !checkbox2 && !checkbox3) {
                //     numberofCorrect++
                //     afficheQst()
                // }
            }
        });

        // Object.entries(localStorage).forEach(function ([key, value]) {
        //     let id = document.querySelector('#idQtion').innerText;
        //     let ans = [ {"id":id,"key":key ,"value":value}]
        //     contchecked.push(ans);
        // });
        // if (contchecked.length == 0) {
        //     Swal.fire({
        //         title: 'Are you sure?',
        //         text: "You did not choose any answer!",
        //         icon: 'warning',
        //         showCancelButton: true,
        //         confirmButtonColor: '#3085d6',
        //         cancelButtonColor: '#d33',
        //         confirmButtonText: 'Yes, im sure!'
        //     }).then((result) => {
        //         if (result.isConfirmed) {
        //             if (maxclick > 0) {
        //                 afficheQst()
        //             }
        //         }
        //     })
        // }
        // else {
        // let id = document.querySelector('#idQtion').innerText;
        // array.forEach(qst => {
        //     if (parseInt(id) == qst.Qstid) {
        //         if (contchecked[0][0] == qst.correctanswer.index) {
        //             numberofCorrect++;
        //             localStorage.clear();
        //             afficheQst()
        //         }
        //         else {
        //             localStorage.clear();
        //             afficheQst()
        //         }
        //     }
        // });
        // }



    }
    else {
        let t = 0
        incorrect.forEach(element => {
            if (element.Q == 'correct') {
                t = t + element.time
                numberofCorrect++;
                console.log(t);
            }
        });
        let Questions = array.length
        let totaleTime = Questions * 15;
        let score = (t / totaleTime) * 100
        console.log('finich')
        createData(nameusr,score)
        Swal.fire({
            title: 'Quiz is finish',
            text: "",
            icon: 'info',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'show result !'
        }).then((result) => {
            if (result.isConfirmed) {
                console.log(incorrect + "incoorect");
                console.log(correct + "corrrect");
                clearInterval(idtimer);
                document.getElementById("next").style.display = "none";
                document.getElementById("show").style.display = "block";
                document.getElementById("showScor").style.display = "block";
                Swal.fire(nameusr + ' your result :' + numberofCorrect + '/' + Questions + " </br > ")
                SaveInLocalStorge(nameusr, score)
            }

        })
    }

}

function SaveInLocalStorge(nameusr, score) {
    localStorage.setItem(nameusr, score);
}
// function set interval for relawd function increment evry 1s

function timeOfQst(secend, maxclick) {
    idtimer = setInterval(() => {
        if (maxclick == 0) {
            clearInterval(idtimer);
        }
        if (maxclick > 0) {
            labelTime = document.querySelector("#timer");
            labelTime.innerText = secend;
            if (secend > 9) {
                labelTime.style.color = " #0d0151";
                labelTime.style.border = "solid 3px #0d0151";
            }
            if (secend < 10) { //if secend is less than 9
                let addZero = labelTime.textContent;
                labelTime.style.color = "red";
                labelTime.style.border = "solid 3px red";
                labelTime.textContent = "0" + addZero; //add a 0 before time value
            }
            if (secend === 0) {
                clearInterval(idtimer);
                labelTime.style.border = "solid 3px #0d0151";
                labelTime.style.color = "#0d0151";
                document.getElementById("next").click();
                secend = 15;
            }
            secend--;
        }

    }, 1000);
}

// show result 
function showResult() {

    array.forEach(arrayExp => {


        Explication = document.querySelector('.correctanswer')
        InExplication = document.querySelector('.Incorrectanswer')
        incorrect.forEach(inc => {
            if (inc.Q == 'incorrect') {
                if (inc.Qstid == arrayExp.Qstid) {
                    console.log(inc.Qstid + " arrayINExp" + arrayExp.Qstid)
                    InExplication.innerHTML += `<div class="card">
            <div class="card-header colorRed">
            Question N :${inc.Qstid} / ${arrayExp.Qst}
            </div>
            <div class="card-body">
              <blockquote class="blockquote mb-0">
            <p> Explication : ${arrayExp.correctanswer.Exp} </p>
              </blockquote>
            </div>
          </div>`


                }
            }

            if (inc.Q == 'correct') {
                if (inc.Qstid == arrayExp.Qstid) {
                    Explication.innerHTML += `<div class="card">
        <div class="card-header colorGreen">
        Question N : ${inc.Qstid} / ${arrayExp.Qst}
        </div>
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>your answer :${inc.anser}</p>
            <p> Explication : ${arrayExp.correctanswer.Exp} </p>
          </blockquote>
        </div>
      </div>`
                }
            }

        });

    })
}
let scorArray = []
function showScor() {
    // Retrieve data
    $('#exampleModal').modal('show');
    let title = document.querySelector('#Title')
    let bodymodal = document.querySelector('.modal-body')
    title.innerText = "Result && Score :"
    bodymodal.innerHTML = "";
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        value = Math.floor(value)

        let arrScor = { "name": key,"score": value }
        scorArray.push(arrScor);

    }

    let sortedArr = scorArray.sort((a, b) => b.score - a.score);
    // alert(sortByvalue)
    // scorArray.sort((a,b) => b.value - a.value);
    // scorArray.reverse();
    sortedArr.forEach((e)=>{

        bodymodal.innerHTML += `
        <table>
  <tr>
    <th> Name </th>
    <th>Result</th>
  </tr>
  <tr>
    <td>${e.name}</td>
    <td>${e.score}</td>
  </tr>

</table>
        `

    })
}


