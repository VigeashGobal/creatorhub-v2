import { ScrollView, Text } from 'react-native'
import { Card, KpiCard } from '@creatorhub/ui'

export default function Finance() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0E1220' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#E9EEF7', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Finance</Text>
      <Text style={{ color: '#8A93A7', marginBottom: 16 }}>Revenue & Payments</Text>
      <KpiCard label="Available Balance" value="$24,680" delta="+12.5% this month" icon="users" />
      <KpiCard label="Pending Payments" value="$15,200" delta="3 upcoming" icon="heart" />
      <KpiCard label="This Month's Revenue" value="$35,400" delta="+22.5%" icon="eye" />
      <Card>
        <Text style={{ color: '#C5CCDA' }}>Monthly earnings chart (mobile)</Text>
      </Card>
    </ScrollView>
  )
}


