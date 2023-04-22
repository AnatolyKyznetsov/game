import React, { Component } from 'react'
import { ButtonProps } from '../interfaces'

class Button extends Component<ButtonProps, Record<string, unknown>> {
    render() {
        return (
            <button className={this.props.buttonClass} type={this.props.type}>
                {this.props.text}
            </button>
        )
    }
}

export default Button;
