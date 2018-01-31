import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as classNames from 'classnames';
import {Input, FormGroup, Label} from 'reactstrap';
import {AvNoNameInputProps} from './AvBaseInput';
import AvInput from './AvInput';

//const radioPropTypes = Object.assign({}, AvInput.propTypes);
//delete radioPropTypes.name;

export interface Props extends AvNoNameInputProps {
    label: object | string;
}

export default class AvRadio extends React.Component<Props, null> {

  static contextTypes = Object.assign({}, AvInput.contextTypes, {
    Group: PropTypes.object.isRequired,
  });

  // static propTypes = radioPropTypes;

  onChangeHandler = (event, ...args) => {
    this.context.Group.update(event, this.props.value);
    if (this.props.onChange) {
      this.props.onChange(event, ...args);
    }
  };

  render() {
    const {
      className,
      ...attributes} = this.props;

    let name = (this.props as any).name;
    const classes = classNames(
      className,
      this.context.FormCtrl.isTouched[name] ? 'av-touched' : 'av-untouched',
      this.context.FormCtrl.isDirty[name] ? 'av-dirty' : 'av-pristine',
      this.context.FormCtrl.hasError[name] ? 'av-invalid' : 'av-valid'
    );
    let label = (this.props as any).label;
    const input = (
      <Label check={true} inline={this.context.Group.inline} disabled={this.props.disabled}>
          <Input
              name={this.context.Group.name}
              type='radio'
              {...attributes as any}
              className={classes}
              onChange={this.onChangeHandler}
              checked={this.props.value === this.context.Group.value}
              value={this.props.value && this.props.value.toString()}
          />
          {label}
      </Label>);

    if (this.context.Group.inline) {
      return input;
    }

    return (
      <FormGroup check={true} disabled={this.props.disabled}>
        {input}
      </FormGroup>
    );
  }
}
