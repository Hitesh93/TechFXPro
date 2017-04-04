jQuery.fn.buildCounter = function(settings) {
    
    var glob = {
        element  : this,
        settings : settings
    };
    
    if (typeof glob.settings.unique === "undefined") {
        glob.settings.unique = "countdown-instance-id-" + Math.floor((Math.random()*10000)+1);
    }
    
    
    glob.settings.now       = typeof glob.settings.now_timestamp !== "undefined" && glob.settings.now_timestamp !== "" ? glob.settings.now_timestamp : Math.floor(new Date()) / 1000;
    glob.settings.startdate = typeof glob.settings.stardate_timestamp !== "undefined" && glob.settings.stardate_timestamp !== "" ? glob.settings.stardate_timestamp : Math.floor(new Date(glob.settings.startdate)) / 1000;
    glob.settings.enddate   = typeof glob.settings.enddate_timestamp !== "undefined" && glob.settings.enddate_timestamp !== "" ? glob.settings.enddate_timestamp : Math.floor(new Date(glob.settings.enddate))   / 1000;
    
    /* Defaults */
   



    var HTML = '<div class="countitround" id="'+glob.settings.unique+'">';
        
        if (glob.settings.layout.indexOf("d") !== -1) {
            HTML += '<div class="countitround_days"> '                   +
                        '<canvas class="canvas_background"></canvas>'    +
                        '<canvas class="canvas_days"></canvas>'          +
                        '<div class="countitround_days_count">0</div>'   +
                        '<div class="countitround_days_text">days</div>' +
                    '</div>';
        };

        if (glob.settings.layout.indexOf("h") !== -1) {
            HTML += '<div class="countitround_hours">'+
                        '<canvas class="canvas_background"></canvas>'+
                        '<canvas class="canvas_hours"></canvas>'+
                        '<div class="countitround_hours_count">0</div>'+
                        '<div class="countitround_hours_text">hours</div>'+
                    '</div>';
        };

        if (glob.settings.layout.indexOf("m") !== -1) {
            HTML += '<div class="countitround_minutes">'+
                        '<canvas class="canvas_background"></canvas>'+
                        '<canvas class="canvas_minutes"></canvas>'+
                        '<div class="countitround_minutes_count">0</div>'+
                        '<div class="countitround_minutes_text">minutes</div>'+
                    '</div>';
        };

        if (glob.settings.layout.indexOf("s") !== -1) {
            HTML += '<div class="countitround_seconds">'+
                        '<canvas class="canvas_background"></canvas>'+
                        '<canvas class="canvas_seconds"></canvas>'+
                        '<div class="countitround_seconds_count">0</div>'+
                        '<div class="countitround_seconds_text">seconds</div>'+
                    '</div>';
        };
        
    HTML += '</div>';
    
    jQuery(HTML).appendTo(glob.element);
    
    jQuery("#"+glob.settings.unique).find(".countitround_days").css({
        width: glob.settings.size1,
        height: glob.settings.size1
    });
    
    jQuery("#"+glob.settings.unique).find(".countitround_hours").css({
        width: glob.settings.size2,
        height: glob.settings.size2
    });
    
    jQuery("#"+glob.settings.unique).find(".countitround_minutes").css({
        width: glob.settings.size3,
        height: glob.settings.size3
    });
        
    jQuery("#"+glob.settings.unique).find(".countitround_seconds").css({
        width: glob.settings.size4,
        height: glob.settings.size4
    });
                
    jQuery("#"+glob.settings.unique).find(".countitround_days_count").css({
        width: glob.settings.size1,
        height: glob.settings.size1,
        lineHeight: Number(glob.settings.size1) - Number(glob.settings.textsize1) + "px",
        fontSize: glob.settings.countsize1 + "px",
        color: glob.settings.countcolor1 
    });
        
    jQuery("#"+glob.settings.unique).find(".countitround_hours_count").css({
        width: glob.settings.size2,
        height: glob.settings.size2,
        lineHeight: Number(glob.settings.size2) - Number(glob.settings.textsize2) + "px",
        fontSize: glob.settings.countsize2 + "px",
        color: glob.settings.countcolor2 
    });
   
    jQuery("#"+glob.settings.unique).find(".countitround_minutes_count").css({
        width: glob.settings.size3,
        height: glob.settings.size3,
        lineHeight: Number(glob.settings.size3) - Number(glob.settings.textsize3) + "px",
        fontSize: glob.settings.countsize3 + "px",
        color: glob.settings.countcolor3 
    });
   
    jQuery("#"+glob.settings.unique).find(".countitround_seconds_count").css({
        width: glob.settings.size4,
        height: glob.settings.size4,
        lineHeight: Number(glob.settings.size4) - Number(glob.settings.textsize4) + "px",
        fontSize: glob.settings.countsize4 + "px",
        color: glob.settings.countcolor4 
    });
   
    jQuery("#"+glob.settings.unique).find(".countitround_days_text").css({
        width: glob.settings.size1,
        height: glob.settings.size1,
        lineHeight: Number(glob.settings.size1) + Number(glob.settings.countsize1) + "px",
        fontSize: glob.settings.textsize1 + "px",
        color: glob.settings.textcolor1 
    });
   
    jQuery("#"+glob.settings.unique).find(".countitround_hours_text").css({
        width: glob.settings.size2,
        height: glob.settings.size2,
        lineHeight: Number(glob.settings.size2) + Number(glob.settings.countsize2) + "px",
        fontSize: glob.settings.textsize2 + "px",
        color: glob.settings.textcolor2 
    });
    
    jQuery("#"+glob.settings.unique).find(".countitround_minutes_text").css({
        width: glob.settings.size3,
        height: glob.settings.size3,
        lineHeight: Number(glob.settings.size3) + Number(glob.settings.countsize3) + "px",
        fontSize: glob.settings.textsize3 + "px",
        color: glob.settings.textcolor3 
    });
    
    jQuery("#"+glob.settings.unique).find(".countitround_seconds_text").css({
        width: glob.settings.size4,
        height: glob.settings.size4,
        lineHeight: Number(glob.settings.size4) + Number(glob.settings.countsize4) + "px",
        fontSize: glob.settings.textsize4 + "px",
        color: glob.settings.textcolor4 
    });
    
    if (typeof countitroundinstance === "undefined") {
        var countitroundinstance = [];
    }
    
    new countitround().init(glob.settings);
};

