import { View, ScrollView, Text } from 'react-native'
import { Card, KpiCard } from '@creatorhub/ui'

export default function Dashboard() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0E1220' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#E9EEF7', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Daily Pulse</Text>
      <Text style={{ color: '#8A93A7', marginBottom: 16 }}>Creator Performance Analytics</Text>

      <View style={{ gap: 12 }}>
        <KpiCard label="This Month's Revenue" value="$35,400" delta="+22.5% vs last month" icon="users" />
        <KpiCard label="Upcoming Revenue" value="$25,500" delta="4 payments pending" icon="heart" />
        <KpiCard label="Monthly Goal Progress" value="101%" delta="Target exceeded" icon="eye" />
      </View>

      <View style={{ height: 12 }} />

      <Card>
        <Text style={{ color: '#E9EEF7', fontSize: 18, fontWeight: '600', marginBottom: 6 }}>Revenue Overview</Text>
        <Text style={{ color: '#8A93A7' }}>Mobile preview using shared components</Text>
      </Card>
    </ScrollView>
  )
}


