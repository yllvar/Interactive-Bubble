"use client"

import { useEffect, useRef } from "react"
import Paper from "paper"

class Ball {
  radius: number
  point: Paper.Point
  vector: Paper.Point
  maxVec: number
  numSegment: number
  boundOffset: number[]
  boundOffsetBuff: number[]
  sidePoints: Paper.Point[]
  path: Paper.Path

  constructor(r: number, p: Paper.Point, v: Paper.Point) {
    this.radius = r
    this.point = p
    this.vector = v
    this.maxVec = 15
    this.numSegment = Math.floor(r / 3 + 2)
    this.boundOffset = []
    this.boundOffsetBuff = []
    this.sidePoints = []
    this.path = new Paper.Path({
      fillColor: {
        hue: Math.random() * 360,
        saturation: 1,
        brightness: 1,
      },
      blendMode: "lighter",
    })

    for (let i = 0; i < this.numSegment; i++) {
      this.boundOffset.push(this.radius)
      this.boundOffsetBuff.push(this.radius)
      this.path.add(new Paper.Point())
      this.sidePoints.push(
        new Paper.Point({
          angle: (360 / this.numSegment) * i,
          length: 1,
        }),
      )
    }
  }

  iterate() {
    this.checkBorders()
    if (this.vector.length > this.maxVec) this.vector.length = this.maxVec
    this.point = this.point.add(this.vector)
    this.updateShape()
  }

  checkBorders() {
    const size = Paper.view.size
    if (this.point.x < -this.radius) this.point.x = size.width + this.radius
    if (this.point.x > size.width + this.radius) this.point.x = -this.radius
    if (this.point.y < -this.radius) this.point.y = size.height + this.radius
    if (this.point.y > size.height + this.radius) this.point.y = -this.radius
  }

  updateShape() {
    const segments = this.path.segments
    for (let i = 0; i < this.numSegment; i++) {
      segments[i].point = this.getSidePoint(i)
    }

    this.path.smooth()
    for (let i = 0; i < this.numSegment; i++) {
      if (this.boundOffset[i] < this.radius / 4) this.boundOffset[i] = this.radius / 4
      const next = (i + 1) % this.numSegment
      const prev = i > 0 ? i - 1 : this.numSegment - 1
      let offset = this.boundOffset[i]
      offset += (this.radius - offset) / 15
      offset += ((this.boundOffset[next] + this.boundOffset[prev]) / 2 - offset) / 3
      this.boundOffsetBuff[i] = this.boundOffset[i] = offset
    }
  }

  react(b: Ball) {
    const dist = this.point.getDistance(b.point)
    if (dist < this.radius + b.radius && dist !== 0) {
      const overlap = this.radius + b.radius - dist
      const direc = this.point.subtract(b.point).normalize(overlap * 0.015)
      this.vector = this.vector.add(direc)
      b.vector = b.vector.subtract(direc)

      this.calcBounds(b)
      b.calcBounds(this)
      this.updateBounds()
      b.updateBounds()
    }
  }

  getBoundOffset(b: Paper.Point) {
    const diff = this.point.subtract(b)
    const angle = (diff.angle + 180) % 360
    return this.boundOffset[Math.floor((angle / 360) * this.boundOffset.length)]
  }

  calcBounds(b: Ball) {
    for (let i = 0; i < this.numSegment; i++) {
      const tp = this.getSidePoint(i)
      const bLen = b.getBoundOffset(tp)
      const td = tp.getDistance(b.point)
      if (td < bLen) {
        this.boundOffsetBuff[i] -= (bLen - td) / 2
      }
    }
  }

  getSidePoint(index: number) {
    return this.point.add(this.sidePoints[index].multiply(this.boundOffset[index]))
  }

  updateBounds() {
    for (let i = 0; i < this.numSegment; i++) this.boundOffset[i] = this.boundOffsetBuff[i]
  }

  attractToPoint(point: Paper.Point, force: number) {
    const direction = point.subtract(this.point)
    const distance = direction.length
    if (distance < 200) {
      // Only affect balls within 200 pixels
      const strength = ((200 - distance) / 200) * force
      this.vector = this.vector.add(direction.normalize(strength))
    }
  }
}

export default function PaperAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Setup Paper.js
    Paper.setup(canvasRef.current)

    // Create balls
    const balls: Ball[] = []
    const numBalls = 18

    for (let i = 0; i < numBalls; i++) {
      const position = Paper.Point.random().multiply(Paper.view.size)
      const vector = new Paper.Point({
        angle: 360 * Math.random(),
        length: Math.random() * 10,
      })
      const radius = Math.random() * 60 + 60
      balls.push(new Ball(radius, position, vector))
    }

    // Track mouse position
    let mousePos = new Paper.Point(0, 0)

    Paper.view.onMouseMove = (event: Paper.MouseEvent) => {
      mousePos = event.point
    }

    // Add new balls on click
    Paper.view.onMouseDown = (event: Paper.MouseEvent) => {
      const radius = Math.random() * 40 + 40 // Slightly smaller balls for clicks
      const vector = new Paper.Point({
        angle: 360 * Math.random(),
        length: Math.random() * 15,
      })
      const newBall = new Ball(radius, event.point, vector)
      balls.push(newBall)
    }

    // Animation frame
    Paper.view.onFrame = () => {
      // Ball interactions
      for (let i = 0; i < balls.length - 1; i++) {
        for (let j = i + 1; j < balls.length; j++) {
          balls[i].react(balls[j])
        }
      }

      // Update balls and apply mouse attraction
      for (let i = 0; i < balls.length; i++) {
        balls[i].attractToPoint(mousePos, 0.3) // Subtle attraction to mouse
        balls[i].iterate()
      }
    }

    // Cleanup
    return () => {
      Paper.project.clear()
      Paper.view.onFrame = null
      Paper.view.onMouseMove = null
      Paper.view.onMouseDown = null
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" style={{ background: "black" }} />
}

