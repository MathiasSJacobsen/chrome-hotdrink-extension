import { ConstraintSystem } from "../types";

function parseConstraintSystem() {
    let main: ConstraintSystem = {};
    try {
        // @ts-ignore
        main.variables = JSON.parse(JSON.stringify(Array.from(window.constraintSystem.variables()).map(e => { return { "value": e["value"], "name": e["name"] }}))) || null;
    } catch (error) {
        // Not a page with a HotDrink constraint system
        return undefined;
    }
    return main;
}

setInterval(() => {
    let constraintSystem = parseConstraintSystem();
    if (!constraintSystem) {
        return;
    }
    window.postMessage({ type: "GET_CONSTRAINT_SYSTEM", constraintSystem });
}, 500);




export {};