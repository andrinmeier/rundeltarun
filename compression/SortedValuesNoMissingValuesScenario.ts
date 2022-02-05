import { delBasePath } from "next/dist/shared/lib/router/router";
import deltaEncode from "./DeltaEncoding";
import runLengthEncode from "./RunLengthEncoding";

const executeSortedValuesNoMissingValuesScenario = (values: number[], min: number, max: number) => {
    values.sort();
    const noMissingValues = values.filter(v => v > 0);
    const noEncoding = noMissingValues;
    const delta = deltaEncode(noMissingValues);
    const deltaRun = runLengthEncode(delta);
    return {
        "none": noEncoding.length,
        "delta": delta.length,
        "deltaRun": deltaRun.length
    }
}

export default executeSortedValuesNoMissingValuesScenario;