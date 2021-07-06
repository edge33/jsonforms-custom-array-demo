import React, { ComponentType } from "react";
import { LayoutProps } from "@jsonforms/core";
import {
  areEqual,
  JsonFormsStateContext,
  ResolvedJsonFormsDispatch,
  withJsonFormsContext,
} from "@jsonforms/react";

import Card from "../Card/Card";


interface DispatchPropsOfCardRenderer {
  onRemove(): () => void;
}

interface CardRendererProps extends LayoutProps, DispatchPropsOfCardRenderer {
  index: number;
}

export const CardRenderer = (props: CardRendererProps) => {
  const { uischema, schema, path, renderers, cells, onRemove } = props;
  const elements = uischema.options?.["detail"]["elements"];
  const itemsToRender = elements.map((element: any, index: number) => {
    return (
      <ResolvedJsonFormsDispatch
        schema={schema}
        uischema={element}
        path={path}
        enabled={true}
        renderers={renderers}
        cells={cells}
        key={index}
      />
    );
  });
  return (
    <Card>
      {itemsToRender}
      <button onClick={onRemove}>Remove</button>
    </Card>
  );
};

const withContextToCardRenderd =
  (
    Component: ComponentType<CardRendererProps>
  ): ComponentType<CardRendererProps> =>
  ({ ctx, props }: JsonFormsStateContext & CardRendererProps) => {
    return <Component {...props}/>;
  };

const withCustomProps = (Component: ComponentType<CardRendererProps>) => {
  return withJsonFormsContext(
    withContextToCardRenderd(
      React.memo(Component, (prevProps, props) => areEqual(prevProps, props))
    )
  );
};

export default withCustomProps(CardRenderer);
