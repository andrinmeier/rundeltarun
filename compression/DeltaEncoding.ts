const deltaEncode = (values: number[]) => {
    if (values.length <= 1) {
        return values;
    }
    const encoded = [];
    encoded.push(values[0]);
    for (let i = 1; i < values.length; i++) {
        const diff = values[i] - values[i-1];
        encoded.push(diff);
    }
    return encoded;
};

export default deltaEncode;