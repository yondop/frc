import React from 'react';
import marked from 'marked';

const message =
`
# H1
## H2
### H3
Alternatively, for H1 and H2, an underline-ish style:
Alt-H1
======
Alt-H2
------
`;

export default React.createClass({
  updateValue: function(newValue) {
    this.setState({
      value: newValue
    });
  },
  getInitialState: function() {
    return {
      value: message
    };
  },
  rawMarkup: function(value) {
    return { __html: marked(value, { sanitize: true }) };
  },
  render: function() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Input value={this.state.value} updateValue={this.updateValue}/>
        </div>
        <div className="col-md-6">
          <span dangerouslySetInnerHTML={this.rawMarkup(this.state.value)}/>
        </div>
      </div>
    );
  }
});

let Input = React.createClass({
  update:function(){
  let newVal = this.refs.inputValue.getDOMNode().value;
  this.props.updateValue(newVal);
  },
  render:function(){
    return (<textarea rows="22" type="text"
      ref="inputValue" value={this.props.value}
      onChange={this.update} className="form-control" />
    )
  }
});
