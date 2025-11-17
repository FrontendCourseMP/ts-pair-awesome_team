export function computeArrival(scheduledHour: number, delayHours: number): number {
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

export function setupArrivalCalculator(): void {
  const form = document.getElementById('arrival-form') as HTMLFormElement;
  const scheduledInput = document.getElementById('scheduled') as HTMLInputElement;
  const delayInput = document.getElementById('delay') as HTMLInputElement;
  const resultEl = document.getElementById('result') as HTMLOutputElement;
  const resetBtn = document.getElementById('reset') as HTMLButtonElement;

  function setResult(message: string, isError: boolean = false): void {
    resultEl.textContent = message;
    resultEl.className = isError ? 'error' : '';
  }

  form.addEventListener('submit', (e: Event) => {
    e.preventDefault();
    setResult('');

    try {
        const scheduledRaw = (scheduledInput.value ?? '').trim();
        const delayRaw = (delayInput.value ?? '').trim();
        const scheduledNum = Number(scheduledRaw);
        const delayNum = Number(delayRaw);
        const arrival = computeArrival(scheduledNum, delayNum);
        setResult(`Новое время прибытия: ${arrival}`);
    } catch (err) {
        setResult(err instanceof Error ? err.message : 'Неизвестная ошибка.', true);
    }
  });
  resetBtn.addEventListener('click', (e: Event) => {
    setResult('');
  });
}