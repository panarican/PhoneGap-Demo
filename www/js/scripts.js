// Camera

function takePhoto() {
    navigator.camera.getPicture(function(data) {
        $("img.capture").attr('src', 'data:image/jpeg;base64,'+data).css('visibility','visible'); 
    }, function(error) {
        console.log('Camera Failed');
    }, {
        quality : 75, 
        destinationType : Camera.DestinationType.DATA_URL, 
        sourceType : Camera.PictureSourceType.CAMERA, 
        allowEdit : true,
        targetWidth: 300,
        targetHeight: 300
    });
}
                                
function fromLibrary() {
    navigator.camera.getPicture(function(data) {
       $("img.capture").attr('src', 'data:image/jpeg;base64,'+data).css('visibility','visible'); 
    }, function(error) {
        console.log('Camera Failed');
    }, {
        quality : 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
        allowEdit : true,
        targetWidth: 300,
        targetHeight: 300
    });
                            
}

// Device

function deviceInfo() {
    $("#deviceName").val(device.name);
    $("#devicePhoneGap").val(device.phonegap);
    $("#devicePlatform").val(device.platform);
    $("#deviceUUID").val(device.uuid);
    $("#deviceVersion").val(device.version);
}

// Accelerometer

function accelerometerInfo() {
    
function onSuccessAcceleration(acceleration) {
    
    var xDeg = acceleration.x * 90; 
    var yDeg = acceleration.y * 90;
    var zDeg = acceleration.z * 90;
    
    $("#accelerationX").val(xDeg);
    $("#accelerationY").val(yDeg);
    $("#accelerationZ").val(zDeg);
$(".translate3d").attr('style','-webkit-transform: translate3d(0px,-30px,0px) rotateX('+yDeg+'deg) rotateY('+xDeg+'deg) rotateZ(0deg) scale(.7);');
    
};

function onErrorAcceleration() {
    alert('oh no your phone blew up!');
};

var optionsAcceleration = { frequency: 100 };

var watchID = navigator.accelerometer.watchAcceleration(onSuccessAcceleration, onErrorAcceleration, optionsAcceleration);
}

// Geolocation

function geolocationInfo() {

var onSuccessGeolocation = function(position) {
    
    $("#latitude").val(position.coords.latitude);
    $("#longitude").val(position.coords.longitude);
    $("#speed").val(position.coords.speed);
    
};

function onErrorGeolocation(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

navigator.geolocation.watchPosition(onSuccessGeolocation, onErrorGeolocation);

}

// Check Connection

function checkConnection() {
    
    var networkState = navigator.network.connection.type;
    
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.NONE]     = 'No network connection';
    
    
    $("#connection div[data-role='content'] p").empty().append(states[networkState]);
    
    // Cool Notification Vibration
    navigator.notification.vibrate(1500);
}

// Media

function mediaInfo() {
       
    //$("#startRec").bind('touchstart', recordAudio);
    
    $(".playAudio").bind('touchstart', playAudio);   


   // Play audio
    
    function playAudio() {
        var src = "audio.wav";
        var mediaPlay = new Media(src, onSuccess, onError);
               
        // Play Audio
        mediaPlay.play();  

    }
    
    // Record audio

    function recordAudio() {
        var src = "audio.wav";
        var mediaRec = new Media(src, onSuccess, onError);
        
        // Record audio
        mediaRec.startRecord();
        
        // Stop recording after 5 sec
        var recTime = 0;
        var recInterval = setInterval(function() {
          recTime = recTime + 1;
          //setAudioPosition(recTime + " sec");
          if (recTime >= 5) {
          clearInterval(recInterval);
          mediaRec.stopRecord();
          //mediaRec.play();
          }
          }, 1000);
    }
    
    
    // onSuccess Callback
    function onSuccess() {
        console.log("recordAudio():Audio Success");
    }
    
    // onError Callback 
    function onError(error) {
        alert('code: '    + error.code    + '\n' + 
              'message: ' + error.message + '\n');
    }
    
    
    
}


// init

function init() {
    
    // Change Default Configuration for Jquery Mobile 
    $.mobile.page.prototype.options.addBackBtn = true;
    $.mobile.page.prototype.options.domCache = false;
    $.mobile.touchOverflowEnabled = false;
    $.mobile.fixedToolbars.show(false);
    $.mobile.fixedToolbars.setTouchToggleEnabled(false);
    
    $(document).bind('deviceready', function(){
        $.mobile.page.prototype.options.allowCrossDomainPages = true;
        $.support.cors = true;
                     
        // Camera Events
        $(".takePhoto").bind('touchstart', takePhoto);
        $(".fromLibrary").bind('touchstart', fromLibrary);
                     
        // Device Call
        deviceInfo();
                     
        // Accelerometer Call
        accelerometerInfo();
                     
        // Geolocation Call
        geolocationInfo();
        
        // Connection Event             
        $(".checkConnection").bind('touchstart', checkConnection);
                     
        // Media Call
        mediaInfo();                               
                     
    });
}

// run code

$(document).bind("mobileinit", init);

