import { Flex } from 'theme-ui'
import Navbar from '@/scenes/Editor/Navbar/Navbar'
import Panels from '@/scenes/Editor/Panels/Panels'
import Toolbox from '@/scenes/Editor/Toolbox/Toolbox'
import CanvasArea from '@/scenes/Editor/CanvasArea/CanvasArea'
import NotSupported from '@components/NotSupported'
import { useAppContext } from '@contexts/app/AppContext'
import Footer from '@/scenes/Editor/Footer'

function Editor() {
  const { isMobile } = useAppContext()

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
