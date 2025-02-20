
<img width="1439" alt="Screenshot 2025-02-20 at 16 34 41" src="https://github.com/user-attachments/assets/5c09ffdf-7ad5-4cbe-94cc-309e2b7b91cb" />

# Interactive 3D Bubble Blob
-----

#### This documentation explains how to create living, breathing digital organisms that interact with each other and respond to cursor touch. Think of it as a virtual lava lamp meets bouncy castle, but with code 😂

```mermaid
Core Concepts.download-icon {
            cursor: pointer;
            transform-origin: center;
        }
        .download-icon .arrow-part {
            transition: transform 0.35s cubic-bezier(0.35, 0.2, 0.14, 0.95);
             transform-origin: center;
        }
        button:has(.download-icon):hover .download-icon .arrow-part, button:has(.download-icon):focus-visible .download-icon .arrow-part {
          transform: translateY(-1.5px);
        }
        #mermaid-diagram-ric{font-family:var(--font-geist-sans);font-size:12px;fill:#000000;}#mermaid-diagram-ric .error-icon{fill:#552222;}#mermaid-diagram-ric .error-text{fill:#552222;stroke:#552222;}#mermaid-diagram-ric .edge-thickness-normal{stroke-width:1px;}#mermaid-diagram-ric .edge-thickness-thick{stroke-width:3.5px;}#mermaid-diagram-ric .edge-pattern-solid{stroke-dasharray:0;}#mermaid-diagram-ric .edge-thickness-invisible{stroke-width:0;fill:none;}#mermaid-diagram-ric .edge-pattern-dashed{stroke-dasharray:3;}#mermaid-diagram-ric .edge-pattern-dotted{stroke-dasharray:2;}#mermaid-diagram-ric .marker{fill:#666;stroke:#666;}#mermaid-diagram-ric .marker.cross{stroke:#666;}#mermaid-diagram-ric svg{font-family:var(--font-geist-sans);font-size:12px;}#mermaid-diagram-ric p{margin:0;}#mermaid-diagram-ric .label{font-family:var(--font-geist-sans);color:#000000;}#mermaid-diagram-ric .cluster-label text{fill:#333;}#mermaid-diagram-ric .cluster-label span{color:#333;}#mermaid-diagram-ric .cluster-label span p{background-color:transparent;}#mermaid-diagram-ric .label text,#mermaid-diagram-ric span{fill:#000000;color:#000000;}#mermaid-diagram-ric .node rect,#mermaid-diagram-ric .node circle,#mermaid-diagram-ric .node ellipse,#mermaid-diagram-ric .node polygon,#mermaid-diagram-ric .node path{fill:#eee;stroke:#999;stroke-width:1px;}#mermaid-diagram-ric .rough-node .label text,#mermaid-diagram-ric .node .label text{text-anchor:middle;}#mermaid-diagram-ric .node .katex path{fill:#000;stroke:#000;stroke-width:1px;}#mermaid-diagram-ric .node .label{text-align:center;}#mermaid-diagram-ric .node.clickable{cursor:pointer;}#mermaid-diagram-ric .arrowheadPath{fill:#333333;}#mermaid-diagram-ric .edgePath .path{stroke:#666;stroke-width:2.0px;}#mermaid-diagram-ric .flowchart-link{stroke:#666;fill:none;}#mermaid-diagram-ric .edgeLabel{background-color:white;text-align:center;}#mermaid-diagram-ric .edgeLabel p{background-color:white;}#mermaid-diagram-ric .edgeLabel rect{opacity:0.5;background-color:white;fill:white;}#mermaid-diagram-ric .labelBkg{background-color:rgba(255, 255, 255, 0.5);}#mermaid-diagram-ric .cluster rect{fill:hsl(0, 0%, 98.9215686275%);stroke:#707070;stroke-width:1px;}#mermaid-diagram-ric .cluster text{fill:#333;}#mermaid-diagram-ric .cluster span{color:#333;}#mermaid-diagram-ric div.mermaidTooltip{position:absolute;text-align:center;max-width:200px;padding:2px;font-family:var(--font-geist-sans);font-size:12px;background:hsl(-160, 0%, 93.3333333333%);border:1px solid #707070;border-radius:2px;pointer-events:none;z-index:100;}#mermaid-diagram-ric .flowchartTitleText{text-anchor:middle;font-size:18px;fill:#000000;}#mermaid-diagram-ric .flowchart-link{stroke:hsl(var(--gray-400));stroke-width:1px;}#mermaid-diagram-ric .marker,#mermaid-diagram-ric marker,#mermaid-diagram-ric marker *{fill:hsl(var(--gray-400))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-ric .label,#mermaid-diagram-ric text,#mermaid-diagram-ric text>tspan{fill:hsl(var(--black))!important;color:hsl(var(--black))!important;}#mermaid-diagram-ric .background,#mermaid-diagram-ric rect.relationshipLabelBox{fill:hsl(var(--white))!important;}#mermaid-diagram-ric .entityBox,#mermaid-diagram-ric .attributeBoxEven{fill:hsl(var(--gray-150))!important;}#mermaid-diagram-ric .attributeBoxOdd{fill:hsl(var(--white))!important;}#mermaid-diagram-ric .label-container,#mermaid-diagram-ric rect.actor{fill:hsl(var(--white))!important;stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-ric line{stroke:hsl(var(--gray-400))!important;}#mermaid-diagram-ric :root{--mermaid-font-family:var(--font-geist-sans);}🎯 Core Mechanics🫧 Blob Physics🎨 Visual Effects🖱️ InteractivityCollisionDeformationColorsBlendingMouse EventsCreation
```

