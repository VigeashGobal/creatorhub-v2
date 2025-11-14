import { Tabs } from 'expo-router'
import { MaterialIcons } from '@expo/vector-icons'

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard', tabBarIcon: ({ color, size }) => (<MaterialIcons name="dashboard" size={size} color={color} />) }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color, size }) => (<MaterialIcons name="travel-explore" size={size} color={color} />) }} />
      <Tabs.Screen name="finance" options={{ title: 'Finance', tabBarIcon: ({ color, size }) => (<MaterialIcons name="attach-money" size={size} color={color} />) }} />
      <Tabs.Screen name="workflow" options={{ title: 'Workflow', tabBarIcon: ({ color, size }) => (<MaterialIcons name="view-kanban" size={size} color={color} />) }} />
    </Tabs>
  )
}


