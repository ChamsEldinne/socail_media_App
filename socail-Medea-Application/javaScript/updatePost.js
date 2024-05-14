document.addEventListener("click",(e)=>{
    if(e.target.className=="fa-solid fa-xmark"){
        document.querySelector(`.posts #post${e.target.id}`).remove() ;
    }
    if(e.target.className=="threePoint po cantClosOnClick"){
      drawPostBar(e.target.id) ;
    }
    if(e.target.className=="deleteTyourPost cantClosOnClick"){
      deletPost(e.target.id) ;
    }
    if(e.target.className=="updatYourPost cantClosOnClick"){
      let prompt=window.prompt("new text") ;
      updatePost(e.target.id,prompt) ;
    }
}) ;

function drawPostBar(id){
  let bar=` 
    <div class="modifi cantClosOnClick">
      <ul>
          <li class="updatYourPost cantClosOnClick" id=${id}>
          <i class="fa-solid fa-wrench cantClosOnClick"></i>
          updat your post
          </li>
          <li class="deleteTyourPost cantClosOnClick" id=${id}>
          <i class="fa-solid fa-trash cantClosOnClick"></i>
          delete your post
        </li>
      </ul>
    </div>`;
  if(document.querySelector(`.posts #post${id} .header .modifi`)){
    document.querySelector(`.posts #post${id} .header .modifi`).remove() ;
    lastOpen="" ;
  }else{
    document.querySelector(`.posts #post${id} .header`).innerHTML+=bar ;
    lastOpen="modifi" ;
  }
}


async function deletPost(id){
  let respons=await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
    method:"DELETE",
    headers:{
      "Authorization":`Bearer ${token}`,
      "Accept":"application/json",
    }
  }) 
  if(respons.ok){
    document.querySelector(`.posts #post${id}`).innerHTML="have been deleted seccssusfuly" ;
    setTimeout(()=>{
      document.querySelector(`.posts #post${id}`).remove() ;
    },1000) ;
  }else{
    window.alert("you can't delete post you didnt post it") ;
  }
}

async function updatePost(id,data){
  let respons=await fetch(`https://tarmeezacademy.com/api/v1/posts/${id}`,{
    method:"PUT",
    headers:{
      "Authorization":`Bearer ${token}`,
      "Accept":"application/json",
    },
    body:JSON.stringify(data) 
  }) 
  console.log(respons) ;
  if(! respons.ok){
    window.alert("you can't update post you didnt post it") ;
  }else{
    document.querySelector(`.posts #post${id} .body p`).innerHTML=data ;
  }
}