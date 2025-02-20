<img width="600" alt="Screenshot 2025-02-20 at 16 34 41" src="https://github.com/user-attachments/assets/5c09ffdf-7ad5-4cbe-94cc-309e2b7b91cb" />

# Interactive 3D Bubble Blob

### A Digital Playground for Interactive Organic Shapes

This project creates lively, interactive digital organisms that react to each other and respond to cursor movement. Imagine a virtual lava lamp meets a bouncy castle—only with code! 😂

## 🎯 Core Mechanics

### 🫧 Blob Physics
Each blob behaves like a soft, elastic entity that:
- Stretches and squishes on impact 💫
- Maintains its overall volume 🎈
- Glows with inner energy ✨

### 🎨 Visual Effects
- **Smooth organic motion** using control points.
- **Vibrant, ever-changing colors** with dynamic blending.
- **Soft glow effect** for a mesmerizing look.

### 🖱️ Interactivity
- Blobs react to cursor movement.
- They collide and bounce off each other naturally.
- They attract and repel based on proximity.

## 🧬 The Anatomy of a Blob

Each blob is structured as follows:

```typescript
class Ball {
  radius: number        // Blob size
  point: Paper.Point    // Position in space
  vector: Paper.Point   // Movement direction
  numSegment: number    // Smoothness of shape
  boundOffset: number[] // Deformation limits
  path: Paper.Path      // Visual representation
}
```

## 🎭 The Art of Blob Design

### 🌿 Organic Shape
Blobs are generated with multiple control points for natural, fluid movement:

```typescript
for (let i = 0; i < this.numSegment; i++) {
  this.sidePoints.push(
    new Paper.Point({
      angle: (360 / this.numSegment) * i,
      length: 1
    })
  )
}
```

### 🎨 Living Colors
Each blob gets a unique hue, creating a vibrant effect:

```typescript
this.path = new Paper.Path({
  fillColor: {
    hue: Math.random() * 360, // Random color
    saturation: 1,            // Full saturation
    brightness: 1             // High brightness
  },
  blendMode: 'lighter'       // Creates glowing effect
})
```

## 🎪 The Physics of Motion

### 🏃 Basic Movement
Blobs move naturally within the space:

```typescript
iterate() {
  this.checkBorders()
  
  if (this.vector.length > this.maxVec)
    this.vector.length = this.maxVec
    
  this.point = this.point.add(this.vector)
}
```

### 🤝 Collision Handling
Blobs react to each other's presence with soft bouncing physics:

```typescript
react(b: Ball) {
  const dist = this.point.getDistance(b.point)
  if (dist < this.radius + b.radius && dist !== 0) {
    const overlap = this.radius + b.radius - dist
    const direc = this.point.subtract(b.point)
                           .normalize(overlap * 0.015)
    this.vector = this.vector.add(direc)
    b.vector = b.vector.subtract(direc)
  }
}
```

## 🎮 Interactive Features

### 🖱️ Mouse Interaction
Blobs are attracted to the cursor, creating a playful interaction:

```typescript
attractToPoint(point: Paper.Point, force: number) {
  const direction = point.subtract(this.point)
  const distance = direction.length
  
  if (distance < 200) {
    const strength = (200 - distance) / 200 * force
    this.vector = this.vector.add(
      direction.normalize(strength)
    )
  }
}
```

## 🎬 Animation Loop

The continuous animation loop keeps everything in motion:

```typescript
Paper.view.onFrame = () => {
  for (let i = 0; i < balls.length - 1; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].react(balls[j])
    }
  }
}
```

## 🚀 Get Started

### 1️⃣ Install Dependencies
Ensure you have Paper.js included in your project:
```html
<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/paper.js/0.12.15/paper-full.min.js"></script>
```

### 2️⃣ Initialize the Canvas
Create an HTML canvas element and link it to Paper.js:
```html
<canvas id="myCanvas" resize></canvas>
```

### 3️⃣ Run the Code
Load and execute the JavaScript file that contains the blob logic.

## 📜 License
This project is open-source and available under the MIT License. Feel free to modify and build upon it!

---
Enjoy creating your own interactive digital playground! 🎈✨

