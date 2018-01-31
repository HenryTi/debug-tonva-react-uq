import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

export interface Props extends React.HTMLProps<HTMLDivElement> {
  row?: boolean;
  check?: boolean;
  disabled?: boolean;
  tag?: React.ReactType;
  color?: string;
  className?: string;
}

export default class AvGroup extends React.Component<Props, {input:any}> {
  static propTypes = Object.assign({}, FormGroup.propTypes);

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  static childContextTypes = {
    Group: PropTypes.object.isRequired,
    FormCtrl: PropTypes.object.isRequired,
  };

  private FormCtrl: any;
  constructor(props) {
    super(props);

    this.state = {input: {props: {}}};
  }

  getChildContext() {
    this.FormCtrl = {...this.context.FormCtrl};
    const registerValidator = this.FormCtrl.register;
    this.FormCtrl.register = (input) => {
      this.setState({input});
      registerValidator(input);
    };
    return {
      Group: {
        input: this.state.input,
        getInputState: this.getInputState.bind(this),
      },
      FormCtrl: this.FormCtrl,
    };
  }

  getInputState() {
    return this.context.FormCtrl.getInputState(this.state.input.props.name);
  }

  render() {
    const validation = this.getInputState();
    return (
      <FormGroup color={validation.color} {...this.props} />
    );
  }
}
