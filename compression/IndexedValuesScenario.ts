import deltaEncode from "./DeltaEncoding";
import runLengthEncode from "./RunLengthEncoding";

const executeIndexedValuesScenario = (values: number[], min: number, max: number) => {
    values.sort();
    const indexed = [];
    const count = max - min + 1;
    for (let i = 0; i < count; i++) {
        const value = min + i;
        const matching = values.filter(v => v === value);
        indexed.push(matching.length);
    }
    const noEncoding = indexed;
    const delta = deltaEncode(indexed);
    const deltaRun = runLengthEncode(delta);
    return {
        "none": noEncoding.length,
        "delta": delta.length,
        "deltaRun": deltaRun.length
    }
}

export default executeIndexedValuesScenario;