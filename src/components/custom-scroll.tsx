import React, { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

interface ColoredScrollbarsState {
  top: number;
}

interface CustomScrollbarProps {
  children: React.ReactNode;
  style: React.CSSProperties;
}
export default class ColoredScrollbars extends Component<
  CustomScrollbarProps,
  ColoredScrollbarsState
> {
  constructor(props: CustomScrollbarProps) {
    super(props);
    this.renderView = this.renderView.bind(this);
    this.renderThumb = this.renderThumb.bind(this);
  }

  renderView({
    style,
    ...props
  }: {
    style: React.CSSProperties;
    [key: string]: any;
  }) {
    const viewStyle = {};
    return (
      <div className="box" style={{ ...style, ...viewStyle }} {...props}>
        {props.children}
      </div>
    );
  }

  renderThumb({
    style,
    ...props
  }: {
    style: React.CSSProperties;
    [key: string]: any;
  }) {
    const thumbStyle = {
      backgroundColor: "#ffffff40",
      borderRadius: "4px",
    };
    return <div style={{ ...style, ...thumbStyle }} {...props} />;
  }

  render() {
    return (
      <Scrollbars
        autoHide
        autoHideDuration={2000}
        renderView={this.renderView}
        renderThumbHorizontal={this.renderThumb}
        renderThumbVertical={this.renderThumb}
        {...this.props}
      />
    );
  }
}
