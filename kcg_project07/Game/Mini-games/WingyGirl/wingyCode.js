// Canvas読み込み//
console.log("test");
const cvs = document.getElementById("wingy_girl");
const ctx = cvs.getContext("2d");

//ゲームのConstantなど
let frames = 0;
const DEGREE = Math.PI/180;

//画像全体読み込み
const sprite = new Image();
sprite.src="./img/sprite.png";
const sky = new Image();
sky.src="./img/sky.png";

//GAME STATE
const state = {
    current : 0,
    getReady : 0,
    game:1,
    over:2
}

//操作・CONTROL
cvs.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady:
            state.current = state.game;
            console.log("test");
            break;
        case state.game:
            bird.flap();
            break;
        case state.over:
            pipes.position = [];
            state.current = state.getReady;
            break;
    }
})
//空
const mainbg= {
    sX : 0,
    sY : 0,
    w : 1280,
    h : 720,
    x : 0,
    y : 0,
    
    draw : function(){
        ctx.drawImage(sky, this.sX, this.sY, this.w,this.h,this.x,this.y,this.w,this.h);
    },

}

//背景・Background
const bg= {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y : cvs.height -226,
    dx:2,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x,this.y/1.2,this.w*1.2,this.h*1.2);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*1.2,this.y/1.2,this.w*1.2,this.h*1.2);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+(this.w*1.2)*2,this.y/1.2,this.w*1.2,this.h*1.2);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+(this.w*1.2)*3,this.y/1.2,this.w*1.2,this.h*1.2);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+(this.w*1.2)*4,this.y/1.2,this.w*1.2,this.h*1.2);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+(this.w*1.2)*5,this.y/1.2,this.w*1.2,this.h*1.2);
    },

    update : function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w*1.2);
        }
    }

}

//FOREGROUND
const fg = {
    sX : 276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    y : cvs.height -112,

    dx :5,

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*2,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*3,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*4,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*5,this.y,this.w,this.h);
        ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x+this.w*6,this.y,this.w,this.h);
    },

    update : function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}

//Bird==Girl
const bird = {
    animation : [
        {sX:276, sY:112},
        {sX:276, sY:139},
        {sX:276, sY:164},
        {sX:276, sY:139}
    ],
    w : 34,
    h : 26,
    x : 400,
    y : 200,

    frame : 0,

    gravity : 0.25,
    jump : 4.6,
    speed : 0,
    rotation : 0,
    radius : 24,


    draw : function(){
        let bird = this.animation[this.frame];
        
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.rotation);

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w,this.h,-this.w/2,1-this.h/2,this.w*2,this.h*2);
    
        ctx.restore();
    },

    flap : function(){
        this.speed = -this.jump;
    },
    update : function(){
        //getReadyのstateの時、翼が遅くする
        this.period = state.current == state.getReady ? 10 :5;
        //periodに合わせてframeを更新する
        this.frame += frames%this.period == 0 ?1:0;
        //Animationの配列の最後の項目まで行ったら、０にする
        this.frame = this.frame%this.animation.length;
        
        if(state.current == state.getReady){
            this.speed = 0;
            this.y = 150;
            this.rotation = 0*DEGREE;   
        }else{
            this.speed += this.gravity;
            this.y += this.speed;

            if(this.y+this.h >= cvs.height -fg.h){
                this.y = cvs.height - fg.h - this.h;
                if(state.current == state.game){
                    state.current = state.over;
                }
            }

            //speedがjumpより高かったら、Birdが落ちていると考えらる
            if(this.speed >= this.jump){
                this.rotation = 90*DEGREE;
                this.frame =1;
            }else{
                this.rotation = -25*DEGREE;
            }
        }

        
    }
}
//GET READY MESSAGE
const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,

    draw : function(){
        if(state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x,this.y,this.w,this.h);
        }
    }
}

//GAMEOVER
const gameOver= {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,

    draw : function(){
        if(state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w,this.h,this.x,this.y,this.w,this.h);
        }
    }
}

//PIPES
const pipes = {
    position : [],

    top :{
        sX :553,
        sY :0
    },

    bottom :{
        sX :502,
        sY :0
    },

    w:53,
    h:400,
    gap :145,
    maxYpos : -100,
    dx :10,

    draw : function(){
        for(let i =0;i<this.position.length;i++){
            let p = this.position[i];
            
            let topYPos = p.y;
            let bottomYpos = p.y + this.h + this.gap;

            
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w,this.h,p.x,topYPos,this.w,this.h);
            
            
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w,this.h,p.x,bottomYpos,this.w,this.h);

        }
    },

    update : function(){
        if(state.current !== state.game) return;

        if(frames%50 == 0){
            this.position.push({
                x : cvs.width,
                y : this.maxYpos * (Math.random()+1)
            });
        }
        for(let i=0; i<this.position.length;i++){
            let p = this.position[i];
            let bottomPipeYPos = p.y + this.h + this.gap;

            //衝突検知・Collision Detection
            if(bird.x + bird.radius > p.x && bird.x-bird.radius <p.x +this.w
                && bird.y+bird.radius>p.y && bird.y - bird.radius <p.y +this.h){
                    state.current = state.over;
                }

            if(bird.x + bird.radius > p.x && bird.x-bird.radius <p.x +this.w
                && bird.y+bird.radius>bottomPipeYPos && bird.y - bird.radius <bottomPipeYPos +this.h){
                    state.current = state.over;
                }

            //pipeのX一位更新
            p.x -= this.dx;

            if(p.x + this.w <=0){
                this.position.shift();    
            }

        }
    }
}

//DRAW
function draw(){
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    mainbg.draw();
    bg.draw();
    pipes.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();
}

//UPDATE
function update(){
    bird.update();
    bg.update();
    fg.update();
    pipes.update();

}

//LOOP
function loop(){
    update();
    draw();
    frames++;
    requestAnimationFrame(loop);
}
loop();


