
let loginBtn=document.querySelector("#btn") ;
loginBtn.addEventListener("click",(e)=>{
  e.preventDefault() ;
  let userNameFiled=document.querySelector("#userNmae") ;
  let passwordFiled=document.querySelector("#password") ;
  let userName=userNameFiled.value ;
  let password=passwordFiled.value ;
  let data={
    "username" : userName ,
    "password" : password
  }
   login(data) ;
});

document.addEventListener("click",(e)=>{
  
  if(e.target.className=="singUp"){
    e.preventDefault() ;
    let name=document.querySelector(".firstName").value;
    let scounname=document.querySelector(".scoundName").value ;
    let userName=`${name} ${scounname}`
    let password=document.querySelector(".password input").value ;
    let email=document.querySelector(".email input").value ;
    let data=new FormData() ;
    data.append( "username",userName );
    data.append("password",password );
    // data.append("image","");
    data.append( "name", name);
    data.append("email",email);
    regester(data) ;
    setTimeout(()=>{
      document.querySelectorAll(".notic").forEach(ele=>{ele.style.display="none"}) ;
    },4000) ;
  }
})

async function login(data){
    let respons=await fetch("https://tarmeezacademy.com/api/v1/login",{
        method:"POST" ,
        headers: {
          "Content-Type": "application/json",
          "Accept":"application/json"
        },
        body:JSON.stringify(data) ,
        redirect: 'follow'
    })
    if(respons.ok){
      let json= await respons.json() ;
      if(json.message){
      document.querySelector(".notic").innerHTML="" ;
      document.querySelector(".notic").innerHTML=json.message ;
      }
      if(json.token){
        window.localStorage.setItem("token",json.token) ;
        window.localStorage.setItem("user",JSON.stringify(json.user)) ;
        window.location="home.html" ;
      } 
    }
}


function creatAcount(){
  let overaly=`
  <div class="overaly">
  <div class="content">
      <div class="header">
          <div class="title">
              <div>Sign Up</div>
              <div class="fo">It’s quick and easy.</div>
          </div>
          <div class="close" onclick="closeOveraly()">X</div>
      </div>
      <div class="from">
          <form action="">
              <div class="userName">
                  <div class="box">
                     <div class="notic"></div>
                    <input type="text" placeholder="First name" class="firstName" required>
                  </div>
                  <div class="box2">
                    <div class="notic"></div>
                    <input type="text" placeholder="Scound name" class="scoundName" required>   
                  </div>
              </div>
              <div class="errorMesage email">
                  <div class="box">
                      <div class="notic "></div>
                      <input type="text" placeholder="Phone Number or e-amil" class="email" required>
                  </div>
              </div>
              <div class="errorMesage password">
                  <div class="box">
                      <div class="notic"></div>
                    <input type="password" placeholder="New password" class="password" required>
                  </div>
              </div>
              <div class="birthday">
              <select class="month">
                  <optgroup>
                     <option value="jan"> jan </option>
                     <option value="feb">feb </option>
                     <option value="mar">mar</option>
                     <option value="avril">avr</option>
                     <option value="may">may</option>
                     <option value="jun">jun</option>
                     <option value="juil">juil</option>
                     <option value="aut">aut</option>
                     <option value="sept">sept</option>
                     <option value="ouct">ouct</option>
                     <option value="nov">nov</option>
                     <option value="dec">dec</option>
                  </optgroup>
              </select>
              <select class="day">
                  <optgroup>
                  <option value=1>1</option>
                  <option value=2>2</option>
                  <option value=3>3</option>
                  <option value=4>4</option>
                  <option value=5>5</option>
                  <option value=6>6</option>
                  <option value=7>7</option>
                  <option value=8>8</option>
                  <option value=9>9</option>
                  <option value=10>10</option>
                  <option value=11>11</option>
                  <option value=12>12</option>
                  <option value=13>13</option>
                  <option value=14>14</option>
                  <option value=15>15</option>
                  <option value=16>16</option>
                  <option value=17>17</option>
                  <option value=18>18</option>
                  <option value=19>19</option>
                  <option value=20>20</option>
                  <option value=21>21</option>
                  <option value=22>22</option>
                  <option value=23>23</option>
                  <option value=24>24</option>
                  <option value=25>25</option>
                  <option value=26>26</option>
                  <option value=27>27</option>
                  <option value=28>28</option>
                  <option value=29>29</option>
                  <option value=30 class="day30">30</option>
                  <option value=31 class="day31">31</option>
                  </optgroup>
              </select>
              <select class="year">
                  <optgroup class="year">
                  
                  </optgroup>
              </select>
              </div>
              <div class="gennder">
              <div class="box"> 
               <div class="boxTitle">Female</div>
              <input type="radio" name="gender" >
              </div>
              <div class="box"> 
              <div class="boxTitle">Male</div>
              <input type="radio" name="gender" >
              </div>
              <div class="box"> 
              <div class="boxTitle">Costum</div>
              <input type="radio" name="gender" >
              </div>
              </div>
              <p>People who use our service may have uploaded your contact information to Facebook.<a href="">Learn more </a>.</p>
              <p>By clicking Sign Up, you agree to our Terms, <a href=""> Privacy Policy</a> and <a href="">Cookies Policy</a> . You may receive SMS Notifications from us and can opt out any time.</p>
              <button class="singUp">Sing up</button>
          </form>
      </div>
  </div>
  </div>`
  document.body.innerHTML=overaly+document.body.innerHTML ;
  for(let i=1990;i<2040;i++){
    let date=`<option value=${i}>${i}</option>` ;
    document.querySelector(".birthday .year optgroup").innerHTML+=date ;
  }  
}

