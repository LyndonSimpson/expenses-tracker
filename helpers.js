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
        if (!Number.isInteger()) {
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
    node expenses add "Task description"
    node expenses update <id> "New description"
    node expenses delete <id>
    node expenses mark <id> <status>
    node expenses list
    node expenses list <status>

    Statuses:
    todo | in-progress | done

    Examples:
    node expenses add "Buy groceries"
    node expenses update 1 "Buy groceries and cook dinner"
    node expenses mark 1 in-progress
    node expenses mark 1 done
    node expenses list
    node expenses list done
        `.trim())
    },
};

export default helpers;
