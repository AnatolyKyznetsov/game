import React, { useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuProps } from '../interfaces'
import { MenuItem } from './MenuItem';
import { v4 as makeId } from 'uuid'

export const Menu = ({ items }: MenuProps) => {
    const navigate = useNavigate();
    const [ activeIndex, setActiveIndex ] = useState(0);
    const id = makeId();

    const handleKeyPressArrow = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown') {
                setActiveIndex(prev =>
                    prev < items.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === 'ArrowUp') {
                setActiveIndex(prev => (prev ? prev - 1 : items.length - 1));
            }
        },
        [ items.length ]
    )

    const handleKeyPressEnter = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === 'Enter') {
                const item = items[activeIndex];

                if (item.url) {
                    navigate(item.url);
                } else if (item.clickHandeler) {
                    item.clickHandeler();
                }
            }
        },
        [ activeIndex ]
    );

    const handleMouseEneter = useCallback(
        (e: React.MouseEvent) => {
            const target = e.target as HTMLElement;

            if (target.dataset.index) {
                setActiveIndex(Number(target.dataset.index));
            }
        },
        [ activeIndex ]
    )

    useEffect(() => {
        if (items.length) {
            window.addEventListener('keydown', handleKeyPressArrow);
            window.addEventListener('keydown', handleKeyPressEnter);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyPressArrow);
            window.removeEventListener('keydown', handleKeyPressEnter);
        }
    }, [ activeIndex ]);

    return (
        <nav className='menu'>
            {items.map((item, key) => {
                if (item.url || item.clickHandeler) {
                    return (
                        <MenuItem key={id} index={key} isActive={key === activeIndex} title={item.title} url={item.url} clickHandeler={item.clickHandeler} mouseEnterHandeler={handleMouseEneter} />
                    )
                }
            })}
        </nav>
    )
}
