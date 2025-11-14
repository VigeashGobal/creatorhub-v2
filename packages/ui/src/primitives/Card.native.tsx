import React from 'react'
import { View, ViewProps } from 'react-native'

export interface CardProps extends ViewProps {
  children: React.ReactNode
}

export function Card({ style, children, ...rest }: CardProps) {
  return (
    <View
      style={[
        {
          backgroundColor: '#12172A',
          borderColor: 'rgba(255,255,255,0.06)',
          borderWidth: 1,
          borderRadius: 16,
          padding: 16,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  )
}


