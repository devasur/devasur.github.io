var pauseAutoRotate = false;
var panorama = null;
var pov = {heading:0,pitch:0};
var search = new AdvancedSearch();
var panoIndex = 0;
var panoSwitchInterval = 10; //Switch to next pano every 3 seconds.
function autoRotate(){	
  if(panorama && !pauseAutoRotate){
      var pov = panorama.getPov();
      pov.heading += speed;
      panorama.setPov(pov)
  }
  requestAnimationFrame(function(){
    autoRotate();
  })
}
function run(){
  var panoramaOptions = {              
      pov:pov,
      disableDefaultUI:true,
      addressControl:false,
      clickToGo:false,
      disableDefaultUI:true,	
      disableDoubleClickZoom:false,	
      enableCloseButton:false,
      fullscreenControl:false,
      imageDateControl:false,
      linksControl:false,
      motionTracking:false,
      motionTrackingControl:false,	
      panControl:false,
      scrollwheel:false,
      showRoadLabels:false,
      zoomControl:false
  };  
  panorama = new  google.maps.StreetViewPanorama(document.getElementById("map-canvas"));          
  search.getStreetviewFromUrl(randomSvDb[panoIndex],function(data){
      if(data && data.panoid){
        panoramaOptions.pano = data.panoid;
        panoramaOptions.pov.heading = data.heading;
        panoramaOptions.pov.pitch = data.pitch;                
      }
      panorama.setOptions(panoramaOptions);
      autoRotate();
      setInterval(function(){
          nextPano()
      },panoSwitchInterval * 1000)
  })     
}
function nextPano(){
    panoIndex += 1;
    if(panoIndex >=  randomSvDb.length){
          panoIndex = 0;
  }
  search.getStreetviewFromUrl(randomSvDb[panoIndex],function(data){
          var svOptions = {};
      if(data && data.panoid){
          panorama.setOptions({pano:data.panoid});
      }
  })     
  
}
