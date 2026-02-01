const helpers = {

    nowISO() {
        const timestamp = new Date().toISOString();
        return timestamp;
    },

    nextId(expenses) {
        if (expenses.length === 0) return 1;
        return Math.max(...expenses.map((expense) => expense.id)) +1;
    },

    findExpenseIndex(expenses, id) {
        return expenses.findIndex((e) => e.id === id);
    },

    parseId(value) {
        const id = Number(value);
        if (!Number.isInteger(id)) {
            console.error("Error: id must be a number");
            return null;
        }
        return id;
    },

    printExpense(expense) {
        console.log(
            `Expense Num. ${expense.id}: ${expense.value}\n` +
            `Category: ${expense.category}\n`
        );
    },

    printUsage() {
        console.log(`
    Expenses Tracker CLI (Node.js)

    Usage:
    node tracker add <value>
    node tracker update <value> <id>
    node tracker delete <id>
    node tracker list
    node tracker all
        `.trim())
    },
};

export default helpers;
