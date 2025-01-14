import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNav from "./StackNav";
import TabNav from "./TabNav";
import Account from "../../pages/Account";
import BusinessDetails from "../../pages/BusinessDetails";


const DrawerNav = () => {
    const Drawer = createDrawerNavigator();
    return (
        // <Drawer.Navigator
        // drawerContent={props => <DrawerContent {...props} />}
        // screenOptions={{
        //     headerShown: false,
        // }}>
        //     <Drawer.Screen name="Home" component={TabNav} />
        // </Drawer.Navigator> 
        <Drawer.Navigator >
            <Drawer.Screen name="Home" component={TabNav} />
            <Drawer.Screen name="Business" component={BusinessDetails} />
        </Drawer.Navigator>

    );
};

export default DrawerNav;


