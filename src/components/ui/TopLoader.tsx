import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const TopLoader = () => {
    const { pathname } = useLocation();
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Start animation on route change
        setIsVisible(true);
        setProgress(30);

        const timer1 = setTimeout(() => setProgress(60), 100);
        const timer2 = setTimeout(() => setProgress(85), 300);
        const timer3 = setTimeout(() => {
            setProgress(100);
        }, 500);

        const finishTimer = setTimeout(() => {
            setIsVisible(false);
            setProgress(0);
        }, 800);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
            clearTimeout(finishTimer);
        };
    }, [pathname]);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-transparent">
            <div
                className="h-full bg-primary transition-all duration-300 ease-out shadow-[0_0_10px_theme('colors.primary.DEFAULT')]"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

export default TopLoader;
