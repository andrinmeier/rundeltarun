import { AccordionSummary } from "@mui/material";
import { mean, quantileSeq, std, sum } from "mathjs";

const summarize = (executions: any[], basis: number, name: string) => {
    const noneValues = executions.map(e => e["none"]);
    const noneTotal = sum(noneValues);
    const deltaValues = executions.map(e => e["delta"]);
    const deltaTotal = sum(deltaValues);
    const deltaRunValues = executions.map(e => e["deltaRun"]);
    const deltaRunTotal = sum(deltaRunValues);
    const summary = [{
        "name": name,
        "0.25": quantileSeq(noneValues, 0.25),
        "0.50": quantileSeq(noneValues, 0.50),
        "0.75": quantileSeq(noneValues, 0.75),
        "std": (Math.round(std(noneValues) * 100) / 100).toFixed(2),
        "mean": mean(noneValues),
        "savings": savings(basis, noneTotal)
    },
    {
        "name": `${name} (delta only)`,
        "0.25": quantileSeq(deltaValues, 0.25),
        "0.50": quantileSeq(deltaValues, 0.50),
        "0.75": quantileSeq(deltaValues, 0.75),
        "std": (Math.round(std(deltaValues) * 100) / 100).toFixed(2),
        "mean": mean(deltaValues),
        "savings": savings(basis, deltaTotal)
    },
    {
        "name": `${name} (delta+run length)`,
        "0.25": quantileSeq(deltaRunValues, 0.25),
        "0.50": quantileSeq(deltaRunValues, 0.50),
        "0.75": quantileSeq(deltaRunValues, 0.75),
        "std": (Math.round(std(deltaRunValues) * 100) / 100).toFixed(2),
        "mean": mean(deltaRunValues),
        "savings": savings(basis, deltaRunTotal)
    }];
    return summary;
}

export default summarize;

const savings = (basis: number, actual: number) => {
    if (basis === 0) {
        return "0%";
    }
    const diff = actual / basis;
    const inPercent = Math.abs(1 - diff) * 100;
    const inPercentFormatted = (Math.round(inPercent * 100) / 100).toFixed(2);
    if (diff > 1) {
        return `+${inPercentFormatted}%`;
    } else if (diff < 1) {
        return `-${inPercentFormatted}%`;
    } else {
        return "0%";
    }
}