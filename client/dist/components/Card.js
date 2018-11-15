"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const reactstrap_1 = require("reactstrap");
exports.default = (props) => {
    return (React.createElement(reactstrap_1.Card, null,
        React.createElement(reactstrap_1.CardImg, { top: true, width: "100%", src: "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180", alt: "Card image cap" }),
        React.createElement(reactstrap_1.CardBody, null,
            React.createElement(reactstrap_1.CardTitle, null, props.title),
            React.createElement(reactstrap_1.CardSubtitle, null, "Card subtitle"),
            React.createElement(reactstrap_1.CardText, null, "Some quick example text to build on the card title and make up the bulk of the card's content."),
            React.createElement(reactstrap_1.Button, null, "Button"))));
};
//# sourceMappingURL=Card.js.map