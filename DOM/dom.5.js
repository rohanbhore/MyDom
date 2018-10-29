const MyReact = (function () {
    function createElement(type, attributes = {}, ...children) {
        let childElements = [].concat(...children).reduce(
            (acc, child) => {
                if (child != null && child !== true && child !== false) {
                    if (child instanceof Object) {
                        acc.push(child);
                    } else {
                        acc.push(createElement("text", {
                            textContent: child
                        }));
                    }
                }
                return acc;
            }
            , []);

        return {
            type,
            children: childElements,
            props: Object.assign({ children: childElements }, attributes)
        }
    }

    const render = function (vdom, container, oldDom = container.firstChild) {
        diff(vdom, container, oldDom);
    }

    const diff = function (vdom, container, oldDom) {
        let oldvdom = oldDom && oldDom._virtualElement;

        if (!oldDom) {
            mountElement(vdom, container, oldDom);
        }
        else if (oldvdom && oldvdom.type === vdom.type) {
            if (oldvdom.type === "text") {
                updateTextNode(oldDom, vdom, oldvdom);
            } else {
                updateDomElement(oldDom, vdom, oldvdom);
            }
            oldDom._virtualElement = vdom;
            vdom.children.forEach((child, i) => {
                diff(child, oldDom, oldDom.childNodes[i]);
            });
            //i have doughts
            let oldNodes = oldDom.childNodes;
            if (oldNodes.length > vdom.children.length) {
                for (let i = oldNodes.length - 1; i >= vdom.children.length; i -= 1) {
                    let nodeToBeRemoved = oldNodes[i];
                    unmountNode(nodeToBeRemoved, oldDom);
                }
            }
        }
    }
    function unmountNode(domElement, parentComponent) {
        domElement.remove();
    }
    function updateTextNode(domElement, newVirtualElement, oldVirtualElement) {
        if (newVirtualElement.props.textContent !== oldVirtualElement.props.textContent) {
            domElement.textContent = newVirtualElement.props.textContent;
        }
        domElement._virtualElement = newVirtualElement;
    }
    const mountElement = function (vdom, container, oldDom) {
        return mountSimpleNode(vdom, container, oldDom);

    }
    const mountSimpleNode = function (vdom, container, oldDomElement, parentComponent) {
        let newDomElement = null;
        const nextSibling = oldDomElement && oldDomElement.nextSibling;
        if (vdom.type === "text") {
            newDomElement = document.createTextNode(vdom.props.textContent);
        }
        else {
            newDomElement = document.createElement(vdom.type);
            updateDomElement(newDomElement, vdom);
        }

        newDomElement._virtualElement = vdom;
        if (nextSibling) {
            container.insertBefore(newDomElement, nextSibling);
        }
        else {
            container.appendChild(newDomElement);
        }

        vdom.children.forEach(child => {
            mountElement(child, newDomElement);
        });
    }


    function updateDomElement(domElement, newVirtualElement, oldVirtualElement = {}) {
        const newProps = newVirtualElement.props || {};
        const oldProps = oldVirtualElement.props || {};
        Object.keys(newProps).forEach(propName => {
            const newProp = newProps[propName];
            const oldProp = oldProps[propName];
            if (newProp !== oldProp) {
                if (propName.slice(0, 2) === "on") {
                    const eventName = propName.toLowerCase().slice(2);
                    domElement.addEventListener(eventName, newProp, false);
                    if (oldProp) {
                        domElement.removeEventListener(eventName, oldProp, false);
                    }
                } else if (propName === "value" || propName === "checked") {
                    domElement[propName] = newProp;
                } else if (propName !== "children") {
                    if (propName === "className") {
                        domElement.setAttribute("class", newProps[propName]);
                    } else {
                        domElement.setAttribute(propName, newProps[propName]);
                    }
                }
            }
        });
        Object.keys(oldProps).forEach(propName => {
            const newProp = newProps[propName];
            const oldProp = oldProps[propName];
            if (!newProp) {
                if (propName.slice(0, 2) === "on") {
                    domElement.removeEventListener(propName, oldProp, false);
                } else if (propName !== "children") {
                    domElement.removeAttribute(propName);
                }
            }
        });
    }
    return {
        createElement,
        render
    }
}());
