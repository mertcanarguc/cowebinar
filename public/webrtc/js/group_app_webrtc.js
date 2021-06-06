

let voboWebRtcLoadFunction = () => {


    window.today = new Date();


    // VoboWebRtc Class Created
    var VoboWebRtc = new VoboWebRTC({
        localVideoEl: 'videoContainer',
        enableDataChannels: window.settings.enableDataChannels,
        autoRequestMedia: window.settings.autoRequestMedia,
        nick: window.settings,
        debug: true,
        autoAdjustMic: true,
        media: { audio: window.settings.media.audio, video:  window.settings.media.video  },
        server: {
            // signal: "localhost:3001",
            signal: "https://soruvecozum.com",
            dashboard: "",
            app: ""
        },
        ice: {
            iceServers: [{
                urls: [
                    "stun:stun.l.google.com:19302",
                    "stun:stun1.l.google.com:19302"
                ]
             }, {
                username: "euwF3pSnxG82BZbh-v_v-HA0AI64dU11pI8G7sEqA-OUxlA_rMmTFkvwY-gqD5LEAAAAAGCqD_VtZXJ0Y2FuYXJndWM=",
                credential: "877aab96-bb9f-11eb-9e93-0242ac140004",
                urls: [
                    "turn:eu-turn1.xirsys.com:80?transport=udp",
                    "turn:eu-turn1.xirsys.com:3478?transport=udp",
                    "turn:eu-turn1.xirsys.com:80?transport=tcp",
                    "turn:eu-turn1.xirsys.com:3478?transport=tcp",
                    "turns:eu-turn1.xirsys.com:443?transport=tcp",
                    "turns:eu-turn1.xirsys.com:5349?transport=tcp"
                ]
             }]
        },
    });

    window.voboWebRtc = VoboWebRtc;

// VoboWebRtc.mute();
// VoboWebRtc.unmute();
// VoboWebRtc.pause();
// VoboWebRtc.pauseVideo();

// VoboWebRtc.resumeVideo();
// VoboWebRtc.leaveRoom();
// VoboWebRtc.disconnect();
// VoboWebRtc.setVolumeForAll(volume 0 - 1);
// VoboWebRtc.stopLocalVideo();
// VoboWebRtc.getPeers(sessionId, type);
// VoboWebRtc.getPeersAll();
// VoboWebRtc.testReadiness();
// VoboWebRtc.startLocalVideo();
// VoboWebRtc.createRoom(name,callback);

    VoboWebRtc.on('connectionReady', function (sessionId) {



        let checkVal = () => {

            if(localStorage.getItem("joinRoom") != null){

                if(localStorage.getItem("joinRoom") === "true"){

                    var getPeers = VoboWebRtc.getPeersAll();

                    $(".viewerCounter").html(getPeers.length);


                    if(localStorage.getItem("screenControl") === "passive"){


                        if(getPeers.length === 1){
                            $(".in_coming_screen").addClass("in_coming_videoX1");
                            $(".in_coming_video").addClass("in_coming_videoX1");
                        }

                        if(getPeers.length > 1 && getPeers.length < 4){

                            $(".in_coming_screen").removeClass("in_coming_videoX1");
                            $(".in_coming_video").removeClass("in_coming_videoX1");

                        }

                        if(getPeers.length > 4){

                            $(".in_coming_screen").removeClass("in_coming_videoX1");
                            $(".in_coming_video").removeClass("in_coming_videoX1");

                            $(".in_coming_screen").addClass("in_coming_videoX2");
                            $(".in_coming_video").addClass("in_coming_videoX2");

                        }

                    }

                    if(localStorage.getItem("screenControl") === "active"){

                        if(getPeers.length === 1 ){

                            $(".in_coming_screen").addClass("in_coming_videoX1");
                            $(".in_coming_video").addClass("in_coming_videoX1");
                        }

                        if(getPeers.length >= 3 && getPeers.length <= 5){

                            $(".in_coming_screen").removeClass("in_coming_videoX1");
                            $(".in_coming_video").removeClass("in_coming_videoX1");
                        }

                        if(getPeers.length > 5){

                            $(".in_coming_screen").removeClass("in_coming_videoX1");
                            $(".in_coming_video").removeClass("in_coming_videoX1");

                            $(".in_coming_screen").addClass("in_coming_videoX2");
                            $(".in_coming_video").addClass("in_coming_videoX2");
                        }


                    }

                }

                if(localStorage.getItem("joinRoom") === "false"){

                    $(".watcherScreenVideo").hide();
                    $(".welcomeScreenVideo").show();

                }

                if(localStorage.getItem("joinRoom") === "true"){
                    if(getPeers.length === 0){
                        $(".watcherScreenVideo").show();
                        $(".welcomeScreenVideo").hide();
                    }

                    if(getPeers.length > 0){
                        $(".watcherScreenVideo").hide();
                        $(".welcomeScreenVideo").hide();
                    }

                }

            }

        };

        console.log("VIDEO",DetectRTC.videoInputDevices);
        console.log("AUDIO INPUT",DetectRTC.audioInputDevices);
        console.log("AUDIO OUTPUT",DetectRTC.audioOutputDevices);

        DetectRTC.videoInputDevices.forEach((videoDevice, index)=> {
            let isChecked = (index === 0 ? "cameraItemActive" : null);
            $(".cameraSettings").append(
                '<div class="cameraItem '+isChecked+'" data-id="'+videoDevice.id+'" data-groupId="'+videoDevice.groupId+'">' +
                '<img src="webrtc/svg/camera.svg"  alt="">' +
                '<span>'+videoDevice.label+'</span>' +
                '</div>'
            );
        });


        DetectRTC.audioInputDevices.forEach((audioDevice, index)=> {
            let isChecked = (index === 0 ? "microphoneItemActive" : null);
            $(".microphoneSettings").append(
                '<div class="microphoneItem '+isChecked+'" data-id="'+audioDevice.id+'" data-groupId="'+audioDevice.groupId+'">' +
                '<img src="webrtc/svg/microphone.svg"  alt="">' +
                '<span>'+audioDevice.label+'</span>' +
                '</div>'
            );
        });



        if(localStorage.getItem("cameraControl") == null || localStorage.getItem("cameraControl") == "passive"){
            $(".cameraControl > .status").removeClass("bgGreen");
            VoboWebRtc.pauseVideo();
        }else{
            $(".cameraControl > .status").addClass("bgGreen");
            VoboWebRtc.resumeVideo();
        }

        if(localStorage.getItem("microphoneControl") == null || localStorage.getItem("microphoneControl") == "passive"){
            $(".microphoneControl > .status").removeClass("bgGreen");
            VoboWebRtc.mute();
        }else{
            $(".microphoneControl > .status").addClass("bgGreen");
            VoboWebRtc.unmute();
        }


        if(localStorage.getItem("chatControl") == null || localStorage.getItem("chatControl") == "passive"){
            $(".chatControl > .status").removeClass("bgGreen");
        }else{
            $(".chatControl > .status").addClass("bgGreen");
        }



        VoboWebRtc.on('connectivityError', function (peer) {
            console.log(peer);
        });


        VoboWebRtc.on('iceFailed', function (peer) {
            console.log(peer);
        });

        VoboWebRtc.on('localStream', function (stream) {
            //var videoTracks = stream.getVideoTracks();
            //var  audioTracks = stream.getAudioTracks();

            //audioContext = new webkitAudioContext();
            //var audioContext = new AudioContext();
            //var analyser = audioContext.createAnalyser();
            //var microphone = audioContext.createMediaStreamSource(stream);
            //var javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

            //analyser.smoothingTimeConstant = 0.3;
            //analyser.fftSize = 1024;

            //microphone.connect(analyser);
            //analyser.connect(javascriptNode);
            //javascriptNode.connect(audioContext.destination);
            //var  canvasContext = document.getElementById("test");
            //canvasContext = canvasContext.getContext("2d");

            //javascriptNode.onaudioprocess = function() {
                //console.log('doing.... bla bla');
                //var array =  new Uint8Array(analyser.frequencyBinCount);
                //analyser.getByteFrequencyData(array);
                //var values = 0;

                //var length = array.length;
                //for (var i = 0; i < length; i++) {
                //   values += array[i];
                //}

                //var average = values / length;
                //canvasContext.clearRect(0, 0, 300, 130);
                //canvasContext.fillStyle = '#00ff00';
                //canvasContext.fillRect(0,130-average,300,130);
                //canvasContext.clearRect(0, 0, 300, 130);
                //canvasContext.fillStyle = '#00ff00';
                //canvasContext.fillRect(average,0,50,130);

            // };

        });




        // Görüşmeye Hazır Dinleyicisi
        VoboWebRtc.on('readyToCall', function () {


            $(document).on("click",".buttonLiveOn",function () {

                swal({
                    title: "UYARI",
                    text: "YAYINA GEÇMEYİ ONAYLIYOR MUSUNUZ?",
                    icon: "info",
                    buttons: {
                        cancel: "Hayır",
                        confirm: "Evet"
                    }
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            $('.timer').countimer("start");

                            VoboWebRtc.joinRoom(window.settings.roomId,()=>{

                                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"chat", {});
                                $(".welcomeScreenVideo").hide();
                                $(".watcherScreenVideo").show();
                                $(".screenControl").show();
                                localStorage.setItem("joinRoom",true);
                            });

                            $(".streamStatusButton").removeClass("buttonLiveOn");
                            $(".streamStatusButton").addClass("buttonLiveOff");
                            $(".streamStatusButton").html("GÖRÜŞMEDEN AYRIL");



                        }
                    });

            });

        });

        // Hata Dinleyicisi
        VoboWebRtc.on('localMediaError', function (err) {

            // Error Local Media Elements
            console.log(err);

        });



        setInterval(checkVal,1500);

        // Video Ekleme
        VoboWebRtc.on('videoAdded', function (video, peer) {

            if (peer && peer.pc) {

                if(peer.nick.userId !== window.settings.userId){

                    if(peer.type === "screen"){

                        $(".videoContainer").append("<div onclick='$(this).toggleFullScreen()' data-peer-screen='"+peer.id+"' class='in_coming_screen animate__fadeIn animate__animated'></div>");

                        $("[data-peer-screen="+peer.id+"]").append('<div class="users" style="background: linear-gradient(0deg, rgba('+hexToRgb(peer.nick.user.color).r+', '+hexToRgb(peer.nick.user.color).g+', '+hexToRgb(peer.nick.user.color).b+', 0.75) 37%, rgba(0, 212, 255, 0) 100%);"> <div class="avatarUser animate__animated animate__bounceIn"><img src="avatars/'+peer.nick.user.avatar+'.svg" height="53px" class="avatarView " alt="" style="background: #'+peer.nick.user.color+'"> </div> <div class="information "> <div class="fullName fullNameViewZz">'+peer.nick.user.fullName+'</div> <div class="eMail eMailViewZz">'+peer.nick.user.eMail+'</div> </div> </div>');

                        $("[data-peer-screen="+peer.id+"]").append(video);

                    }else{

                        $(".videoContainer").append("<div onclick='$(this).toggleFullScreen()' data-peer-video='"+peer.id+"' class='in_coming_video animate__fadeIn animate__animated'></div>");

                        $("[data-peer-video="+peer.id+"]").append('<div class="users" style="background: linear-gradient(0deg, rgba('+hexToRgb(peer.nick.user.color).r+', '+hexToRgb(peer.nick.user.color).g+', '+hexToRgb(peer.nick.user.color).b+', 0.75) 37%, rgba(0, 212, 255, 0) 100%);"> <div class="avatarUser animate__animated animate__bounceIn" ><img src="avatars/'+peer.nick.user.avatar+'.svg" height="53px" class="avatarView " alt="" style="background: #'+peer.nick.user.color+'"> </div> <div class="information "> <div class="fullName fullNameViewZz">'+peer.nick.user.fullName+'</div> <div class="eMail eMailViewZz">'+peer.nick.user.eMail+'</div> </div> </div>');

                        $("[data-peer-video="+peer.id+"]").append($(video).attr("playsinline",true).css("transform","rotateY(180deg)"));

                    }

                }

                // Add Item
                localStorage.setItem(peer.id+"_camera","passive");
                localStorage.setItem(peer.id+"_microphone","passive");

            }

        });




        VoboWebRtc.on('channelMessage', function (peer, label, data) {


            if(label === window.settings.roomId && data.type === "chat" ){


            }

        });


        // Biten Video Silme
        VoboWebRtc.on('videoRemoved', function (video, peer) {

            if (peer.pc.iceConnectionState === "closed") {

                $(video).remove();

                if(peer.type === "screen"){

                    $('[data-peer-screen=' + peer.id + ']').removeClass("animate__fadeIn animate__animated");
                    $('[data-peer-screen=' + peer.id + ']').addClass("animate__fadeIn animate__animated").remove();


                }else{
                    $('[data-peer-video=' + peer.id + ']').removeClass("animate__fadeIn animate__animated");
                    $('[data-peer-video=' + peer.id + ']').addClass("animate__fadeIn animate__animated").remove();


                }

                // Remove Item
                localStorage.removeItem(peer.id+"_camera");
                localStorage.removeItem(peer.id+"_microphone");

            }

        });


        // Kamera Kontrolü
        $(".cameraControl").click(function () {

            if(localStorage.getItem("cameraControl") === "active"){

                localStorage.setItem("cameraControl","passive");
                $(".cameraControl > .status").removeClass("bgGreen");
                VoboWebRtc.pauseVideo();

            }else if(localStorage.getItem("cameraControl") === "passive"){

                VoboWebRtc.resumeVideo();
                $(".cameraControl > .status").addClass("bgGreen");
                localStorage.setItem("cameraControl","active");

            }else{
                VoboWebRtc.pauseVideo();
                $(".cameraControl > .status").removeClass("bgGreen");
                localStorage.setItem("cameraControl","passive");
            }

        });


        // Mikrofon Kontrolü
        $(".microphoneControl").click(function () {

            if(localStorage.getItem("microphoneControl") === "active"){

                localStorage.setItem("microphoneControl","passive");
                $(".microphoneControl > .status").removeClass("bgGreen");
                VoboWebRtc.mute();

            }else if(localStorage.getItem("microphoneControl") === "passive"){

                VoboWebRtc.unmute();
                $(".microphoneControl > .status").addClass("bgGreen");
                localStorage.setItem("microphoneControl","active");

            }else{
                VoboWebRtc.mute();
                $(".microphoneControl > .status").removeClass("bgGreen");
                localStorage.setItem("microphoneControl","passive");
            }


        });


        // Sohbet Kontrolü
        $(".chatControl").click(function () {

            if(localStorage.getItem("chatControl") === "active"){

                localStorage.setItem("chatControl","passive");
                $(".chatControl > .status").removeClass("bgGreen");

            }else if(localStorage.getItem("chatControl") === "passive"){

                localStorage.setItem("chatControl","active");
                $(".chatControl > .status").addClass("bgGreen");

            }else{
                $(".chatControl > .status").removeClass("bgGreen");
                localStorage.setItem("chatControl","passive");

            }


        });


        // Ekran Paylaşım Kontrol Butonu
        $(".screenControl").click(function () {

            if (VoboWebRtc.getLocalScreen() !== undefined) {

                VoboWebRtc.stopScreenShare();

                $(".screenControl > .status").removeClass("bgGreen");
                $(".screenWarning").hide();
                $(".screenControl").show();

                localStorage.setItem("screenControl","passive");

            }else{

                VoboWebRtc.shareScreen({
                    video: {
                        cursor: "always"
                    },
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        sampleRate: 44100
                    }
                },(err)=>{

                    if(err){

                        $(".screenControl > .status").removeClass("bgGreen");
                        $(".screenWarning").hide();
                        $(".screenControl").show();
                        localStorage.setItem("screenControl","passive");

                    }else{
                        $(".screenControl > .status").addClass("bgGreen");
                        $(".screenWarning").show();
                        $(".screenControl").hide();
                        localStorage.setItem("screenControl","active");

                    }

                });

            }

        });


        // Ekran yayın props kontrolü
        VoboWebRtc.on('localScreenStopped', function (video, peer) {

            VoboWebRtc.stopScreenShare();

            $(".screenWarning").hide();
            $(".screenControl").show();

            $(".screenControl > .status").removeClass("bgGreen");

            localStorage.setItem("screenControl","passive");


        });


        // Yayın Kapatma
        $(document).on("click",".buttonLiveOff",function () {

            swal({
                title: "UYARI",
                text: "YAYIN KAPATMA İŞLEMİNİ ONAYLIYOR MUSUNUZ?",
                icon: "warning",
                buttons: {
                    cancel: "Hayır",
                    confirm: "Evet"
                }
            })
                .then((willDelete) => {
                    if (willDelete) {

                        $(".streamStatusButton").addClass("buttonLiveOn");
                        $(".streamStatusButton").removeClass("buttonLiveOff");
                        $(".streamStatusButton").html("GÖRÜŞMEYE KATIL");
                        $('.timer').countimer("stop");
                        VoboWebRtc.leaveRoom();
                        $(".welcomeScreenVideo").show();
                        $(".watcherScreenVideo").hide();
                        $(".screenControl").hide();
                        localStorage.setItem("joinRoom",false);

                    }
                });

        });

        // Yayın Kapatma
        $(document).on("click",".cameraItem",function () {

            VoboWebRtc.stopLocalVideo();
            VoboWebRtc.config.media.video = {
                optional: [{sourceId: $(this).data("id") }],
                width: 960,
                height: 600,
                frameRate: {
                    ideal: 30,
                    min: 10
                }
            };
            VoboWebRtc.startLocalVideo();

            $(".cameraItem").removeClass("cameraItemActive");
            $(this).addClass("cameraItemActive");

        });

        // Yayın Kapatma
        $(document).on("click",".microphoneItem",function () {

            VoboWebRtc.stopLocalVideo();
            VoboWebRtc.config.media.audio = {
                optional: [{sourceId: $(this).data("id") }]
            };
            VoboWebRtc.startLocalVideo();

            $(".microphoneItem").removeClass("microphoneItemActive");
            $(this).addClass("microphoneItemActive");

        });



        // Yayın Kapatma
        $(document).on("click",".remoteWatcherCamera",function () {


            if($(this).attr("status") === undefined){

                $(this).attr("status","active");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "camera_active",
                    audience: $(this).data("user")
                });

                $(this).css("background","#2dda2e");

            }else if($(this).attr("status") === "active"){

                $(this).attr("status","passive");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "camera_passive",
                    audience: $(this).data("user")
                });

                $(this).css("background","#ff2905");

            }else if($(this).attr("status") === "passive"){

                $(this).attr("status","active");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "camera_active",
                    audience: $(this).data("user")
                });

                $(this).css("background","#2dda2e");

            }

        });

        // Yayın Kapatma
        $(document).on("click",".remoteWatcherMicrophone",function () {


            if($(this).attr("status") === undefined){

                $(this).attr("status","active");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "microphone_active",
                    audience: $(this).data("user")
                });

                $(this).css("background","#2dda2e");

            }else if($(this).attr("status") === "active"){

                $(this).attr("status","passive");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "microphone_passive",
                    audience: $(this).data("user")
                });

                $(this).css("background","#ff2905");

            }else if($(this).attr("status") === "passive"){

                $(this).attr("status","active");

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId,"remote", {
                    cmd: "microphone_active",
                    audience: $(this).data("user")
                });

                $(this).css("background","#2dda2e");

            }



        });



    });


    $(document).bind("contextmenu",function(ev){
        if(ev.target.nodeName=='VIDEO') return false;
    });


};

