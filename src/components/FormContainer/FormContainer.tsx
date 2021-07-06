import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";

import Person from "../PersonData";
import ArrayLayout, {
  arrayLayoutTester,
} from "../UI/Layouts/ArrayLayout";
import classes from "./FormContainer.module.css";

const renderers = [
  ...materialRenderers,
  //register custom renderers
  { tester: arrayLayoutTester, renderer: ArrayLayout },
];

const FormContainer = () => {
  const [data, setData] = useState(Person.data);
  const value = JSON.stringify(data, null, 2);
  return (
    <div className={classes.Container}>
      <div className={classes.Box}>
        <pre style={{ textAlign: "left" }}>{value}</pre>
      </div>
      <div className={classes.Side}>
        <JsonForms
          schema={Person.schema}
          uischema={Person.uischema}
          data={data}
          renderers={renderers}
          cells={materialCells}
          onChange={({ data }) => setData(data)}
        />
      </div>
    </div>
  );
};

export default FormContainer;
