import React, { useEffect } from "react";

const useOutsideClick = (
    ref: React.RefObject<any>,
    setter: Function,
    trigger?: React.RefObject<any>,
) => {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (trigger?.current.contains(event.target as Node)) {
                return;
            }
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setTimeout(() => {
                    setter(false);
                }, 0);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, setter, trigger]);
};

export default useOutsideClick;
