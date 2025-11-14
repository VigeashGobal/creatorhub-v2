import { ScrollView, Text } from 'react-native'
import { Card, KpiCard } from '@creatorhub/ui'

export default function Workflow() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0E1220' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#E9EEF7', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Workflow Tools</Text>
      <Text style={{ color: '#8A93A7', marginBottom: 16 }}>Streamline your process</Text>
      <KpiCard label="August Revenue" value="$22.4K" delta="89.6% of $25K goal" icon="users" />
      <KpiCard label="September Target" value="$30K" delta="+20% increase" icon="heart" />
      <KpiCard label="October Target" value="$35K" delta="+16.7% increase" icon="eye" />
      <Card>
        <Text style={{ color: '#C5CCDA' }}>Action items list (mobile)</Text>
      </Card>
    </ScrollView>
  )
}


