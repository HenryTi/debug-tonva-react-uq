import * as React from 'react';
import * as _ from 'lodash';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Row, Col, Button, Form, FormGroup, Label, Input, 
    FormText, FormFeedback} from 'reactstrap';
import {AvBaseInput, AvForm, AvField, AvGroup, AvInput, AvFeedback, AvRadioGroup, AvRadio} from './reactstrap-validation';
import {nav} from 'tonva-tools';

export interface Props extends React.HTMLProps<HTMLButtonElement> {
  outline?: boolean;
  active?: boolean;
  block?: boolean;
  color?: string;
  disabled?: boolean;
  tag?: React.ReactType;
  confirmLeave?: boolean;

  onClick?: React.MouseEventHandler<any>;
  size?: any;
  id?: string;
  style?: React.CSSProperties;
}

export interface State {
    disabled: boolean;
}

export default class AvButton extends React.Component<Props, State> {
  static contextTypes = AvBaseInput.contextTypes;
  private interval:any;
  private isDirty: boolean;
  constructor(props) {
      super(props);
      this.isDirty = false;
      this.checkDirty = this.checkDirty.bind(this);
      this.state = {disabled: true};
  }

  changeDirty(dirty:boolean) {
    this.isDirty = dirty;
    this.checkDirty();
  }

  checkDirty() {
    let isDirty:boolean = !_.isEmpty(this.context.FormCtrl.isDirty) || this.isDirty;
    this.setState({
        disabled: !isDirty
    });
  }

  componentWillMount() {
    nav.regConfirmClose(() => {
        if (this.state.disabled) return true;
        if (this.props.confirmLeave === false) return true;
        return nav.confirmBox('要放弃输入的内容吗？');
    });
    this.interval = setInterval(this.checkDirty, 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {
      disabled,
      confirmLeave,
      ...attributes
    } = this.props;
    return (
      <Button {...attributes}
        disabled={this.state.disabled}
      >{this.props.children}</Button>
    );
  }
}
