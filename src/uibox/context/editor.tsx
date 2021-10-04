import { FC, createContext, useState } from 'react'
import { fabric } from 'fabric'
import Handlers from '../handlers'
import { defaultFrameSize } from '../common/constants'

export interface IEditorContext {
  canvas: fabric.Canvas | null
  setCanvas: (canvas: fabric.Canvas) => void
  activeObject: fabric.Object | null
  setActiveObject: (object: fabric.Object | null) => void
  handlers: Handlers | null
  setHandlers: (handlers: Handlers) => void
  zoomRatio: number
  setZoomRatio: (value: number) => void
  frameSize: any
  setFrameSize: any
}

export const EditorContext = createContext<IEditorContext>({
  canvas: null,
  setCanvas: () => {},
  activeObject: null,
  setActiveObject: () => {},
  handlers: null,
  setHandlers: () => {},
  zoomRatio: 1,
  setZoomRatio: () => {},
  frameSize: 1,
  setFrameSize: 1,
})

export const EditorProvider: FC = ({ children }) => {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
  const [activeObject, setActiveObject] = useState<fabric.Object | null>(null)
  const [handlers, setHandlers] = useState<Handlers | null>(null)
  const [zoomRatio, setZoomRatio] = useState(1)
  const [frameSize, setFrameSize] = useState(defaultFrameSize)
  const context = {
    canvas,
    setCanvas,
    activeObject,
    setActiveObject,
    handlers,
    setHandlers,
    zoomRatio,
    setZoomRatio,
    frameSize,
    setFrameSize,
  }

  return <EditorContext.Provider value={context}>{children}</EditorContext.Provider>
}
