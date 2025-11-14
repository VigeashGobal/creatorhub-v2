import React from 'react'
import { View, Text, ViewProps } from 'react-native'
import { Card } from './Card'

export interface KpiCardProps extends ViewProps {
  label: string
  value: string
  delta?: string
  icon: 'users' | 'heart' | 'eye' | 'message'
}

export function KpiCard({ label, value, delta, style }: KpiCardProps) {
  return (
    <Card style={style}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: '#8A93A7' }}>{label}</Text>
      </View>
      <View style={{ marginTop: 8, flexDirection: 'row', alignItems: 'baseline', gap: 8 }}>
        <Text style={{ color: '#E9EEF7', fontSize: 28, fontWeight: '700' }}>{value}</Text>
        {delta ? (
          <Text style={{ fontSize: 12, color: '#C5CCDA' }}>{delta}</Text>
        ) : null}
      </View>
    </Card>
  )
}


