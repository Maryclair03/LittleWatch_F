import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function PairDeviceScreen({ navigation }) {
  const [scanning, setScanning] = useState(false);
  const [deviceFound, setDeviceFound] = useState(false);
  const [connecting, setConnecting] = useState(false);

  const handleScan = () => {
    setScanning(true);
    setDeviceFound(false);
    
    // Simulate scanning for device
    setTimeout(() => {
      setScanning(false);
      setDeviceFound(true);
    }, 3000);
  };

  const handleConnect = () => {
    setConnecting(true);
    
    // Simulate connection
    setTimeout(() => {
      setConnecting(false);
      Alert.alert(
        'Success!',
        'LittleWatch Band connected successfully',
        [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]
      );
    }, 2000);
  };

  useEffect(() => {
    // Auto-start scanning when screen loads
    handleScan();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#0091EA" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pair device</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Instructions */}
        <Text style={styles.instructions}>
          Make sure your LittleWatch Band is charged and nearby. The device will automatically search for available bands.
        </Text>

        {/* Device Visual Area */}
        <View style={styles.deviceArea}>
          {scanning ? (
            <>
              <View style={styles.scanningCircle}>
                <ActivityIndicator size="large" color="#0091EA" />
              </View>
              <Text style={styles.statusText}>Scanning for devices...</Text>
            </>
          ) : deviceFound ? (
            <>
              <View style={styles.deviceFoundContainer}>
                <Ionicons name="watch" size={80} color="#0091EA" />
              </View>
              <Text style={styles.deviceName}>LittleWatch Band</Text>
              <Text style={styles.deviceId}>ID: LW-12345</Text>
            </>
          ) : (
            <>
              <View style={styles.noDeviceContainer}>
                <Ionicons name="search" size={80} color="#B3E5FC" />
              </View>
              <Text style={styles.noDeviceText}>No device found</Text>
            </>
          )}
        </View>

        {/* Action Buttons */}
        {deviceFound ? (
          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
            disabled={connecting}
          >
            {connecting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.connectButtonText}>Connect</Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.scanButton, scanning && styles.scanButtonDisabled]}
            onPress={handleScan}
            disabled={scanning}
          >
            <Text style={styles.scanButtonText}>
              {scanning ? 'Scanning...' : 'Scan Again'}
            </Text>
          </TouchableOpacity>
        )}

        {/* Help Text */}
        <View style={styles.helpSection}>
          <Text style={styles.helpTitle}>Troubleshooting:</Text>
          <Text style={styles.helpText}>
            • Make sure Bluetooth is enabled{'\n'}
            • Keep the band within 3 meters{'\n'}
            • Restart the band if not detected{'\n'}
            • Check if the band is charged
          </Text>
        </View>
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
  instructions: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  deviceArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  scanningCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  deviceFoundContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E3F2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#0091EA',
  },
  noDeviceContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  statusText: {
    fontSize: 16,
    color: '#0091EA',
    fontWeight: '600',
  },
  deviceName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  deviceId: {
    fontSize: 14,
    color: '#999',
  },
  noDeviceText: {
    fontSize: 16,
    color: '#999',
  },
  connectButton: {
    backgroundColor: '#0091EA',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
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
  scanButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#0091EA',
    borderRadius: 30,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  scanButtonDisabled: {
    opacity: 0.5,
  },
  scanButtonText: {
    color: '#0091EA',
    fontSize: 16,
    fontWeight: '600',
  },
  helpSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
  },
  helpTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  helpText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
});