function countitround() {
    var glob = {
        deg: function(deg){
            return (Math.PI/180)*deg - (Math.PI/180)*90;
        },
        size: {
            x : function(i){
                return (glob.settings["size"+i] / 2);
            },
            y : function(i){
                return (glob.settings["size"+i] / 2);
            },
            z : function(i){
                return (glob.settings["size"+i] / 2 - (Number(glob.settings["backgroundwidth"+i]) > Number(glob.settings["frontwidth"+i]) ? glob.settings["backgroundwidth"+i] : glob.settings["frontwidth"+i]) / 2 - glob.settings["glowwidth"+i]);
            }
        },
        complete: function(){
            glob.settings.callback.call();
            return;
        }
    };
    
    this.init = function(settings) {
        glob.settings = settings;
        
        if (glob.settings.now >= glob.settings.enddate) {
            glob.complete();
            return;
        }
        
        glob.total    =      Math.floor((glob.settings.enddate - glob.settings.startdate)/86400);
        glob.days     =      Math.floor((glob.settings.enddate - glob.settings.now)/86400);
        glob.hours    = 24 - Math.floor((glob.settings.enddate - glob.settings.now)%86400/3600);
        glob.minutes  = 60 - Math.floor((glob.settings.enddate - glob.settings.now)%86400%3600/60);
        glob.seconds  = 60 - Math.floor((glob.settings.enddate - glob.settings.now)%86400%3600%60);
            
        if (jQuery("#"+glob.settings.unique).find(".countitround_days").length <= 0) {
            glob.hours = Math.floor((glob.settings.enddate - glob.settings.now)/3600);
        }    
            
        if (jQuery("#"+glob.settings.unique).find(".countitround_hours").length <= 0) {
            glob.minutes = Math.floor((glob.settings.enddate - glob.settings.now)/60);
        }    
            
        if (jQuery("#"+glob.settings.unique).find(".countitround_minutes").length <= 0) {
            glob.seconds = Math.floor(glob.settings.enddate - glob.settings.now);
        }    
            
            
            
            
        clock.set.background();
        clock.set.seconds();
        clock.set.minutes();
        clock.set.hours();
        clock.set.days();
        clock.start();
    };
   
        
    var clock = {
        set: {
            background:function(){
                jQuery("#"+glob.settings.unique).find(".canvas_background").each(function(){
                    var i;
                    
                    if (jQuery(this).parent().attr("class").indexOf("DAYS")    >= 1) i = 1;
                    if (jQuery(this).parent().attr("class").indexOf("HRS")   >= 1) i = 2;
                    if (jQuery(this).parent().attr("class").indexOf("MINS") >= 1) i = 3;
                    if (jQuery(this).parent().attr("class").indexOf("SECS") >= 1) i = 4;
                   
                    var bg = jQuery(this).get(0);
                    var ctx = bg.getContext("2d");
                    ctx.canvas.height = glob.settings["size"+i];
                    ctx.canvas.width  = glob.settings["size"+i];
                    ctx.clearRect(0, 0, bg.width, bg.height);
                    ctx.beginPath();
                    ctx.strokeStyle = glob.settings["backgroundcolor"+i];
                    ctx.arc(glob.size.x(i), glob.size.y(i), glob.size.z(i), glob.deg(0), glob.deg(360));
                    ctx.lineWidth = glob.settings["backgroundwidth"+i];
                    ctx.stroke();
                });
            },
            days: function(){
                var cdays = jQuery("#"+glob.settings.unique).find(".canvas_days").get(0);
                if (!cdays) return;
                var ctx = cdays.getContext("2d");
                ctx.canvas.height = glob.settings.size1;
                ctx.canvas.width  = glob.settings.size1;
                ctx.clearRect(0, 0, cdays.width, cdays.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.settings.color1;
                    
                ctx.shadowBlur    = glob.settings.glowwidth1;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.settings.glow1;
                
                ctx.arc(glob.size.x(1), glob.size.y(1), glob.size.z(1), glob.deg(0), glob.deg((360/glob.total)*(glob.total - glob.days)));
                ctx.lineWidth = glob.settings.frontwidth1;
                ctx.stroke();
                jQuery("#"+glob.settings.unique).find(".countitround_days_count").text(glob.days);
            },
            
            hours: function(){
                var cHr = jQuery("#"+glob.settings.unique).find(".canvas_hours").get(0);
                if (!cHr) return;
                var ctx = cHr.getContext("2d");
                ctx.canvas.height = glob.settings.size2;
                ctx.canvas.width  = glob.settings.size2;
                ctx.clearRect(0, 0, cHr.width, cHr.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.settings.color2;
                
                ctx.shadowBlur    = glob.settings.glowwidth2;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.settings.glow2;
                
                var deg      = 15 * glob.hours;
                var countext = 24 - glob.hours;
                
                if (jQuery("#"+glob.settings.unique).find(".countitround_days").length <= 0) {
                    deg = (360 / Math.floor((glob.settings.enddate - glob.settings.startdate)/3600))* (Math.floor((glob.settings.enddate - glob.settings.startdate)/3600) - glob.hours);
                    countext = glob.hours;
                }  
                
                ctx.arc(glob.size.x(2), glob.size.y(2), glob.size.z(2), glob.deg(0), glob.deg(deg));
                ctx.lineWidth = glob.settings.frontwidth2;
                ctx.stroke();
                jQuery("#"+glob.settings.unique).find(".countitround_hours_count").text(countext);
            },
            
            minutes : function(){
                var cMin = jQuery("#"+glob.settings.unique).find(".canvas_minutes").get(0);
                if (!cMin) return;
                var ctx = cMin.getContext("2d");
                ctx.canvas.height = glob.settings.size3;
                ctx.canvas.width  = glob.settings.size3;
                ctx.clearRect(0, 0, cMin.width, cMin.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.settings.color3;
                
                ctx.shadowBlur    = glob.settings.glowwidth3;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.settings.glow3;
                
                var deg      = 6 * glob.minutes;
                var countext = 60 - glob.minutes;
                
                if (jQuery("#"+glob.settings.unique).find(".countitround_hours").length <= 0) {
                    deg = (360 / Math.floor((glob.settings.enddate - glob.settings.startdate)/60))* (Math.floor((glob.settings.enddate - glob.settings.startdate)/60) - glob.minutes);
                    countext = glob.minutes;
                }
                
                ctx.arc(glob.size.x(3), glob.size.y(3), glob.size.z(3), glob.deg(0), glob.deg(deg));
                ctx.lineWidth = glob.settings.frontwidth3;
                ctx.stroke();
                jQuery("#"+glob.settings.unique).find(".countitround_minutes_count").text(countext);
            },
            seconds: function(){
                var cSec = jQuery("#"+glob.settings.unique).find(".canvas_seconds").get(0);
                var ctx = cSec.getContext("2d");
                ctx.canvas.height = glob.settings.size4;
                ctx.canvas.width  = glob.settings.size4;
                ctx.clearRect(0, 0, cSec.width, cSec.height);
                ctx.beginPath();
                ctx.strokeStyle = glob.settings.color4;
                
                ctx.shadowBlur    = glob.settings.glowwidth4;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 0;
                ctx.shadowColor = glob.settings.glow4;
                
                var deg      = 6 * glob.seconds;
                var countext = 60 - glob.seconds;
                
                if (jQuery("#"+glob.settings.unique).find(".countitround_minutes").length <= 0) {
                    deg = (360 / Math.floor(glob.settings.enddate - glob.settings.startdate))* (Math.floor(glob.settings.enddate - glob.settings.startdate) - glob.seconds);
                    countext = glob.seconds;
                }
                
                ctx.arc(glob.size.x(4), glob.size.y(4), glob.size.z(4), glob.deg(0), glob.deg(deg));
                ctx.lineWidth = glob.settings.frontwidth4;
                ctx.stroke();
        
                jQuery("#"+glob.settings.unique).find(".countitround_seconds_count").text(countext);
            }
        },
        start: function(){
            var cdown;
            
            /* Count SS */
            if (jQuery("#"+glob.settings.unique).find(".countitround_minutes").length <= 0) {
                cdown = setInterval(function(){
                    if ( glob.seconds <= 0 ) {
                        glob.complete();
                        clearInterval(cdown);
                        return;
                    } else {
                        glob.seconds--;
                    }
                    clock.set.seconds();
                },1000);
                return;
            }
            
            /* Count MM:SS */
            if (jQuery("#"+glob.settings.unique).find(".countitround_hours").length <= 0) {
                cdown = setInterval(function(){
                    if ( glob.seconds > 59 ) {
                        if (glob.minutes === 0) {
                            clearInterval(cdown);
                            glob.complete();
                            return;
                        }
                        glob.seconds = 1;
                        glob.minutes--;
                        clock.set.minutes();
                    } else {
                        glob.seconds++;
                    }
                    clock.set.seconds();
                },1000);
                return;
            }
            
            /* Count HH:MM:SS */
            if (jQuery("#"+glob.settings.unique).find(".countitround_days").length <= 0) {
                cdown = setInterval(function(){
                    if ( glob.seconds > 59 ) {
                        if (60 - glob.minutes <= 0 && glob.hours <= 0) {
                            clearInterval(cdown);
                            glob.complete();
                            return;
                        }
                        glob.seconds = 1;
                        if (glob.minutes > 59) {
                            glob.minutes = 1;
                            clock.set.minutes();
                            glob.hours--;
                            clock.set.hours();
                        } else {
                            glob.minutes++;
                        }
                        clock.set.minutes();
                    } else {
                        glob.seconds++;
                    }
                    clock.set.seconds();
                },1000);
                return;
            }
            
            /* Count DD:HH:MM:SS */
            cdown = setInterval(function(){
                if ( glob.seconds > 59 ) {
                    if (60 - glob.minutes <= 0 && 24 - glob.hours <= 0 && glob.days <= 0) {
                        clearInterval(cdown);
                        glob.complete();
                        return;
                    }
                    glob.seconds = 1;
                    if (glob.minutes > 59) {
                        glob.minutes = 1;
                        clock.set.minutes();
                        if (glob.hours > 23) {
                            glob.hours = 1;
                            if (glob.days > 0) {
                                glob.days--;
                                clock.set.days();
                            }
                        } else {
                            glob.hours++;
                        }
                        clock.set.hours();
                    } else {
                        glob.minutes++;
                    }
                    clock.set.minutes();
                } else {
                    glob.seconds++;
                }
                clock.set.seconds();
            },1000);
        }
    };
}















 jQuery(document).ready(function(){
                // CLOCK VARIANT 1
                jQuery(".my-clock-place1").buildCounter({
                    now_timestamp      : "", /* Current time. Fill if you are using server side unix timestamp like PHP strtotime("now"); */
                    stardate_timestamp : "", /* Start date. Fill if you are using server side unix timestamp like PHP strtotime("25 May 2013 11:00:00"); */
                    enddate_timestamp  : "", /* End date. Fill if you are using server side unix timestamp like PHP strtotime("25 May 2013 00:00:00"); */
                    
                    startdate        : "1 January 2016 00:00:00 GMT", /* Client-Side time. Start Date. This is overwrited if unix timestamp exists. */
                    enddate          : "8 January 2017 23:59:00 PST", /* Client-Side time. End Date. This is overwrited if unix timestamp exists. */
                    color1           : "#ef6930", /* Days Circle Color */
                    color2           : "#ef6930", /* Hours Circle Color */
                    color3           : "#ef6930", /* Minutes Circle Color */
                    color4           : "#ef6930", /* Seconds Circle Color */
                    backgroundcolor1 : "transparent",    /* Days Circle Background Color */
                    backgroundcolor2 : "transparent",    /* Hours Circle Background Color */
                    backgroundcolor3 : "transparent",    /* Minutes Circle Background Color */
                    backgroundcolor4 : "transparent",    /* Seconds Circle Background Color */
                    glow1            : "", /* Days Circle Color Glow */
                    glow2            : "", /* Hours Circle Color Glow */
                    glow3            : "", /* Minutes Circle Color Glow */
                    glow4            : "", /* Seconds Circle Color Glow */
                    glowwidth1       : "0",       /* Days Circle Glow Width */
                    glowwidth2       : "0",       /* Hours Circle Glow Width */
                    glowwidth3       : "0",       /* Minutes Circle Glow Width */
                    glowwidth4       : "0",       /* Seconds Circle Glow Width */
                    backgroundwidth1 : "6",      /* Days Circle Background Width */
                    backgroundwidth2 : "6",      /* Hours Circle Background Width */
                    backgroundwidth3 : "6",      /* Minutes Circle Background Width */
                    backgroundwidth4 : "6",      /* Seconds Circle Background Width */
                    frontwidth1      : "6",      /* Days Circle Width */
                    frontwidth2      : "6",      /* Hours Circle Width */
                    frontwidth3      : "6",      /* Minutes Circle Width */
                    frontwidth4      : "6",      /* Seconds Circle Width */
                    size1            : "130",     /* Days Clock Size */
                    size2            : "130",     /* Hours Clock Size */
                    size3            : "130",     /* Minutes Clock Size */ 
                    size4            : "130",     /* Seconds Clock Size */
                    textsize1        : "18",      /* Days Font Size */
                    textsize2        : "18",      /* Hours Font Size */
                    textsize3        : "18",      /* Minutes Font Size */
                    textsize4        : "18",      /* Seconds Font Size */
                    countsize1       : "60",      /* Days Count Font Size */
                    countsize2       : "60",      /* Hours Count Font Size */
                    countsize3       : "60",      /* Minutes Count Font Size */
                    countsize4       : "60",      /* Seconds Count Font Size */
                    textcolor1       : "#fff", /* Days Font Color */
                    textcolor2       : "#fff", /* Hours Font Color */
                    textcolor3       : "#fff", /* Minutes Font Color */ 
                    textcolor4       : "#fff", /* Seconds Font Color */
                    countcolor1      : "#fff", /* Days Count Font Color */
                    countcolor2      : "#fff", /* Hours Count Font Color */
                    countcolor3      : "#fff", /* Minutes Count Font Color */
                    countcolor4      : "#fff", /* Seconds Count Font Color */
                    layout           : "dhms",    /* Clock layouts: dhms, hms, ms, s */
                    callback         : function(){
                        
                    }
                }); 					
                
              
 });
                
           
