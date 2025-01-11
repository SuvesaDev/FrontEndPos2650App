import { useState } from 'react';
// import { useDispatch } from 'react-redux';

export const useForm = ( initialState = {} ) => {
    
    const [values, setValues] = useState(initialState);
    // const dispatch = useDispatch();

    const reset = () => {
        setValues( initialState );
    }

    const handleInputChange = ({ target }) => {
        setValues({
            ...values,
            [ target.name ] : target.value
        });
    };

    // const handleInputChangeCheckBox = ({ target }) => {
    //     setValues({
    //         ...values,
    //         [ target.name ] : target.checked
    //     });
    // };

    // const handleInputChangeWithDispatch = ({ target }, action) => {

    //     dispatch(action(target.value));

    //     setValues({
    //         ...values,
    //         [ target.name ] : target.value
    //     });
    // };

    return [ 
        values, 
        handleInputChange,
        // handleInputChangeCheckBox,
        // handleInputChangeWithDispatch,
        reset
    ];

}