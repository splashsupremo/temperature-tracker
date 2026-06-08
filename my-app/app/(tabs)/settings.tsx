import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Settings() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">⚙️ Settings</ThemedText>
      <ThemedText>App preferences will go here</ThemedText>
    </ThemedView>
  );
}