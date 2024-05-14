let lastOpen ;
let user=JSON.parse(window.localStorage.getItem("user") );
let token=window.localStorage.getItem("token") ;
let nextPage;
start() ;


function drawPost(postId,userPhotoProfile,userName,postText,postImg,creatAt,endOrBeginning){
    let post=`
    <div class="post" id="post${postId}">
    <div class="header">
        <div class="left">
            <div class="photoProfile">
               <img src=${userPhotoProfile} alt="" >
            </div>
            <div class="name">
                <h4>${userName}</h4>
                <p>${creatAt}</p>
            </div>
        </div>
        <div class="right">
            <div class="threePoint po cantClosOnClick" id="${postId}" >
                <span class="cantClosOnClick"></span><span class="cantClosOnClick"></span><span class="cantClosOnClick"></span>
            </div>
            <div class="X">
                <i class="fa-solid fa-xmark" id=${postId} ></i>
            </div>
        </div>
    </div>
    <div class="body">
        <p>${postText}</p>
        <div class="imgs" onclick="getPostById(${postId})"><img src=${postImg} alt="img Not found"></div>
    </div>
    <div class="footer">
        <div class="box">
            <i class="fa-regular fa-thumbs-up"></i>
            like
        </div>
        <div class="box" onclick="getPostById(${postId})" >
            <i class="fa-regular fa-comment"></i>
            comment
        </div>
        <div class="box">
            <i class="fa-solid fa-share"></i> 
             share
        </div>
    </div>

</div>
    `;
    if(endOrBeginning=="end"){
     document.querySelector("section .posts").innerHTML+=post ;   
    }else{
        document.querySelector("section .posts").innerHTML=post+document.querySelector("section .posts").innerHTML ;
    }        
}

 
//fetch post 
async function getPostsByLimits(limit,url){
    let respons ;
    if(url!=""){
        respons=await fetch(url) ;
    }else{
     respons=await fetch(`https://tarmeezacademy.com/api/v1/posts?limit=${limit}`) ;
    }
    console.log(respons) ;
    if(respons.ok){
       let json=await respons.json() ;
        for(let i=0 ;i<json.data.length ;i++){
            let postId=json.data[i].id ;
            let userPhotoProfile=json.data[i].author.profile_image ;
            let userName=json.data[i].author.username;
            let postText=json.data[i].body ;
            let postImg=json.data[i].image ;
            let creatAt=json.data[i].created_at ;
            nextPage=json.links.next ;
            drawPost(postId,userPhotoProfile,userName,postText,postImg,creatAt ,"end") ;
        }
    }else{
        window.alert("can't fetch Posts url")
    }
}

function drawOveralyPostOnClick(postId,postPhotoProfile,userName,postText,postImg,postDure,comments_count){
    let overaly=`
    <div class="overaly">
        <div class="content" id=${postId}>
            <div class="close" onclick="closeOveraly()"> <i class="fa-solid fa-x"></i> </div>
            <div class="imgs">
                <img src=${postImg} alt="">
            </div>
            <div class="left">
                <div class="content">
                    <div class="box">
                        <div class="img"><img src=${postPhotoProfile} alt="" ></div>
                        <div class="name">
                            <div class="userName">
                                ${userName}
                            </div>
                            <div class="dure">
                                ${postDure}
                            </div>
                        </div>
                    </div>
                    <div class="text" >
                      ${formText(postText)}
                    </div>
                    <div class="tages">
                    <span class="seeMore" id=${postId}>see more..</span>
                    </div>
                    
                    <div class="nbcomment">
                       ${comments_count} <i class="fa-regular fa-comment"></i>
                    </div>
                    <div class="addComment">
                        <input type="text"  class="" placeholder="add comment">
                        <i class="fa-regular fa-paper-plane" id=${postId}></i>
                    </div>
                    <div class="comnatairs">
                    <div class="comnatairsContainer"></div>
                    </div>
                </div>
            </div>
        </div>
        </div> 
    `;
   document.body.innerHTML=overaly+document.body.innerHTML ;
    if(postText.length<80){
       document.querySelector(".left .seeMore").style.display="none" ;
    }
}
function drawTags(tags){
    let tagsContainer=document.querySelector(".tages") ;
    for(let i= 0 ;i<tags.length ;i++){
       let tag=`<a href="">#${tags[i].name} </a> ` ;
       tagsContainer.innerHTML=tag+tagsContainer.innerHTML ;
    }
}

