const MyReact = (function () {
    function createElement(type, attributes = {}, ...children) {
        const childElements = [].concat(...children).map(
            child => {
                if (child !== null && child !== true && child !== false) {
                     return child instanceof Object //111
                        ? child
                        : createElement("text", {
                            textContent: child
                        })
                }
            }
        );
        return {
            type,
            children: childElements,
            props: Object.assign({ children: childElements }, attributes)
        }

    }
    return { createElement }
}());
