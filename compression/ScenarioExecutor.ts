import generateValues from "./ValueGenerator";

const executeScenario = (executor: any, repetitions: number, numberOfValues: number, min: number, max: number) => {
    const executions = [];
    for (let i = 0; i < repetitions; i++) {
        const values = generateValues(numberOfValues, min, max);
        executions.push(executor(values, min, max));
    }
    return executions;
}

export default executeScenario;