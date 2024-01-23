import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import IndexScreen from "./src/screens/IndexScreen";
import React from "react";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import ShowScreen from "./src/screens/ShowScreen";
import CreateScreen from "./src/screens/CreateScreen";
import EditScreen from "./src/screens/EditScreen";

const navigator = createStackNavigator({
  Index: IndexScreen,
  Show: ShowScreen,
  Create: CreateScreen,
  Edit: EditScreen,
}, {
  initialRouteKey: 'Index',
  defaultNavigationOptions: {
    title: 'Blog'
  }
});

const App = createAppContainer(navigator);

export default () => {
  return <BlogProvider>
    <App />
  </BlogProvider>
};
