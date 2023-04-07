import { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbar extends Component {

    constructor(props, ...rest) {
        super(props, ...rest);
        this.renderThumb = this.renderThumb.bind(this);
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: '#ffffff30',
            borderRadius: '2px'
        };
        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    render() {
        return (
            <Scrollbars
                className=''
                renderThumbHorizontal={this.renderThumb}
                renderThumbVertical={this.renderThumb}
                {...this.props}/>
        );
    }
}