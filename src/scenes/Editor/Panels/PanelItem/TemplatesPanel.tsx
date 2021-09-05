import { useEffect, useState } from 'react'
import { Input, Grid, Box, Flex } from 'theme-ui'

import { useHandlers } from '@/uibox'
import { useAppContext } from '@/contexts/AppContext'

function TemplatesPanel() {
  const [search, setSearch] = useState('')
  const { templates } = useAppContext()
  const handlers = useHandlers()

  useEffect(() => {}, [search])

  return (
    <>
      <Box sx={{ padding: '2rem 2rem 1rem' }}>
        <Input
          onChange={e => setSearch(e.target.value)}
          style={{ background: '#fff' }}
          type="tel"
          placeholder="Search templates"
        />
      </Box>

      <Grid
        sx={{
          gridTemplateColumns: '1fr 1fr',
          gap: '1rem',
          padding: '1rem 2rem',
        }}
        className="objects-list"
      >
        {templates.map(template => (
          <Flex
            key={template.id}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
            }}
            onClick={() => handlers.templateHandler.importTemplate(template)}
          >
            <img width="100%" src={template.preview || 'https://via.placeholder.com/150'} alt="preview" />
          </Flex>
        ))}
      </Grid>
    </>
  )
}
export default TemplatesPanel
