export interface InputProps {
    type: string,
    name: string,
    label: string
    tooltip: string
}

export interface ButtonProps {
    type: 'button' | 'submit' | 'reset',
    text: string,
    buttonClass: string
    onClick?: () => void
}