function drawCommentBox(userPhotoProfile,userName,body){
    let comment=`<div class="commentBox">
    <div class="img"><img src=${userPhotoProfile} alt=""></div>
    <div class="comment">
        <div class="name"> ${userName}</div>
        <div class="comm">${body} </div>
    </div>
    </div>`;
    document.querySelector(".comnatairsContainer").innerHTML+=comment ;
}

async function getPostById(id){
    let respons=await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`) ;
    if(respons.ok){
      let json=await respons.json() ;
      drawOveralyPostOnClick(json.data.id,json.data.author.profile_image,json.data.author.username,json.data.body,json.data.image,json.data.created_at,json.data.comments_count) ;
      document.querySelector(".comnatairsContainer").innerHTML="" ;
      let comntiars=json.data.comments ;
      for(let i= 0 ; i<comntiars.length ;i++){
        drawCommentBox(comntiars[i].author.profile_image,comntiars[i].author.username,comntiars[i].body) ;
      }
      drawTags(json.data.tags);
      lastOpen="post" ;
    }   
}
async function getAllComments(id){
    let respons=await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`) ;
    if(respons.ok){
        document.querySelector(".comnatairsContainer").innerHTML="" ;
        let json=await respons.json() ;
        let comntiars=json.data.comments ;
        for(let i= 0 ; i<comntiars.length ;i++){
          drawCommentBox(comntiars[i].author.profile_image,comntiars[i].author.username,comntiars[i].body) ;
        }
    }
}

function closeOveraly(){
    if(document.querySelector(".overaly")){
        document.querySelector(".overaly").remove();
    }
}

function drawOveralyAddPost(){
    let overaly=`
    <div class="overaly">
    <div class="creatPostContent cantClosOnClick">
        <div class="header cantClosOnClick">
            <div class="title cantClosOnClick">Creat post</div>
            <div class="x" onclick="closeOveraly()">X</div>
        </div>
        <div class="midle cantClosOnClick">
            <div class="proflieBox cantClosOnClick">
                <div class="imgBox cantClosOnClick"><img src=${user.profile_image} alt="note Found"></div>
                <div class="name cantClosOnClick">${user.username}</div>
            </div>
            <div class="text cantClosOnClick">
                <textarea placeholder="What's on your mind ${user.username}" class="text cantClosOnClick"></textarea>
                <div class="img cantClosOnClick"></div>
            </div>
            <input type="file" class="openFile cantClosOnClick" style="display: none; border: none; font-size: 19px;"> 
            <div class="addtoyourstory cantClosOnClick">
                <div class="cantClosOnClick">add to your Story</div>
                <div class="icons cantClosOnClick">
                    <i class="fa-regular fa-image cantClosOnClick"></i>
                    <i class="fa-solid fa-user-tag cantClosOnClick"></i>
                    <i class="fa-regular fa-face-smile cantClosOnClick"></i>
                    <i class="fa-solid fa-location-dot cantClosOnClick"></i>
                    <i class="fa-solid fa-gif cantClosOnClick"></i>
                </div>
            </div>
            <button class="cantClosOnClick btnpost">Post</button>
        </div>
    </div>
</div>
`
    document.body.innerHTML=overaly+document.body.innerHTML ;
    lastOpen="overaly"
}
function openSearchBox(){
    let left=document.querySelector(".container .left") ;
    document.querySelector(".searchBox").style.display="none" ;
    document.querySelector(".logo").style.display="none" ;
    left.innerHTML+=`
    <div class="searchBox2 cantClosOnClick" >
    <div class="header cantClosOnClick">
       <i class="fa-solid fa-arrow-left" onclick="deletSearchBox2()"></i>
       <input type="text" name="" id="" placeholder="Search">
    </div>
    <div class="body cantClosOnClick">
       <div class="title cantClosOnClick">Reacent</div>

       <div class="box cantClosOnClick">
           <div class="imgBox cantClosOnClick"><img src="./images/photoProfile.jpg" alt="Note found"></div>
           <div class="name cantClosOnClick">Chamso</div>
           <div class="X cantClosOnClick">x</div>
       </div>
    </div>
   </div>
    `;

    lastOpen="searchBox2" ;
}
//clos overaly and searchBox with random click
document.addEventListener("click",(e)=>{   
    let x="cantClosOnClick" ;
    let xx=true ; 
    if(e.target.className!=null){
        for(let i=0;i<=e.target.className.length - x.length ;i++){
            if(e.target.className.substring(i,i+x.length)===x){
                xx=false ;
                break ;
            }
        }
    }    
    if(xx==true){
        if(lastOpen=="searchBox2" && document.querySelector(".searchBox2")!=null){
            document.querySelector(".searchBox2").remove() ;
            document.querySelector(".searchBox").style.display="flex" ;
            document.querySelector(".logo").style.display="flex" ;
            lastOpen="" ;
        }else if(lastOpen=="overaly"){
            closeOveraly() ;
            lastOpen="" ;
        }else if(lastOpen=="modifi"){
            document.querySelector(".modifi").remove() ;
        }
    }
})

