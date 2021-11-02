export function getQueryVariable(search: string, variable: string) {
    const params = new URLSearchParams(search);
    return params.get(variable);
}