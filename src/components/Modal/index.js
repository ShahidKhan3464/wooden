import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";

import { Modal } from "@material-ui/core";
import { Button } from "@material-ui/core";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  actionBtn: {
    width: '200px',
    height: '50px',
    borderRadius: '5px',
    background: '#5C58A5',
    fontFamily: 'Manrope',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#FFFFFF',
    letterSpacing: '0.02em',
  },
  Modal: {
    overflowY: "auto",
  },
  paper: {
    position: "absolute",
    width: "60%",
    maxHeight: "90vh",
    overflowY: "auto",
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    borderRadius: "10px",
    "& h5": {
      color: "#3783e7",
      letterSpacing: "0.1rem",
      fontSize: "2rem",
      margin: "0 auto 20px",
      width: "fit-content",
    },
    "@media (max-width: 767px)": {
      width: "97%",
    }
  },
}));

export default function FormModal(props) {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h5>{props.title}</h5>
      {props.form}
    </div>
  );

  return (
    <div>
      {props.type !== "Update" ? (
        <Button
          onClick={() => {
            props.handleOpenModal();
            props.setCreateModal(true);
          }}
          variant="contained"
          color={props.button_color}
          className={classes.actionBtn}
        >
          {props.type}
        </Button>
      ) : null}
      <Modal
        className={classes.Modal}
        open={props.ModalState}
        //onClose={props.handleCloseModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
