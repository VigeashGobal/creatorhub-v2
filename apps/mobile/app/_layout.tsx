import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { Platform } from 'react-native'

export default function RootLayout() {
  useEffect(() => {
    // No-op placeholder for any future theme provider setup
  }, [])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  )
}


