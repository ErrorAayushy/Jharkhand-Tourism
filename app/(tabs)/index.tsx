import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { useTheme } from '@/contexts/ThemeContext';

const { width } = Dimensions.get('window');

export default function HomePage() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();

  const features = [
    {
      icon: 'map',
      title: 'AI Trip Planner',
      description: 'Get personalized itineraries based on your preferences',
      color: '#3b82f6',
      route: 'planner',
    },
    {
      icon: 'store',
      title: 'Local Marketplace',
      description: 'Discover authentic handicrafts and homestays',
      color: '#10b981',
      route: 'marketplace',
    },
    {
      icon: 'people',
      title: 'Verified Guides',
      description: 'Connect with experienced local tour guides',
      color: '#f59e0b',
      route: 'guides',
    },
    {
      icon: 'location-on',
      title: 'Interactive Map',
      description: 'Explore districts and attractions visually',
      color: '#ef4444',
      route: 'map',
    },
  ];

  const handleFeaturePress = (route: string) => {
    router.push(`/(tabs)/${route}` as any);
  };

  const handleStartPlanning = () => {
    router.push('/(tabs)/planner');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} showsVerticalScrollIndicator={false}>
      {/* Hero Section */}
      <View style={styles.heroContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop' }}
          style={styles.heroImage}
          contentFit="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
          style={styles.heroOverlay}
        >
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Discover Jharkhand</Text>
            <Text style={styles.heroSubtitle}>
              Land of Forests, Waterfalls & Rich Culture
            </Text>
            <Text style={styles.heroDescription}>
              Experience the untouched beauty of India's mineral-rich state with pristine forests, 
              magnificent waterfalls, and vibrant tribal heritage.
            </Text>
            <Button
              title="Start Planning Your Trip"
              onPress={handleStartPlanning}
              size="large"
              style={styles.heroButton}
            />
          </View>
        </LinearGradient>
      </View>

      {/* Features Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Explore Our Services</Text>
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.featureCard} 
              activeOpacity={0.8}
              onPress={() => handleFeaturePress(feature.route)}
            >
              <Card style={styles.featureCardContent}>
                <View style={[styles.featureIcon, { backgroundColor: feature.color }]}>
                  <MaterialIcons name={feature.icon as any} size={28} color="#ffffff" />
                </View>
                <Text style={[styles.featureTitle, { color: colors.text }]}>{feature.title}</Text>
                <Text style={[styles.featureDescription, { color: colors.textSecondary }]}>{feature.description}</Text>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.section}>
        <Card style={{ backgroundColor: colors.cardBackground }}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Jharkhand at a Glance</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>24</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Districts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>5+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>National Parks</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>32</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Tribal Communities</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={[styles.statNumber, { color: colors.primary }]}>100+</Text>
              <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Waterfalls</Text>
            </View>
          </View>
        </Card>
      </View>

      {/* Popular Destinations Preview */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Popular Destinations</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.destinationsScroll}>
          {['Ranchi', 'Netarhat', 'Betla', 'Hazaribagh'].map((destination, index) => (
            <TouchableOpacity key={index} style={styles.destinationCard} activeOpacity={0.8}>
              <Image
                source={{ uri: `https://images.unsplash.com/photo-150${6905925346 + index}?w=300&h=200&fit=crop` }}
                style={styles.destinationImage}
                contentFit="cover"
              />
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.6)']}
                style={styles.destinationOverlay}
              >
                <Text style={styles.destinationName}>{destination}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroContainer: {
    height: 400,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    paddingHorizontal: 20,
    maxWidth: 600,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e2e8f0',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  heroButton: {
    minWidth: 200,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
  },
  featureCardContent: {
    alignItems: 'center',
    height: 180,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  destinationsScroll: {
    marginHorizontal: -16,
    paddingHorizontal: 16,
  },
  destinationCard: {
    width: 200,
    height: 150,
    marginRight: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  destinationImage: {
    width: '100%',
    height: '100%',
  },
  destinationOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  destinationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
});