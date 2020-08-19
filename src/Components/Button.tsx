import React from 'react';
import Proptypes from 'prop-types';

interface ButtonProps {
    title: string;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
        >
            {props.title}
        </button>
    );
};

Button.propTypes = {
    onClick: Proptypes.func,
    title: Proptypes.string.isRequired,
};

export default Button;
