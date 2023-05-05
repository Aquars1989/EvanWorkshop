import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

export default class CustomScrollbar extends Component {

    renderThumb({ style, ...props }: { style: React.CSSProperties }) {
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
                renderThumbHorizontal={this.renderThumb.bind(this)}
                renderThumbVertical={this.renderThumb.bind(this)}
                {...this.props}/>
        );
    }
}