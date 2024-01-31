import * as React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import { Root as PopupRootProvider } from 'react-native-popup-confirm-toast';
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
import AccountScreen from './src/screens/auth/AccountScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import CategoryScreen from './src/screens/category/CategoryScreen';
import CreateCategoryScreen from './src/screens/category/CreateCategoryScreen';
import EditCategoryScreen from './src/screens/category/EditCategoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import TransactionSceen from './src/screens/transaction/TransactionSceen';

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

	const DashboardStack = createStackNavigator();
	function DashboardTab() {
		return <DashboardStack.Navigator screenOptions={{
			headerShown: false
		}}>
			<Stack.Screen name="Home" component={HomeScreen} />
			<Stack.Screen name="Category" component={CategoryScreen} />
			<Stack.Screen name="EditCategory" component={EditCategoryScreen} options={{ headerShown: true, title: 'Edit category' }} />
			<Stack.Screen name="CreateCategory" component={CreateCategoryScreen} options={{ headerShown: true, title: 'Create category' }} />
			<Stack.Screen name="Transaction" component={TransactionSceen} />
		</DashboardStack.Navigator>
	}

	function Home() {
		return <Tab.Navigator>
			<Tab.Screen
				name="Dashboard"
				component={DashboardTab}
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
		</Tab.Navigator>;
	}

	return (
		<PopupRootProvider>
			<AuthProvider>
				<CategoryProvider>
					<NavigationContainer ref={(navigator) => { setNavigator(navigator) }}>
						{session && session.user ?
							(<>
								<Stack.Navigator>
									<Stack.Screen
										name="Home"
										component={Home}
										options={{ headerShown: false }}
									/>
								</Stack.Navigator>
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
				</CategoryProvider>
			</AuthProvider>
		</PopupRootProvider>
	)
}