function StoryScroling2(){

    document.querySelector(".storyContainer").scrollBy( {
        top: 0,
        left: 180,
        behavior: "smooth",
    }) ;
    displayNextAndPreviosIconsStory();
}

function StoryScroling1(){
    document.querySelector(".storyContainer").scrollBy({
        top: 0,
        left: -180,
        behavior: "smooth",
    }) ;
    displayNextAndPreviosIconsStory();
}

function displayNextAndPreviosIconsStory(){
    if(  document.querySelector(".storyContainer").scrollLeft<10){
        document.querySelector(".previosIcon").style.display="none" ;
    }else if(document.querySelector(".storyContainer").scrollLeft >=10){
        document.querySelector(".previosIcon").style.display="flex" ;
    }
    if(document.querySelector(".storyContainer").scrollLeft>2500){
        document.querySelector(".nextIcon").style.display="none" ;
    }else{
        document.querySelector(".nextIcon").style.display="flex" ;
    }
}

function drawStory(userImg,bodyImg,userName,postId){
   let story=` <div class="outhersStory" id=${postId}>
    <div class="contentStory">
        <img src=${bodyImg} alt="">
    </div>
    <div class="box">
        <div class="img">
            <img src=${userImg} alt="">
        </div>
    </div>
    <div class="name">
        ${userName}
    </div>
</div>`;
document.querySelector(".storyContainer").innerHTML+=story ;
}

async function getStorys(limit){
    drawAddStory(user.profile_image) ;
    let respons= await fetch(`https://tarmeezacademy.com/api/v1/posts?limit=${limit}`) ;
    if(respons.ok){
       let json=await respons.json() ;
        for(let i=0 ;i<limit;i++){
            let postId=json.data[i].id ;
            let userPhotoProfile=json.data[i].author.profile_image ;
            let userName=json.data[i].author.username;
            let postImg=json.data[i].image ;
            drawStory(userPhotoProfile,postImg,userName,postId) ;
        }
    }else{
        window.alert("can't fetch Posts url")
    }
}


function drawAddStory(userPhotoProfile){
    let addstory=`
    <div class="createStory">
    <div class="img"> <img src=${userPhotoProfile} alt=""> 
       <div class="new"></div>
    </div>
</div>`
document.querySelector(".storyContainer").innerHTML+=addstory ;
}


async function start(){
    let body=document.body.innerHTML ;
    document.body.innerHTML=` 
    <div class="overaly">
    <div class="spin">
        <div class="innerSpine"></div>
    </div>
    </div>`;
    setTimeout(()=>{
        document.querySelector(".overaly").remove() ;
        document.body.innerHTML=body ;
        getPostsByLimits(5,"") ;
        getStorys(20) ;
        displayNextAndPreviosIconsStory();
        getPostById("20200") ;
    },800) ;
}


