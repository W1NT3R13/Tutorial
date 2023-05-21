let ctx,
  canvas,
  isGameOver,
  enemies = [],
  projectiles = [],
  gameLoopAnimationID,
  lastEnemySpawnTime = 0,
  lastFrameTime = performance.now()

window.addEventListener('DOMContentLoaded', () => {
  canvas = document.getElementById('canvas')
  ctx = canvas.getContext('2d', {alpha: false})

  canvas.width = 700
  canvas.height = 700

  const cannon = new Cannon()

  const gameLoop = () => {
    const currentTime = performance.now()
    const deltaTime = currentTime - lastFrameTime

    // Spawn a new enemy every 2000ms
    lastEnemySpawnTime += deltaTime
    if (lastEnemySpawnTime > 2000) {
      let enemy = new Enemy(
        Math.floor(Math.random() * (canvas.width - 90 + 1) + 45)
      )
      enemy.draw()
      enemies.push(enemy)
      lastEnemySpawnTime = 0
    }

    if (isGameOver) {
      cancelAnimationFrame(gameLoopAnimationID)
    } else {
      //update
      cannon.update(deltaTime)
      enemies.forEach(enemy => enemy.update(deltaTime))
      projectiles.forEach((projectile, i) => {
        if (projectile.isOutOfBounds) {
          projectiles.splice(i, 1)
          projectile = null
          /**
           * Setting it to null is necessary. We can't directly controll javascript's garbage
           * collector to delete stuff for us. If you set everything related (ALL REFERENCES)
           * to the object to null, it will get rid of it automatically during runtime.
           * Here, when I detect a projectile that's out of bounds, I cut it out from the
           * array and then set it to null.
           * The reference const proj I have in Cannon's shoot() method is deleted
           * automatically after the method finished executing.
           * Since we cannot directly controll garbage collection, we can't know for sure
           * when the unused object will be deleted, we can just encourage it to be deleted
           * as soon as JS engine is capable of doing so.
           *
           * EventListeners can also hold references. The keyup eventlistener indirectly
           * holds a reference to projectiles array. Removing the projectile from the array
           * solves that problem
           */
        } else {
          projectile.update(deltaTime)
        }
      })

      //collisions
      for (let i = 0; i < projectiles.length; i++) {
        for (let j = 0; j < enemies.length; j++) {
          if (detectCollisions(projectiles[i], enemies[j])) {
            projectiles.splice(i, 1)
            enemies.splice(j, 1)
          }
        }
      }

      //clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      //draw
      enemies.forEach(enemy => enemy.draw())
      cannon.draw()
      projectiles.forEach(projectile => projectile.draw())

      lastFrameTime = currentTime
      gameLoopAnimationID = requestAnimationFrame(gameLoop)
    }
  }

  gameLoopAnimationID = requestAnimationFrame(gameLoop)

  document.addEventListener('keyup', e => cannon.checkKeyUp(e.code))
  document.addEventListener('keydown', e => {
    let action = e.code
    if (action === 'ArrowLeft' || action === 'ArrowRight') {
      cannon.pressedKey = e.code
    }
  })
})

const detectCollisions = (obj1, obj2) => {
  const differenceX = obj1.x - obj2.x
  const differenceY = obj1.y - obj2.y
  const distance = Math.sqrt(
    differenceX * differenceX + differenceY * differenceY
  )
  return distance < obj1.radius + obj2.radius
}

class Cannon {
  y
  x
  pressedKey = null
  speed = 200 //pixels per second

  constructor() {
    this.x = 350
    this.y = 635
  }

  draw() {
    ctx.fillStyle = 'red'
    ctx.fillRect(this.x - 40, this.y, 80, 40)

    ctx.fillStyle = 'yellow'
    ctx.fillRect(this.x - 65, this.y - 20, 25, 80)
    ctx.fillRect(this.x + 40, this.y - 20, 25, 80)

    ctx.fillStyle = 'blue'
    ctx.fillRect(this.x - 10, this.y - 80, 20, 130)
  }

  shoot() {
    const proj = new Projectile(this.x, this.y)
    projectiles.push(proj)
  }

  update(deltaTime) {
    const distance = (this.speed * deltaTime) / 1000 // pixels per frame
    if (this.pressedKey === 'ArrowLeft' && this.x >= 65) {
      this.x -= distance
    } else if (this.pressedKey === 'ArrowRight' && this.x < canvas.width - 65) {
      this.x += distance
    }
  }

  checkKeyUp(keyCode) {
    switch (keyCode) {
      case 'Space':
        this.shoot()
        break
      case 'ArrowLeft':
      case 'ArrowRight':
        this.pressedKey = null
        break
    }
  }
}

class Projectile {
  x
  y
  radius = Math.sqrt(15 * 15 + 15 * 15) / 2
  speed = 300
  isOutOfBounds = false

  constructor(x, y) {
    this.x = x - 7
    this.y = y - 95
  }

  draw() {
    ctx.fillStyle = 'pink'
    ctx.fillRect(this.x, this.y, 15, 15)
  }

  update(deltaTime) {
    const distance = (this.speed * deltaTime) / 1000 // pixels per frame
    this.y -= distance

    if (this.y < 0) {
      this.isOutOfBounds = true
    }
  }
}

class Enemy {
  x
  y = 20
  radius = Math.sqrt(20 * 20 + 20 * 20) / 2 //diagonal with Pythagorean / 2 to account for corners. Imagine a circle around the square, touching the corners.
  speed = 60 //pixel per second

  constructor(x) {
    this.x = x
  }

  draw() {
    ctx.fillStyle = 'maroon'
    ctx.fillRect(this.x, this.y, 20, 20)
  }

  update(deltaTime) {
    const distance = (this.speed * deltaTime) / 1000 + 1

    if (this.y < 700) {
      this.y += distance
    } else {
      isGameOver = true
    }
  }
}
