const runLengthEncode = (values: number[]) => {
    if (values.length === 0) {
        return values;
    }
    const encoded = [];
    let i = 0;
    while (i < values.length) {
        const current = values[i];
        let count = 1;
        i++;
        for (let j = i; j < values.length; j++) {
            if (current === values[j]) {
                count++;
                i++;
            } else {
                break;
            }
        }
        encoded.push(count);
        encoded.push(current);
    }
    return encoded;
};

export default runLengthEncode;