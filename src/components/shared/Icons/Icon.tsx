import React from 'react'
import { createIconSet } from '@expo/vector-icons'
import { icons } from '../LineAwesomeIcons'

export interface Props {
  name?: string,
  size?: number,
  color?: string
}


interface GlyphObject {
  [key: string]: number
}

const Icon: React.FC<Props> = (props) => {
  let glyphs: GlyphObject = {}
  const roughGlyphs = icons.icons.map(icon => {
    return {
      name: icon.properties.name,
      code: icon.properties.code
    }
  })

  roughGlyphs.forEach(icon => glyphs[icon.name] = icon.code)

  const glyphMap = glyphs
  const CustomIcon = createIconSet(glyphMap, 'lineawesome', 'line-awesome.ttf');
  return (
    <CustomIcon name={props.name || 'envelope'} size={props.size || 24} color={props.color || 'blue'} />
  )
}

export default Icon