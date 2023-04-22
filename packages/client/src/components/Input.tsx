import React, { ChangeEvent, Component } from 'react'
import { InputProps } from '../interfaces'

class Input extends Component<InputProps, Record<string, string>> {
    constructor(props: InputProps) {
        super(props)

        this.state = {
            labelClass: 'label',
            inputClass: 'label__input',
            error: ''
        }
    }

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        if (value) {
            this.setState({ inputClass: 'label__input not-empty' })
        }
    }

    hasTooltip() {
        if (this.props.tooltip) {
            console.log(this.props)
            return (<span className='tooltip label__tooltip tooltip_left tooltip_bottom' data-text={this.props.tooltip}></span>)
        }
    }

    render() {
        return (
            <label className={this.state.labelClass}>
                <input type={this.props.type} className={this.state.inputClass} name={this.props.name} onChange={this.handleChange}/>
                <div className='label__line'></div>
                <span className='label__name'>{this.props.label}</span>
                <p className='text label_message'>{this.state.error}</p>
                {this.hasTooltip()}
            </label>
        )
    }
}

export default Input;
