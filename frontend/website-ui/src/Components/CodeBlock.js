import React from 'react';
import PropTypes from 'prop-types';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { gruvboxDark, tomorrowNightEighties } from 'react-syntax-highlighter/dist/esm/styles/hljs';


export default class CodeBlock extends React.PureComponent {
  static propTypes = {
    value: PropTypes.string.isRequired,
    language: PropTypes.string,
  }

  static defaultProps = {
    language: null,
  }

  render() {
    const { language, value } = this.props;

    return (
      <SyntaxHighlighter className="text-align-left-center" language={language} style={gruvboxDark} showLineNumbers={true}>
        {String(value)}
      </SyntaxHighlighter>
    );
  }
}