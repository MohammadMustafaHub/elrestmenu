
/**
 * Format Iraq phone number
 * @param input string
 * @returns string the input if false the correct phone number if true
 * */
export function formatIraqNumber(input : string) {
    // Remove spaces, parentheses, dashes, and other symbols
    let cleaned = input.trim().replace(/[^\d+]/g, "");

    // Handle leading '+'
    if (cleaned.startsWith("+")) cleaned = cleaned.slice(1);

    // Remove country code if present
    if (cleaned.startsWith("964")) cleaned = cleaned.slice(3);

    // Remove leading '0' (national trunk) if present
    if (cleaned.startsWith("0")) cleaned = cleaned.slice(1);

    // After normalization, must start with '7' and have 10 digits total
    if (!/^7\d{9}$/.test(cleaned)) {
        return input;
    }

    // Return standardized number without plus sign
    return `964${cleaned}`;
}
