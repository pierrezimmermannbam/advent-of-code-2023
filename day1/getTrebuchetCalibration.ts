export const getTrebuchetCalibration = (input: string): number => {
    const lines = input.split('\n').map(string => string.replace(/\s+/g, ''));
    let result = 0;
    lines.forEach(line => {
        result += getScoreForLine(line)

    })

    return result;
}

const getScoreForLine = (line: string): number => {
    const digits = line.replace(/[\D]|one|two|three|four|five|six|seven|eight\nine/g, '');
    const matches = [];
    for (let i = 0; i < line.length; i++) {
        const match = line.slice(i).match(/\d|one|two|three|four|five|six|seven|eight|nine/);
        if (match) {
            matches.push(match[0])
        
        }
    }

    return getScoreFromString(matches[0]) * 10 + getScoreFromString(matches[matches.length - 1])

}

const getScoreFromString = (match: string): number => {
    if (Object.keys(stringMap).includes(match)) {
        // @ts-ignore
        return stringMap[match]
    }

    return Number(match)
}

const stringMap = {
    one: 1,
    two: 2,
    three:3,
    four:4,
    five:5,
    six:6,
    seven:7,
    eight:8,
    nine:9
}