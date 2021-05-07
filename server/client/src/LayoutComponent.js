import React from 'react';
import { LeftMenu } from "./container/leftMenu/leftMenu.js"
import InvoicePortal from "./container/invoicePortal/invoicePortal.js"
class LayoutComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="Layout">
        <div className="container">
          <div>
            <InvoicePortal />
          </div>
        </div>
      </div>
    );
  }
}

export default LayoutComponent;
