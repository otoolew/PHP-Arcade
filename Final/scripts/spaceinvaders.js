/* Refrenced and used some code from the links.
 * 
 * by Dave Kerr
 * https://github.com/dwmkerr/spaceinvaders/blob/master/js/spaceinvaders.js
 * 
 * by Max Wihlborg
 * https://github.com/maxwihlborg/youtube-tutorials/tree/master/space-invaders
 */

var
        /**
         * Game objects
         */
        display,
        input,
        frames,
        spFrame,
        lvFrame,
        alSprite,
        taSprite,
        ciSprite,
        aliens,
        dir,
        ship,
        shipHP,
        bullets,
        cities,
        win,
        lose,
        alienCount,
        score,
        cityPopulation,
        bombs,
        bulletCount,
        bulletHit,
        bulletMiss;

user_ID = $('#user_ID').val();
user_name = $('#user_name').val();
score = $('#score');
//var data = {
//    userName: user_name,   
//    score: score
//};

var endGame = false;
/**
 * Initiate and start the game
 */
function main() {
    // create game canvas and inputhandeler
    display = new Screen(600, 600);
    input = new InputHandeler();
    // create all sprites fram assets image
    var img = new Image();
    img.addEventListener("load", function () {
        alSprite = [
            [new Sprite(this, 0, 0, 22, 16), new Sprite(this, 0, 16, 22, 16)],
            [new Sprite(this, 22, 0, 16, 16), new Sprite(this, 22, 16, 16, 16)],
            [new Sprite(this, 38, 0, 24, 16), new Sprite(this, 38, 16, 24, 16)]
        ];
        shipSprite = new Sprite(this, 62, 0, 22, 16);
        ciSprite = new Sprite(this, 84, 8, 36, 24);
        // initate and run the game
        init();
        run();
    });
    img.src = "images/spaceinvaders/invaders.png";
}
;
/**
 * Initate game objects
 */
function init() {
    // set start settings
    frames = 0;
    spFrame = 0;
    lvFrame = 60;
    dir = 1;
    //cityPopulation = 100000;
    score = 0;
    bulletCount = 0;
    bulletHit = 0;
    bulletMiss = 0;
    shipHP = 3;
    win = false;
    lost = false;
    // create the tank object
    ship = {
        sprite: shipSprite,
        x: (display.width - shipSprite.w) / 2,
        y: display.height - (60 + shipSprite.h),
        w: shipSprite.w,
        h: display.height - (60 + shipSprite.h)
    };
    // initate bullet array
    bullets = [];
    // initate bombs array
    bombs = [];
    // create the cities object (and canvas)
    cities = {
        canvas: null,
        ctx: null,
        y: ship.y - (30 + ciSprite.h),
        h: ciSprite.h,
        /**
         * Create canvas and game graphic context
         */
        init: function () {
            // create canvas and grab 2d context
            this.canvas = document.createElement("canvas");
            this.canvas.width = display.width;
            this.canvas.height = this.h+50;
            this.ctx = this.canvas.getContext("2d");
            for (var i = 0; i < 6; i++) {
                this.ctx.drawImage(ciSprite.img, ciSprite.x, ciSprite.y,
                        ciSprite.w, ciSprite.h,
                        68 + 111 * i, 0, ciSprite.w, ciSprite.h);
            }
        },
        /**
         * Create damage effect on city-canvas
         * 
         * @param  {number} x x-coordinate
         * @param  {number} y y-coordinate
         */
        generateDamage: function (x, y) {
            // round x, y position
            x = Math.floor(x / 2) * 2;
            y = Math.floor(y / 2) * 2;
            // draw dagame effect to canva
            this.ctx.clearRect(x - 2, y - 2, 4, 4);
            this.ctx.clearRect(x + 2, y - 4, 2, 4);
            this.ctx.clearRect(x + 4, y, 2, 2);
            this.ctx.clearRect(x + 2, y + 2, 2, 2);
            this.ctx.clearRect(x - 4, y + 2, 2, 2);
            this.ctx.clearRect(x - 6, y, 2, 2);
            this.ctx.clearRect(x - 4, y - 4, 2, 2);
            this.ctx.clearRect(x - 2, y - 6, 2, 2);
        },
        /**
         * Check if pixel at (x, y) is opaque
         * 
         * @param  {number} x x-coordinate
         * @param  {number} y y-coordinate
         * @return {bool}     boolean value if pixel opaque
         */
        hits: function (x, y) {
            // transform y value to local coordinate system
            y -= this.y;
            // get imagedata and check if opaque
            var data = this.ctx.getImageData(x, y, 1, 1);
            if (data.data[3] !== 0) {
                this.generateDamage(x, y);
                return true;
            }
            return false;
        }
    };
    cities.init(); // initiate the cities create and populate alien array
    aliens = [];

    var rows = [1, 0, 0, 2, 2];
    for (var i = 0, len = rows.length; i < len; i++) {
        for (var j = 0; j < 10; j++) {
            var a = rows[i];
            // create right offseted alien and push to alien
            // array
            aliens.push({
                sprite: alSprite[a],
                x: 30 + j * 30 + [0, 4, 0][a],
                y: 30 + i * 30,
                w: alSprite[a][0].w,
                h: alSprite[a][0].h
            });
        }
    }
}
;
/**
 * Wrapper around the game loop function, updates and renders
 * the game
 */
