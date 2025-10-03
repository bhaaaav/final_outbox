export function calculateSpamScore(subject: string, body: string): number {
    const spamWords = ["free", "buy now", "click here", "winner", "cash"];
    let score = 0;
    spamWords.forEach(word => {
        if (subject.toLowerCase().includes(word)) score += 2;
        if (body.toLowerCase().includes(word)) score += 1;
    });
    return score;
}
