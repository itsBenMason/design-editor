import { useContext } from 'react'
import { EditorContext } from '../context'

export function useEditorContext() {
  const { setCanvas, canvas, activeObject, setActiveObject, zoomRatio, frameSize, setFrameSize } = useContext(
    EditorContext
  )

  return {
    setCanvas,
    canvas,
    activeObject,
    setActiveObject,
    zoomRatio,
    frameSize,
    setFrameSize,
  }
}
