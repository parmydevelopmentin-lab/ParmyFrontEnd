/**
 * Utility functions for Indian Rupee (INR) currency formatting
 */

/**
 * Format number as Indian Rupees with standard formatting
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₹1,23,456")
 */
export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

/**
 * Format number as Indian Rupees with decimal precision
 * @param amount - The amount to format
 * @returns Formatted currency string with decimals (e.g., "₹1,23,456.78")
 */
export const formatCurrencyDetailed = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Format number as Indian Rupees for display in tables/lists
 * @param amount - The amount to format
 * @returns Formatted currency string (e.g., "₹1,23,456")
 */
export const formatCurrencyDisplay = (amount: number): string => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};

/**
 * Format large numbers in Indian crore/lakh system
 * @param amount - The amount to format
 * @returns Formatted string (e.g., "12.34 Crore", "45.67 Lakh")
 */
export const formatIndianLargeNumber = (amount: number): string => {
    if (amount >= 10000000) { // 1 Crore
        const crores = amount / 10000000;
        return `₹${crores.toFixed(2)} Crore`;
    } else if (amount >= 100000) { // 1 Lakh
        const lakhs = amount / 100000;
        return `₹${lakhs.toFixed(2)} Lakh`;
    }
    return formatCurrency(amount);
};

/**
 * Parse currency string back to number (removes currency symbols and formatting)
 * @param currencyString - The formatted currency string
 * @returns Parsed number
 */
export const parseCurrency = (currencyString: string): number => {
    const cleanedString = currencyString.replace(/[₹,\s]/g, '');
    return parseFloat(cleanedString) || 0;
};

export default {
    formatCurrency,
    formatCurrencyDetailed,
    formatCurrencyDisplay,
    formatIndianLargeNumber,
    parseCurrency,
};