import { styled, ThemeProvider, DarkTheme } from 'baseui'
import { Button, SHAPE, KIND, SIZE } from 'baseui/button'
import Icons from '../icons'
import Logo from '@components/icons/Logo'
import { useHandlers } from '@scenify/sdk'
import { useState } from 'react'
import useAppContext from '@/hooks/useAppContext'
import Resize from './components/Resize'
import api from '@/services/api'

const Container = styled('div', props => ({
  height: '70px',
  background: props.$theme.colors.background,
  display: 'flex',
  padding: '0 2rem',
  justifyContent: 'space-between',
  alignItems: 'center',
}))

const LogoContainer = styled('div', props => ({
  color: props.$theme.colors.primary,
  display: 'flex',
  alignItems: 'center',
}))

function NavbarEditor() {
  const handlers = useHandlers()
  const { templates, setTemplates } = useAppContext()
  const [saving, setSaving] = useState(false)

  const downloadImage = async () => {
    if (handlers) {
      const data = await handlers.designHandler.toDataURL()
      if (data) {
        const a = document.createElement('a')
        a.href = data
        a.download = 'drawing.png'
        a.click()
      }
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
    <ThemeProvider theme={DarkTheme}>
      <Container>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <LogoContainer>
            <Logo size={40} />
          </LogoContainer>
          <Resize />
          <div>
            <Button
              onClick={() => {
                handlers.transactionHandler.undo()
              }}
              size={SIZE.default}
              kind={KIND.tertiary}
              shape={SHAPE.square}
            >
              <Icons.Undo size={24} />
            </Button>
            <Button
              onClick={() => {
                handlers.transactionHandler.redo()
              }}
              size={SIZE.default}
              kind={KIND.tertiary}
              shape={SHAPE.square}
            >
              <Icons.Redo size={24} />
            </Button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <Button onClick={handleSave} kind={KIND.tertiary}>
            {saving ? 'Saving' : 'Save'}
          </Button>
          <Button onClick={downloadImage} kind={KIND.primary}>
            Download
          </Button>
        </div>
      </Container>
    </ThemeProvider>
  )
}

export default NavbarEditor
