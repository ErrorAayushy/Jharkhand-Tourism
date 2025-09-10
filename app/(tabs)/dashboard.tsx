import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  withDelay
} from 'react-native-reanimated';
import Card from '@/components/ui/Card';
import { touristStats } from '@/constants/tourismData';

const { width } = Dimensions.get('window');

interface AnimatedBarProps {
  height: number;
  label: string;
  value: number;
  color: string;
  delay: number;
}

const AnimatedBar = ({ height, label, value, color, delay }: AnimatedBarProps) => {
  const animatedHeight = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    animatedHeight.value = withDelay(delay, withTiming(height, { duration: 800 }));
    opacity.value = withDelay(delay, withTiming(1, { duration: 600 }));
  }, [height, delay]);

  const animatedStyle = useAnimatedStyle(() => ({
    height: animatedHeight.value,
    opacity: opacity.value,
  }));

  return (
    <View style={styles.barContainer}>
      <View style={styles.barWrapper}>
        <Animated.View style={[styles.bar, { backgroundColor: color }, animatedStyle]} />
      </View>
      <Text style={styles.barLabel}>{label}</Text>
      <Text style={styles.barValue}>{(value / 1000).toFixed(0)}K</Text>
    </View>
  );
};

export default function DashboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('year');

  const maxVisitors = Math.max(...touristStats.map(stat => stat.visitors));
  const totalVisitors = touristStats.reduce((sum, stat) => sum + stat.visitors, 0);
  const avgVisitors = Math.round(totalVisitors / touristStats.length);

  const keyMetrics = [
    {
      title: 'Total Visitors',
      value: totalVisitors.toLocaleString(),
      icon: 'people',
      color: '#2563eb',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Average Monthly',
      value: avgVisitors.toLocaleString(),
      icon: 'trending-up',
      color: '#059669',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Peak Month',
      value: 'November',
      icon: 'star',
      color: '#dc2626',
      change: '62K visitors',
      changeType: 'neutral'
    },
    {
      title: 'Growth Rate',
      value: '15.3%',
      icon: 'analytics',
      color: '#7c3aed',
      change: 'YoY',
      changeType: 'increase'
    }
  ];

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Tourism Analytics</Text>
          <Text style={styles.subtitle}>
            Comprehensive insights into Jharkhand tourism trends and visitor statistics
          </Text>
        </View>

        {/* Key Metrics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Metrics</Text>
          <View style={styles.metricsGrid}>
            {keyMetrics.map((metric, index) => (
              <Card key={index} style={styles.metricCard}>
                <View style={styles.metricHeader}>
                  <View style={[styles.metricIcon, { backgroundColor: metric.color }]}>
                    <MaterialIcons name={metric.icon as any} size={24} color="#ffffff" />
                  </View>
                  <View style={[
                    styles.changeIndicator,
                    { backgroundColor: metric.changeType === 'increase' ? '#dcfce7' : '#f3f4f6' }
                  ]}>
                    <Text style={[
                      styles.changeText,
                      { color: metric.changeType === 'increase' ? '#166534' : '#6b7280' }
                    ]}>
                      {metric.change}
                    </Text>
                  </View>
                </View>
                <Text style={styles.metricValue}>{metric.value}</Text>
                <Text style={styles.metricTitle}>{metric.title}</Text>
              </Card>
            ))}
          </View>
        </View>

        {/* Visitor Trends Chart */}
        <View style={styles.section}>
          <Card style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Monthly Visitor Trends</Text>
              <Text style={styles.chartSubtitle}>Visitors per month in 2024</Text>
            </View>

            <View style={styles.chartContainer}>
              <View style={styles.yAxisLabels}>
                <Text style={styles.yAxisLabel}>60K</Text>
                <Text style={styles.yAxisLabel}>40K</Text>
                <Text style={styles.yAxisLabel}>20K</Text>
                <Text style={styles.yAxisLabel}>0</Text>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.barsContainer}
              >
                {touristStats.map((stat, index) => (
                  <AnimatedBar
                    key={stat.month}
                    height={(stat.visitors / maxVisitors) * 180}
                    label={stat.month}
                    value={stat.visitors}
                    color={index % 2 === 0 ? '#3b82f6' : '#60a5fa'}
                    delay={index * 100}
                  />
                ))}
              </ScrollView>
            </View>

            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#3b82f6' }]} />
                <Text style={styles.legendText}>Monthly Visitors</Text>
              </View>
            </View>
          </Card>
        </View>

        {/* Detailed Analytics */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Detailed Analysis</Text>
          
          <Card style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>Seasonal Trends</Text>
            <View style={styles.seasonsList}>
              {[
                { season: 'Winter (Nov-Feb)', percentage: 35, visitors: '201K', color: '#3b82f6' },
                { season: 'Summer (Mar-Jun)', percentage: 28, visitors: '169K', color: '#f59e0b' },
                { season: 'Monsoon (Jul-Oct)', percentage: 37, visitors: '182K', color: '#10b981' }
              ].map((season, index) => (
                <View key={index} style={styles.seasonItem}>
                  <View style={styles.seasonInfo}>
                    <Text style={styles.seasonName}>{season.season}</Text>
                    <Text style={styles.seasonVisitors}>{season.visitors} visitors</Text>
                  </View>
                  <View style={styles.seasonBar}>
                    <View 
                      style={[
                        styles.seasonProgress, 
                        { 
                          width: `${season.percentage}%`, 
                          backgroundColor: season.color 
                        }
                      ]} 
                    />
                  </View>
                  <Text style={styles.seasonPercentage}>{season.percentage}%</Text>
                </View>
              ))}
            </View>
          </Card>

          <Card style={styles.analysisCard}>
            <Text style={styles.analysisTitle}>Top Performing Months</Text>
            <View style={styles.topMonthsList}>
              {touristStats
                .sort((a, b) => b.visitors - a.visitors)
                .slice(0, 5)
                .map((stat, index) => (
                  <View key={stat.month} style={styles.topMonthItem}>
                    <View style={styles.topMonthRank}>
                      <Text style={styles.topMonthRankText}>{index + 1}</Text>
                    </View>
                    <View style={styles.topMonthInfo}>
                      <Text style={styles.topMonthName}>{stat.month}</Text>
                      <Text style={styles.topMonthValue}>{stat.visitors.toLocaleString()} visitors</Text>
                    </View>
                    <MaterialIcons name="trending-up" size={20} color="#10b981" />
                  </View>
                ))}
            </View>
          </Card>
        </View>

        {/* Insights */}
        <View style={styles.section}>
          <Card style={styles.insightsCard}>
            <Text style={styles.insightsTitle}>Key Insights</Text>
            <View style={styles.insightsList}>
              {[
                {
                  icon: 'insights',
                  title: 'Peak Season Impact',
                  description: 'Winter months show 40% higher visitor numbers due to pleasant weather'
                },
                {
                  icon: 'trending-up',
                  title: 'Growth Momentum',
                  description: 'Consistent 15% year-over-year growth in tourist arrivals'
                },
                {
                  icon: 'event',
                  title: 'Festival Effect',
                  description: 'November peak attributed to post-monsoon clarity and festival season'
                }
              ].map((insight, index) => (
                <View key={index} style={styles.insightItem}>
                  <MaterialIcons name={insight.icon as any} size={24} color="#2563eb" />
                  <View style={styles.insightContent}>
                    <Text style={styles.insightTitle}>{insight.title}</Text>
                    <Text style={styles.insightDescription}>{insight.description}</Text>
                  </View>
                </View>
              ))}
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 48) / 2,
    marginBottom: 16,
    paddingVertical: 20,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  changeIndicator: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 14,
    color: '#64748b',
  },
  chartCard: {
    paddingVertical: 20,
  },
  chartHeader: {
    marginBottom: 24,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1e293b',
    textAlign: 'center',
    marginBottom: 4,
  },
  chartSubtitle: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 220,
  },
  yAxisLabels: {
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginRight: 12,
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    paddingBottom: 20,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 6,
  },
  barWrapper: {
    height: 180,
    justifyContent: 'flex-end',
  },
  bar: {
    width: 20,
    borderRadius: 4,
  },
  barLabel: {
    fontSize: 10,
    color: '#64748b',
    marginTop: 8,
    textAlign: 'center',
  },
  barValue: {
    fontSize: 10,
    color: '#1e293b',
    fontWeight: '500',
    marginTop: 2,
    textAlign: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendText: {
    fontSize: 14,
    color: '#64748b',
  },
  analysisCard: {
    marginBottom: 16,
  },
  analysisTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
  },
  seasonsList: {
    gap: 16,
  },
  seasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seasonInfo: {
    flex: 1,
  },
  seasonName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1e293b',
  },
  seasonVisitors: {
    fontSize: 12,
    color: '#64748b',
  },
  seasonBar: {
    flex: 2,
    height: 8,
    backgroundColor: '#f1f5f9',
    borderRadius: 4,
    marginHorizontal: 12,
  },
  seasonProgress: {
    height: '100%',
    borderRadius: 4,
  },
  seasonPercentage: {
    fontSize: 12,
    fontWeight: '500',
    color: '#1e293b',
    minWidth: 32,
    textAlign: 'right',
  },
  topMonthsList: {
    gap: 12,
  },
  topMonthItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  topMonthRank: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  topMonthRankText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  topMonthInfo: {
    flex: 1,
  },
  topMonthName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1e293b',
  },
  topMonthValue: {
    fontSize: 12,
    color: '#64748b',
  },
  insightsCard: {
    backgroundColor: '#f0f9ff',
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  insightsList: {
    gap: 16,
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  insightContent: {
    flex: 1,
    marginLeft: 12,
  },
  insightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  insightDescription: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 16,
  },
});