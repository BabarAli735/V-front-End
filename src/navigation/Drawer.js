import {   createDrawerNavigator } from "@react-navigation/drawer";
import { SCREENS } from "../constants/them";
import TabNavigator from "./BottomTab";
import DrawerScreen from "./DrawerContent";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={(props) => <DrawerScreen {...props} />}
    >
      <Drawer.Screen name={SCREENS.BottomTab} component={TabNavigator} />
    </Drawer.Navigator>
  );
}
