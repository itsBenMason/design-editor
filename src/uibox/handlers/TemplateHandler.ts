import exportObject from '../utils/fabricToObject'
import objectToFabric from '../utils/objectToFabric'
import BaseHandler from './BaseHandler'

class TemplateHandler extends BaseHandler {
  exportTemplate() {
    const canvasJSON: any = this.canvas.toJSON(this.root.propertiesToInclude)
    console.log({ canvasJSON })
    const frameOptions = this.root.frameHandler.getOptions()

    const template = {
      name: 'Untitled design',
      objects: [],
      frame: {
        width: frameOptions.width,
        height: frameOptions.height,
      },
    }

    const objects = canvasJSON.objects.filter(
      object => object.type !== 'Frame' && object.type !== 'BackgroundImage'
    )
    objects.forEach(object => {
      const exportedObject = exportObject.run(object, frameOptions)
      template.objects = template.objects.concat(exportedObject)
    })

    // return template
    return template
  }

  async importTemplate(options) {
    // this.root.objectHandler.clear(true)
    // const { size_format, template } = options
    // const sizeFormat = parseSizeFormat(size_format)
    // this.root.frameHandler.create({ ...sizeFormat, isPortrait: size_format.isPortrait })
    // const backgroundColor = template.metadata?.bg_color || '#ffffff'
    // const backgroundImage = template.bg_img?.original_url
    // if (backgroundImage) {
    //   this.root.frameHandler.setBackgroundImageURL(backgroundImage)
    // } else {
    //   this.root.frameHandler.setBackgroundColor(backgroundColor)
    // }
    // const frameOptions = this.root.frameHandler.getOptions()
    // const adTemplateVars = template.ad_template_vars
    // for (const adTemplateVar of adTemplateVars) {
    //   const element = await objectToFabric.run(
    //     adTemplateVar,
    //     { ...sizeFormat, isPortrait: size_format.isPortrait },
    //     frameOptions
    //   )
    //   if (element) {
    //     this.canvas.add(element)
    //   } else {
    //     console.log('UNABLE TO LOAD OBJECT: ', adTemplateVar)
    //   }
    // }
    // this.root.transactionHandler.save('template:load')
    // if (!options.local) {
    //   this.root.transactionHandler.clear()
    // }
    // this.root.zoomHandler.zoomToFit()
  }
}
export default TemplateHandler
