import React, { Component } from "react";
import "./commonStyle.css";
import SubmitButtonComponent from "./SubmitButtonComponent";
import CancelButtonComponent from "./CancelButtonComponent";

class OptionSelectionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedData: [],
      primaryDataFromApi: this.props.optionDataPrimary,
      arrayData: [],
      secArrayData: [],
      joined: [],
      search: "",
      searchLogo: true,
      searchBar: this.props.isSearchBar,
      primaryHover: this.props.isPrimaryHover,
      secondaryHover: this.props.isSecondaryHover,
      moreOption: this.props.isMoreOption,
      isButtons: this.props.isButtonsActive,
      clickedPrimaryData: [],
      clickedSecondaryData: [],
    };
    this.searchAction = this.searchAction.bind(this);
    this.OptionSelecting = this.OptionSelecting.bind(this);
    this.ClickAction = this.ClickAction.bind(this);
    this.OptionSelected = this.OptionSelected.bind(this);
    this.ClickData = this.ClickData.bind(this);
    this.submitAction = this.submitAction.bind(this);
    this.resetAction = this.resetAction.bind(this);
  }

  componentDidMount() {
    const primeArr = [...this.state.primaryDataFromApi];
    this.setState({ arrayData: primeArr });
  }
  componentDidUpdate(preProps, preState) {
    if (
      preProps.clickedPrimaryOptionData !== this.props.clickedPrimaryOptionData
    ) {
      this.setState({
        clickedPrimaryData: this.props.clickedPrimaryOptionData,
      });
    }

    if (
      preProps.clickedSecondaryOptionData !==
      this.props.clickedSecondaryOptionData
    ) {
      this.setState({
        clickedSecondaryData: this.props.clickedSecondaryOptionData,
      });
    }

    if (preProps.optionDataSecondary !== this.props.optionDataSecondary) {
      this.setState({ selectedData: this.props.optionDataSecondary });
    }

    const primeArray = this.state.arrayData;
    const secondArray = this.state.selectedData;

    primeArray
      .sort(
        (
          { [this.props.PrimaryArrayAttributeId]: previousId },
          { [this.props.PrimaryArrayAttributeId]: currentId }
        ) => previousId - currentId
      )
      .map((primeItem, index) => {
        secondArray.map((secondItem) => {
          if (
            primeItem[this.props.PrimaryArrayAttributeId] ===
            secondItem[this.props.SecondaryArrayAttributeId]
          ) {
            primeArray.splice(primeItem, 1);
            this.setState({ arrayData: primeArray });
          }
          return null;
        });
        return null;
      });

      if(preState.selectedData !== this.state.selectedData){
        const saveMe = this.props.saveAction;
         saveMe( this.state.selectedData);
        // console.log("array data " , this.state.selectedData)
      }
  }

  render() {
    const { search } = this.state;
    var array = this.state.arrayData;
    let filteredSearch = array
      .filter((item) => {
        return (
          item[this.props.PrimaryArrayAttributeName]
            .toLowerCase()
            .indexOf(search.toLocaleLowerCase()) !== -1
        );
      })
      .sort(
        (
          { [this.props.PrimaryArrayAttributeId]: previousId },
          { [this.props.PrimaryArrayAttributeId]: currentId }
        ) => previousId - currentId
      );

    return (
      <div>
        <div className="">
          <div className="option-content border">
            <div className="row option-component-heading">
              <div className="col-md-3 option-data-content-area">
                {this.state.searchBar ? (
                  <div className="search-icon-container">
                    <p> {this.props.firstColumnHeading}</p>
                    <input
                      type="search"
                      id="myInput"
                      className="form-control"
                      placeholder="Search...."
                      onChange={this.searchAction}
                    />
                    {this.state.search.length === 0 ? (
                      <i className="fa fa-search search-icon-1"></i>
                    ) : null}
                  </div>
                ) : null}

                <hr />

                {/* sorting the array at the beginning and then looping through the array to fetch the data  */}
                {filteredSearch.map((item, itemIndex) => (
                  <div key={item[this.props.PrimaryArrayAttributeId]}>
                    <div className="role-label">
                      <label
                        id={item[this.props.PrimaryArrayAttributeId]}
                        onClick={this.OptionSelecting}
                        className="opt-label"
                      >
                        {item[this.props.PrimaryArrayAttributeName]}
                      </label>

                      {this.state.moreOption ? (
                        <div className="more">
                          <img
                            src={require("../../assets/images/icons/more.svg")}
                            alt="more-option"
                            onClick={this.ClickAction}
                            id={itemIndex}
                            data-toggle="tooltip"
                            title={this.props.toolTipData}
                          ></img>

                          {/* <span className="more-tooltip">Tooltip text</span> */}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ))}
                {/* The vertical line within the options  */}
                <span className="border-right"></span>
              </div>

              <div className="col-md-3 option-data-content-area">
                <p>{this.props.secondColumnHeading}</p>
                {this.state.selectedData.map((item, index) => (
                  <div key={item[this.props.SecondaryArrayAttributeId]}>
                    <div className="role-label" id={index}>
                      <label className="opt-label">
                        {item[this.props.SecondaryArrayAttributeName]}
                      </label>
                      <div className="close-action">
                        <img
                          src={require("../../assets/images/icons/error.png")}
                          id={index}
                          onClick={this.OptionSelected}
                          alt="delete-icon"
                        ></img>
                      </div>
                    </div>
                  </div>
                ))}
                <span className="border-right"></span>
              </div>
              {/* Second Option Data */}
              {this.state.primaryHover ? (
                <div className="col-md-3 option-data-content-area">
                  <p>{this.props.thirdColumnHeading}</p>
                  {this.state.clickedPrimaryData.map((item, index) => (
                    <div
                      key={item[this.props.clickedPrimaryOptionDataAttributeId]}
                    >
                      <div className="role-label">
                        <label className="opt-label" id={index}>
                          {
                            item[
                              this.props.clickedPrimaryOptionDataAttributeName
                            ]
                          }
                        </label>
                        {this.state.secondaryHover ? (
                          <div className="more">
                            <img
                              src={require("../../assets/images/icons/more.svg")}
                              alt="more-option"
                              onClick={this.ClickData}
                              data-toggle="tooltip"
                              title={this.props.toolTipData}
                              id={
                                item[
                                  this.props.clickedPrimaryOptionDataAttributeId
                                ]
                              }
                            ></img>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  ))}
                  {/* <span className="border-right"></span> */}
                </div>
              ) : null}

              {/* the third Option data  */}
              {this.state.secondaryHover ? (
                <div className="col-md-3 option-data-content-area ">
                  <p>{this.props.fourthColumnHeading}</p>
                  {this.state.clickedSecondaryData.map((item, index) => (
                    <div
                      key={
                        item[this.props.clickedSecondaryOptionDataAttributeId]
                      }
                    >
                      <div className="role-label">
                        <label className="opt-label">
                          {
                            item[
                              this.props.clickedSecondaryOptionDataAttributeName
                            ]
                          }
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

            {this.state.isButtons ? (
              <div className="container mt-3">
                <SubmitButtonComponent
                  submitButtonStyle="button-style button-action btn-sm "
                  submitButtonLableName="Submit"
                  submitButtonValue="submit"
                  submitButtonType="button"
                  submitButtonId="submit-button"
                  isSubmitDisabled={false}
                  submitButtonClick={this.submitAction}
                />
                <CancelButtonComponent
                  CancelbuttonStyle="button-style button-action btn-sm"
                  submitButtonLableName="Reset"
                  submitButtonValue="reset"
                  submitButtonId="reset"
                  isCanceledDisabled={false}
                  cancelButtonClick={this.resetAction}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  OptionSelecting(e) {
    var selectedArray1 = this.state.selectedData;
    var currentArray = this.state.arrayData;
    var joinedArray = this.state.arrayData.concat(this.state.selectedData); //Binding both the selected array and the item array as one
    var index = e.target.id;

    currentArray
      .sort(
        (
          { [this.props.PrimaryArrayAttributeId]: previousId },
          { [this.props.PrimaryArrayAttributeId]: currentId }
        ) => previousId - currentId
      )
      .map((item, itemIndex) => {
        if (index === item[this.props.PrimaryArrayAttributeId].toString()) {
          selectedArray1.push(item);
          currentArray.splice(itemIndex, 1);
          this.setState({ arrayData: currentArray });
          this.setState({ joined: joinedArray });
        }

        return null;
      });
    this.setState({ clickedPrimaryData: [] });
    this.setState({ clickedSecondaryData: [] });

    // var array = this.state.selectedData;
    // const saveMe = this.props.saveAction;
    // saveMe(array);
  }

  OptionSelected(e) {
    var index = e.target.id;
    var selectedArray = [...this.state.selectedData];
    var itemsArray = this.state.arrayData;

    selectedArray.map((item, itemIndex) => {
      if (index === itemIndex.toString()) {
        itemsArray.push(item);
        selectedArray.splice(itemIndex, 1);
        this.setState({ selectedData: selectedArray });
        this.setState({ arrayData: itemsArray });
      }

      return null;
    });
    // const saveMe = this.props.saveAction;
    // saveMe(selectedArray);
  }

  resetAction = (e) => {
    var completeArray = this.state.joined;
    if (completeArray.length !== 0) {
      this.setState({ selectedData: [] });
      this.setState({ clickedPrimaryData: [] });
      this.setState({ arrayData: completeArray });
    }
  };

  submitAction() {
    //Button
    // const saveMe = this.props.saveAction;
    // var submitArray = this.state.selectedData;
    // console.log(submitArray);
    // saveMe(submitArray);
  }

  searchAction(e) {
    this.setState({ search: e.target.value });
    if (this.state.search !== 0) {
      this.setState({ searchLogo: false });
    }
  }

  ClickAction(e) {
    var PrimaryArray = this.state.arrayData;

    PrimaryArray.sort(
      ({ id: previousId }, { id: currentId }) => previousId - currentId
    ).map((item, index) => {
      if (index.toString() === e.target.id) {
        this.props.primaryOptionClickAction(
          item[this.props.PrimaryArrayAttributeId]
        );
      }
    });
  }

  ClickData(e) {
    var index = e.target.id;
    if (this.state.secondaryHover === true) {
      this.props.secondaryOptionClickAction(index);
    }
    return null;
  }
}

export default OptionSelectionComponent;
