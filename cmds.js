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

}

export default commands;