## 🧬 The Bubble Blob Anatomy

### Base Structure

Each blob is a complex organism with the following vital statistics:

```typescript
class Ball {
  radius: number        // How big is our blob?
  point: Paper.Point    // Where is it in space?
  vector: Paper.Point   // Where is it going?
  numSegment: number    // How organic does it look?
  boundOffset: number[] // How much can it squish?
  path: Paper.Path      // How do we draw it?
}
```

Think of each blob as a water balloon that can:

- Stretch and squish on impact 💫
- Maintain its overall volume 🎈
- Glow with inner energy ✨


## 🎭 The Art of Blob Design

### Visual Philosophy

Blobs are designed with these principles:

1. **Organic Feel**: Each blob has multiple control points that create natural, fluid movement.


```typescript
// Creating the organic shape
for (let i = 0; i < this.numSegment; i++) {
  this.sidePoints.push(
    new Paper.Point({
      angle: (360 / this.numSegment) * i,
      length: 1
    })
  )
}
```

2. **Living Colors**: Each blob gets its own unique personality through color:


```typescript
this.path = new Paper.Path({
  fillColor: {
    hue: Math.random() * 360, // Every color of the rainbow!
    saturation: 1,            // Super vibrant
    brightness: 1             // Full of life
  },
  blendMode: 'lighter'       // The secret to the glow
})
```

## 🎪 The Physics Circus

### Movement & Collision

Blobs perform an intricate dance, following these rules:

1. **Basic Movement**:


```typescript
iterate() {
  // Check the borders (like a pac-man world!)
  this.checkBorders()
  
  // Don't get too excited
  if (this.vector.length > this.maxVec) 
    this.vector.length = this.maxVec
    
  // Move along!
  this.point = this.point.add(this.vector)
}
```

2. **Collision Magic**:


```typescript
react(b: Ball) {
  // When blobs meet...
  const dist = this.point.getDistance(b.point)
  if (dist < this.radius + b.radius && dist !== 0) {
    // They share a gentle bounce
    const overlap = this.radius + b.radius - dist
    const direc = this.point.subtract(b.point)
                           .normalize(overlap * 0.015)
    // Each one takes a step back
    this.vector = this.vector.add(direc)
    b.vector = b.vector.subtract(direc)
  }
}
```

------

## 🎮 Interactive Features

### Mouse Interaction

The blobs are social creatures that react to web user presence:

```typescript
attractToPoint(point: Paper.Point, force: number) {
  const direction = point.subtract(this.point)
  const distance = direction.length
  
  // Only interested if you're close enough
  if (distance < 200) {
    // The closer you are, the more they care
    const strength = (200 - distance) / 200 * force
    this.vector = this.vector.add(
      direction.normalize(strength)
    )
  }
}
```

## 🎬 Animation Loop

The main show runs continuously:

```typescript
Paper.view.onFrame = () => {
  // Everyone interacts with everyone
  for (let i = 0; i < balls.length - 1; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      balls[i].react(balls[j])
    }
  }
  
  // Update all the blobs
  for (let i = 0; i < balls.length; i++) {
    balls[i].attractToPoint(mousePos, 0.3)
    balls[i].iterate()
  }
}
```
------

## 🎯 Performance Tips

1. **Blob Population Control**:

1. Start with a reasonable number of blobs (18-20)
2. New blobs from clicks are slightly smaller
3. Consider implementing a maximum blob count



2. **Efficient Collision Detection**:

1. Only check each pair once
2. Use spatial partitioning for large numbers of blobs



3. **Smooth Animation**:

1. Limit vector magnitudes
2. Use requestAnimationFrame (handled by Paper.js)
3. Clean up event listeners when done


------


## 🎨 Customization Options

Want to make it your own? Try these modifications:

1. **Color Schemes**:


```typescript
fillColor: {
  hue: Math.random() * 360,
  saturation: 0.8, // Less saturated
  brightness: 0.9  // Slightly dimmer
}
```

2. **Physics Feel**:


```typescript
this.maxVec = 10    // Slower movement
this.numSegment = 8 // Less organic, more geometric
```

3. **Interaction Zones**:


```typescript
if (distance < 300) // Larger interaction area
```

## 🎉 Final Notes

Remember:

- The magic is in the details ♥️
- Every blob is unique 😂
- Physics should feel natural 🤌🏻
- Interactivity brings it to life 😍



---

This is my personal guide to blow my own mind  🚀
