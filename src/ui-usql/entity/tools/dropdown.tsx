import * as React from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Row, Col, Button, Form, FormGroup, Label, Input, 
    FormText, FormFeedback} from 'reactstrap';

export interface MenuItem {
    caption: string;
    click?: () => void;
}

interface Props {
    isRight?: boolean;
    menuItems: MenuItem[];
}

interface State {
    dropdownOpen: boolean
}

export class Dropdown extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }
    render() {
        let {isRight, menuItems} = this.props;
        let elMenuItems;
        if (menuItems !== undefined) {
            elMenuItems = menuItems.map((item, index) => <DropdownItem
                key={index}
                onClick={item.click}>{item.caption}</DropdownItem>);
        }
        return <ButtonDropdown tag='div' 
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}>
            <DropdownToggle caret={true} size='sm'>+</DropdownToggle>
            <DropdownMenu right={isRight}>
                {elMenuItems}
            </DropdownMenu>
        </ButtonDropdown>;
    }
}
