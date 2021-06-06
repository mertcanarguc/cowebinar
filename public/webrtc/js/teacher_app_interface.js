$(function () {


    $(".tabItemSettings").click(function () {

        let getId = $(this).data("id");

        $(".tabItemSettings").removeClass("tabActive");
        $(this).addClass("tabActive");

        $(".tabContentSettings").hide();
        $("#"+getId).show();

    });

    $(".popupClose").click(function () {

        $(".popupSettingsStatus").hide();

    });

    $(".settingsButton").click(function () {

        $(".popupSettingsStatus").show();

    });

    $(".color").click(function () {

        $(".color").removeClass("colorActive");
        $(this).addClass("colorActive");

        $(".avatarView").css("background", $(this).css("background") );

        localStorage.setItem("color",$(this).data("color"));

    });

    $(".avatar").click(function () {

        $(".avatar").removeClass("avatarActive");
        $(this).addClass("avatarActive");

        window.settings.user.avatar = $(this).data("avatar");

        $(".avatarView").attr("src","avatars/"+window.settings.user.avatar+'.svg');

        localStorage.setItem("avatar",$(this).data("avatar"));

    });


    window.setInterval(function() {

        let elem        = document.getElementById('chat');
        elem.scrollTop  = elem.scrollHeight;

    }, 1000);

    $('textarea').keyup(function(e){
        if(e.keyCode == 13) {
            $(this).trigger("enterKey");
        }
    });


    $('.timer').countimer({
        autoStart : false
    });

    if(window.settings.user.fullName.length > 2 && window.settings.user.eMail.length > 2){

        $(".fullName").html(window.settings.user.fullName);
        $(".eMail").html(window.settings.user.eMail);
        $(".avatarView").attr("src","avatars/"+window.settings.user.avatar+'.svg');
        $(".avatarView").css("background", window.settings.user.color );

        $(".fullNameInput").val(window.settings.user.fullName);
        $(".eMailInput").val(window.settings.user.eMail);

    }else{

        $(".userProfileShowPanel").hide();
        $(".fullName").html("Kullanıcı bulunamadı");
        $(".eMail").html("Kullanıcı bulunamadı.");
        $(".avatarView").attr("src","avatars/"+window.settings.user.avatar+'.svg');
        $(".avatarView").css("background", window.settings.user.color );

    }


    $(".avatar").removeClass("avatarActive");
    $("[data-avatar="+window.settings.user.avatar+"]").addClass("avatarActive");

    $(".color").removeClass("colorActive");
    $("[data-color="+(window.settings.user.color.replace('#',''))+"]").addClass("colorActive");

    $(".fullNameInput").keyup(function () {

        localStorage.setItem("fullName",$(".fullNameInput").val());
        $(".fullNameViewZz").html($(".fullNameInput").val());


    });

    $(".eMailInput").keyup(function () {

        localStorage.setItem("eMail",$(".eMailInput").val());

        $(".eMailViewZz").html($(".eMailInput").val());

    });


    if(window.settings.user.editable === false){

        $(".eMailInput").attr("disabled",true);
        $(".fullNameInput").attr("disabled",true);

    }

    document.addEventListener("fullscreenchange", function(s) {

        if (document.webkitIsFullScreen === false) {

            if($(s.target).attr("class") === "players"){
                $(".toggleFullScreenLogo").hide();
            }

            if($(s.target).attr("class") === "avatarAudience"){
                $(".userVideoFull").hide();
            }


        }  else if (document.mozFullScreen === false) {

            if($(s.target).attr("class") === "players"){
                $(".toggleFullScreenLogo").hide();
            }

            if($(s.target).attr("class") === "avatarAudience"){
                $(".userVideoFull").hide();
            }

        } else if (document.msFullscreenElement === false) {

            if($(s.target).attr("class") === "players"){
                $(".toggleFullScreenLogo").hide();
            }

            if($(s.target).attr("class") === "avatarAudience"){
                $(".userVideoFull").hide();
            }

        }


        console.log("XXXXX",$(s.target).attr("class"));

    });


    $(".toggleFullScreen").click(function () {
        $(".players").toggleFullScreen();
        $(".toggleFullScreenLogo").show();
    });


    $(document).on("click",".avatarAudience",function () {
        console.log($(this).data("id"));
        $(".avatarAudience[data-id="+$(this).data("id")+"]").toggleFullScreen();
        $(".avatarAudience[data-id="+$(this).data("id")+"] > .userVideoFull").show();

    });

});

