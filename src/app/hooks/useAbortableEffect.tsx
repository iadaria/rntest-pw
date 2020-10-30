import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncActionFinish, asyncActionStart } from "../../features/async/asyncReducer";

interface IProps<T> {
    query: () => Promise<T>;
    data: (result: T) => void;
    deps: React.DependencyList | undefined;
    shouldExecute?: boolean;
}

export default function useAbortableEffect<T>(
    { query, data, deps, shouldExecute = true }: IProps<T>
) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (!shouldExecute) return;

        dispatch(asyncActionStart());

        query()
            .then((result: T) => {
                result && data(result);
            })
            .catch(error => console.log("[useAbortableEffect", error))
            .finally(() => dispatch(asyncActionFinish()));

        return () => { }
    }, deps);

}