import { createContext, useState } from "react";
export const QuickViewContext = createContext();
export const QuickViewProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const openQuickView = (car) => {
        setIsOpen(car);
    }
    const closeQuickView = () => {
        setIsOpen(false);
    }
    return (
        <QuickViewContext.Provider value={{ isOpen, openQuickView, closeQuickView }}>
            {children}
        </QuickViewContext.Provider>
    );
}