document.addEventListener("DOMContentLoaded", () => {


    DetectRTC.load(function () {

        if(
            (
                DetectRTC.isRTPSenderReplaceTracksSupported
                &&  DetectRTC.isScreenCapturingSupported
                &&  DetectRTC.isSctpDataChannelsSupported
                &&  DetectRTC.isAudioContextSupported
                &&  DetectRTC.isWebRTCSupported
                &&  DetectRTC.isWebSocketsSupported
                &&  !DetectRTC.isWebSocketsBlocked
                &&  (DetectRTC.browser.isChrome || DetectRTC.browser.isFirefox)
                &&  DetectRTC.isVideoSupportsStreamCapturing
            )
        ){

            if( DetectRTC.isWebsiteHasWebcamPermissions && DetectRTC.isWebsiteHasMicrophonePermissions){

                $(".appContainerAll").show();

                return voboWebRtcLoadFunction();

            }else{


                $(".checkPermission").show();

                $(".getPermission").click(function () {

                    navigator.getUserMedia (window.settings.media,
                        function() {
                            $(".appContainerAll").show();
                            $(".checkPermission").hide();
                            return voboWebRtcLoadFunction();
                        },
                        function(err) {
                            if(err) {
                                $(".checkPermission").show();

                            }
                        }
                    );

                });
            }

        }else{
            $(".checkPermission").hide();
            $(".errorDevices").show();

        }

    });

});
