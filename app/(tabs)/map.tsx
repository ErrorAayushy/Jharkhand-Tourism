import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';

const jharkhandDistricts = [
  {
    id: 'ranchi',
    name: 'Ranchi',
    description: 'Capital city known for waterfalls, hills, and urban attractions',
    attractions: ['Rock Garden', 'Tagore Hill', 'Kanke Dam', 'Hundru Falls'],
    path: "M200,180 L250,160 L280,180 L300,220 L270,260 L220,280 L180,250 L170,210 Z"
  },
  {
    id: 'jamshedpur',
    name: 'East Singhbhum (Jamshedpur)',
    description: 'Steel city with modern infrastructure and cultural sites',
    attractions: ['Tata Steel Zoological Park', 'Jubilee Park', 'Dalma Hills'],
    path: "M320,280 L380,270 L400,300 L390,340 L350,360 L310,340 L300,300 Z"
  },
  {
    id: 'dhanbad',
    name: 'Dhanbad',
    description: 'Coal capital with mining heritage and natural beauty',
    attractions: ['Maithon Dam', 'Topchanchi Lake', 'Bhatinda Falls'],
    path: "M250,80 L320,70 L350,100 L340,140 L300,160 L240,150 L220,110 Z"
  },
  {
    id: 'bokaro',
    name: 'Bokaro',
    description: 'Steel city with parks and cultural attractions',
    attractions: ['City Park', 'Bokaro Steel Plant', 'Garga Dam'],
    path: "M180,120 L240,110 L280,130 L270,170 L230,180 L170,160 L160,140 Z"
  },
  {
    id: 'hazaribagh',
    name: 'Hazaribagh',
    description: 'Famous for Hazaribagh National Park and scenic beauty',
    attractions: ['Hazaribagh National Park', 'Canary Hill', 'Konar Dam'],
    path: "M120,100 L180,85 L220,110 L210,150 L170,170 L110,155 L90,125 Z"
  },
  {
    id: 'giridih',
    name: 'Giridih',
    description: 'Known for coal mines and natural landscapes',
    attractions: ['Parasnath Hills', 'Usri Falls', 'Khandoli Park'],
    path: "M220,60 L280,50 L320,70 L310,110 L270,130 L210,120 L190,80 Z"
  },
  {
    id: 'palamu',
    name: 'Palamu',
    description: 'Home to Betla National Park and tribal culture',
    attractions: ['Betla National Park', 'Palamu Fort', 'Netarhat'],
    path: "M60,160 L120,145 L160,165 L150,210 L100,230 L50,210 L40,180 Z"
  },
  {
    id: 'latehar',
    name: 'Latehar',
    description: 'Hill station known for Netarhat and scenic landscapes',
    attractions: ['Netarhat Hill Station', 'Lower Ghaghri Falls', 'Upper Ghaghri Falls'],
    path: "M90,220 L150,205 L180,225 L170,270 L130,290 L80,275 L70,240 Z"
  },
  {
    id: 'gumla',
    name: 'Gumla',
    description: 'Tribal heartland with waterfalls and forests',
    attractions: ['Tangnath Falls', 'Hapamuni Temple', 'Sita Falls'],
    path: "M120,280 L170,265 L200,285 L190,325 L150,345 L100,330 L90,295 Z"
  },
  {
    id: 'simdega',
    name: 'Simdega',
    description: 'Rich in mineral resources and tribal culture',
    attractions: ['Kolebira', 'Jaldega', 'Sarjamda Falls'],
    path: "M40,280 L90,270 L120,290 L110,330 L70,350 L30,335 L20,300 Z"
  },
  {
    id: 'west-singhbhum',
    name: 'West Singhbhum',
    description: 'Mining district with rich iron ore deposits',
    attractions: ['Chaibasa', 'Saranda Forest', 'Kharkai River'],
    path: "M150,320 L200,305 L240,325 L230,365 L190,385 L140,370 L130,340 Z"
  },
  {
    id: 'seraikela-kharsawan',
    name: 'Seraikela Kharsawan',
    description: 'Known for traditional Chhau dance and cultural heritage',
    attractions: ['Seraikela Palace', 'Kharkai Dam', 'Chhau Dance Center'],
    path: "M280,320 L340,310 L370,330 L360,370 L320,390 L270,375 L260,345 Z"
  }
];

export default function MapPage() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Jharkhand Districts</Text>
          <Text style={styles.subtitle}>
            Explore the 24 districts of Jharkhand and their unique attractions
          </Text>
        </View>

        {/* District Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Major Districts</Text>
          <View style={styles.districtsGrid}>
            {jharkhandDistricts.map((district) => (
              <Card key={district.id} style={styles.districtCard}>
                <View style={styles.districtInfo}>
                  <Text style={styles.districtName}>{district.name}</Text>
                  <Text style={styles.districtDescription}>{district.description}</Text>
                  
                  <Text style={styles.attractionsTitle}>Key Attractions:</Text>
                  <View style={styles.attractionsList}>
                    {district.attractions.map((attraction, index) => (
                      <View key={index} style={styles.attractionItem}>
                        <MaterialIcons name="place" size={16} color="#2563eb" />
                        <Text style={styles.attractionText}>{attraction}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </Card>
            ))}
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.section}>
          <Card style={styles.statsCard}>
            <Text style={styles.statsTitle}>Jharkhand at a Glance</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <MaterialIcons name="location-city" size={32} color="#2563eb" />
                <Text style={styles.statNumber}>24</Text>
                <Text style={styles.statLabel}>Total Districts</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="terrain" size={32} color="#059669" />
                <Text style={styles.statNumber}>79,716</Text>
                <Text style={styles.statLabel}>Area (km²)</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="people" size={32} color="#dc2626" />
                <Text style={styles.statNumber}>3.3M</Text>
                <Text style={styles.statLabel}>Population</Text>
              </View>
              <View style={styles.statItem}>
                <MaterialIcons name="landscape" size={32} color="#7c3aed" />
                <Text style={styles.statNumber}>100+</Text>
                <Text style={styles.statLabel}>Tourist Spots</Text>
              </View>
            </View>
          </Card>
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
    marginBottom: 16,
  },
  districtsGrid: {
    gap: 16,
  },
  districtCard: {
    marginBottom: 0,
  },
  districtInfo: {
    padding: 4,
  },
  districtName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  districtDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  attractionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
  },
  attractionsList: {
    gap: 6,
  },
  attractionItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  attractionText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 8,
  },
  statsCard: {
    paddingVertical: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 4,
  },
});