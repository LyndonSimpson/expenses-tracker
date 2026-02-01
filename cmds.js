import helpers from "./helpers.js";

const VALID_CATEGORIES = new Set(["food", "rent", "candy", "outings", "other"]);

const commands = {

    cmdAdd(expenses, args) {
        if (args.length < 2) {
            console.error("Error: Expected 2 arguments");
            helpers.printUsage();
            return;
        };

        const id = helpers.nextId(expenses);

        const value = Number(args[0]);

        if (!Number.isInteger(value)) {
            console.error("Error: value must be a number");
            return;
        };

        const category = args[1];

        if (!VALID_CATEGORIES.has(category)) {
            console.error("Error: category must be of valid type:");
            helpers.printUsage();
            return;
        };

        const timestamp = helpers.nowISO();

        expenses.push({
            id,
            value,
            category,
            createAt: timestamp,
            updatedAt: timestamp,
        });

        console.log(`${value} expense Num. ${id} was added for category ${category}`);
        return true;
    },

    cmdUpdate(expenses, value, id) {
        if (!value) {
            console.error("Error: missing argument.");
            return;
        };

        if (!id) {
            console.error("Error: missing id.");
            return;
        };

        const parsedId = helpers.parseId(id);

        const idx = helpers.findExpenseIndex(expenses, parsedId);

        if (idx === -1) {
            console.log("idx -->", idx);
            console.error("Error: no expense found with this Id.");
            return;
        };

        expenses[idx].value = value;
        expenses[idx].updatedAt = helpers.nowISO();
        console.log(`expense Num. ${id} was updated with value ${value}`);
        return true;
    },

    cmdDelete(expenses, id) {
        if (!id) {
            console.error("Errer: missing 1 argument.");
        }

        const parsedId = helpers.parseId(id);

        const idx = helpers.findExpenseIndex(expenses, parsedId);

        if (idx === -1) {
            console.error("Error: No expense found for this Id.");
            return;
        }

        expenses.splice(idx, 1);
        console.log("Expense succesfully deleted!");
        return true;
    },

    cmdList(expenses) {
        if (expenses.length < 1) {
            console.error("Error: No expenses found.");
            return;
        }

        for (let i = 0;i < expenses.length; i++) {
            helpers.printExpense(expenses[i]);
        }
    },

    cmdListByType(expenses, type) {
        if (expenses.length < 1) {
            console.error("Error: No expenses found.");
            return;
        }

        const filtered = expenses.filter((e) => e.category === type);
        if (filtered.length < 1) {
            console.error("Error: no exenses found for this type.");
            return;
        }

        filtered.forEach(expense => {
            helpers.printExpense(expense);
        });
    },

}

export default commands;