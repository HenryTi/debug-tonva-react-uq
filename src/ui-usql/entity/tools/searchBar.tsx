import * as React from 'react';

interface Props {
    label?: string;
    placeHolder?: string;
    onSubmit: (key:string) => void;
}
interface State {
    disabled: boolean;
}
export class SearchBar extends React.Component<Props, State> {
    private input: HTMLInputElement;
    constructor(props) {
        super(props);
        this.state = {
            disabled: true,
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }
    onSubmit(e) {
        if (this.state.disabled === true) return;
        let text = this.input.value;
        this.props.onSubmit(text.trim());
        e.preventDefault();
    }
    onTextChange() {
        let text = this.input.value;
        text = text.trim();
        this.setState({
            disabled: text.length === 0,
        })
    }
    render() {
        let {label, placeHolder} = this.props;
        let {disabled} = this.state;
        let elLabel;
        if (label !== undefined)
            elLabel = <label>{label}</label>;
        return <form
            className='search-bar'
            onSubmit={this.onSubmit}>
            {elLabel}
            <input ref={(input) => this.input = input}
                onChange={this.onTextChange}
                type="text" name="text" placeholder={placeHolder} />
            <button disabled={disabled}>S</button>
        </form>;
    }
}
