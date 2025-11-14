import { ScrollView, Text } from 'react-native'
import { Card, KpiCard } from '@creatorhub/ui'

export default function Explore() {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#0E1220' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#E9EEF7', fontSize: 24, fontWeight: '600', marginBottom: 8 }}>Explore Trends</Text>
      <Text style={{ color: '#8A93A7', marginBottom: 16 }}>Discover trending opportunities</Text>
      <KpiCard label="Trending Niches" value="12" delta="+3 this week" icon="users" />
      <KpiCard label="Revenue Opportunities" value="$2.4M" delta="Total potential" icon="heart" />
      <KpiCard label="Hot Hashtags" value="47" delta="+8 trending" icon="eye" />
      <Card>
        <Text style={{ color: '#C5CCDA' }}>Revenue Opportunities list...</Text>
      </Card>
    </ScrollView>
  )
}


