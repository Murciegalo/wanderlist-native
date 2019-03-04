import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Reusable TripReportFooter Component used in TripReportCard and TripReportScreen.
export default function TripReportFooter(props) {
  const { tripReport, user, handlePress, onShare} = props;

  const listCountries = tripReport.countries.map(country => (
    <Text style={styles.country} key={country.id}>{country.name}</Text>
  ));
  
  return (
    <View style={{alignItems: 'center'}}>
      <View style={styles.line} />
      <View style={styles.countriesSection}>
          {listCountries}
        </View>
      <View style={styles.footer}>
        <View style={styles.favoriteButtonContainer}>
          {/* If the trip report favorite count is not 0, display the count. */}
          {
          (!!tripReport.favoriters.length) &&
          <Text style={styles.favoriteCount}>{tripReport.favoriters.length}</Text>
          }
          <TouchableOpacity 
            style={styles.favoriteButton}
            onPress={() => handlePress(tripReport.id)}
          >
          {/* Display border icon if Trip Report is not favorited. */}
          {
            tripReport.favoriters.includes(user.pk)
            ? <Icon name='favorite' size={25} />
            : <Icon name='favorite-border' size={25} />
          }
          </TouchableOpacity>
        </View>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => onShare(tripReport.slug)}
        >
          <Icon name='share' size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    height: 0,
    borderWidth: .3,
    width: '90%',
    marginTop: 10,
    marginBottom: 10
  },
  countriesSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  country: {
    marginRight: 5,
    marginLeft: 5,
    marginBottom: 5,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 5,
  },
  favoriteButtonContainer: {
    flexDirection: 'row',
  },
  favoriteCount: {
    fontSize: 18,
    marginRight: 2
  },
  favoriteButton: {
  },
  shareButton: {
  }
})