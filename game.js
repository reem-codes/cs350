var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "parent",
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var pumpkins;
var platforms;
var cursors;
var score = 0;
var scoreText;
var gameOver = false;
var GameOverText;
var game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "assets/background.jpg");
  this.load.image("ground", "assets/platform.png");
  this.load.image("pumpkin", "assets/pumpkin.png");
  this.load.image("garlic", "assets/garlic.png");
  this.load.spritesheet("ghost", "assets/ghost.png", {
    frameWidth: 48,
    frameHeight: 64
  });
}

function create() {
  this.add.image(400, 300, "sky");

  platforms = this.physics.add.staticGroup();
  platforms
    .create(400, 568, "ground")
    .setScale(2)
    .refreshBody();
  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");

  player = this.physics.add.sprite(100, 450, "ghost");

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("ghost", { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "turn",
    frames: this.anims.generateFrameNumbers("ghost", { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("ghost", { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("ghost", { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });

  cursors = this.input.keyboard.createCursorKeys();

  pumpkins = this.physics.add.group({
    key: "pumpkin",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });

  pumpkins.children.iterate(function(child) {
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });

  scoreText = this.add.text(16, 16, "score: 0", {
    fontSize: "32px",
    fill: "#000"
  });
  garlics = this.physics.add.group();

  this.physics.add.collider(garlics, platforms);

  this.physics.add.collider(player, garlics, hitgarlic, null, this);
  this.physics.add.collider(pumpkins, platforms);
  this.physics.add.collider(player, platforms);
  this.physics.add.overlap(player, pumpkins, collectpumpkin, null, this);
}

function update() {
  if (gameOver) {
    GameOverText = this.add.text(230, 250, "game over!", {
      fontSize: "62px",
      fill: "#ff0000"
    });
    GameOverText = this.add.text(250, 320, "press SPACE to restart", {
      fontSize: "24px",
      fill: "#000"
    });
  }
  if (cursors.space.isDown) {
    this.scene.restart();
    gameOver = false;
    score = 0;
  }
  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else if (cursors.up.isDown) {
    player.setVelocityX(0);

    player.anims.play("up", true);
  } else {
    player.setVelocityX(0);

    player.anims.play("turn", true);
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
}
function collectpumpkin(player, pumpkin) {
  pumpkin.disableBody(true, true);

  score += 10;
  scoreText.setText("Score: " + score);

  if (pumpkins.countActive(true) === 0) {
    pumpkins.children.iterate(function(child) {
      child.enableBody(true, child.x, 0, true, true);
    });

    var x =
      player.x < 400
        ? Phaser.Math.Between(400, 800)
        : Phaser.Math.Between(0, 400);

    var garlic = garlics.create(x, 16, "garlic");
    garlic.setBounce(1);
    garlic.setCollideWorldBounds(true);
    garlic.setVelocity(Phaser.Math.Between(-200, 200), 20);
  }
}
function hitgarlic(player, garlic) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  gameOver = true;
}
