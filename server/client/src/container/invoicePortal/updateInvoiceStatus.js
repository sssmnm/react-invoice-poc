import React from 'react';
import { MDBDataTable } from 'mdbreact';

const invoiceStatusOptions = [
    'Draft',
    'Pending Submission',
    'Submitted',
    'Pending Approval',
    'Approved',
    'Pending Payment',
    'Paid in Part',
    'Closed',
    'Short Closed',
    'Cancelled',
    'On Hold',
    'Written-Off',
    'Paid in Full',
];

const columns = [
    {
        label: 'Invoice No',
        field: 'invoice_number',
        sort: 'asc',
        width: 200
    },
    {
        label: 'Invoice Date',
        field: 'invoice_date',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Customer Name',
        field: 'customer_name',
        sort: 'asc',
        width: 200
    },
    {
        label: 'Invoice Value',
        field: 'invoice_value',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Payment Term',
        field: 'payment_term',
        sort: 'asc',
        width: 80
    },
    {
        label: 'Due Date',
        field: 'due_date',
        sort: 'asc',
        width: 150
    },
    {
        label: 'Invoice Status',
        field: 'invoice_status',
        sort: 'asc',
        width: 250
    }
];

class UpdateInvoiceStatus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: this.props.selectedInvoice.invoice_status
        };
    }
    handleOptionChange = (changeEvent) => {
        this.setState({
            selectedOption: changeEvent.target.value
        }, () => {
            this.props.setInvoiceStatus(this.state.selectedOption);
        });
    };
    render() {
        return (
            <div id="updateInvoiceStatus">
                <div>
                    <MDBDataTable
                        bordered
                        large
                        searching={false}
                        sorting={false}
                        data={{ columns, rows: [this.props.selectedInvoice] }}
                        paging={false}
                    >
                    </MDBDataTable>
                </div>
                <div className="flex-container">
                    <form>
                        {invoiceStatusOptions.map((status) => {
                            return (
                                <div className="form-check form-check-inline invoiceRadio">
                                    <input
                                        className="form-check-input "
                                        type="radio"
                                        value={status}
                                        defaultChecked={this.state.selectedOption === status}
                                        name="invoiceStatus"
                                        id={`invoiceStatus_${status}`}
                                        onChange={this.handleOptionChange} />
                                    <label
                                        className="form-check-label" for="invoiceStatus">
                                        {status}
                                    </label>
                                </div>);
                        })}
                    </form>
                </div>
            </div>
        );
    }
}
export default UpdateInvoiceStatus;