function run() {

    var loop = function () {

        if (gameLost()) {
            document.getElementsByName("score").value = score;
            document.getElementById("score").value = score;
            document.getElementById("myForm1").submit();
        } else if (gameWin()) {
            document.getElementsByName("score").value = score;
            document.getElementById("score").value = score;
            document.getElementById("myForm1").submit();
        } else {
            update();
            render();
            window.requestAnimationFrame(loop, display.canvas);
        }
    };
    window.requestAnimationFrame(loop, display.canvas);
}
;
/**
 * Update the game logic
 */
function update() {
    // update the frame count
    frames++;
    // update ship position depending on pressed keys
    if (input.isDown(37)||input.isDown(65)) { // Left
        ship.x -= 4;
    }
    if (input.isDown(39)||input.isDown(68)) { // Right
        ship.x += 4;
    }
    // keep the tank sprite inside of the canvas
    ship.x = Math.max(Math.min(ship.x, display.width - (30 + shipSprite.w)), 30);
    // append new bullet to the bullet array if spacebar is
    // pressed
    if (input.isPressed(32)) { // Space
        bullets.push(new Bullet(ship.x + 10, ship.y, -8, 2, 6, "#fff"));
    }
    // update all bullets position and checks
    for (var i = 0, len = bullets.length; i < len; i++) {
        var b = bullets[i];
        b.update();
        // remove bullets outside of the canvas
        if (b.y + b.height < 0 || b.y > display.height) {
            bullets.splice(i, 1);
            i--;
            len--;
            bulletMiss++;
            score--;
            continue;
        }
        // check if bullet hits any city
        var h2 = b.height * 0.5; // half hight is used for
        // simplicity
        if (cities.y < b.y + h2 && b.y + h2 < cities.y + cities.h) {
            if (cities.hits(b.x, b.y + h2)) {
                bullets.splice(i, 1);
                i--;
                len--;

//                cityPopulation = cityPopulation - getRandomInt(1000, 10000);
//                if (cityPopulation < 0) {
//                    cityPopulation = 0;
//                }
                continue;
            }
        }
        // check if bullet hit any aliens
        for (var j = 0, len2 = aliens.length; j < len2; j++) {
            var a = aliens[j];
            if (AABBIntersect(b.x, b.y, b.width, b.height, a.x, a.y, a.w, a.h)) {

                aliens.splice(j, 1);
                j--;
                len2--;
                bullets.splice(i, 1);
                i--;
                len--;
                score = score + 3;
                bulletHit++;
                // increase the movement frequence of the aliens
                // when there are less of them
                switch (len2) {
                    case 30:
                    {
                        this.lvFrame = 30;
                        break;
                    }
                    case 10:
                    {
                        this.lvFrame = 20;
                        break;
                    }
                    case 5:
                    {
                        this.lvFrame = 15;
                        break;
                    }
                    case 1:
                    {
                        this.lvFrame = 10;
                        break;
                    }
                }
            }
        }
    }// END BULLETS
    // update all bombs position and checks
    for (var i = 0, len = bombs.length; i < len; i++) {
        var b = bombs[i];
        b.update();
        // remove bombs outside of the canvas
        if (b.y + b.height < 0 || b.y > display.height) {
            bombs.splice(i, 1);
            i--;
            len--;
            continue;
        }
        // check if bombs hits any city
        var h2 = b.height * 0.5; // half hight is used for
        // simplicity
        if (cities.y < b.y + h2 && b.y + h2 < cities.y + cities.h) {
            if (cities.hits(b.x, b.y + h2)) {
                bombs.splice(i, 1);
                i--;
                len--;
                cityPopulation = cityPopulation - getRandomInt(1000, 5000);
                continue;
            }
        }
        // Check if bombhit Tank
        if (AABBIntersect(b.x, b.y, b.width, b.height, ship.x, ship.y, ship.w, ship.h)) {
            bombs.splice(i, 1);
            i--;
            len--;
            shipHP--;
            continue;
        }
    }// END BOMBS
    //
    // ALIEN DROP BOMBS
    if (Math.random() < 0.03 && aliens.length > 0) {
        var a = aliens[Math.round(Math.random() * (aliens.length - 1))];
        // iterate through aliens and check collision to make
        // sure only shoot from front line
        for (var i = 0, len = aliens.length; i < len; i++) {
            var b = aliens[i];
            if (AABBIntersect(a.x, a.y, a.w, 100, b.x, b.y, b.w, b.h)) {
                a = b;
            }
        }
        // create and append new bullet
        bombs.push(new Bomb(a.x + a.w * 0.5, a.y + a.h, 4, 2, 4, "#fff"));
    }
    // ALIEN MOVEMENT
    if (frames % lvFrame === 0) {
        spFrame = (spFrame + 1) % 2;
        var _max = 0, _min = display.width;
        // iterate through aliens and update postition
        for (var i = 0, len = aliens.length; i < len; i++) {
            var a = aliens[i];
            a.x += 30 * dir;
            // find min/max values of all aliens for direction
            // change test
            _max = Math.max(_max, a.x + a.w);
            _min = Math.min(_min, a.x);
        }
        // check if aliens should move down and change direction
        if (_max > display.width - 30 || _min < 30) {
            // mirror direction and update position
            dir *= -1;
            for (var i = 0, len = aliens.length; i < len; i++) {
                aliens[i].x += 30 * dir;
                aliens[i].y += 50;
            }
        }
    }
}
;
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function gameLost() {
    var result = false;
//    if (cityPopulation <= 0) {
//        cityPopulation = 0;
//        return true;
//    }
    if(shipHP<=0){
        return true;
    }
    //check if ship is hit by alien
    for (var j = 0, len2 = aliens.length; j < len2; j++) {
        var a = aliens[j];
        if (AABBIntersect(ship.x, ship.y, 22, 16, a.x, a.y, a.w, a.h) || a.y > (display.canvas.height - 100)) {
            return true;
        }
    }
    return result;
}
function gameWin() {
    alienCount = aliens.length;
    //check if aliens are dead
    if (alienCount < 1) {
        return true;
    } else {
        return false;
    }
}
/**
 * Render the game state to the canvas
 */
function render() {
    display.clear(); // clear the game canvas
    // draw all aliens
    for (var i = 0, len = aliens.length; i < len; i++) {
        var a = aliens[i];
        display.drawSprite(a.sprite[spFrame], a.x, a.y);
    }
    // save context and draw bullet then restore
    display.ctx.save();
    for (var i = 0, len = bullets.length; i < len; i++) {
        display.drawBullet(bullets[i]);
    }
    // save context and draw bullet then restore
    display.ctx.save();
    for (var i = 0, len = bombs.length; i < len; i++) {
        display.drawBomb(bombs[i]);
    }
    display.ctx.restore();
    // draw the city graphics to the canvas
    display.ctx.drawImage(cities.canvas, 0, cities.y);
    // draw the tank sprite
    display.drawSprite(ship.sprite, ship.x, ship.y);

    display.ctx.font = "20px Georgia";
    display.ctx.fillStyle = 'white';
    display.ctx.fillText("     Player: "+ user_name+"       Ship HP: " + shipHP + "        Score: "+score, (display.width / 2) - 300, (display.height) - 30);
}
;
// start and run the game
main();