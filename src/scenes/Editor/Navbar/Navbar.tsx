import { Flex, Input, Button } from 'theme-ui'
import { useState } from 'react'
import { DownloadIcon, LogoIcon } from './NavbarIcons'
import { useHandlers } from '@/uibox'
import api from '@/services/api'

function Navbar() {
  const handlers = useHandlers()
  const [templateName, setTemplateName] = useState('My First Design')

  const toDataURL = (url: string) => {
    return fetch(url)
      .then(response => {
        return response.blob()
      })
      .then(blob => {
        return URL.createObjectURL(blob)
      })
  }
  const downloadImage = async () => {
    if (handlers) {
      const template = handlers.templateHandler.exportTemplate()
      const image = await api.downloadTemplate(template)
      // console.log({ image })
      const a = document.createElement('a')
      // a.href = image.source
      a.href = await toDataURL(image.source)

      a.download = 'drawing.png'
      a.click()
    }
  }

  return (
    <Flex
      sx={{
        fontFamily: 'Mukta',
        height: '60px',
        background: 'linear-gradient(90deg, #00c4cc, #7d2ae8)',
        justifyContent: 'space-between',
        color: '#fff',
        padding: '0 1rem',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <LogoIcon height="36px" />
      </Flex>

      <Flex sx={{ alignItems: 'center' }}>
        <Input
          sx={{ textAlign: 'center', border: 'none', outline: 0 }}
          value={templateName}
          onChange={e => setTemplateName(e.target.value)}
          placeholder="New template"
        />
      </Flex>
      <Flex sx={{ alignItems: 'center', gap: '1rem' }}>
        {/* <a
          style={{ color: '#fff', outline: 'none', marginLeft: '1rem' }}
          href="https://github.com/xorb/react-design-editor"
        >
          <IconButton>
            <GithubIcon />
          </IconButton>
        </a> */}

        <Button
          sx={{
            height: '40px',
            // color: 'text',
            display: 'flex',
            gap: '0.5rem',
            fontSize: '14px',
            fontWeight: 600,
            alignItems: 'center',
          }}
          variant="transparent"
          onClick={downloadImage}
        >
          Share
        </Button>

        <Button
          sx={{
            height: '40px',
            color: 'text',
            display: 'flex',
            gap: '0.5rem',
            fontSize: '14px',
            fontWeight: 600,
            alignItems: 'center',
          }}
          variant="white"
          onClick={downloadImage}
        >
          <DownloadIcon size={22} />
          Download
        </Button>
      </Flex>
    </Flex>
  )
}

export default Navbar
