import { ObjectType, SCALE_FACTOR } from '../common/constants'

// type text static - dynamic
// type image static - dynamic
// type xxx static - dynamic
// type group static - dynamic
// type path static - dynamic

class ExportObject {
  run(item, options) {
    let object
    switch (item.type) {
      case ObjectType.STATIC_TEXT:
        object = this[ObjectType.STATIC_TEXT](item, options)
        break
    }
    return object
  }

  [ObjectType.STATIC_TEXT](item, options) {
    const baseOptions = this.getBaseOptions(item, options)
    const { fontFamily, textAlign, fontSize, fontWeight, charSpacing, lineHeight, fill, text, angle } = item
    const scaledFontSize = fontSize / SCALE_FACTOR
    const metadata = {
      ...item.metadata,
      angle,
      fill,
      fontWeight,
      charspacing: charSpacing,
      fontSize: scaledFontSize,
      template: text,
      fontFamily,
      textAlign,
      lineheight: lineHeight,
    }

    const object = {
      ...baseOptions,
      metadata,
    }

    return object
  }
  // dynamicText(item, sizeFormat, frameOptions) {
  //   const { type, subtype } = item
  //   const objectType = this.getObjectType(type, subtype)
  //   const baseOptions = this.getBaseOptions(item, sizeFormat, frameOptions)
  //   const { fontFamily, textAlign, fontSize, fontWeight, charSpacing, lineHeight, fill, text, angle } = item
  //   const { __fontFilename } = item.metadata
  //   const scaledFontSize = fontSize / SCALE_FACTOR
  //   const metadata = {
  //     ...item.metadata,
  //     angle,
  //     fill,
  //     fontWeight,
  //     charspacing: charSpacing,
  //     fontSize: scaledFontSize,
  //     template: text,
  //     fontFamily,
  //     textAlign,
  //     type: 'textbox',
  //     lineheight: lineHeight,
  //     __fontFilename,
  //   }

  //   const object = {
  //     ...objectType,
  //     ...baseOptions,
  //     metadata,
  //   }

  //   return object
  // }

  // staticImage(item, sizeFormat, options) {
  //   const { type, subtype } = item
  //   const objectType = this.getObjectType(type, subtype)
  //   const baseOptions = this.getBaseOptions(item, sizeFormat, options)
  //   const object = {
  //     ...objectType,
  //     ...baseOptions,
  //     metadata: {
  //       url: item.src,
  //     },
  //   }
  //   return object
  // }

  // dynamicImage(item, sizeFormat, frameOptions) {
  //   const { width, height, type, angle, subtype } = item
  //   const objectType = this.getObjectType(type, subtype)
  //   const baseOptions = this.getBaseOptions(item, sizeFormat, frameOptions)
  //   const { run_scaleToWidth } = item.metadata
  //   const metadata = {
  //     originX: 'center',
  //     originY: 'center',
  //     angle,
  //     width,
  //     height,
  //     ...(run_scaleToWidth && { run_scaleToWidth: baseOptions.size_x }),
  //   }
  //   const object = {
  //     ...objectType,
  //     ...baseOptions,
  //     ...(run_scaleToWidth && { size_x: 0, size_y: 0, run_scaleToWidth: baseOptions.size_x }),
  //     metadata,
  //   }

  //   return object
  // }

  getBaseOptions(item, options) {
    const { top, left, width, height, scaleX, scaleY, originX, originY, type } = item
    const baseOptions = {
      left: left / SCALE_FACTOR - options.left / SCALE_FACTOR,
      top: top / SCALE_FACTOR - options.top / SCALE_FACTOR,
      width: (width * scaleX) / SCALE_FACTOR,
      height: (height * scaleY) / SCALE_FACTOR,
      originX,
      originY,
      type,
    }
    return baseOptions
  }

  getObjectType(type, subtype) {
    // StaticImage DynamicImage
    // StaticText DynamicText
    // StaticGroup DynamicGroup
    // StaticPath DynamicPath
    if (type === 'image') {
      return {
        label: 'Static QR Code',
        res_type: 'qrc',
        var_type: 'static',
      }
    }
    if (type === 'StaticText') {
      return {
        label: 'txt',
        res_type: 'txt',
        var_type: 'static',
      }
    }

    if (type === 'DynamicText') {
      return {
        label: 'txt_template',
        res_type: 'txt_template',
        var_type: 'dynamic',
      }
    }
    switch ([type, subtype].join(':')) {
      case 'DynamicImage:qrc':
        return {
          label: 'qrc',
          res_type: 'qrc',
          var_type: 'dynamic',
        }
      case 'DynamicImage:img':
        return {
          label: 'img',
          res_type: 'img',
          var_type: 'dynamic',
        }
      case 'StaticImage:qrc':
        return {
          label: 'qrc',
          res_type: 'qrc',
          var_type: 'static',
        }
      case 'StaticImage:img':
        return {
          label: 'img',
          res_type: 'img',
          var_type: 'static',
        }
    }
  }
}

export default new ExportObject()
