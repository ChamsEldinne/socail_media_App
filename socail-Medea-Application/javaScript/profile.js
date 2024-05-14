

function draHeader(){
   let header=
   `    <header>
   <div class="container">
       <div class="left">
           <div class="logo">
               AllinOne
           </div>
           <div class="searchBox">
               <input type="text" name="" id="" placeholder="Search">
               <i class="fa-solid fa-magnifying-glass"></i>
           </div>
       </div>
       <div class="midle">
           <div class="box">
            <i class="fa-solid fa-house"></i>
           </div>
           <div class="box">
           <i class="fa-solid fa-video"></i>   
           </div>
           <div class="box">
           <i class="fa-solid fa-user-group"></i>         
           </div>
           <div class="box">
               <i class="fa-solid fa-gamepad"></i>
           </div>
       </div>
       <div class="right">
           <div class="box">
               <i class="fa-solid fa-bars"></i>
           </div>
           <div class="box">
               <i class="fa-solid fa-user"></i>
           </div>
           <div class="box">
               <i class="fa-solid fa-bell"></i>
           </div>
           <div class="box">
               <i class="fa-brands fa-facebook-messenger"></i>
           </div>
       </div>
   </div>
</header>
   `
   document.body.innerHTML=header+document.body.innerHTML ;
}

function drawHeaderProfile(userPhotoProfile,coverPicteur,userName,nbfreind){
let headerProfile=`
    <div class="header">
    <div class="cover">
       <div class="imgCover"><img src=${coverPicteur} alt="Note Founde">
       <div class="editCover"> Edit Cover Picteur</div></div> 
       <div class="coverHeader">
         <div class="profileBox">
             <div class="profileImg"><img src=${userPhotoProfile} alt="NOTE FOUND"></div>
             <div class="name">
                <div class="username">
                    ${userName}
                </div>
                <div class="nbfreind">
                    ${nbfreind}
                </div>
             </div>
         </div>
         <div class="editBox">
            <div class="addToYourStory">+ add to story </div>
            <div class="editYourProfile">Edite your profile</div>
         </div> 
        </div>
        <div class="coverFooter">
            <ul>
                <li class="footerElement">
                    posts
                </li>
                <li class="footerElement">
                    About
                </li>
                <li class="footerElement">
                    frinds
                </li>
                <li class="footerElement">
                    photos
                </li>
                <li class="footerElement">
                    videos
                </li>
                <li class="footerElement">
                    chek-in
                </li>
                <li class="footerElement">
                    more
                </li>
            </ul>
       </div>
    </div>
</div>`;
document.querySelector("section").innerHTML= headerProfile+document.querySelector("section").innerHTML ;
}

let user= JSON.parse(window.localStorage.getItem("user"));

draHeader()
drawHeaderProfile(user.profile_image,user.profile_image,user.username,user.comments_count) ;