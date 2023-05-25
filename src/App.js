import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import "./scss/common/style.scss";

function App() {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" element={<Home />} />
                {/* <Route path="/movie/:id" element={<Detail />}></Route> */}
            </Routes>
        </BrowserRouter>
    );
}
export default App;