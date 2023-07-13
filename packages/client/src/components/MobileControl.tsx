import React from 'react'
import { Controls } from '../engine/interfaces'

export const MobileControl = ({ controls }: Record<'controls', Controls>) => {
    return (
        <div className="mobile-control">
            <div className="mobile-control__button_sm mobile-control__player" ref={controls.next_player}></div>
            <div className="mobile-control__button_lg mobile-control__ability" ref={controls.first_ability}></div>

            <div className="mobile-control__moves">
                <div className="mobile-control__button mobile-control__move_up" ref={controls.up}></div>
                <div className="mobile-control__moves-inner">
                    <div className="mobile-control__button mobile-control__move_left" ref={controls.left}></div>
                    <div className="mobile-control__button mobile-control__move_right" ref={controls.right}></div>
                </div>
                <div className="mobile-control__button mobile-control__move_down" ref={controls.down}></div>
            </div>
        </div>
    )
}
