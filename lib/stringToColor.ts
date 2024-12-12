function stringToColor(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a hexadecimal string and limit to 6 characters
    const color = (hash & 0x00ffffff).toString(16).padStart(6, '0').toUpperCase();
    return `#${color}`;
}

export default stringToColor;
