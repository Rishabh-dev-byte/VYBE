import { Outlet } from "react-router-dom";
import Header from "./components/ui/Header";
import Footer from "./components/ui/Footer";

function App() {
 
   
     return (
        <div className="flex min-h-screen flex-col bg-black text-white">
            <Header />
            <main className="flex-1">
                <Outlet/>
            </main>
            <Footer />
        </div>
    );
}



export default App;