function closeOveraly(){
  document.querySelector(".overaly").remove() ;
}

async function regester(data){
  let respons=await fetch("https://tarmeezacademy.com/api/v1/register",{
    method:"POST" ,
    headers:{
      "Accept":"application/json"
    },
    body:data 
  });
  console.log(respons) ;
  if(respons.ok){
    let json=await respons.json() ;
    console.log(json) ;
    window.localStorage.setItem("user",JSON.stringify(json.user)) ;
    window.localStorage.setItem("token",json.token) ;
    window.alert("sing up sccessefuly")
    window.location="home.html" ;
  }else{
    console.error("HTTP Error:", respons.status);
    const errorResponse = await respons.json();
    console.log(errorResponse) ;
    console.log(errorResponse.errors.email) ;
    if(errorResponse.errors.email){    
      document.querySelector(".content .email .box .notic").innerHTML= errorResponse.errors.email[0] ;
      document.querySelector(".content .email .box .notic").style.display="block" ;
    }
    if(errorResponse.errors.name){
      document.querySelector(".userName .box2 .notic").innerHTML= errorResponse.errors.name[0];
      document.querySelector(".userName .box2 .notic").style.display="block" ;
      document.querySelector(".userName .box .notic").innerHTML= errorResponse.errors.name[1];
      document.querySelector(".userName .box .notic").style.display="block" ;
    }
    if(errorResponse.errors.password){
      document.querySelector(".content .password .box .notic").innerHTML=errorResponse.errors.password[0] ;
      document.querySelector(".content .password .box .notic").style.display="block"
    }
    if(errorResponse.errors.username){
      document.querySelector(".userName .box .notic").innerHTML= errorResponse.errors.username[0];
      document.querySelector(".userName .box .notic").style.display="block" ;
    }
  }
}

document.addEventListener("change",function(e){
  if(e.target.className=="month"){
     let monthe=document.querySelector(".month").value ;
     if(monthe=="jan" ||monthe=="mar"||monthe=="may"||monthe=="juil"||monthe=="aut"||monthe=="ouct"||monthe=="dec" ){
      document.querySelector(".day31").style.display="block" ;
      document.querySelector(".day30").style.display="block" ;
     }else if(monthe=="feb"){
      document.querySelector(".day31").style.display="none" ;
      document.querySelector(".day30").style.display="none" ;
     }else{
      document.querySelector(".day31").style.display="none"  ;
      document.querySelector(".day30").style.display="block" ;
     }
  }
})



