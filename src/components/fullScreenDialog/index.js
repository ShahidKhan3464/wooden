import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import AdvancedGridList from "../imageGridList";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
    backgroundColor : "#009dff"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [imagelist, setImagelist] = React.useState([]);
  const handleClickOpen = () => {
    props.updateImage(imagelist)
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    props.updateImage(imagelist)
    setOpen(false);
    console.log(imagelist)
  };

  const removeImage = (index) => {
    if(window.confirm('Are you sure you want to delete the image?')){
      let images= [...imagelist];
      images=images.filter((el,el_index)=>index==el_index ? false : true)
      images=images.map((el,index)=>{
        el.imageOrder=index+1;
        return el;
      });
      props.updateImage(images)
    }
    
  };

  return (
      <div>
        <Button variant="outlined" size={'large'} color="secondary" onClick={handleClickOpen}>
          {props.buttonName}
        </Button>
       
        <Dialog fullScreen open={true} onClose={handleClose} TransitionComponent={Transition} style={{ display: (open ? 'block' : 'none') }}>
          <AppBar className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {props.title}
              </Typography>
              <Button autoFocus color="inherit" onClick={handleSave}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <div className={'container m-5'}>
            <div className={'container'}>
              {props.form}
            </div>
            <div className={'container float-right'}>
              <AdvancedGridList loading={props.loading} images={props.images} uploadimage={setImagelist} removeImage={removeImage}/>
            </div>
          </div>
        </Dialog>
    

      </div>
  );
}