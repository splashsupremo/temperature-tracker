import { ThemedView } from '@/components/themed-view';
import { ThemedText } from '@/components/themed-text';

export default function Profile() {
  return (
    <ThemedView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ThemedText type="title">👤 Profile</ThemedText>
      <ThemedText>Simple temperature tracking profile</ThemedText>
    </ThemedView>
  );
}