window.voboWebRtcLoadFunction = (uV, cV) => {

    window.today = new Date();

    // VoboWebRtc Class Created
    var VoboWebRtc = new VoboWebRTC({
        localVideoEl: 'videoContainer',
        enableDataChannels: window.settings.enableDataChannels,
        autoRequestMedia: window.settings.autoRequestMedia,
        nick: window.settings,
        debug: window.settings.debug,
        autoAdjustMic: true,
        media: { audio: window.settings.media.audio, video: window.settings.media.video ? { width: 630, height: 320 } : false },
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


        console.log("VIDEO", DetectRTC.videoInputDevices);
        console.log("AUDIO INPUT", DetectRTC.audioInputDevices);
        console.log("AUDIO OUTPUT", DetectRTC.audioOutputDevices);

        DetectRTC.videoInputDevices.forEach((videoDevice, index) => {
            let isChecked = (index === 0 ? "cameraItemActive" : null);
            $(".cameraSettings").append(
                '<div class="cameraItem ' + isChecked + '" data-id="' + videoDevice.id + '" data-groupId="' + videoDevice.groupId + '">' +
                '<img src="webrtc/svg/camera.svg"  alt="">' +
                '<span>' + videoDevice.label + '</span>' +
                '</div>'
            );
        });


        DetectRTC.audioInputDevices.forEach((audioDevice, index) => {
            let isChecked = (index === 0 ? "microphoneItemActive" : null);
            $(".microphoneSettings").append(
                '<div class="microphoneItem ' + isChecked + '" data-id="' + audioDevice.id + '" data-groupId="' + audioDevice.groupId + '">' +
                '<img src="webrtc/svg/microphone.svg"  alt="">' +
                '<span>' + audioDevice.label + '</span>' +
                '</div>'
            );
        });


        if (localStorage.getItem("cameraControl") == null || localStorage.getItem("cameraControl") == "passive") {
            $(".cameraControl > .status").removeClass("bgGreen");
            VoboWebRtc.pauseVideo();
        } else {
            $(".cameraControl > .status").addClass("bgGreen");
            VoboWebRtc.resumeVideo();
        }

        if (localStorage.getItem("microphoneControl") == null || localStorage.getItem("microphoneControl") == "passive") {
            $(".microphoneControl > .status").removeClass("bgGreen");
            VoboWebRtc.mute();
        } else {
            $(".microphoneControl > .status").addClass("bgGreen");
            VoboWebRtc.unmute();
        }


        if (localStorage.getItem("chatControl") == null || localStorage.getItem("chatControl") == "passive") {
            $(".chatControl > .status").removeClass("bgGreen");
        } else {
            $(".chatControl > .status").addClass("bgGreen");
        }

        // GÃ¶rÃ¼ÅŸmeye HazÄ±r Dinleyicisi
        VoboWebRtc.on('readyToCall', function () {


            $(document).on("click", ".buttonLiveOn", function () {

                swal({
                    title: "UYARI",
                    text: "YAYINA GECMEYİ ONAYLIYOR MUSUNUZ?",
                    icon: "info",
                    buttons: {
                        cancel: "Hayır",
                        confirm: "Evet"
                    }
                })
                    .then((willDelete) => {
                        if (willDelete) {

                            VoboWebRtc.joinRoom(window.settings.roomId, () => {
                                VoboWebRtc.sendDirectlyToAll(window.settings.roomId, "chat", {});
                            });

                            $(".chatPanelUsers").show();
                            $(".streamStatusButton").removeClass("buttonLiveOn");
                            $(".streamStatusButton").addClass("buttonLiveOff");
                            $(".streamStatusButton").html("GÃ–RÃœÅMEDEN AYRIL");


                        }
                    });

            });

        });

        // Hata Dinleyicisi
        VoboWebRtc.on('localMediaError', function (err) {

            // Error Local Media Elements
            // console.log(err);

        });


        VoboWebRtc.on('videoAdded', function (video, peer) {

            if (peer && peer.pc) {

                console.log(peer);
                if (peer.nick.broadcaster === true) {

                    if (peer.type === "video") {
                        $(".streamManager").append($(video).addClass("manager_" + peer.type).css("transform", "rotateY(180deg)").attr("playsinline", true));
                    }

                    if (peer.type === "screen") {
                        $(".streamManager").append($(video).addClass("manager_" + peer.type).attr("playsinline", true));
                    }

                }

                $(".noWatcher").hide();
                // Add Item
                localStorage.setItem(peer.id + "_camera", "passive");
                localStorage.setItem(peer.id + "_microphone", "passive");

            }

        });


        setInterval(() => {

            $(".viewerCounter").html(VoboWebRtc.getPeersAll().length);

            if (VoboWebRtc.getPeersAll().length === 0) {
                $(".audienceListDiv").html(" <div class='noWatcher' > KATILIMCI BULUNAMADI </div> ");
            }

        }, 1000);


        $('textarea').bind("enterKey", function (e) {

            if ($(this).val().length > 0) {

                let message = $("textarea").val().replace("\n", "").replace(/(<([^>]+)>)/ig, "");

                let payload = {
                    settings: {
                        roomId: window.settings.roomId,
                        userId: window.settings.userId
                    },
                    user: {
                        fullName: window.settings.user.fullName,
                        eMail: window.settings.user.eMail,
                        color: window.settings.user.color,
                        avatar: window.settings.user.avatar
                    },
                    content: Linkify(message),
                    time: new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds()
                };

                VoboWebRtc.sendDirectlyToAll(window.settings.roomId, "chat", payload);

                $(".chatHisory").append(
                    '<div class="chatItem">' +
                    '<span class="chatLeftIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span>' +
                    '<p class="chatMessage">' + payload.content + '</p>' +
                    '<div class="chatOwnerAndInfo">' + payload.user.fullName + ' | ' + payload.time + '</div>' +
                    '</div>'
                );

                $(this).val("");

            }

        });

        VoboWebRtc.on('channelMessage', function (peer, label, data) {


            if (label === window.settings.roomId && data.type === "chat") {

                $(".chatHisory").append(
                    '<div class="chatItem">' +
                    '<span class="chatLeftIcon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 13" width="8" height="13"><path opacity=".13" fill="#0000000" d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z"></path><path fill="currentColor" d="M1.533 2.568L8 11.193V0H2.812C1.042 0 .474 1.156 1.533 2.568z"></path></svg></span>' +
                    '<p class="chatMessage">' + (data.payload.content) + '</p>' +
                    '<div class="chatOwnerAndInfo">' + data.payload.user.fullName + ' | ' + data.payload.time + '</div>' +
                    '</div>'
                );


            }


            if (label === window.settings.roomId && data.type === "remote") {


                if (data.payload.cmd === "camera_passive" && data.payload.audience === window.settings.userId) {

                    VoboWebRtc.pauseVideo();

                    $(".cameraControl > .status").removeClass("bgGreen");

                } else if (data.payload.cmd === "camera_active" && data.payload.audience === window.settings.userId) {

                    VoboWebRtc.resumeVideo();

                    $(".cameraControl > .status").addClass("bgGreen");

                } else if (data.payload.cmd === "microphone_active" && data.payload.audience === window.settings.userId) {

                    VoboWebRtc.unmute();

                    $(".microphoneControl > .status").addClass("bgGreen");

                } else if (data.payload.cmd === "microphone_passive" && data.payload.audience === window.settings.userId) {

                    VoboWebRtc.mute();

                    $(".microphoneControl > .status").removeClass("bgGreen");

                }

            }


        });


        // Biten Video Silme
        VoboWebRtc.on('videoRemoved', function (video, peer) {

            if (peer.pc.iceConnectionState === "closed") {

                $(video).remove();
                $('#list_' + peer.id).remove();
                $('#guest_' + VoboWebRtc.getDomId(peer)).remove();


                // Remove Item
                localStorage.removeItem(peer.id + "_camera");
                localStorage.removeItem(peer.id + "_microphone");

            }

        });



        // Kamera KontrolÃ¼
        $(".cameraControl").click(function () {

            if (localStorage.getItem("cameraControl") === "active") {

                localStorage.setItem("cameraControl", "passive");
                $(".cameraControl > .status").removeClass("bgGreen");
                VoboWebRtc.pauseVideo();

            } else if (localStorage.getItem("cameraControl") === "passive") {

                VoboWebRtc.resumeVideo();
                $(".cameraControl > .status").addClass("bgGreen");
                localStorage.setItem("cameraControl", "active");

            } else {
                VoboWebRtc.pauseVideo();
                $(".cameraControl > .status").removeClass("bgGreen");
                localStorage.setItem("cameraControl", "passive");
            }

        });

        // Mikrofon KontrolÃ¼
        $(".microphoneControl").click(function () {

            if (localStorage.getItem("microphoneControl") === "active") {

                localStorage.setItem("microphoneControl", "passive");
                $(".microphoneControl > .status").removeClass("bgGreen");
                VoboWebRtc.mute();

            } else if (localStorage.getItem("microphoneControl") === "passive") {

                VoboWebRtc.unmute();
                $(".microphoneControl > .status").addClass("bgGreen");
                localStorage.setItem("microphoneControl", "active");

            } else {
                VoboWebRtc.mute();
                $(".microphoneControl > .status").removeClass("bgGreen");
                localStorage.setItem("microphoneControl", "passive");
            }


        });

        // Sohbet KontrolÃ¼
        $(".chatControl").click(function () {

            if (localStorage.getItem("chatControl") === "active") {

                localStorage.setItem("chatControl", "passive");
                $(".chatControl > .status").removeClass("bgGreen");

            } else if (localStorage.getItem("chatControl") === "passive") {

                localStorage.setItem("chatControl", "active");
                $(".chatControl > .status").addClass("bgGreen");

            } else {
                $(".chatControl > .status").removeClass("bgGreen");
                localStorage.setItem("chatControl", "passive");

            }


        });


        // Ekran PaylaÅŸÄ±m Kontrol Butonu
        $(".screenControl").click(function () {

            if (VoboWebRtc.getLocalScreen() !== undefined) {

                VoboWebRtc.stopScreenShare();

                $(".screenControl > .status").removeClass("bgGreen");
                $(".screenWarning").hide();

            } else {

                VoboWebRtc.shareScreen((err) => {

                    if (err) {
                        $(".screenControl > .status").removeClass("bgGreen");
                        $(".screenWarning").hide();
                    } else {
                        $(".screenControl > .status").addClass("bgGreen");
                        $(".screenWarning").show();
                    }

                });

            }

        });


        // Ekran yayÄ±n props kontrolÃ¼
        VoboWebRtc.on('localScreenStopped', function (video, peer) {

            VoboWebRtc.stopScreenShare();

            $(".screenWarning").hide();

            $(".screenControl > .status").removeClass("bgGreen");

        });


        // YayÄ±n Kapatma
        $(document).on("click", ".buttonLiveOff", function () {

            swal({
                title: "UYARI",
                text: "YAYIN KAPATMA İŞLEMİNİ ONAYLIYOR MUSUNUZ?",
                icon: "warning",
                buttons: {
                    cancel: "HayÄ±r",
                    confirm: "Evet"
                }
            })
                .then((willDelete) => {
                    if (willDelete) {


                        $(".streamStatusButton").addClass("buttonLiveOn");
                        $(".streamStatusButton").removeClass("buttonLiveOff");
                        $(".streamStatusButton").html("YAYINI BAÅLAT");
                        $('.timer').countimer("stop");
                        $(".chatPanelUsers").hide();
                        VoboWebRtc.leaveRoom();

                    }
                });

        });

        // YayÄ±n Kapatma
        $(document).on("click", ".cameraItem", function () {


            if (DetectRTC.videoInputDevices.length > 0) {

                VoboWebRtc.stopLocalVideo();
                VoboWebRtc.config.media.video = {
                    optional: [{ sourceId: $(this).data("id") }]
                };
                VoboWebRtc.startLocalVideo();

                $(".cameraItem").removeClass("cameraItemActive");

                $(this).addClass("cameraItemActive");

            } else {
                alert("kamera bulunamadÄ±");
            }

        });

        // YayÄ±n Kapatma
        $(document).on("click", ".microphoneItem", function () {

            if (DetectRTC.audioInputDevices.length > 0) {


                VoboWebRtc.stopLocalVideo();
                VoboWebRtc.config.media.audio = {
                    optional: [{ sourceId: $(this).data("id") }]
                };
                VoboWebRtc.startLocalVideo();

                $(".microphoneItem").removeClass("microphoneItemActive");
                $(this).addClass("microphoneItemActive");


            } else {
                alert("Mikrofon BulunamadÄ±");
            }

        });


        setInterval(() => {

            if ($(".streamManager > video").length === 1) {

                $(".manager_video").removeClass("manager_videoWithScreen");

            }

            if ($(".streamManager > video").length === 2) {
                $(".manager_video").addClass("manager_videoWithScreen");
            }

        }, 500);


    });


    $(document).bind("contextmenu", function (ev) {
        if (ev.target.nodeName == 'VIDEO') {
            return false;
        }
    });

};


document.addEventListener("DOMContentLoaded", () => {


    DetectRTC.load(function () {

        if (
            (
                DetectRTC.isRTPSenderReplaceTracksSupported
                && DetectRTC.isScreenCapturingSupported
                && DetectRTC.isSctpDataChannelsSupported
                && DetectRTC.isWebRTCSupported
                && DetectRTC.isWebSocketsSupported
                && !DetectRTC.isWebSocketsBlockedw
                && (DetectRTC.browser.isChrome || DetectRTC.browser.isFirefox)
            )
        ) {

            $(".appContainerAll").show();

            $.ajax({
                url: "https://beta.vobo.cloud/api/coturn/password",
                async: false,
                type: "post",
                dataType: 'json',
                success: function (json) {

                    $(".appContainerAll").show();
                    $(".checkPermission").hide();

                    window.voboWebRtcLoadFunction(json.data.username, json.data.password);

                }
            });


        } else {
            $(".checkPermission").hide();
            $(".errorDevices").show();

        }

    });


});

