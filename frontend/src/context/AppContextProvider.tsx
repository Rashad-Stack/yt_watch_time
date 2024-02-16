import AuthProvider from "./authcontext";
import combineProviders from "./combineComponents";

const providers = [AuthProvider];

const AppContextProvider = combineProviders(providers);

export default AppContextProvider;
