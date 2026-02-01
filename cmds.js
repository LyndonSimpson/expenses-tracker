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

    // cmdUpdate() {
    //     //update cmd here
    // },

}

export default commands;