(function(c,f,g,b){var i=function(){};var a=function(o,p){if(o.hasClass(p.slides_container_class)){return this}var u=this,k,j=o,v,t,n,s=0,m,l,q=false,r=false;u.slides=function(){return j.children(p.slide_selector)};u.slides().first().addClass(p.active_slide_class);u.update_slide_number=function(w){if(p.slide_number){v.find("span:first").text(parseInt(w)+1);v.find("span:last").text(u.slides().length)}if(p.bullets){t.children().removeClass(p.bullets_active_class);c(t.children().get(w)).addClass(p.bullets_active_class)}};u.update_active_link=function(w){var x=c('a[data-orbit-link="'+u.slides().eq(w).attr("data-orbit-slide")+'"]');x.siblings().removeClass(p.bullets_active_class);x.addClass(p.bullets_active_class)};u.build_markup=function(){j.wrap('<div class="'+p.container_class+'"></div>');k=j.parent();j.addClass(p.slides_container_class);if(p.stack_on_small){k.addClass(p.stack_on_small_class)}if(p.navigation_arrows){k.append(c('<a href="#"><span></span></a>').addClass(p.prev_class));k.append(c('<a href="#"><span></span></a>').addClass(p.next_class))}if(p.timer){n=c("<div>").addClass(p.timer_container_class);n.append("<span>");n.append(c("<div>").addClass(p.timer_progress_class));n.addClass(p.timer_paused_class);k.append(n)}if(p.slide_number){v=c("<div>").addClass(p.slide_number_class);v.append("<span></span> "+p.slide_number_text+" <span></span>");k.append(v)}if(p.bullets){t=c("<ol>").addClass(p.bullets_container_class);k.append(t);t.wrap('<div class="orbit-bullets-container"></div>');u.slides().each(function(w,y){var x=c("<li>").attr("data-orbit-slide",w).on("click",u.link_bullet);t.append(x)})}};u._goto=function(C,B){if(C===s){return false}if(typeof l==="object"){l.restart()}var z=u.slides();var x="next";q=true;if(C<s){x="prev"}if(C>=z.length){if(!p.circular){return false}C=0}else{if(C<0){if(!p.circular){return false}C=z.length-1}}var A=c(z.get(s));var y=c(z.get(C));A.css("zIndex",2);A.removeClass(p.active_slide_class);y.css("zIndex",4).addClass(p.active_slide_class);j.trigger("before-slide-change.fndtn.orbit");p.before_slide_change();u.update_active_link(C);var D=function(){var E=function(){s=C;q=false;if(B===true){l=u.create_timer();l.start()}u.update_slide_number(s);j.trigger("after-slide-change.fndtn.orbit",[{slide_number:s,total_slides:z.length}]);p.after_slide_change(s,z.length)};if(j.height()!=y.height()&&p.variable_height){j.animate({height:y.height()},250,"linear",E)}else{E()}};if(z.length===1){D();return false}var w=function(){if(x==="next"){m.next(A,y,D)}if(x==="prev"){m.prev(A,y,D)}};if(y.height()>j.height()&&p.variable_height){j.animate({height:y.height()},250,"linear",w)}else{w()}};u.next=function(w){w.stopImmediatePropagation();w.preventDefault();u._goto(s+1)};u.prev=function(w){w.stopImmediatePropagation();w.preventDefault();u._goto(s-1)};u.link_custom=function(y){y.preventDefault();var x=c(this).attr("data-orbit-link");if((typeof x==="string")&&(x=c.trim(x))!=""){var w=k.find("[data-orbit-slide="+x+"]");if(w.index()!=-1){u._goto(w.index())}}};u.link_bullet=function(y){var x=c(this).attr("data-orbit-slide");if((typeof x==="string")&&(x=c.trim(x))!=""){if(isNaN(parseInt(x))){var w=k.find("[data-orbit-slide="+x+"]");if(w.index()!=-1){u._goto(w.index()+1)}}else{u._goto(parseInt(x))}}};u.timer_callback=function(){u._goto(s+1,true)};u.compute_dimensions=function(){var x=c(u.slides().get(s));var w=x.height();if(!p.variable_height){u.slides().each(function(){if(c(this).height()>w){w=c(this).height()}})}j.height(w)};u.create_timer=function(){var w=new h(k.find("."+p.timer_container_class),p,u.timer_callback);return w};u.stop_timer=function(){if(typeof l==="object"){l.stop()}};u.toggle_timer=function(){var w=k.find("."+p.timer_container_class);if(w.hasClass(p.timer_paused_class)){if(typeof l==="undefined"){l=u.create_timer()}l.start()}else{if(typeof l==="object"){l.stop()}}};u.init=function(){u.build_markup();if(p.timer){l=u.create_timer();Foundation.utils.image_loaded(this.slides().children("img"),l.start)}m=new e(p,j);if(p.animation==="slide"){m=new d(p,j)}k.on("click","."+p.next_class,u.next);k.on("click","."+p.prev_class,u.prev);if(p.next_on_click){k.on("click","."+p.slides_container_class+" [data-orbit-slide]",u.link_bullet)}k.on("click",u.toggle_timer);if(p.swipe){k.on("touchstart.fndtn.orbit",function(x){if(!x.touches){x=x.originalEvent}var w={start_page_x:x.touches[0].pageX,start_page_y:x.touches[0].pageY,start_time:(new Date()).getTime(),delta_x:0,is_scrolling:b};k.data("swipe-transition",w);x.stopPropagation()}).on("touchmove.fndtn.orbit",function(y){if(!y.touches){y=y.originalEvent}if(y.touches.length>1||y.scale&&y.scale!==1){return}var w=k.data("swipe-transition");if(typeof w==="undefined"){w={}}w.delta_x=y.touches[0].pageX-w.start_page_x;if(typeof w.is_scrolling==="undefined"){w.is_scrolling=!!(w.is_scrolling||Math.abs(w.delta_x)<Math.abs(y.touches[0].pageY-w.start_page_y))}if(!w.is_scrolling&&!w.active){y.preventDefault();var x=(w.delta_x<0)?(s+1):(s-1);w.active=true;u._goto(x)}}).on("touchend.fndtn.orbit",function(w){k.data("swipe-transition",{});w.stopPropagation()})}k.on("mouseenter.fndtn.orbit",function(w){if(p.timer&&p.pause_on_hover){u.stop_timer()}}).on("mouseleave.fndtn.orbit",function(w){if(p.timer&&p.resume_on_mouseout){l.start()}});c(g).on("click","[data-orbit-link]",u.link_custom);c(f).on("load resize",u.compute_dimensions);Foundation.utils.image_loaded(this.slides().children("img"),u.compute_dimensions);Foundation.utils.image_loaded(this.slides().children("img"),function(){k.prev("."+p.preloader_class).css("display","none");u.update_slide_number(0);u.update_active_link(0);j.trigger("ready.fndtn.orbit")})};u.init()};var h=function(l,n,q){var r=this,o=n.timer_speed,j=l.find("."+n.timer_progress_class),k,p,m=-1;this.update_progress=function(s){var t=j.clone();t.attr("style","");t.css("width",s+"%");j.replaceWith(t);j=t};this.restart=function(){clearTimeout(p);l.addClass(n.timer_paused_class);m=-1;r.update_progress(0)};this.start=function(){if(!l.hasClass(n.timer_paused_class)){return true}m=(m===-1)?o:m;l.removeClass(n.timer_paused_class);k=new Date().getTime();j.animate({width:"100%"},m,"linear");p=setTimeout(function(){r.restart();q()},m);l.trigger("timer-started.fndtn.orbit")};this.stop=function(){if(l.hasClass(n.timer_paused_class)){return true}clearTimeout(p);l.addClass(n.timer_paused_class);var t=new Date().getTime();m=m-(t-k);var s=100-((m/o)*100);r.update_progress(s);l.trigger("timer-stopped.fndtn.orbit")}};var d=function(m,j){var o=m.animation_speed;var l=(c("html[dir=rtl]").length===1);var n=l?"marginRight":"marginLeft";var k={};k[n]="0%";this.next=function(q,p,r){q.animate({marginLeft:"-100%"},o);p.animate(k,o,function(){q.css(n,"100%");r()})};this.prev=function(q,p,r){q.animate({marginLeft:"100%"},o);p.css(n,"-100%");p.animate(k,o,function(){q.css(n,"100%");r()})}};var e=function(l,j){var n=l.animation_speed;var k=(c("html[dir=rtl]").length===1);var m=k?"marginRight":"marginLeft";this.next=function(p,o,q){o.css({margin:"0%",opacity:"0.01"});o.animate({opacity:"1"},n,"linear",function(){p.css("margin","100%");q()})};this.prev=function(p,o,q){o.css({margin:"0%",opacity:"0.01"});o.animate({opacity:"1"},n,"linear",function(){p.css("margin","100%");q()})}};Foundation.libs=Foundation.libs||{};Foundation.libs.orbit={name:"orbit",version:"5.3.0",settings:{animation:"slide",timer_speed:10000,pause_on_hover:true,resume_on_mouseout:false,next_on_click:true,animation_speed:500,stack_on_small:false,navigation_arrows:true,slide_number:true,slide_number_text:"of",container_class:"orbit-container",stack_on_small_class:"orbit-stack-on-small",next_class:"orbit-next",prev_class:"orbit-prev",timer_container_class:"orbit-timer",timer_paused_class:"paused",timer_progress_class:"orbit-progress",slides_container_class:"orbit-slides-container",preloader_class:"preloader",slide_selector:"*",bullets_container_class:"orbit-bullets",bullets_active_class:"active",slide_number_class:"orbit-slide-number",caption_class:"orbit-caption",active_slide_class:"active",orbit_transition_class:"orbit-transitioning",bullets:true,circular:true,timer:true,variable_height:false,swipe:true,before_slide_change:i,after_slide_change:i},init:function(l,m,k){var j=this;this.bindings(m,k)},events:function(j){var k=new a(this.S(j),this.S(j).data("orbit-init"));this.S(j).data(self.name+"-instance",k)},reflow:function(){var k=this;if(k.S(k.scope).is("[data-orbit]")){var l=k.S(k.scope);var j=l.data(k.name+"-instance");j.compute_dimensions()}else{k.S("[data-orbit]",k.scope).each(function(n,p){var o=k.S(p);var q=k.data_options(o);var m=o.data(k.name+"-instance");m.compute_dimensions()})}}}}(jQuery,window,window.document));