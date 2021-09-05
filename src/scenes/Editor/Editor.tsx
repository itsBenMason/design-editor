import { Flex } from 'theme-ui'
import Navbar from '@scenes/Editor/Navbar/Navbar'
import Panels from '@scenes/Editor/Panels/Panels'
import Toolbox from '@scenes/Editor/Toolbox/Toolbox'
import CanvasArea from '@scenes/Editor/CanvasArea/CanvasArea'
import NotSupported from '@components/NotSupported'
import { useAppContext } from '@contexts/AppContext'
import Footer from '@scenes/Editor/Footer'
import { useEffect } from 'react'
import { useHandlers } from '@/uibox'
import api from '@/services/api'

function Editor() {
  const { isMobile } = useAppContext()
  const handlers = useHandlers()

  useEffect(() => {
    const handleSave = async (event: KeyboardEvent) => {
      if (handlers) {
        const template = handlers.templateHandler.exportTemplate()
        if (event.ctrlKey && event.code === 'KeyS') {
          event.preventDefault()
          const savedTemplate = await api.createTemplate(template)
          console.log({ savedTemplate })
        }
      }
    }
    window.addEventListener('keydown', handleSave)
    return () => {
      window.removeEventListener('keydown', handleSave)
    }
  }, [handlers])

  return (
    <Flex sx={{ flex: 1, flexDirection: 'column' }}>
      <Navbar />
      {isMobile === undefined ? (
        <div>Loading</div>
      ) : isMobile ? (
        <NotSupported />
      ) : (
        <Flex sx={{ flex: 1 }}>
          <Panels />
          <Flex
            sx={{
              flex: 1,
              flexDirection: 'column',
            }}
          >
            <Toolbox />
            <CanvasArea />
            <Footer />
          </Flex>
        </Flex>
      )}
    </Flex>
  )
}

export default Editor
