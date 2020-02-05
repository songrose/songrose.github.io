createProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/14.jpg")
createProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg")
createProfile("rose", "i am tired", "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png")

createProfile("rose", "i am tired", "https://randomuser.me/api/portraits/med/women/15.jpg")

function createProfile(name, about, url) {


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
        createProfile(strName, strAbout, strUrl);
        
        document.getElementById("artist_name").value = "";
        document.getElementById("about_artist").value = "";
        document.getElementById("image_url").value = "";

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