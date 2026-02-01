import fs from "node:fs";
import path from "node:path";
import helpers from "./helpers.js";
import commands from "./cmds.js";

const EXPENSES_JSON = path.join(process.cwd(), "expenses.json");

function saveExpenses(expenses) {
    try {
        fs.writeFileSync(EXPENSES_JSON, JSON.stringify(expenses, null, 2), "utf-8");
    } catch (error) {
        console.error("Error: failed to save expenses to json db.", error.message);
    }
}

function loadExpense() {
    try {
        const raw = fs.readFileSync(EXPENSES_JSON, "utf-8");
        const expenses = JSON.parse(raw);

        if (!Array.isArray(expenses)) {
            console.error("Error: data is corrupted, expected an array.");
            return [];
        }

        return expenses;
    } catch (error) {
        console.error("Error: failed to load expenses from json db.", error.message);
        return [];
    }
}

//main "outer":
function main() {
    const argv = process.argv.slice(2);
    
    if (!argv) {
        console>error("Error: missing arguments");
        return;
    }

    const command = argv[0];

    const args = argv.slice(1);

    const id = args[1];

    const expenses = loadExpense();
    let changed = false;

    switch (command) {
        case "add":
            changed = commands.cmdAdd(expenses, args);
            break;
        
        case "update":
            // console.log("id -->", id);
            // console.log("value -->", args[0])
            changed = commands.cmdUpdate(expenses, args[0], id);
            break;
        
        case "delete":
            changed = commands.cmdDelete(expenses, args[0])
            break;
        
        case "list":
            changed = commands.cmdList(expenses);
            break
        
        case "type":
            changed = commands.cmdListByType(expenses, args[0]);
            break;
        
        case "all":
        commands.cmdFullExpenses(expenses);
        break;

        default:
            helpers.printUsage();
            break;
    };

    if (changed) {
        saveExpenses(expenses);
    }
}

main();
