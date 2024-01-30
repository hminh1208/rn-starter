import {
  useEffect,
  useState,
} from 'react';

import MaterialCommunityIcons
  from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  createMaterialBottomTabNavigator,
} from '@react-navigation/material-bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import supabaseClient from './src/api/SupabaseClient';
import { Provider as AuthProvider } from './src/context/AuthContext';
import { Provider as CategoryProvider } from './src/context/CategoryContext';
import { setNavigator } from './src/navigationRef';
import AccountScreen from './src/screens/AccountScreen';
import HomeScreen from './src/screens/HomeScreen';
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import TransactionSceen from './src/screens/TransactionSceen';

export default function App() {
	const Stack = createStackNavigator();
	const Tab = createMaterialBottomTabNavigator();

	const [session, setSession] = useState(null)

	useEffect(() => {
		supabaseClient.auth.getSession().then(({ data: { session } }) => {
			setSession(session)
		})

		supabaseClient.auth?.onAuthStateChange((_event, session) => {
			setSession(session)
		})
	}, [])

	return (
		<CategoryProvider>
			<AuthProvider>
				<NavigationContainer ref={(navigator) => { setNavigator(navigator) }}>
					{session && session.user ?
						(<>
							<Tab.Navigator>
								<Tab.Screen
									name="HomeScreen"
									component={HomeScreen}
									options={{
										tabBarLabel: 'Home',
										tabBarIcon: ({ color }) => (
											<MaterialCommunityIcons name="home" color={color} size={26} />
										),
									}} />

								<Tab.Screen
									name="Transaction"
									component={TransactionSceen}
									options={{
										tabBarLabel: 'Transactions',
										tabBarIcon: ({ color }) => (
											<MaterialCommunityIcons name="format-list-bulleted" color={color} size={26} />
										),
									}} />
								<Tab.Screen
									name="Account"
									component={AccountScreen}
									options={{
										tabBarLabel: 'Account',
										tabBarIcon: ({ color }) => (
											<MaterialCommunityIcons name="account" color={color} size={26} />
										),
									}} />
							</Tab.Navigator>
						</>) :
						(<>
							<Stack.Navigator
								initialRouteName="SignIn"
								screenOptions={{
									headerShown: false
								}}>
								<Stack.Screen
									name="SignIn"
									component={SignInScreen} />
								<Stack.Screen
									name="SignUp"
									component={SignUpScreen} />
							</Stack.Navigator>
						</>)}
				</NavigationContainer>
			</AuthProvider>
		</CategoryProvider>

	)
}