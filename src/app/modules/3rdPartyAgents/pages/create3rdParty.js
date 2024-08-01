import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useHistory } from "react-router-dom";
import {
  create3rdPartyAgent,
  updateMy3rdPartyAgent,
  read3rdPartyAgent,
  get3rdPartyAgents,
  GetAvailable3rdPartyCommissionAgents
} from "./../apiCalls/3rdpartyagentsCrud";
import CustomAlert from "../../../../components/customAlert";
import CustomButton from "../../../../components/customButton/index";
import FormControl from "../../../../components/formControl";
import { ButtonBox, CustomFormField, PrimaryHeading } from "../../../baseStyle"
import { PartyCreateContainer } from "./style";
import { Box } from "@material-ui/core";

const CreateParty = ({
  EmployeeID,
  BrokerID,
}) => {
  const history = useHistory();
  const routeParams = window.location.pathname.split("/");
  const selectedLeadId = routeParams[3];
  const viewpartyagentdetail = routeParams[2];

  const initialValues = {
    available3rdPartyAgentname: "",
    brokerCommissionRate: "",
    coManagedCommissionRate: "",
    brokerOwned: "",
    property3rdpartyId: "",

  };


  const [ListData, setListData] = useState(null);
  const [getDataLoading, setgetDataLoading] = useState(false);
  const [submitFromLoading, setsubmitFromLoading] = useState(false);
  const [fetchedAgents, setfetchedAgents] = useState([]);
  const [fetchedAvailableAgents, setfetchedAvailableAgents] = useState([])



  useEffect(() => {
    get3rdPartyAgents(BrokerID, EmployeeID).then((res) => {
      const newagents = res.Data.map((item) => {
        return {
          itemId: item.employeeID,
          itemName: `${item.employeeFirstName}  ${item.employeeLastName}`
        }
      })
      setfetchedAgents(newagents)
    })
    GetAvailable3rdPartyCommissionAgents(BrokerID, EmployeeID).then((res) => {
      const newavailbleagents = res.Data.map((item) => {
        return {
          itemId: item.employeeID,
          itemName: `${item.employeeFirstName}  ${item.employeeLastName}`
        }
      })
      setfetchedAvailableAgents(newavailbleagents)
    })
  }, [])




  useEffect(() => {
    if (selectedLeadId) {
      setgetDataLoading(true);
      read3rdPartyAgent(EmployeeID, BrokerID)
        .then((res) => {
          console.log(res.Data, 'here is data');
          setgetDataLoading(false);
          setListData(res.Data[0]);
        })
        .catch((err) => {
          setgetDataLoading(false);
          console.log(err);
        });
    }
  }, [selectedLeadId]);

  const navigateHandler = () => {
    history.push(`/3rd-party-agents/editpartyagent/${selectedLeadId}`);
  };
  const changePath = () => {
    history.push("/3rd-party-agents/list");
  };
  const onSubmit = (value, { resetForm }) => {
    setsubmitFromLoading(true);




    const finalData = {
      employeeID: EmployeeID,
      brokerID: BrokerID,
      commissionRatesList: [
        {
          commissionRateTypeID: 1,
          commissionRate: value.brokerCommissionRate
        },
        {
          commissionRateTypeID: 2,
          commissionRate: value.coManagedCommissionRate
        },
        {
          commissionRateTypeID: 3,
          commissionRate: value.brokerOwned
        },
        {
          commissionRateTypeID: 4,
          commissionRate: value.property3rdpartyId
        }
      ]
    }


    if (viewpartyagentdetail === "editpartyagent") {
      updateMy3rdPartyAgent(EmployeeID, finalData)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Broker update successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    } else {
      create3rdPartyAgent(EmployeeID, finalData)
        .then((res) => {
          setsubmitFromLoading(false);
          resetForm();
          CustomAlert("Broker created successfully", "success", changePath);
        })
        .catch((error) => {
          console.log("error");
          setsubmitFromLoading(false);
          CustomAlert("Some thing went wrong", "error");
        });
    }
  };

  return (
    <PartyCreateContainer>
      {getDataLoading ? (
        <div className={"container"}>
          <div className='container spinner-center spinner spinner-primary spinner-lg mr-15'></div>
        </div>
      ) : (
        <div className='createPartyContent'>
          <div className='createPartyContent_heading'>
            {viewpartyagentdetail === "viewpartyagentdetail" ? (
              <div className='createPartyContent_heading_view'>
                <PrimaryHeading>Add 3rd Party Agent Details</PrimaryHeading>
                <CustomButton type='button' width='95px' click={navigateHandler} text='Edit' />
              </div>
            ) : (
              <PrimaryHeading>
                {" "}
                {viewpartyagentdetail === "editpartyagent"
                  ? "Edit 3rd Party Agent"
                  : "Add 3rd Party Agent"}{" "}
              </PrimaryHeading>
            )}
          </div>
          <div className='createPartyContent_form'>
            <Formik
              initialValues={ListData ? ListData : initialValues}
              validationSchema={validationSchema}
              enableReinitialize={true}
              onSubmit={onSubmit}
            >
              {(formik) => {
                return (
                  <form
                    name='basic'
                    onSubmit={formik.handleSubmit}
                    autoComplete='off'
                  //  validateMessages={validationSchema}
                  >
                    <CustomFormField>
                      <FormControl
                        control='select'
                        type='text'
                        name='available3rdPartyAgentname'
                        disabled={viewpartyagentdetail === "viewpartyagentdetail"}
                        label='Available 3rd Party Agents*'
                        placeholder="Choose 3rd Party Agent"
                        className={
                          formik.errors.available3rdPartyAgentname && formik.touched.available3rdPartyAgentname
                            ? "is-invalid"
                            : "customInput"
                        }
                        options={fetchedAgents}
                      />
                      <FormControl
                        control='input'
                        type='number'
                        name='brokerCommissionRate'
                        placeholder='Enter Broker Manager'
                        disabled={viewpartyagentdetail === "viewpartyagentdetail"}
                        label='Commission Rate For: Broker Managed *'
                        className={
                          formik.errors.brokerCommissionRate &&
                            formik.touched.brokerCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='number'
                        name='coManagedCommissionRate'
                        disabled={viewpartyagentdetail === "viewpartyagentdetail"}
                        placeholder='Enter Co Manager'
                        label='Commission Rate For: Co Managed*'
                        className={
                          formik.errors.coManagedCommissionRate && formik.touched.coManagedCommissionRate
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <FormControl
                        control='input'
                        type='number'
                        name='brokerOwned'
                        disabled={viewpartyagentdetail === "viewpartyagentdetail"}
                        placeholder='Enter Broker Owner'
                        label='Broker Owned*'
                        className={
                          formik.errors.brokerOwned && formik.touched.brokerOwned
                            ? "is-invalid"
                            : "customInput"
                        }
                      />
                    </CustomFormField>

                    <CustomFormField>
                      <FormControl
                        control='input'
                        type='text'
                        name='property3rdpartyId'
                        disabled={viewpartyagentdetail === "viewpartyagentdetail"}
                        placeholder='Enter 3rd Party Property '
                        label='3rd Party Property *'
                        className={
                          formik.errors.property3rdpartyId && formik.touched.property3rdpartyId
                            ? "is-invalid"
                            : "customInput"
                        }
                      />

                      <div style={{ width: '100%' }}></div>

                    </CustomFormField>

                    {viewpartyagentdetail === "viewpartyagentdetail" ? null : (
                      <ButtonBox>
                        <CustomButton type='button' color='#121212' bgColor='#F5F5F5' width='136px' border='none' click={changePath} text='Cancel' />
                        <CustomButton type='submit' disabled={submitFromLoading} text={viewpartyagentdetail === 'viewpartyagentdetail' ? 'Update 3rd Party Agent' : 'Create 3rd Party Agent'} />
                      </ButtonBox>
                    )}
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      )}
    </PartyCreateContainer>
  );
};

export default CreateParty;
const validationSchema = Yup.object({
  available3rdPartyAgentname: Yup.string().required("Available 3rd party agents is required!"),
  brokerCommissionRate: Yup.string().required("Commission rate for: Broker managed is required!"),
  coManagedCommissionRate: Yup.string().required(
    "Commission rate for: Co-managed is required!"),
  brokerOwned: Yup.string()
    .required("Broker owned is required!"),
  property3rdpartyId: Yup.string()
    .required("3rd party property is required!")
});

