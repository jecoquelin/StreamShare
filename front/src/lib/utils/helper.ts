export function formatDurationString(seconds: number): string {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);

    return `${hrs} h ${mins} min`;
}