
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Signup from './Signup'
import MapScreen from './MapScreen'


const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Signup: { screen: Signup },
  MapScreen: { screen: MapScreen },
});

export default createAppContainer(AppNavigator);