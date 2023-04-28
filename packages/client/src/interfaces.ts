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

export interface MenuItemProps {
    title: string,
    url?: string,
    isActive?: boolean,
    index?: number,
    clickHandeler?: () => void,
    mouseEnterHandeler?: (e: React.MouseEvent) => void,
}

export interface MenuProps {
    items: MenuItemProps[]
}
