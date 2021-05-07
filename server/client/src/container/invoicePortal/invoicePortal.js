import React from "react";
import Select from "react-select";
import { MDBDataTable } from "mdbreact";
import { Popover, PopoverHeader, PopoverBody } from "reactstrap";
import { ModalComponent } from "../modalComponent/modalComponent.js";
import UpdateInvoiceStatus from "./updateInvoiceStatus.js";
import RaiseQuery from "./raiseQuery.js";
import {
  getAllUsers,
  sendMail,
  updateStatus,
} from "../../services/UserService";

const options = [
  { value: "updateInvoiceStatus", label: "Update Invoice Status" },
  { value: "raiseQueryOnCustomer", label: "Raise Query On Customer" },
];

const columns = [
  {
    label: "Invoice No",
    field: "invoice_number",
    sort: "asc",
    width: 200,
  },
  {
    label: "Invoice Date",
    field: "invoice_date",
    sort: "asc",
    width: 150,
  },
  {
    label: "Customer Name",
    field: "customer_name",
    sort: "asc",
    width: 200,
  },
  {
    label: "GST Number",
    field: "gst_number",
    sort: "asc",
    width: 200,
  },
  {
    label: "Invoice Value",
    field: "invoice_value",
    sort: "asc",
    width: 150,
  },
  {
    label: "Payment Term",
    field: "payment_term",
    sort: "asc",
    width: 80,
  },
  {
    label: "Due Date",
    field: "due_date",
    sort: "asc",
    width: 150,
  },
  {
    label: "Invoice Status",
    field: "invoice_status",
    sort: "asc",
    width: 400,
  },
  {
    label: "Actions",
    field: "actions",
    sort: "disabled",
    width: 350,
  },
];