function formText(text){
    if(text.length >80){
        return text.substring(0,80)+"..." ;
    }
    return text ;
}

// see less and see more post text and reload home
document.addEventListener("click", async function(e){
    if(e.target.className=="seeMore"){
        let postid=e.target.id ;
        let respons=await fetch(`https://tarmeezacademy.com/api/v1/posts/${postid}`) ;
        if(respons.ok){
            let json=await respons.json() ;
            let postText=json.data.body
            
            if(document.querySelector(".left .seeMore").innerHTML=="see more.."){
                document.querySelector(".left .text").innerHTML=postText ;
                document.querySelector(".left .tages").innerHTML=`<span class="seeMore" id=${postid}>see less..</span>` ;
                drawTags(json.data.tags) ;
            }else{
                document.querySelector(".left .text").innerHTML=formText(postText) ;
                document.querySelector(".left .seeMore").innerHTML="see more.."; 
            }
       }
    }  
    if(e.target.className=="fa-solid fa-house" || e.target.className=="box house"){
        if(window.scrollY==0){
        location.reload() ;
        }else{
            window.scrollTo({
            top:0,
            left:0,
            behavior:"smooth"
        })
        }
    }
    
 }) ;

async function addPost(data){
    let respons =await fetch("https://tarmeezacademy.com/api/v1/posts",{
        method:"POST",
        headers:{
            "Authorization":`Bearer ${token}`,
        },
        body:data ,
    })
    if(respons.ok){
        let json=await respons.json() ;
        console.log(json) ;
        if(json.data){
            drawPost(json.data.id,user.profile_image,user.username,json.data.body,json.data.image,"1s ago","beginning") ;
        }else{
            window.alert(`${json.message}`)
        }
    }
}

//new file
document.addEventListener("click",(e)=>{
    if(e.target.className==="fa-regular fa-image cantClosOnClick"){
      if(  document.querySelector(".openFile").style.display=="block" ){
        document.querySelector(".openFile").style.display="none" ;
      }else{
        document.querySelector(".openFile").style.display="block" ;
      }
    }
})
//add new post
document.addEventListener("click",(e)=>{
   if(e.target.className=="cantClosOnClick btnpost"){
      let body=document.querySelector("textarea").value ;
      console.log(body) ;
      let imag=document.querySelector(".openFile").files[0] ;
      let dataForm=new FormData() ;
      dataForm.append("image",imag) ;
      dataForm.append("body",body) ;
      dataForm.append("title","") ;
      addPost(dataForm) ;
      closeOveraly() ;
   }
})


//pagination get post by group 
window.addEventListener("scroll",()=>{
    if(window.pageYOffset + window.innerHeight >= document.body.offsetHeight+document.body.offsetTop){
        getPostsByLimits(0,nextPage) ;
    }
})

async function addCommnet(Id, data) {
    let respons = await fetch(`https://tarmeezacademy.com/api/v1/posts/${Id}/comments`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    if (respons.ok) {
        let json = await respons.json();
       getAllComments(Id) ;
    }
}
//send Comment by buttomn 
document.addEventListener("click",(e)=>{
  if(e.target.className=="fa-regular fa-paper-plane" && document.querySelector(".addComment input").value!=""){
    let id=e.target.id ;
    let data={
        "body": document.querySelector(".addComment input").value
    }
    addCommnet(id,data) ; 
    document.querySelector(".addComment input").value="" ;
  }
})

//send Comment by Enter and clos overaly by esc
document.addEventListener("keyup",(e)=>{

    if(e.code=="Enter"){
        if( document.querySelector(".addComment input").value!=""){
            
            let id=document.querySelector(".fa-paper-plane").id ;
            let data={
                "body": document.querySelector(".addComment input").value
            }
            addCommnet(id,data) ; 
            document.querySelector(".addComment input").value="" ;
        }
    }
    if(e.code=="Escape" && document.querySelector(".overaly")){
        closeOveraly() ;
    }
})


