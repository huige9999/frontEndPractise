import PropTypes from 'prop-types';


function CounterDisplay({count, onIncrement, onDecrement}) {
    return (
        <>
        <h1>计数器</h1>
        <p>当前计数：{count}</p>
        <button onClick={onIncrement}>增加</button>
        <button onClick={onDecrement}>减少</button> 
        </>
    )
}


CounterDisplay.propTypes = {
    count: PropTypes.number.isRequired,
    onIncrement: PropTypes.func.isRequired,
    onDecrement: PropTypes.func.isRequired
}

CounterDisplay.defaultProps = {
    count: 0
}

export default CounterDisplay;