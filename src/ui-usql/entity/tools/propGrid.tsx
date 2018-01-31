import * as React from 'react';
import {Container, Row, Col} from 'reactstrap';

interface Props {
    items: {name:string, value:any}[];
    button?: any;
}
export class PropGrid extends React.Component<Props, null> {
    render() {
        let {button} = this.props;
        let elButton;
        if (button !== undefined)
            elButton = <Row className='button-row'>
                <Col sm={{push:3,size:9}}>
                    {button}
                </Col>
            </Row>;
        return <Container className='prop-grid'>
                {
                    this.props.items.map((v, i) => {
                        let {name, value} = v;
                        return <Row key={i}>
                            <Col sm={3}>{name}</Col>
                            {
                                value !== undefined?
                                <Col sm={9} className='value'>{value}</Col> :
                                <Col sm={9} className='no-value'>[无]</Col>
                            }
                        </Row>;
                    })
                }
                {elButton}
            </Container>;
    }
}