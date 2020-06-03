let userProfilesArray = [];
let userCount = 0;
let localStorage = window.localStorage;
//if (the user enters the website and there is already local storage.)
if(localStorage.getItem('userCount') != null ){

    console.log("7???");

    userProfilesArray = JSON.parse(localStorage.getItem('userArray'));
    console.log("10???" + JSON.parse(localStorage.getItem('userArray')) + "!!");

    for (let i = 0; i < userProfilesArray.length; i++){
        if(userProfilesArray[i].name != null && userProfilesArray[i].desc != null && userProfilesArray[i].imageURL != null){
            showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

        }
    }
    userCount = parseInt(localStorage.getItem('userCount'));  

    //When the user enters the website and there is NO local storage
} else {
    userCount = 0;

    //     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/14.jpg");
    //     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg");
    //     showProfile("rose", "i am tired", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png");
    //     showProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg");

    localStorage.setItem('userArray',JSON.stringify(userProfilesArray));
}

fetch('/getList').then((response)) => {
    if (response.status !== 200) {
        console.log('Status Code: ' + response.status);
        return;
    };
};

userProfilesArray = JSON.parse(fs.readFileSync(path.join(__dirname + '/profiles.txt')));

class userProf {
    constructor(name, desc, imageURL) {
      this.userId =  ++userCount;
      this.name = name;
      this.desc = desc;
      this.imageURL = imageURL;
      localStorage.setItem('userCount', userCount);
    }
}


function showProfile(name, about, url) {
    
    //for textDesc
        let usrName = document.createElement("H5");
        let txtNAME = document.createTextNode(name);
        usrName.appendChild(txtNAME);

        let usrABOUT = document.createElement("p");
        let txtABOUT = document.createTextNode(about);
        usrABOUT.appendChild(txtABOUT);

        //appending username and txt name to a div
        let divDesc = document.createElement("div");
        divDesc.appendChild(usrName);
        divDesc.appendChild(usrABOUT);

        //adding class to div 
        divDesc.classList.add("textDesc");

    let  usrPIC = document.createElement("IMG");
    usrPIC.setAttribute("src", url);

    //Delete Button div
    let delDiv = document.createElement("div");
    delDiv.setAttribute("id", "deleteProf");
    delDiv.appendChild(document.createTextNode("Delete"));


    let deleteProfContainer = document.createElement("div");
    deleteProfContainer.setAttribute("id", "deleteProfContainer");

    deleteProfContainer.appendChild(delDiv);




   //creating single profile div
   let profileDiv = document.createElement("div");
    profileDiv.classList.add("singularProf");
    profileDiv.appendChild(usrPIC);
    profileDiv.appendChild(divDesc);
    profileDiv.appendChild(deleteProfContainer);


    //delete button.
    document.getElementById("profCont").appendChild(profileDiv);

    delDiv.addEventListener("click", function(){
        profileDiv.style.display = "none";
        for (let i = 0; i < userProfilesArray.length; i++){
            if(userProfilesArray[i].name == name && userProfilesArray[i].desc == about && userProfilesArray[i].imageURL == url){
                
                userProfilesArray.splice(i, 1);
                localStorage.setItem('userArray',JSON.stringify(userProfilesArray));

            }

        }
    });
}
function showHide() {
    if (document.getElementById('artistEntry').style.display === "none") {
        document.getElementById('artistEntry').style.display = "flex";
    } else {
       document.getElementById('artistEntry').style.display = "none";

    }
}
function AddArtist() {

    let strName = document.getElementById("artist_name").value;
    let strAbout = document.getElementById("about_artist").value;
    let strUrl = document.getElementById("image_url").value;
    if (strName.length == 0 || strName.length > 40 || strAbout.length == 0 || strAbout.length > 40 || strUrl.length == 0) {
        alert("Wrong format");
  
    } else {

        let pf =  {
            userId :  ++userCount,
            name : strName,
            desc : strAbout,
            imageURL : strUrl
          
      }
        userProfilesArray.push(pf);

        localStorage.setItem('userCount', userCount);
        localStorage.setItem('userArray',JSON.stringify(userProfilesArray));
        showProfile(strName, strAbout, strUrl);
        document.getElementById("artist_name").value = "";
        document.getElementById("about_artist").value = "";
        document.getElementById("image_url").value = "";
    } 
}

function searchContacts() {
    var x = (document.getElementById("searchInput").value).toLowerCase();
    
   if(x.length != 0){
        for (let i = 0; i < document.getElementById("profCont").children.length; i++) {
            document.getElementById("profCont").children[i].style.display = "none" ; // Text, DIV, Text, UL, ..., SCRIPT
            
        }
        for (let i = 0; i < userProfilesArray.length; i++){
            if(userProfilesArray[i].name != null ){
                let nameString = (userProfilesArray[i].name).substring(0, x.length);
                if(nameString.includes(x)){
                    showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

                }

            }
        }
   } else {
    for (let i = 0; i < document.getElementById("profCont").children.length; i++) {
        document.getElementById("profCont").children[i].style.display = "none" ; // Text, DIV, Text, UL, ..., SCRIPT
        
    }
        for (let i = 0; i < userProfilesArray.length; i++){
            if(userProfilesArray[i].name != null && userProfilesArray[i].desc != null && userProfilesArray[i].imageURL != null){
                showProfile(userProfilesArray[i].name, userProfilesArray[i].desc, userProfilesArray[i].imageURL);

            }
        }
   }

 
}
/**
function createAddArtist(){
let artist_name = document.createElement("INPUT");
let about_artist = document.createElement("INPUT");
let image_url = document.createElement("INPUT");

artist_name.placeholder="Artist Name";
about_artist.placeholder="About artist";
image_url.placeholder="Image url";

artist_name.setAttribute("type", "text");
about_artist.setAttribute("type", "text");
image_url.setAttribute("type", "text");


let artistEntry = document.createElement("div");

artistEntry.setAttribute("id", "artistEntry");


}
**/