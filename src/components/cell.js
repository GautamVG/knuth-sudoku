import { useState } from 'react';

export default function(props) {
    return <input style={{
        textAlign: 'center',
        fontSize: '3rem',
        width: '100%',
        outline: 'none',
    }}

    maxLength={1}
    disabled={!props.editable}
    value={props.value}
    onChange={e => { props.onChange(parseInt(e.target.value)) }}
    
    />
}