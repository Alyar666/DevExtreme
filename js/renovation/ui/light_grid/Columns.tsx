import {
  Component,
  ComponentBindings,
  JSXComponent,
  OneWay,
} from 'devextreme-generator/component_declaration/common';

function viewFunction(viewModel: Columns) {
  return (
    <tr>
      {viewModel.props.columns.map((column, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <th key={index}>
          {column}
        </th>
      ))}
    </tr>
  );
}

@ComponentBindings()
export class ColumnsProps {
  @OneWay()
  columns?: string[];
}

@Component({ view: viewFunction })
export class Columns extends JSXComponent(ColumnsProps) {

}
