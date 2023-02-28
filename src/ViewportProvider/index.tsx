import React, { createContext, useContext, useEffect, useState } from 'react';

type Breakpoints = {
    [key: string]: number;
};

type ViewportContextType = {
    width: number;
    breakpoints: Breakpoints;
};

type ViewportProviderProps = {
    breakpoints: Breakpoints;
    children: React.ReactNode;
};

const ViewportContext = createContext<ViewportContextType>({
    width: 0,
    breakpoints: {},
});

export const ViewportProvider: React.FC<ViewportProviderProps> = ({
                                                                             breakpoints,
                                                                             children,
                                                                         }) => {
    const [width, setWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const value: ViewportContextType = {
        width,
        breakpoints,
    };

    return (
        <ViewportContext.Provider value={value}>
            {children}
        </ViewportContext.Provider>
    );
};

const useViewport = () => {
    const { width, breakpoints } = useContext(ViewportContext);

    const lessThan = (breakpoint: keyof Breakpoints) => {
        return width < breakpoints[breakpoint];
    };

    const greaterThan = (breakpoint: keyof Breakpoints) => {
        return width > breakpoints[breakpoint];
    };

    const betweenBreakpoints = (
        start: keyof Breakpoints,
        end: keyof Breakpoints,
    ) => {
        return width >= breakpoints[start] && width < breakpoints[end];
    };

    return { lessThan, greaterThan, betweenBreakpoints };
};

export default useViewport;
