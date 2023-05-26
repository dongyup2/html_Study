const brandLogo = document.querySelector(".brand-logo-border");
const converButton = document.querySelector(".article-footer button");
const textarea = document.querySelector(".article-body-textarea textContent");
const inputUrl = document.querySelector("#web-url");
const linkButton = document.querySelector(".button-url button");
brandLogo.onclick = () => {
    //alert("로고 클릭 되었음.");
   // location.href = "https://www.papago.naver.com";
   // location.replace("https://www.papago.naver.com");
    Location.href = "http://127.0.0.1:5500/src/papago/index.html";
}

 converButton.onclick = () => {
    pre.textContent = textarea.ariaValue;
 }
 converButton.onclick = () => {
    pre.textContent = textarea.value;
 }

 textarea.onkeyup = () =>{
    pre.textContent = textarea.value;
 }

linkButton.onclick = () => {
    let protocols = new Array();
    protocols.push("http://");
    protocols.push("https://");
    console.log(protocols);

    for(let i = o; i < protocols.length; i++){
        if(inputUrl.value.includes(protocols.get(i))){
            location.href = inputUrl.value;
            return;
        }
    }

    location.href ="https://" + inputUrl.value;
}
inputUrl.onkeypress = () => {
    if(window.event.keyCode == 13){
        linkButton.click();
    }
}