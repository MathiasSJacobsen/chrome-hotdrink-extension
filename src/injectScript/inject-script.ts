const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key:any, value:any) => {
      if (typeof value === 'object' && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };

function parseEsentialDetails() {
    let main: {[name:string]:any} = {};

    main.performance = JSON.parse(JSON.stringify(window.performance)) || null;
    
    return main;
}

function parseConstraintSystem() {
    let main: {
        variables: {
            name: String,
            value: string | number | boolean,
        },
    } = {variables: {name: "", value: ""}};
    // @ts-ignore
    main.variables = JSON.parse(JSON.stringify(Array.from(window.constraintSystem.variables()).map(e => { return { "value": e["value"], "name": e["name"] }}))) || null;
    
    return main;
}

setInterval(() => {
    let essential = parseEsentialDetails();
    let constraintSystem = parseConstraintSystem();
    window.postMessage({ type: "FROM_PAGE", essential: essential, test: constraintSystem });
}, 500);




export {};