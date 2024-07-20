import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}>{"<"}</Text>
      </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image source={require('./path_to_profile_image.png')} style={styles.profileImage} />
        <Text style={styles.profileName}>Anne</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('./path_to_edit_profile_icon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('./path_to_pregnancy_track_icon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Pregnancy Track</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('./path_to_location_icon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Location</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem}>
          <Image source={require('./path_to_logout_icon.png')} style={styles.menuIcon} />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E1E1', padding: 20 },
  backButton: { marginBottom: 10 },
  backButtonText: { fontSize: 18, color: '#6D4C41' },
  profileContainer: { alignItems: 'center', marginBottom: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  profileName: { fontSize: 24, fontWeight: 'bold', marginTop: 10 },
  menuContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menuItem: { width: '48%', backgroundColor: '#FFF', borderRadius: 10, padding: 20, alignItems: 'center', marginBottom: 20 },
  menuIcon: { width: 40, height: 40, marginBottom: 10 },
  menuText: { fontSize: 16, fontWeight: 'bold' },
});

export default ProfileScreen;
