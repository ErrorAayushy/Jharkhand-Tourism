import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { MarketplaceItem } from '@/types/tourism';
import { marketplaceItems } from '@/constants/tourismData';

const { width } = Dimensions.get('window');

export default function MarketplacePage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'handicraft' | 'homestay'>('all');

  const filteredItems = marketplaceItems.filter(item => 
    activeFilter === 'all' || item.type === activeFilter
  );

  const renderItem = ({ item }: { item: MarketplaceItem }) => (
    <Card style={styles.itemCard}>
      <Image
        source={{ uri: `https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop` }}
        style={styles.itemImage}
        contentFit="cover"
      />
      <View style={styles.itemContent}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              <MaterialIcons name="star" size={16} color="#f59e0b" />
              <Text style={styles.ratingText}>{item.rating}</Text>
            </View>
          )}
        </View>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <View style={styles.itemFooter}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceText}>{item.price}</Text>
            <View style={[styles.typeTag, { backgroundColor: item.type === 'handicraft' ? '#dcfce7' : '#fef3c7' }]}>
              <Text style={[styles.typeText, { color: item.type === 'handicraft' ? '#166534' : '#92400e' }]}>
                {item.type === 'handicraft' ? 'Handicraft' : 'Homestay'}
              </Text>
            </View>
          </View>
          <Button
            title={item.type === 'handicraft' ? 'Buy Now' : 'Book Now'}
            onPress={() => {}}
            size="small"
            style={styles.actionButton}
          />
        </View>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Local Marketplace</Text>
          <Text style={styles.subtitle}>
            Discover authentic handicrafts and homestays from local artisans and families
          </Text>
        </View>

        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
            {[
              { key: 'all', label: 'All Items', count: marketplaceItems.length },
              { key: 'handicraft', label: 'Handicrafts', count: marketplaceItems.filter(i => i.type === 'handicraft').length },
              { key: 'homestay', label: 'Homestays', count: marketplaceItems.filter(i => i.type === 'homestay').length },
            ].map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterTab,
                  activeFilter === filter.key && styles.activeFilterTab
                ]}
                onPress={() => setActiveFilter(filter.key as any)}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.filterTabText,
                  activeFilter === filter.key && styles.activeFilterTabText
                ]}>
                  {filter.label} ({filter.count})
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Featured Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Items</Text>
          <FlatList
            data={filteredItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={1}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>

        {/* Support Local Artisans Section */}
        <View style={styles.section}>
          <Card style={styles.supportCard}>
            <View style={styles.supportHeader}>
              <MaterialIcons name="favorite" size={32} color="#dc2626" />
              <Text style={styles.supportTitle}>Support Local Artisans</Text>
            </View>
            <Text style={styles.supportDescription}>
              Every purchase directly supports local families and helps preserve traditional crafts 
              and cultural heritage of Jharkhand.
            </Text>
            <View style={styles.supportStats}>
              <View style={styles.supportStat}>
                <Text style={styles.supportStatNumber}>500+</Text>
                <Text style={styles.supportStatLabel}>Artisans Supported</Text>
              </View>
              <View style={styles.supportStat}>
                <Text style={styles.supportStatNumber}>50+</Text>
                <Text style={styles.supportStatLabel}>Villages Connected</Text>
              </View>
              <View style={styles.supportStat}>
                <Text style={styles.supportStatNumber}>20+</Text>
                <Text style={styles.supportStatLabel}>Craft Types</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Why Choose Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Our Marketplace</Text>
          <View style={styles.benefitsGrid}>
            {[
              { icon: 'verified', title: 'Authentic Products', desc: 'Genuine handicrafts from verified artisans' },
              { icon: 'local-shipping', title: 'Direct from Source', desc: 'Skip middlemen, support artisans directly' },
              { icon: 'security', title: 'Secure Payments', desc: 'Safe and secure payment processing' },
              { icon: 'support', title: '24/7 Support', desc: 'Customer support for all your queries' },
            ].map((benefit, index) => (
              <Card key={index} style={styles.benefitCard}>
                <MaterialIcons name={benefit.icon as any} size={32} color="#2563eb" />
                <Text style={styles.benefitTitle}>{benefit.title}</Text>
                <Text style={styles.benefitDesc}>{benefit.desc}</Text>
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
  filterContainer: {
    paddingVertical: 16,
  },
  filterScroll: {
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeFilterTab: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  activeFilterTabText: {
    color: '#ffffff',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 20,
  },
  itemCard: {
    overflow: 'hidden',
    marginBottom: 0,
  },
  itemImage: {
    width: '100%',
    height: 200,
  },
  itemContent: {
    padding: 16,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
    marginRight: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginLeft: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: '#64748b',
    lineHeight: 20,
    marginBottom: 16,
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  priceContainer: {
    flex: 1,
  },
  priceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  typeTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  actionButton: {
    minWidth: 100,
  },
  supportCard: {
    backgroundColor: '#fef2f2',
    paddingVertical: 24,
  },
  supportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  supportTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 12,
  },
  supportDescription: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  supportStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  supportStat: {
    alignItems: 'center',
  },
  supportStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#dc2626',
  },
  supportStatLabel: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitCard: {
    width: (width - 48) / 2,
    alignItems: 'center',
    paddingVertical: 20,
    marginBottom: 16,
  },
  benefitTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 4,
  },
  benefitDesc: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 16,
  },
});