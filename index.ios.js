// /**
//  * Sample React Native App
//  * https://github.com/facebook/react-native
//  */
// 'use strict';
// var test = require('react-native-mapbox-gl');
// var React = require('react-native');
// var {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
// } = React;

// var test = React.createClass({
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('test', () => test);

'use strict';

var React = require('react-native');
var MapboxGLMap = require('react-native-mapbox-gl');
var mapRef = 'mapRef';
var {
  AppRegistry,
  StyleSheet,
  Text,
  StatusBarIOS,
  View,
} = React;

var test = React.createClass({
  mixins: [MapboxGLMap.Mixin],
  getInitialState() {
    return {
       center: {
         latitude: 40.72052634,
         longitude: -73.97686958312988
       },
       zoom: 11,
       annotations: [{
         latitude: 40.72052634,
         longitude:  -73.97686958312988,
         title: 'This is marker 1',
         subtitle: 'It has a rightCalloutAccessory too',
         rightCalloutAccessory: {
             url: 'http://png-3.findicons.com/files/icons/2799/flat_icons/256/gear.png',
             height: 25,
             width: 25
         }
       },{
         latitude: 40.714541341726175,
         longitude:  -74.00579452514648,
         title: 'Important!',
         subtitle: 'Neat, this is a subtitle'
       }]
     };
  },
  onRegionChange(location) {
    this.setState({ currentZoom: location.zoom });
  },
  onRegionWillChange(location) {
    console.log(location);
  },
  onUpdateUserLocation(location) {
    console.log(location);
  },
  onOpenAnnotation(annotation) {
    console.log('annotation');
    this.setState({currentZoom: 5})
  },
  onRightAnnotationTapped(e) {
    console.log(e);
    console.log('onRightAnnotationTapped');
  },
  render: function() {
    StatusBarIOS.setHidden(true);
    return (
      <View style={styles.container}>
        <Text style={styles.text} onPress={() => this.setDirectionAnimated(mapRef, 0)}>
          Set direction to 0
        </Text>
        <Text style={styles.text} onPress={() => this.setZoomLevelAnimated(mapRef, 6)}>
          Zoom out to zoom level 6
        </Text>
        <Text style={styles.text} onPress={() => this.setCenterCoordinateAnimated(mapRef, 48.8589, 2.3447)}>
          Go to Paris at current zoom level {parseInt(this.state.currentZoom)}
        </Text>
        <Text style={styles.text} onPress={() => this.setCenterCoordinateZoomLevelAnimated(mapRef, 35.68829, 139.77492, 11)}>
          Go to Tokyo at fixed zoom level 14
        </Text>
        <Text style={styles.text} onPress={() => this.addAnnotations(mapRef, [{
          latitude: 40.73312,
          longitude:  -73.989,
          title: 'This is a new marker'
          }])}>
          Add new marker
        </Text>
        <Text style={styles.text} onPress={() => this.selectAnnotationAnimated(mapRef, 0)}>
          Open first popup
        </Text>
        <Text style={styles.text} onPress={() => this.removeAnnotation(mapRef, 0)}>
          Remove first annotation
        </Text>
        <Text style={styles.text} onPress={() => this.setZoomLevelAnimated(mapRef, 5)}>
          Zoom out
        </Text>
        <MapboxGLMap
          style={styles.map}
          direction={0}
          rotateEnabled={true}
          scrollEnabled={true}
          zoomEnabled={true}
          showsUserLocation={true}
          ref={mapRef}
          accessToken={''}
          styleURL={'asset://styles/dark-v7.json'}
          centerCoordinate={this.state.center}
          userLocationVisible={true}
          zoomLevel={this.state.zoom}
          onRegionChange={this.onRegionChange}
          onRegionWillChange={this.onRegionWillChange}
          annotations={this.state.annotations}
          onOpenAnnotation={this.onOpenAnnotation}
          onRightAnnotationTapped={this.onRightAnnotationTapped}
          onUpdateUserLocation={this.onUpdateUserLocation} />
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1
  },
  map: {
    flex: 5
  },
  text: {
    padding: 2
  }
});

AppRegistry.registerComponent('test', () => test);

// var test = React.createClass({  
//   getInitialState: function() {
//     return {
//       mapLocation: {
//         latitude: 0,
//         longitude: 0
//        },
//        center: {
//          latitude: 40.72345355209305,
//          longitude: -73.99343490600586
//        },
//        annotations: [{
//          latitude: 40.72052634,
//          longitude:  -73.97686958312988,
//          title: 'This is marker 1',
//          subtitle: 'Hi mom!'
//        },{
//          latitude: 40.714541341726175,
//          longitude:  -74.00579452514648,
//          title: 'This is marker 2',
//          subtitle: 'Neat, this is a subtitle'
//        }],
//        zoom: 12,
//        direction: 0
//      }
//   },
//   onChange: function(e) {
//     this.setState({ mapLocation: e });
//   },
//   onOpenAnnotation: function(annotation) {
//     console.log(annotation)
//   },
//   onUpdateUserLocation: function(location) {
//     console.log(location)
//   },
//   render: function() {
//     return (
//       <View style={styles.container}>
//         <MapboxGLMap
//           style={styles.map}
//           rotateEnabled={true}
//           showsUserLocation={true}
//           accessToken={'your-mapbox.com-access-token'}
//           styleURL={'asset://styles/mapbox-streets-v7.json'}
//           centerCoordinate={this.state.center}
//           userLocationVisible={true}
//           zoomLevel={this.state.zoom}
//           debugActive={false}
//           direction={this.state.direction}
//           annotations={this.state.annotations}
//           onRegionChange={this.onChange}
//           onOpenAnnotation={this.onOpenAnnotation}
//           onUpdateUserLocation={this.onUpdateUserLocation}/>
//         <View style={styles.text}>
//           <Text>Latitude: {this.state.mapLocation.latitude}</Text>
//           <Text>Longitude: {this.state.mapLocation.longitude}</Text>
//           <Text>zoom level: {this.state.mapLocation.zoom}</Text>
//         </View>
//       </View>
//     );
//   }
// });

// var styles = StyleSheet.create({  
//   container: {
//     flexDirection: 'column',
//     flex: 1
//   },
//   map: {
//     flex:5,
//   },
//   text: {
//     padding: 20
//   }
// });

// AppRegistry.registerComponent('test', () => test);


