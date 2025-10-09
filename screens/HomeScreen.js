import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  // Sample data - replace with real data from Firebase
  const [babyName, setBabyName] = useState('Baby Emma');
  const [heartRate, setHeartRate] = useState(120);
  const [temperature, setTemperature] = useState(36.8);
  const [oxygenSaturation, setOxygenSaturation] = useState(98);
  const [movement, setMovement] = useState('Normal');
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [deviceConnected, setDeviceConnected] = useState(true);
  const [hasAlerts, setHasAlerts] = useState(true);

  // Vital status indicators
  const getVitalStatus = (type, value) => {
    switch(type) {
      case 'heart':
        return value >= 100 && value <= 160 ? 'normal' : 'warning';
      case 'temp':
        return value >= 36.5 && value <= 37.5 ? 'normal' : 'warning';
      case 'oxygen':
        return value >= 95 ? 'normal' : 'warning';
      default:
        return 'normal';
    }
  };

  const VitalCard = ({ icon, title, value, unit, type, onPress }) => {
    const status = getVitalStatus(type, value);
    return (
      <TouchableOpacity 
        style={[styles.vitalCard, status === 'warning' && styles.vitalCardWarning]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={styles.vitalIconContainer}>
          <Ionicons name={icon} size={28} color={status === 'warning' ? '#FF5252' : '#0091EA'} />
        </View>
        <Text style={styles.vitalTitle}>{title}</Text>
        <Text style={[styles.vitalValue, status === 'warning' && styles.vitalValueWarning]}>
          {value}
        </Text>
        <Text style={styles.vitalUnit}>{unit}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.menuButton}
          onPress={() => navigation.openDrawer()}
        >
          <Ionicons name="menu" size={28} color="#0091EA" />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <Text style={styles.babyName}>{babyName}</Text>
          <Text style={styles.headerSubtitle}>Dashboard</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.notificationButton}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={26} color="#0091EA" />
          {hasAlerts && <View style={styles.notificationBadge} />}
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Device Status Card */}
        <View style={styles.deviceCard}>
          <View style={styles.deviceCardHeader}>
            <Ionicons name="watch" size={24} color="#0091EA" />
            <Text style={styles.deviceCardTitle}>Band Tracker</Text>
            <TouchableOpacity onPress={() => navigation.navigate('BandTracker')}>
              <Ionicons name="settings-outline" size={22} color="#666" />
            </TouchableOpacity>
          </View>
          <View style={styles.deviceStatus}>
            <View style={styles.deviceStatusItem}>
              <Ionicons 
                name={deviceConnected ? 'bluetooth' : 'bluetooth-outline'} 
                size={20} 
                color={deviceConnected ? '#4CAF50' : '#999'} 
              />
              <Text style={styles.deviceStatusText}>
                {deviceConnected ? 'Connected' : 'Disconnected'}
              </Text>
            </View>
            <View style={styles.deviceStatusItem}>
              <Ionicons name="battery-charging" size={20} color="#FF9800" />
              <Text style={styles.deviceStatusText}>{batteryLevel}%</Text>
            </View>
          </View>
        </View>

        {/* Real-Time Vitals Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Real-Time Vitals</Text>
          <TouchableOpacity onPress={() => navigation.navigate('VitalsTimeline')}>
            <Text style={styles.seeAllText}>View Timeline →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.vitalsGrid}>
          <VitalCard 
            icon="heart"
            title="Heart Rate"
            value={heartRate}
            unit="BPM"
            type="heart"
            onPress={() => navigation.navigate('HeartRateDetail', { value: heartRate })}
          />
          <VitalCard 
            icon="thermometer"
            title="Temperature"
            value={temperature}
            unit="°C"
            type="temp"
            onPress={() => navigation.navigate('TemperatureDetail', { value: temperature })}
          />
          <VitalCard 
            icon="water"
            title="Oxygen"
            value={oxygenSaturation}
            unit="%"
            type="oxygen"
            onPress={() => navigation.navigate('OxygenDetail', { value: oxygenSaturation })}
          />
          <VitalCard 
            icon="body"
            title="Movement"
            value={movement}
            unit=""
            type="movement"
            onPress={() => navigation.navigate('MovementDetail', { status: movement })}
          />
        </View>

        {/* Quick Insights */}
        <Text style={styles.sectionTitle}>Today's Insights</Text>
        <View style={styles.insightsCard}>
          <View style={styles.insightRow}>
            <View style={styles.insightItem}>
              <Ionicons name="moon" size={22} color="#9C27B0" />
              <View style={styles.insightContent}>
                <Text style={styles.insightLabel}>Sleep Duration</Text>
                <Text style={styles.insightValue}>8h 30m</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.insightRow}>
            <View style={styles.insightItem}>
              <Ionicons name="walk" size={22} color="#FF9800" />
              <View style={styles.insightContent}>
                <Text style={styles.insightLabel}>Movement Activity</Text>
                <Text style={styles.insightValue}>Moderate</Text>
              </View>
            </View>
          </View>

          <View style={styles.insightRow}>
            <View style={styles.insightItem}>
              <Ionicons name="analytics" size={22} color="#4CAF50" />
              <View style={styles.insightContent}>
                <Text style={styles.insightLabel}>Overall Status</Text>
                <Text style={styles.insightValue}>Healthy</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('AddChild')}
          >
            <Ionicons name="person-add" size={24} color="#0091EA" />
            <Text style={styles.actionText}>Add Child</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('PairDevice')}
          >
            <Ionicons name="wifi" size={24} color="#0091EA" />
            <Text style={styles.actionText}>Pair Device</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('VitalsTimeline')}
          >
            <Ionicons name="bar-chart" size={24} color="#0091EA" />
            <Text style={styles.actionText}>View History</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Ionicons name="settings" size={24} color="#0091EA" />
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Alerts */}
        {hasAlerts && (
          <>
            <Text style={styles.sectionTitle}>Recent Alerts</Text>
            <View style={styles.alertCard}>
              <View style={styles.alertItem}>
                <Ionicons name="warning" size={20} color="#FF9800" />
                <View style={styles.alertContent}>
                  <Text style={styles.alertTitle}>Temperature Alert</Text>
                  <Text style={styles.alertTime}>5 minutes ago</Text>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="home" size={24} color="#0091EA" />
          <Text style={[styles.navText, styles.navTextActive]}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('VitalsTimeline')}
        >
          <Ionicons name="stats-chart-outline" size={24} color="#999" />
          <Text style={styles.navText}>Timeline</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Notifications')}
        >
          <Ionicons name="notifications-outline" size={24} color="#999" />
          <Text style={styles.navText}>Alerts</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItem}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons name="person-outline" size={24} color="#999" />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
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
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  babyName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  notificationButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5252',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  deviceCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  deviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deviceCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  deviceStatus: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  deviceStatusItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deviceStatusText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#0091EA',
    fontWeight: '600',
  },
  vitalsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  vitalCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  vitalCardWarning: {
    borderWidth: 2,
    borderColor: '#FF5252',
  },
  vitalIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  vitalTitle: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  vitalValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  vitalValueWarning: {
    color: '#FF5252',
  },
  vitalUnit: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  insightsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  insightRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  insightItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  insightContent: {
    marginLeft: 12,
    flex: 1,
  },
  insightLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  insightValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  alertItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertContent: {
    marginLeft: 12,
    flex: 1,
  },
  alertTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  alertTime: {
    fontSize: 13,
    color: '#999',
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  navTextActive: {
    color: '#0091EA',
    fontWeight: '600',
  },
});