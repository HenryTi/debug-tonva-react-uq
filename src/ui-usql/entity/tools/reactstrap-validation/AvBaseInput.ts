import * as React from 'react';
import * as PropTypes from 'prop-types';
import {isUndefined, isEqual} from 'lodash';

const htmlValidationAttrs = ['min', 'max', 'minLength', 'maxLength', 'pattern', 'required', 'step'];
const htmlValidationTypes = [
  'email', 'date', 'datetime', 'number', 'tel', 'url',
  /*'range', 'month', 'week', 'time'*/ // These do not currently have validation
];

export interface AvNoNameInputProps {
    id?: string;
    className?: string;
    errorMessage?: string | object;
    tag?: string;
    validationEvent?:
        ('' | 'onInput' | 'onChange' | 'onBlur' | 'onFocus') |
        (('onInput' | 'onChange' | 'onBlur' | 'onFocus')[]);
    validate?: object;
    value?: any;
    defaultValue?: any;
    trueValue?: any;
    falseValue?: any;
    checked?: boolean;
    defaultChecked?: boolean;
    state?: boolean;
    type?: string;
    size?: object; 
    required?: boolean;
    disabled?: boolean; // PropTypes.bool,
    readOnly?: boolean; // PropTypes.bool,
    placeholder?: string;
    min?: number|string|Date;
    max?: number|string|Date;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
    step?: number;
    onKeyUp?: Function;
    onInput?: Function;
    onFocus?: Function;
    onBlur?: Function;
    onChange?: Function;
    onReset?: Function;
};
export interface AvBaseInputProps extends AvNoNameInputProps {
    name: string;
}
export interface State {
    value: any;
}
export interface Context {
    FormCtrl: any;
}

export default class AvBaseInput extends React.Component<AvBaseInputProps, State> {
  public static defaultProps: Partial<AvBaseInputProps> = {
    validationEvent: '',
    validate: {},
    trueValue: true,
    falseValue: false,
  };

  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
  };

  private value: any;
  private validations: any;

  constructor(props) {
    super(props);

    this.state = { value: ''};
    this.validations = {};
    this.value = '';
    this.onKeyUpHandler = this.onKeyUpHandler.bind(this);
    this.onInputHandler = this.onInputHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.validate = this.validate.bind(this);
  }

  componentWillMount() {
    this.value = this.props.value || this.getDefaultValue();
    this.setState({value: this.value});
    this.updateValidations();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type === 'checkbox') {
      if (nextProps.checked !== this.props.checked) {
        if (nextProps.checked) {
          this.value = nextProps.trueValue;
        } else {
          this.value = nextProps.falseValue;
        }
        this.setState({value: this.value});
      }
    } else {
      if (nextProps.value !== this.props.value) {
        this.value = nextProps.value;
        this.setState({ value: nextProps.value });
      }
    }

    if (!isEqual(nextProps, this.props)) {
      this.updateValidations(nextProps);
    }
  }

  componentWillUnmount() {
    this.context.FormCtrl.unregister(this);
  }

  onKeyUpHandler(event) {
    if (event && event.target && event.target.validity &&
      event.target.validity.badInput !== this.context.FormCtrl.isBad[this.props.name] &&
      (event.target.validity.badInput !== false || this.context.FormCtrl.isBad[this.props.name] !== undefined)) {
      this.context.FormCtrl.setBad(this.props.name, event.target.validity.badInput);
      this.validate();
    }
    this.props.onKeyUp && this.props.onKeyUp(event);
  }

  onInputHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onInput', _value);
    !this.context.FormCtrl.isDirty[this.props.name] && this.context.FormCtrl.setDirty(this.props.name);
  }

  onBlurHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onBlur', _value);
    !this.context.FormCtrl.isTouched[this.props.name] && this.context.FormCtrl.setTouched(this.props.name);
  }

  onFocusHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onFocus', _value);
  }

  onChangeHandler(_value) {
    this.value = this.getFieldValue(_value);
    this.validateEvent('onChange', _value);
    !this.context.FormCtrl.isDirty[this.props.name] && this.context.FormCtrl.setDirty(this.props.name);
  }

  getDefaultValue() {
    let defaultValue = '';

    if (this.props.type === 'checkbox') {
      if (!isUndefined(this.props.defaultChecked)) {
        return this.props.defaultChecked ? this.props.trueValue : this.props.falseValue;
      }
      defaultValue = this.props.falseValue;
    }

    let value = this.props.defaultValue || this.context.FormCtrl.getDefaultValue(this.props.name);

    if (this.props.type === 'checkbox' && value !== this.props.trueValue) {
      value = defaultValue;
    }

    return isUndefined(value) ? defaultValue : value;
  }

  getFieldValue(event){
    if (this.props.type === 'checkbox') {
      return event.target.checked ? this.props.trueValue : this.props.falseValue;
    }
    return event && event.target && !isUndefined(event.target.value) ? event.target.value : event;
  }

  getValidationEvent() {
    const validationEvent = this.props.validationEvent
      ? this.props.validationEvent
      : this.context.FormCtrl.validationEvent;
    return Array.isArray(validationEvent) ? validationEvent : [validationEvent];
  }

  getValidatorProps() {
    const state = this.props.state && this.context.FormCtrl.getInputState(this.props.name);
    const htmlValAttrs = Object.keys(this.props.validate || {})
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .reduce((result, item) => {
        result[item] = this.props.validate[item].value || this.props.validate[item];
        return result;
      }, {});

    const newProps = {
      onKeyUp: this.onKeyUpHandler,
      onBlur: this.onBlurHandler,
      onInput: this.onInputHandler,
      onFocus: this.onFocusHandler,
      onChange: this.onChangeHandler,
      value: this.value,
      ...htmlValAttrs,
    };

    if (this.props.type === 'checkbox') {
      newProps['checked'] = this.value === this.props.trueValue;
    }

    if (state) {
      newProps['state'] = state;
    }

    return newProps;
  }

  getValue() {
    return this.value;
  }

  reset() {
    this.value = this.getDefaultValue();
    this.context.FormCtrl.setDirty(this.props.name, false);
    this.context.FormCtrl.setTouched(this.props.name, false);
    this.context.FormCtrl.setBad(this.props.name, false);
    this.setState({value: this.value});
    this.validate();
    this.props.onReset && this.props.onReset(this.value);
  }

  validateEvent(eventName, _event) {
    if (this.getValidationEvent().includes(eventName)) {
      this.setState({value: this.value});
      this.validate();
    }
    this.props[eventName] && this.props[eventName](_event, this.value);
  }

  validate() {
    this.context.FormCtrl.validate(this.props.name);
  }

  updateValidations(props = this.props) {
    this.validations = Object.assign({}, props.validate);

    if (htmlValidationTypes.indexOf(props.type) > -1) {
      this.validations[props.type] = this.validations[props.type] || true;
    }

    Object.keys(props)
      .filter(val => htmlValidationAttrs.indexOf(val) > -1)
      .forEach(attr => {
        if (props[attr]) {
          this.validations[attr] = this.validations[attr] || {value: props[attr]};
        } else {
          delete this.validations[attr];
        }
      });

    this.context.FormCtrl && this.context.FormCtrl.register(this);
    this.validate();
  }
}
