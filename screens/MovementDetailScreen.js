import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function MovementDetailScreen({ navigation, route }) {
  const { status = 'Normal' } = route.params || {};
  
  // Movement activity log
  const movementLog = [
    { time: '10:30 AM', activity: 'Active', duration: '15 min', intensity: 'Moderate' },
    { time: '12:45 PM', activity: 'Resting', duration: '45 min', intensity: 'Low' },
    { time: '02:20 PM', activity: 'Active', duration: '20 min', intensity: 'High' },
    { time: '04:15 PM', activity: 'Sleep', duration: '120 min', intensity: 'None' },
  ];

  const getStatusColor = () => {
    if (status === 'High') return '#FF9800';
    if (status === 'Low' || status === 'No Movement') return '#FF5252';
    return '#4CAF50';
  };

  const getStatusIcon = () => {
    if (status === 'High') return 'alert-circle';
    if (status === 'Low' || status === 'No Movement') return 'warning';
    return 'checkmark-circle';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#0091EA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Body Movement</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Current Status Card */}
        <View style={styles.currentCard}>
          <View style={[styles.iconContainer, { backgroundColor: getStatusColor() + '20' }]}>
            <Ionicons name="body" size={48} color={getStatusColor()} />
          </View>
          <Text style={[styles.currentValue, { color: getStatusColor() }]}>{status}</Text>
          <Text style={styles.currentUnit}>Movement Status</Text>
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor() + '20' }]}>
            <Ionicons name={getStatusIcon()} size={16} color={getStatusColor()} />
            <Text style={[styles.statusText, { color: getStatusColor(), marginLeft: 6 }]}>
              {status === 'Normal' ? 'Healthy Activity' : 
               status === 'High' ? 'Increased Activity' : 
               'Reduced Activity'}
            </Text>
          </View>
        </View>

        {/* Statistics */}
        <View style={styles.statsCard}>
          <Text style={styles.cardTitle}>Today's Activity</Text>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Active Time</Text>
              <Text style={styles.statValue}>35 min</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Rest Time</Text>
              <Text style={styles.statValue}>45 min</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Sleep Time</Text>
              <Text style={styles.statValue}>8.5 hrs</Text>
            </View>
          </View>
        </View>

        {/* Movement Intensity Chart */}
        <View style={styles.chartCard}>
          <Text style={styles.cardTitle}>Movement Intensity</Text>
          <View style={styles.intensityContainer}>
            <View style={styles.intensityBar}>
              <View style={[styles.intensityFill, { width: '35%', backgroundColor: '#4CAF50' }]} />
            </View>
            <Text style={styles.intensityLabel}>Low: 35%</Text>
          </View>
          <View style={styles.intensityContainer}>
            <View style={styles.intensityBar}>
              <View style={[styles.intensityFill, { width: '50%', backgroundColor: '#FF9800' }]} />
            </View>
            <Text style={styles.intensityLabel}>Moderate: 50%</Text>
          </View>
          <View style={styles.intensityContainer}>
            <View style={styles.intensityBar}>
              <View style={[styles.intensityFill, { width: '15%', backgroundColor: '#FF5252' }]} />
            </View>
            <Text style={styles.intensityLabel}>High: 15%</Text>
          </View>
        </View>

        {/* Activity Log */}
        <View style={styles.logCard}>
          <Text style={styles.cardTitle}>Activity Log</Text>
          {movementLog.map((log, index) => (
            <View key={index} style={styles.logItem}>
              <View style={styles.logTime}>
                <Ionicons name="time" size={16} color="#999" />
                <Text style={styles.logTimeText}>{log.time}</Text>
              </View>
              <View style={styles.logDetails}>
                <Text style={styles.logActivity}>{log.activity}</Text>
                <Text style={styles.logMeta}>{log.duration} • {log.intensity}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Reference Information */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Understanding Movement Patterns</Text>
          <Text style={styles.infoText}>
            <Text style={styles.infoBold}>Normal Movement:</Text> Regular activity with periods of rest and sleep. Baby moves freely during awake times.{'\n\n'}
            <Text style={styles.infoBold}>High Movement:</Text> Increased activity may indicate discomfort, hunger, or overstimulation.{'\n\n'}
            <Text style={styles.infoBold}>Low/No Movement:</Text> Extended periods without movement during sleep are normal, but prolonged stillness while awake requires attention.
          </Text>
          <Text style={styles.warningText}>
            ⚠️ If baby shows no movement for extended periods while awake, or unusual movement patterns, consult your pediatrician.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6F7FF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#0091EA',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  currentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  currentValue: {
    fontSize: 32,
    fontWeight: '700',
  },
  currentUnit: {
    fontSize: 16,
    color: '#999',
    marginBottom: 16,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#F0F0F0',
  },
  chartCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  intensityContainer: {
    marginBottom: 16,
  },
  intensityBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 6,
  },
  intensityFill: {
    height: '100%',
    borderRadius: 6,
  },
  intensityLabel: {
    fontSize: 13,
    color: '#666',
  },
  logCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  logTime: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  logTimeText: {
    fontSize: 13,
    color: '#999',
    marginLeft: 6,
  },
  logDetails: {
    flex: 1,
  },
  logActivity: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  logMeta: {
    fontSize: 13,
    color: '#999',
  },
  infoCard: {
    backgroundColor: '#F3E5F5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#9C27B0',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  infoBold: {
    fontWeight: '600',
    color: '#333',
  },
  warningText: {
    fontSize: 13,
    color: '#FF5252',
    fontWeight: '600',
    lineHeight: 20,
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
  },
});