function detectVideos(){
    const videos = document.getElementsByTagName('video');
    for(const video of videos){
        console.log("loading video:", video);
    }
}
console.log("i am on webbrowser")
if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', detectVideos);
}
else{
    detectVideos();
}