import { Flex, Input, Button } from 'theme-ui'
import { useState } from 'react'
import { DownloadIcon, LogoIcon } from './NavbarIcons'
import { useHandlers } from '@/uibox'
import api from '@/services/api'
import { useAppContext } from '@/contexts/AppContext'

function Navbar() {
  const handlers = useHandlers()
  const { templates, setTemplates } = useAppContext()
  const [templateName, setTemplateName] = useState('My First Design')
  const [saving, setSaving] = useState(false)

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
      const a = document.createElement('a')
      a.href = await toDataURL(image.source)

      a.download = 'drawing.png'
      a.click()
    }
  }

  const handleSave = async () => {
    if (handlers) {
      setSaving(true)
      const exportedTemplate = handlers.templateHandler.exportTemplate()
      const savedTemplate = await api.createTemplate(exportedTemplate)
      setTemplates([...templates, savedTemplate])
      setSaving(false)
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
        <Button
          sx={{
            height: '40px',
            display: 'flex',
            gap: '0.5rem',
            fontSize: '14px',
            fontWeight: 600,
            alignItems: 'center',
          }}
          variant="transparent"
          onClick={handleSave}
        >
          {saving ? 'Saving' : 'Save'}
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
