import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence 
} from 'react-native-reanimated';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { TripPlannerInput, TripPlan } from '@/types/tourism';
import { sampleItineraries } from '@/constants/tourismData';

export default function TripPlannerPage() {
  const [formData, setFormData] = useState<TripPlannerInput>({
    days: 3,
    interest: 'Nature',
    budget: 'Medium',
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<TripPlan[]>([]);
  const [showResults, setShowResults] = useState(false);

  // Animation for thinking indicator
  const rotation = useSharedValue(0);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const generatePlan = async () => {
    setIsGenerating(true);
    setShowResults(false);
    
    // Start rotation animation
    rotation.value = withRepeat(withTiming(360, { duration: 1000 }), -1);
    
    // Simulate AI processing
    setTimeout(() => {
      const plan = sampleItineraries[formData.interest] || sampleItineraries.Nature;
      setGeneratedPlan(plan.slice(0, formData.days));
      setIsGenerating(false);
      setShowResults(true);
      rotation.value = 0; // Stop rotation
    }, 3000);
  };

  const resetPlanner = () => {
    setShowResults(false);
    setGeneratedPlan([]);
    setFormData({
      days: 3,
      interest: 'Nature',
      budget: 'Medium',
    });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.section}>
        <Text style={styles.title}>AI Trip Planner</Text>
        <Text style={styles.subtitle}>
          Let our AI create a personalized itinerary based on your preferences
        </Text>

        <Card style={styles.formCard}>
          <Text style={styles.formTitle}>Plan Your Journey</Text>
          
          {/* Days Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.days}
                onValueChange={(itemValue) => setFormData(prev => ({ ...prev, days: itemValue }))}
                style={styles.picker}
              >
                <Picker.Item label="1 Day" value={1} />
                <Picker.Item label="2 Days" value={2} />
                <Picker.Item label="3 Days" value={3} />
                <Picker.Item label="4 Days" value={4} />
                <Picker.Item label="5 Days" value={5} />
              </Picker>
            </View>
          </View>

          {/* Interest Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Primary Interest</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.interest}
                onValueChange={(itemValue) => setFormData(prev => ({ ...prev, interest: itemValue }))}
                style={styles.picker}
              >
                <Picker.Item label="Nature & Wildlife" value="Nature" />
                <Picker.Item label="Culture & Heritage" value="Culture" />
                <Picker.Item label="Adventure Sports" value="Adventure" />
                <Picker.Item label="Spiritual Journey" value="Spiritual" />
              </Picker>
            </View>
          </View>

          {/* Budget Selection */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Budget Range</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.budget}
                onValueChange={(itemValue) => setFormData(prev => ({ ...prev, budget: itemValue }))}
                style={styles.picker}
              >
                <Picker.Item label="Budget (₹500-1000/day)" value="Low" />
                <Picker.Item label="Moderate (₹1000-2500/day)" value="Medium" />
                <Picker.Item label="Premium (₹2500+/day)" value="High" />
              </Picker>
            </View>
          </View>

          <Button
            title="Generate AI Itinerary"
            onPress={generatePlan}
            size="large"
            disabled={isGenerating}
            style={styles.generateButton}
          />
        </Card>

        {/* Loading Animation */}
        {isGenerating && (
          <Card style={styles.loadingCard}>
            <View style={styles.loadingContent}>
              <Animated.View style={[styles.loadingIcon, animatedStyle]}>
                <MaterialIcons name="psychology" size={48} color="#2563eb" />
              </Animated.View>
              <Text style={styles.loadingText}>AI is creating your perfect itinerary...</Text>
              <Text style={styles.loadingSubtext}>
                Analyzing {formData.interest.toLowerCase()} destinations, weather patterns, and local events
              </Text>
            </View>
          </Card>
        )}

        {/* Generated Itinerary */}
        {showResults && generatedPlan.length > 0 && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Your Personalized Itinerary</Text>
              <TouchableOpacity onPress={resetPlanner} style={styles.resetButton}>
                <MaterialIcons name="refresh" size={24} color="#2563eb" />
              </TouchableOpacity>
            </View>

            {generatedPlan.map((day, index) => (
              <Card key={day.id} style={styles.dayCard}>
                <View style={styles.dayHeader}>
                  <View style={styles.dayNumber}>
                    <Text style={styles.dayNumberText}>Day {day.day}</Text>
                  </View>
                  <View style={styles.weatherInfo}>
                    <MaterialIcons name="wb-sunny" size={16} color="#f59e0b" />
                    <Text style={styles.weatherText}>{day.weather}</Text>
                  </View>
                </View>

                <Text style={styles.attractionName}>{day.attraction}</Text>
                <Text style={styles.attractionDescription}>{day.description}</Text>
                <Text style={styles.categoryTag}>{day.category}</Text>

                <View style={styles.detailsContainer}>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="schedule" size={16} color="#64748b" />
                    <Text style={styles.detailText}>{day.estimatedTime}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <MaterialIcons name="attach-money" size={16} color="#64748b" />
                    <Text style={styles.detailText}>{day.estimatedCost}</Text>
                  </View>
                </View>
              </Card>
            ))}

            <Card style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Trip Summary</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total Duration:</Text>
                <Text style={styles.summaryValue}>{formData.days} Days</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Focus Area:</Text>
                <Text style={styles.summaryValue}>{formData.interest}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Budget Category:</Text>
                <Text style={styles.summaryValue}>{formData.budget}</Text>
              </View>
              <Button
                title="Book This Itinerary"
                onPress={() => {}}
                style={styles.bookButton}
              />
            </Card>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  formCard: {
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  pickerContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  picker: {
    height: 50,
  },
  generateButton: {
    marginTop: 12,
  },
  loadingCard: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingIcon: {
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    maxWidth: 280,
  },
  resultsSection: {
    marginTop: 20,
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  resetButton: {
    padding: 8,
  },
  dayCard: {
    marginBottom: 16,
  },
  dayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dayNumber: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dayNumberText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 12,
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  attractionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  attractionDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 8,
  },
  categoryTag: {
    fontSize: 12,
    color: '#2563eb',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  summaryCard: {
    marginTop: 16,
    backgroundColor: '#f0f9ff',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
  },
  bookButton: {
    marginTop: 16,
  },
});