import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FormFeedback } from 'reactstrap';

//type Props = typeof FormFeedback.propTypes;
export interface Props {
  tag?: string;
  className?: string;
}

export default class AvFeedback extends React.Component<Props, null> {
  static propTypes = Object.assign({}, FormFeedback.propTypes);
  static contextTypes = {
    FormCtrl: PropTypes.object.isRequired,
    Group: PropTypes.object.isRequired,
  };

  render() {
    const validation = this.context.Group.getInputState();
    return validation.color ? <FormFeedback {...this.props} /> : null;
  }
}
