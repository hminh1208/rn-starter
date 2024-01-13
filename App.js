import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Toast from "react-native-toast-message";
import HomeScreen from "./src/screens/HomeScreen";
import ComponentsScreen from "./src/screens/ComponentsScreen";
import ListScreen from "./src/screens/ListScreen";
import ImageScreen from "./src/screens/ImageScreen";
import CounterScreen from "./src/screens/CounterScreen";
import ColorScreen from "./src/screens/ColorScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import SignUpScreen from "./src/screens/Auth/SignupScreen";
import SquareScreen from "./src/screens/SquareScreen";
import TextScreen from "./src/screens/TextScreen";

const navigator = createStackNavigator(
  {
    Home: HomeScreen,
    Components: ComponentsScreen,
    List: ListScreen,
    Image: ImageScreen,
    Count: CounterScreen,
    Color: ColorScreen,
    Login: LoginScreen,
    Signup: SignUpScreen,
    Square: SquareScreen,
    Text: TextScreen,
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      title: "Tracking Expense",
    },
  }
);

export default createAppContainer(navigator);