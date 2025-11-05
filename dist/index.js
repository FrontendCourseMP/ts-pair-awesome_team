export function computeArrival(scheduledHour, delayHours) {
    const scheduled = Number(scheduledHour);
    const delay = Number(delayHours);
    if (!Number.isFinite(scheduled) || !Number.isFinite(delay)) {
        throw new Error('Ошибка: укажите корректные числа для времени и опоздания');
    }
    if (!Number.isInteger(scheduled) || !Number.isInteger(delay)) {
        throw new Error('Ошибка: допускаются только целые значения');
    }
    if (scheduled < 0 || scheduled > 23) {
        throw new Error('Ошибка: час по расписанию должен быть в диапазоне 0–23');
    }
    if (delay < 0) {
        throw new Error('Ошибка: опоздание не может быть отрицательным');
    }
    const result = (scheduled + delay) % 24;
    return result;
}
//# sourceMappingURL=index.js.map