import useToggle from "./useToggle";

export const usePersist = () => {
    const [persist, setPersist] = useToggle('persist', false);

    return [persist, setPersist];
};

export default usePersist;