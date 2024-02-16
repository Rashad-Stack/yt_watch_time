import VideosProvider from "./VideosContext";
import AuthProvider from "./authcontext";
import combineProviders from "./combineComponents";

const providers = [AuthProvider, VideosProvider];

const AppContextProvider = combineProviders(providers);

export default AppContextProvider;
