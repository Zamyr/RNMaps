import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function App() {
  const [origin, setOrigin] = React.useState({});
  const [destination, setDestination] = React.useState({
    latitude: 29.098619,
    longitude: -111.002126,
  });

  const getLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  };

  useEffect(() => {
    getLocationPermission();
  }, []);

  const handleMarker = (coordinate, direction) => {
    if (direction === "origin") {
      setOrigin(coordinate);
    } else {
      setDestination(coordinate);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        userInterfaceStyle="dark"
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
      >
        <Marker
          draggable
          coordinate={destination}
          onDragEnd={(direction) =>
            handleMarker(direction.nativeEvent.coordinate, "destination")
          }
          title="Tacos Bravos"
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
