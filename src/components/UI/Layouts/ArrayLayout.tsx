import { useCallback } from "react";
import {
  ArrayLayoutProps,
  composePaths,
  createDefaultValue,
  isObjectArrayWithNesting,
  RankedTester,
  rankWith,
} from "@jsonforms/core";
import { areEqual, withJsonFormsArrayLayoutProps } from "@jsonforms/react";
import CardRenderer from "./CardRenderer";
import React from "react";

export const ArrayLayoutRenderer = ({
  visible,
  enabled,
  id,
  uischema,
  schema,
  label,
  rootSchema,
  renderers,
  cells,
  data,
  path,
  errors,
  uischemas,
  addItem,
  removeItems,
}: ArrayLayoutProps) => {
  const addItemCb = useCallback(
    (p: string, value: any) => {
      return addItem(p, value);
    },
    [addItem]
  );

  const removeItemsCb = useCallback(
    (path: string, toDelete: number[]) => {
      return removeItems ? removeItems(path, toDelete) : () => {};
    },
    [removeItems]
  );

  const toRender = Array(data)
    .fill(0)
    .map((_, i) => {
      return (
        <CardRenderer
          key={i}
          index={i}
          schema={schema}
          uischema={uischema}
          path={composePaths(path, `${i}`)}
          renderers={renderers}
          cells={cells}
          onRemove={removeItemsCb(path, [i])}
        />
      );
    });
  return (
    <div>
      <button onClick={addItemCb(path, createDefaultValue(schema))}>Add</button>
      {toRender}
      <div></div>
    </div>
  );
};

export const arrayLayoutTester: RankedTester = rankWith(
  5,
  isObjectArrayWithNesting
);
export default React.memo(
  withJsonFormsArrayLayoutProps(ArrayLayoutRenderer),
  (prevProps, props) => areEqual(prevProps, props)
);
