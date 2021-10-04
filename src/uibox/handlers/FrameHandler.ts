import { fabric } from 'fabric'
// import { SCALE_FACTOR, ObjectType } from '../common/constants'
import BaseHandler from './BaseHandler'
// import { loadImageFromURL } from '../utils/image-loader'
import { HandlerOptions } from '../common/interfaces'
import { FrameOptions } from '../objects'
import { defaultFrameSize, SCALE_FACTOR } from '../common/constants'

class FrameHandler extends BaseHandler {
  frame
  options
  sizeFormat
  backgroundimage
  frameSize
  constructor(props: HandlerOptions) {
    super(props)
    // this.options = defaultFrameOptions
    this.frameSize = {
      width: 1280,
      height: 720,
    }
    this.initialize()
  }

  initialize() {
    const frame = new fabric.Frame({
      width: defaultFrameSize.width,
      height: defaultFrameSize.height,
      id: '',
      name: 'Initial Frame',
      fill: '#ffffff',
      hoverCursor: 'default',
    })
    this.canvas.add(frame)
    frame.center()
    const interval = setInterval(() => {
      if (this.root.scrollbarHandler && this.root.scrollbarHandler.updateScrollPosition) {
        this.root.scrollbarHandler.updateScrollPosition()
        clearInterval(interval)
      }
    }, 100)
  }

  get = () => {
    return this.canvas.getObjects().find(object => object.type === 'Frame')
  }

  update = options => {
    const frame = this.get()
    const { width, height } = this.scaleDimension(options)
    frame.set('width', width)
    frame.set('height', height)
    frame.center()
    this.root.zoomHandler.zoomToFit()
    this.context.setFrameSize(options)
    this.root.transactionHandler.save('frame:update')
  }

  setBackgroundColor = (color: string) => {
    const frame = this.get()
    frame.set('fill', color)
    this.canvas.renderAll()
  }

  setBackgroundImageURL = async url => {
    // this.removeBackgroundImage()
    // const frame = this.get()
    // const image = await loadImageFromURL(url)
    // const element = new fabric.BackgroundImage(image)
    // element.clipPath = frame
    // element.scaleToWidth(frame.width)
    // this.canvas.add(element)
    // element.center()
    // element.moveTo(1)
  }

  create = options => {
    const scaledSize = this.scaleDimension(options)
    const frame = new fabric.Frame({
      ...scaledSize,
      id: '',
      name: '',
      fill: '#ffffff',
      backgroundColor: '#ffffff',
    })
    this.canvas.add(frame)
    frame.center()
    this.context.setFrameSize(options)
  }

  getBackgroundImage = () => {
    // return this.canvas.getObjects().find(object => object.type === 'BackgroundImage')
  }

  removeBackgroundImage = () => {
    // const backgroundImage = this.getBackgroundImage()
    // if (backgroundImage) {
    //   this.canvas.remove(backgroundImage)
    // }
  }

  reset = () => {
    // const frame = this.get()
    // frame.set('fill', defaultFrameOptions.fill)
  }

  setSelectionBorder = () => {
    // const frame = this.root.frameHandler.get()
    // frame.setSelectionBorder()
  }

  getOptions = (): FrameOptions => {
    const frame = this.get()
    return frame.toJSON(this.root.propertiesToInclude)
  }

  scaleDimension = options => {
    const { width, height } = options
    return {
      height: height * SCALE_FACTOR,
      width: width * SCALE_FACTOR,
    }
  }

  getFitRatio = () => {
    const canvasWidth = this.canvas.getWidth() - 120
    const canvasHeight = this.canvas.getHeight() - 120
    const options = this.getOptions()
    let scaleX = canvasWidth / options.width
    let scaleY = canvasHeight / options.height
    if (options.height >= options.width) {
      scaleX = scaleY
      if (canvasWidth < options.width * scaleX) {
        scaleX = scaleX * (canvasWidth / (options.width * scaleX))
      }
    } else {
      if (canvasHeight < options.height * scaleX) {
        scaleX = scaleX * (canvasHeight / (options.height * scaleX))
      }
    }
    return scaleX
  }
}

export default FrameHandler
