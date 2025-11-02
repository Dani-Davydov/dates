import React from "react";
import DesktopApp from "./adaptiveApp/desktopApp/DesktopApp";
import {MobileApp} from "./adaptiveApp/mobileApp/MobileApp";

interface AppProps {
    title?: string;
}

const App: React.FC<AppProps> = () => {
    const isMobile = window.screen.width <= 430;

    return (
        <div className="app">
            {isMobile ? (
                <MobileApp/>
            ): <DesktopApp/>}
        </div>
    );
};

export default App;