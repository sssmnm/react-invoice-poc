import React from 'react';
import { MDBDataTable } from 'mdbreact';

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
class RaiseQuery extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            emailId: ''
        };
    }
    handleChange = (changeEvent) => {
        this.setState({
            query: changeEvent.target.value
        }, () => {
            this.props.setQueryData(this.state.query);
        });
    };
    handleSelectChange = (changeEvent) => {
        this.setState({
            emailId: changeEvent.target.value
        }, () => {
            this.props.setEmailData(this.state.emailId);
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
                        <div className="form-group">
                            <textarea
                                className="form-control queryTextArea"
                                value={this.state.query}
                                onChange={this.handleChange}
                                rows="4"
                                cols="200"
                                placeholder="Query"
                            />
                        </div>
                        <div className="form-group">
                            <div >
                                <label for="exampleFormControlInput1">Email address</label>
                            </div>
                            <select
                                className="custom-select col-sm-4" id="emailId"
                                onChange={this.handleSelectChange}
                            >
                                <option selected>Choose...</option>
                                <option value="rathi.santwana@gmail.com">Santwana</option>
                                <option value="gaurav.sab.g@gmail.com">Gaurav</option>
                            </select>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export default RaiseQuery;
