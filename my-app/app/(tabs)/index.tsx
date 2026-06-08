import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  FlatList,
  Animated,
  Pressable,
  View,
} from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const [temperature, setTemperature] = useState('');
  const [history, setHistory] = useState<{ value: string; id: string }[]>([]);

  const addTemperature = () => {
    if (!temperature.trim()) return;

    setHistory(prev => [
      {
        value: temperature,
        id: Date.now().toString(),
      },
      ...prev,
    ]);

    setTemperature('');
  };

  const renderItem = ({ item, index }: any) => {
    const anim = new Animated.Value(0);

    Animated.timing(anim, {
      toValue: 1,
      duration: 300,
      delay: index * 80,
      useNativeDriver: true,
    }).start();

    return (
      <Animated.View
        style={[
          styles.item,
          {
            opacity: anim,
            transform: [
              {
                translateY: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [10, 0],
                }),
              },
            ],
          },
        ]}
      >
        <ThemedText style={styles.itemText}>
          🌡 {item.value}°C
        </ThemedText>
      </Animated.View>
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <ThemedText style={styles.title}>Temperature Tracker</ThemedText>
        <ThemedText style={styles.subtitle}>
          Track your daily temperature readings
        </ThemedText>
      </View>

      {/* INPUT CARD */}
      <View style={styles.card}>
        <TextInput
          placeholder="Enter temperature (°C)"
          placeholderTextColor="#999"
          value={temperature}
          onChangeText={setTemperature}
          keyboardType="numeric"
          style={styles.input}
        />

        <Pressable style={styles.button} onPress={addTemperature}>
          <ThemedText style={styles.buttonText}>Add Reading</ThemedText>
        </Pressable>
      </View>

      {/* LIST */}
      <FlatList
        data={history}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F6F8FC',
  },

  header: {
    marginTop: 40,
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
  },

  subtitle: {
    textAlign: 'center',
    color: '#666',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },

  input: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },

  button: {
    backgroundColor: '#208AEF',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },

  item: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },

  itemText: {
    fontSize: 16,
    fontWeight: '500',
  },
});