class InvoicePortal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceInfo: [],
      selectedInvoice: {},
      query: "",
      email: "",
      status: "",
      popoverOpen: {},
    };
    this.togglePopover = this.togglePopover.bind(this);
  }
  componentDidMount() {
    this.fetchInvoices();
  }
  togglePopover(id) {
    let initialPopover = this.state.popoverOpen;
    this.setState({
      popoverOpen: {
        ...initialPopover,
        [id]: initialPopover[id] ? false : true,
      },
    });
  }

  fetchInvoices = () => {
    getAllUsers().then((invoices) => {
      this.setState({
        invoiceInfo: invoices,
      });
    });
  };
  onChange = (event, invoice) => {
    const selectedAction = event ? event.value : "";
    if (selectedAction === "updateInvoiceStatus") {
      this.setState(
        {
          selectedInvoice: invoice,
          selectedAction,
        },
        () => {
          this.updateInvoiceStatusModal.openModal();
        }
      );
    } else if (selectedAction === "raiseQueryOnCustomer") {
      this.setState(
        {
          selectedInvoice: invoice,
          selectedAction,
        },
        () => {
          this.raiseQueryOnCustomerModal.openModal();
        }
      );
    }
  };
  setQueryData = (query) => {
    this.setState({
      query,
    });
  };
  setEmailData = (email) => {
    this.setState({
      email,
    });
  };
  setInvoiceStatus = (status) => {
    this.setState({
      status,
    });
  };

  closeModalAction = () => {
    this.updateInvoiceStatusModal && this.updateInvoiceStatusModal.closeModal();
    this.raiseQueryOnCustomerModal &&
      this.raiseQueryOnCustomerModal.closeModal();
    this.setState({
      selectedInvoice: {},
      query: "",
      email: "",
      status: "",
    });
  };

  colorInfoIcon = (status) => {
    let iconColor = "#ffffff";
    if (status === "Closed") {
      iconColor = "custom-green-color";
    } else if (status === "Pending Approval") {
      iconColor = "custom-amber-color";
    } else if (status === "Approved") {
      iconColor = "custom-grey-color";
    } else if (status === "Cancelled") {
      iconColor = "custom-red-color";
    }
    return `fa fa-info-circle ${iconColor}`;
  };

  getIconInfo = (status, name) => {
    let infoData = [];
    if (status === "Closed") {
      infoData.push("1.The invoice is closed with payment.");
    } else if (status === "Pending Approval") {
      infoData.push(`1.Invoice Due for payment in 4 days \n`);
      infoData.push(`2.${name} has a history of paying within 30 days from Invoice Date`)
      infoData.push(`3.${name} is a 3 - star rated Customer based on payments history of last 12 months.\n`)
      infoData.push(`4.Delinquency Risk is estimated to be MEDIUM for this Invoice & Customer \n`)
      infoData.push(`5.No queries exchanged with customer for this Invoice\n\nSystem Recommendation: Follow - up needs to be done for avoiding Delayed Payments`);
    } else if (status === "Approved") {
      infoData.push("1.Invoice is approved.");
    } else if (status === "Cancelled") {
      infoData.push(`1.Invoice Overdue for payment by 62 Days\n`);
      infoData.push(`2.${name} has a history of paying within 45 days from Invoice Date`);
      infoData.push(`3.${name} is a 4 - star rated Customer based on payments history of last 12 months`);
      infoData.push(`4.Delinquency Risk is estimated to be LOW for this Invoice & Customer`);
      infoData.push(`5.2 Queries shared with customer for this Invoice\n\nSystem Recommendation: Send Reminder to Customer for Invoice`);
    }
    return infoData;
  };
  formatDate = (date) => {
    return date.split("/").reverse().join("/");
  };

  setInvoiceStatus = (row) => {
    this.setState({
      selectedInvoice: row
    }, () => {
      this.invoiceStatusModal.openModal();
    });
  };

  generateTableData = () => {
    let targetPopover = "";
    const tooltipMessage =
      "1.Click to View INKRETA Insights\n2.Later we can change the message based on the colour";
    const rows = this.state.invoiceInfo.map((row, index) => {
      targetPopover = row.invoice_number;
      return {
        ...row,
        due_date: this.formatDate(row.due_date),
        invoice_date: this.formatDate(row.invoice_date),
        invoiceNo: (
          <span id={`invoice${row.invoiceNo}`} className={"invoiceLink"}>
            {row.invoiceNo}
          </span>
        ),
        invoice_status: (
          <span className="status-position" key={`statusDiv_${row.invoice_number}`}>
            <span className="position-right">{row.invoice_status}</span>
            <span className="position-left">
              <i
                id={`mypopover${targetPopover} `}
                key={`mypopoverIcon${row.invoice_number} `}
                className={this.colorInfoIcon(row.invoice_status)}
                aria-hidden="true"
                data-toggle="tooltip"
                data-placement="right"
                title={tooltipMessage}
                onClick={(e) => this.setInvoiceStatus(row)}
              ></i>
              {/* <Popover
              key={`myPopoverComp${row.invoice_number} `}
              placement="bottom"
              isOpen={this.state.popoverOpen[row.invoice_number]}
              target={`mypopover${targetPopover} `}
              toggle={(e) => this.togglePopover(row.invoice_number)}
            >
              <PopoverHeader>{row.invoice_number}</PopoverHeader>
              <PopoverBody>
                {this.getIconInfo(row.invoice_status, row.customer_name)}
              </PopoverBody>
            </Popover> */}
            </span>
          </span>
        ),
        actions: (
          <Select
            className="select-action basic-single"
            classNamePrefix="select"
            isClearable={true}
            isSearchable={true}
            name="actions"
            options={options}
            id={`action_${index}`}
            onChange={(e) => this.onChange(e, row)}
            value={""}
          />
        ),
      };
    });
    return {
      columns,
      rows,
    };
  };

  handleOK = (modalId) => {
    if (modalId === "updateInvoiceStatusModalId") {
      updateStatus(
        this.state.status,
        this.state.selectedInvoice.invoice_number
      ).then(() => {
        this.fetchInvoices();
      });
    } else if (modalId === "raiseQueryOnCustomerModal") {
      sendMail({
        invoiceNo: this.state.selectedInvoice.invoice_number,
        query: this.state.query,
        email: this.state.email,
      });
    }
    this.closeModalAction();
  };
  checkForDisable = (modalId) => {
    if (modalId === "updateInvoiceStatusModalId") {
      return this.state.status === "";
    } else if (modalId === "raiseQueryOnCustomerModal") {
      return this.state.query === "" || this.state.email === "";
    }
    return false;
  };

  renderUpdateInvoiceStatusModalFooter = (modalId) => {
    return (
      <div className="row col-sm-12">
        <div className="offset-sm-5"></div>
        <div className="col-sm-1">
          <button className="btn btn-danger" onClick={this.closeModalAction}>
            CANCEL
          </button>
        </div>
        <div className="col-sm-1">
          <button
            className="btn btn-primary okBtn"
            onClick={() => {
              this.handleOK(modalId);
            }}
            disabled={this.checkForDisable(modalId)}
          >
            OK
          </button>
        </div>
      </div>
    );
  };
  closeInvoiceInfoModalAction = () => {
    this.setState({
      selectedInvoice: {}
    }, () => {
      this.invoiceStatusModal.closeModal();
    });
  }
  render() {
    const selectedInvoice = this.state.selectedInvoice;
    const invoiceStatusData = this.getIconInfo(selectedInvoice.invoice_status, selectedInvoice.customer_name) || [];
    return (
      <div id="invoicePortal">
        <ModalComponent
          ref={(r) => {
            this.invoiceStatusModal = r;
          }}
          modalTitle={`${selectedInvoice.invoice_number} `}
          modalId={"invoiceStatusModalId"}
          modalSize="large"
          onHide={this.closeInvoiceInfoModalAction}
        >
          {
            Object.keys(selectedInvoice).length !== 0 &&
            invoiceStatusData.map(
              (row) => <div>{row}</div>
            )}
        </ModalComponent>
        <ModalComponent
          ref={(r) => {
            this.updateInvoiceStatusModal = r;
          }}
          modalTitle={"Update Invoice Status"}
          modalId={"updateInvoiceStatusModalId"}
          modalSize="x-large"
          showFooter
          onHide={this.closeModalAction}
          footerContent={this.renderUpdateInvoiceStatusModalFooter(
            "updateInvoiceStatusModalId"
          )}
        >
          <UpdateInvoiceStatus
            selectedInvoice={this.state.selectedInvoice}
            setInvoiceStatus={this.setInvoiceStatus}
          />
        </ModalComponent>
        <ModalComponent
          ref={(r) => {
            this.raiseQueryOnCustomerModal = r;
          }}
          modalTitle={"Raise Query On Customer"}
          modalId={"raiseQueryOnCustomer"}
          modalSize="x-large"
          showFooter
          onHide={this.closeModalAction}
          footerContent={this.renderUpdateInvoiceStatusModalFooter(
            "raiseQueryOnCustomerModal"
          )}
        >
          <RaiseQuery
            selectedInvoice={this.state.selectedInvoice}
            setEmailData={this.setEmailData}
            setQueryData={this.setQueryData}
          />
        </ModalComponent>
        <div style={{ height: 400, width: "100%" }}>
          <MDBDataTable
            entriesOptions={[5, 10, 20]}
            striped
            bordered
            large
            entries={5}
            data={this.generateTableData()}
            disableRetreatAfterSorting={true}
          />
        </div>
      </div>
    );
  }
}

export default InvoicePortal;
