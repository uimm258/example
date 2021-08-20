function createIncrement(){
    let value = 0;

    function increment() {
        ++value;
        console.log(value);
    }

    const message=`current message: ${value}`;
    function log(){
        console.log(message)

    }

    return [increment, log]
}

const [increment,log] = createIncrement()
increment()
increment()
log()