const generateValues = (numberOfValues: number, min: number, max: number) => {
    return Array.from({length: numberOfValues}, () => Math.floor(Math.random() * (max - min + 1) + min));
}

export default generateValues;