import deltaEncode from "./DeltaEncoding";
import runLengthEncode from "./RunLengthEncoding";

const executeSortedValuesScenario = (values: number[], min: number, max: number) => {
    values.sort();
    const noEncoding = values;
    const delta = deltaEncode(values);
    const deltaRun = runLengthEncode(delta);
    return {
        "none": noEncoding.length,
        "delta": delta.length,
        "deltaRun": deltaRun.length
    }
}

export default executeSortedValuesScenario;