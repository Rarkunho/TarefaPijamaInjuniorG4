import { createBrowserRouter } from "react-router-dom";
import RooterLayout from "./RouterLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Feedback from "./pages/Feedback";
import Carrinho from "./pages/Carrinho";
import Favoritos from "./pages/Favoritos";
import PijamaIndividual from "./pages/PijamaIndividual";
import Pijamas from "./pages/Pijamas";


const router = createBrowserRouter([
    {
        path: "/",
        element: <RooterLayout/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/cadastrar",
                element: <Cadastro/>
            },
            {
                path: "/feedback",
                element: <Feedback/>
            },
            {
                path: "/carrinho",
                element: <Carrinho/>
            },
            {
                path: "/favoritos",
                element: <Favoritos/>
            },
            {
                path: "/pijama/:id",
                element: <PijamaIndividual/>
            },
            {
                path: "/pijamas/:genre",
                element: <Pijamas/>
            }
        ]
    }
])

export default router