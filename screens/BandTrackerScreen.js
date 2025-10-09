import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function BandTrackerScreen({ navigation }) {
  const [isConnected, setIsConnected] = useState(true);
  const [batteryLevel, setBatteryLevel] = useState(85);
  const [notifications, setNotifications] = useState(true);

  const handleDisconnect = () => {
    Alert.alert(
      'Disconnect Device',
      'Are you sure you want to disconnect the band tracker?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Disconnect',
          style: 'destructive',
          onPress: () => {
            setIsConnected(false);
            Alert.alert('Disconnected', 'Band tracker has been disconnected');
          },
        },
      ]
    );
  };

  const handleConnect = () => {
    navigation.navigate('PairDevice');
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
        <Text style={styles.headerTitle}>Band Tracker</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#0091EA" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Device Visual */}
        <View style={styles.deviceVisual}>
          <View style={styles.deviceImageContainer}>
            <Ionicons name="watch" size={80} color={isConnected ? '#0091EA' : '#999'} />
          </View>
          <Text style={styles.deviceName}>LittleWatch Band</Text>
          <View style={[
            styles.statusBadge,
            { backgroundColor: isConnected ? '#E8F5E9' : '#FFEBEE' }
          ]}>
            <Text style={[
              styles.statusText,
              { color: isConnected ? '#4CAF50' : '#F44336' }
            ]}>
              {isConnected ? 'Connected' : 'Disconnected'}
            </Text>
          </View>
        </View>

        {/* Battery Status */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Battery Status</Text>
          <View style={styles.batteryContainer}>
            <View style={styles.batteryInfo}>
              <Ionicons 
                name="battery-charging" 
                size={32} 
                color={batteryLevel > 20 ? '#4CAF50' : '#FF9800'} 
              />
              <Text style={styles.batteryLevel}>{batteryLevel}%</Text>
            </View>
            <View style={styles.batteryBar}>
              <View 
                style={[
                  styles.batteryFill,
                  { 
                    width: `${batteryLevel}%`,
                    backgroundColor: batteryLevel > 20 ? '#4CAF50' : '#FF9800'
                  }
                ]} 
              />
            </View>
            <Text style={styles.batteryNote}>
              {batteryLevel > 50 ? 'Good battery level' : 
               batteryLevel > 20 ? 'Consider charging soon' : 
               'Low battery - charge now'}
            </Text>
          </View>
        </View>

        {/* Connection Details */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Connection Details</Text>
          <View style={styles.detailRow}>
            <Ionicons name="bluetooth" size={20} color="#0091EA" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Connection Type</Text>
              <Text style={styles.detailValue}>Bluetooth LE</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="wifi" size={20} color="#0091EA" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Signal Strength</Text>
              <Text style={styles.detailValue}>Excellent</Text>
            </View>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="time" size={20} color="#0091EA" />
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Last Synced</Text>
              <Text style={styles.detailValue}>Just now</Text>
            </View>
          </View>
        </View>

        {/* Settings */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Settings</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingLeft}>
              <Ionicons name="notifications" size={20} color="#0091EA" />
              <Text style={styles.settingLabel}>Push Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#D1D1D1', true: '#B3E5FC' }}
              thumbColor={notifications ? '#0091EA' : '#f4f3f4'}
            />
          </View>
        </View>

        {/* Action Buttons */}
        {isConnected ? (
          <TouchableOpacity 
            style={styles.disconnectButton}
            onPress={handleDisconnect}
          >
            <Text style={styles.disconnectButtonText}>Disconnect Device</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            style={styles.connectButton}
            onPress={handleConnect}
          >
            <Text style={styles.connectButtonText}>Connect Device</Text>
          </TouchableOpacity>
        )}
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
  settingsButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  deviceVisual: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  deviceImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  deviceName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
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
  batteryContainer: {
    alignItems: 'center',
  },
  batteryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  batteryLevel: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginLeft: 12,
  },
  batteryBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  batteryFill: {
    height: '100%',
    borderRadius: 6,
  },
  batteryNote: {
    fontSize: 13,
    color: '#999',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  detailContent: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontSize: 13,
    color: '#999',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingLabel: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
  },
  disconnectButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#F44336',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  disconnectButtonText: {
    color: '#F44336',
    fontSize: 16,
    fontWeight: '600',
  },
  connectButton: {
    backgroundColor: '#0091EA',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#0091EA',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});