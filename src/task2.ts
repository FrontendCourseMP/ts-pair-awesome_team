class Stack<T> {
    private items: T[] = [];

    push(element: T): void {
        this.items.push(element);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this.items.length === 0;
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = [];
    }

    toString(): string {
        return this.items.toString();
    }
}

export function solve(text: string): boolean {
    const stack = new Stack<string>();
    let remainingText = text;
    while (remainingText.length > 0) {
        if (stack.isEmpty()) {
            stack.push(remainingText[0]);
        } else {
            const current = remainingText[0];
            const prev = stack.peek();
            if (prev !== undefined && isMatch(prev, current)) stack.pop();
            else stack.push(current);
        }
        remainingText = remainingText.substring(1);
    }
    return stack.isEmpty();
}

function containsNonBracketChars(str: string): boolean {
    const nonBracketRegex = /[^()\[\]{}]/;
    return nonBracketRegex.test(str);
}

function isMatch(open: string, close: string): boolean {
    const bracketPairs: Record<string, string> = {
        '(': ')',
        '[': ']',
        '{': '}'
    };
    return bracketPairs[open] === close;
}

export function checkStaples(): void {
    const form = document.getElementById('staples-form') as HTMLFormElement;
    const input = document.getElementById('staples') as HTMLInputElement;
    const result = document.getElementById('result-staples') as HTMLOutputElement;

    function setResult(answer: boolean, isError: boolean = false, errMessage: string = ""): void {
        result.textContent = isError ? errMessage : (answer ? "Верно" : "Неверно");
        result.className = isError ? 'error' : '';
    }

    form.addEventListener('submit', (e: Event) => {
        e.preventDefault();
    
        try {
            const text = input.value.replace(/\s/g, '');
            if (containsNonBracketChars(text)) throw new Error("Вводить можно только '(' ')' '[' '']' '{' '}'")
            setResult(solve(text));
        } catch (err) {
            setResult(false, true, err instanceof Error ? err.message : 'Неизвестная ошибка.');
        }
    });
}
