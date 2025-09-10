import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { Guide } from '@/types/tourism';
import { verifiedGuides } from '@/constants/tourismData';

export default function GuidesPage() {
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('all');

  const specializations = ['all', 'Wildlife & Nature Tours', 'Cultural & Heritage Tours', 'Adventure & Trekking', 'Spiritual & Temple Tours'];

  const filteredGuides = verifiedGuides.filter(guide => 
    selectedSpecialization === 'all' || guide.specialization === selectedSpecialization
  );

  const renderGuide = ({ item }: { item: Guide }) => (
    <Card style={styles.guideCard}>
      <View style={styles.guideHeader}>
        <Image
          source={{ uri: `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face` }}
          style={styles.guidePhoto}
          contentFit="cover"
        />
        <View style={styles.guideInfo}>
          <View style={styles.guideNameRow}>
            <Text style={styles.guideName}>{item.name}</Text>
            {item.verified && (
              <View style={styles.verifiedBadge}>
                <MaterialIcons name="verified" size={20} color="#10b981" />
                <Text style={styles.verifiedText}>Verified</Text>
              </View>
            )}
          </View>
          <Text style={styles.guideSpecialization}>{item.specialization}</Text>
          <View style={styles.guideStats}>
            <View style={styles.statItem}>
              <MaterialIcons name="work" size={16} color="#64748b" />
              <Text style={styles.statText}>{item.experience} years experience</Text>
            </View>
            <View style={styles.statItem}>
              <MaterialIcons name="star" size={16} color="#f59e0b" />
              <Text style={styles.statText}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.guideDetails}>
        <Text style={styles.languagesTitle}>Languages Spoken:</Text>
        <View style={styles.languagesList}>
          {item.languages.map((language, index) => (
            <View key={index} style={styles.languageTag}>
              <Text style={styles.languageText}>{language}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.guideActions}>
        <Button
          title="View Profile"
          onPress={() => {}}
          variant="outline"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title="Book Guide"
          onPress={() => {}}
          size="small"
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Verified Local Guides</Text>
          <Text style={styles.subtitle}>
            Connect with experienced local tour guides who know Jharkhand inside out
          </Text>
        </View>

        {/* Verification Info */}
        <View style={styles.section}>
          <Card style={styles.verificationCard}>
            <View style={styles.verificationHeader}>
              <MaterialIcons name="security" size={32} color="#2563eb" />
              <Text style={styles.verificationTitle}>Guide Verification Process</Text>
            </View>
            <Text style={styles.verificationText}>
              All our guides undergo rigorous verification including background checks, 
              skill assessments, and customer feedback reviews to ensure quality service.
            </Text>
            <View style={styles.verificationSteps}>
              {[
                'Background Verification',
                'Skill Assessment',
                'Customer Reviews',
                'Continuous Monitoring'
              ].map((step, index) => (
                <View key={index} style={styles.verificationStep}>
                  <MaterialIcons name="check-circle" size={16} color="#10b981" />
                  <Text style={styles.verificationStepText}>{step}</Text>
                </View>
              ))}
            </View>
          </Card>
        </View>

        {/* Filter by Specialization */}
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Filter by Specialization</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {specializations.map((spec) => (
              <TouchableOpacity
                key={spec}
                style={[
                  styles.filterChip,
                  selectedSpecialization === spec && styles.activeFilterChip
                ]}
                onPress={() => setSelectedSpecialization(spec)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterChipText,
                  selectedSpecialization === spec && styles.activeFilterChipText
                ]}>
                  {spec === 'all' ? 'All Guides' : spec}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Guides List */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {selectedSpecialization === 'all' ? 'All Guides' : selectedSpecialization} 
            ({filteredGuides.length})
          </Text>
          <FlatList
            data={filteredGuides}
            renderItem={renderGuide}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>

        {/* Why Choose Verified Guides */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Verified Guides?</Text>
          <View style={styles.benefitsContainer}>
            {[
              {
                icon: 'local-police',
                title: 'Safety First',
                description: 'All guides are background verified for your safety and security'
              },
              {
                icon: 'school',
                title: 'Expert Knowledge',
                description: 'Deep local knowledge and cultural insights you will not find elsewhere'
              },
              {
                icon: 'translate',
                title: 'Language Support',
                description: 'Multi-lingual guides to bridge communication barriers'
              },
              {
                icon: 'money-off',
                title: 'Fair Pricing',
                description: 'Transparent pricing with no hidden costs or surprise charges'
              }
            ].map((benefit, index) => (
              <Card key={index} style={styles.benefitCard}>
                <MaterialIcons name={benefit.icon as any} size={40} color="#2563eb" />
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDescription}>{benefit.description}</Text>
              </Card>
            ))}
          </View>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 16,
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
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  verificationCard: {
    backgroundColor: '#f0f9ff',
    paddingVertical: 24,
  },
  verificationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  verificationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 12,
  },
  verificationText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  verificationSteps: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  verificationStep: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#ffffff',
    borderRadius: 16,
  },
  verificationStepText: {
    fontSize: 12,
    color: '#374151',
    marginLeft: 6,
  },
  filterSection: {
    paddingVertical: 16,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterChip: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748b',
  },
  activeFilterChipText: {
    color: '#ffffff',
  },
  guideCard: {
    marginBottom: 0,
  },
  guideHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  guidePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  guideInfo: {
    flex: 1,
  },
  guideNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  guideName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#166534',
    marginLeft: 4,
  },
  guideSpecialization: {
    fontSize: 14,
    color: '#2563eb',
    marginBottom: 8,
  },
  guideStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
    marginLeft: 4,
  },
  guideDetails: {
    marginBottom: 16,
  },
  languagesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  languagesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageTag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  languageText: {
    fontSize: 12,
    color: '#475569',
  },
  guideActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  actionButton: {
    flex: 1,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: '48%',
    alignItems: 'center',
    paddingVertical: 24,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  benefitDescription: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
});